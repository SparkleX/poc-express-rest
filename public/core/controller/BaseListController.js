sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"c1/core/util/RouterUtil",
	"c1/core/util/ApiUtils",
	"sap/ui/comp/filterbar/FilterItem",
	"c1/core/util/CoreUtil",
	"c1/core/util/WidgetUtil",
], function (Controller, MessageToast, Fragment, JSONModel, RouterUtil, ApiUtils,FilterItem, CoreUtil,WidgetUtil) {
	"use strict";

	var theClass =Controller.extend("c1.core.controller.BaseListController", {});
	theClass.prototype.onInit=function() {
		this.dataTable = "ORDR";
	    var that = this;
	    var oView = this.getView();
	    this.initFilter();
		oView.addEventDelegate({
		  onAfterShow: function(evt){
			that.refresh();
		  },
		  onAfterRendering: function(evt){
			ApiUtils.finishBatchDesc();
		  },
		}, oView);
	}
	theClass.prototype.initFilter=function() {
		var oView = this.getView();
		var oFilterBar = oView.byId("idFilterBar");
		oFilterBar.attachSearch(this.onSearch.bind(this));
		var oModelFilter = new JSONModel({});
		oView.setModel(oModelFilter,"filter");

        var metaTable = CoreUtil.getMdTable(this.dataTable);
        this.listColumns = ApiUtils.listView(this.dataTable);

		var oInput = new sap.m.Input({value:"{filter>/$search}"});
		var oFilterItem = new FilterItem({
			name:"__search",
			name:"search",
			label:"Search",
			control:oInput
				});		
		oFilterBar.addFilterItem(oFilterItem);
		for(let colName of this.listColumns.column) {
            var metaCol = metaTable.columnMap[colName];

			var oInput =  WidgetUtil.newEditableControl(metaTable, metaCol, "filter>");
			var oFilterItem = new FilterItem({
				id: "idFilter" + metaCol.id,
				name: metaCol.id,
				label:metaCol.description,
				control:oInput,
				
					});	
			oFilterBar.addFilterItem(oFilterItem);
		}
		
	}
	theClass.prototype.onSearch=function(evt) {
		this.refresh();	
	}
    theClass.prototype.onTestClick = function () {
			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//oRouter.navTo("detail");


	}
	theClass.prototype.onListItemPress = function (evt) {
        var oRow = evt.getParameter("row");
		var oItem = evt.getParameter("item");
		var id = this.getView().getModel("list").getProperty("id", oRow.oBindingContexts.list);

        RouterUtil.navTo(this, id);
	}
	theClass.prototype.refresh = function () {
		var oView = this.getView();
		var oModel = oView.getModel("filter");
		var data = oModel.getData();
		var filter = "";
		var select = this.listColumns.column.join(",");


		for(var key in data) {
			if(data[key]==="") {
				continue;
			}
			filter = filter + key+"="+data[key]+"&";
		}

        var oModelList = new JSONModel();
        oModelList.loadData(`/api/${this.dataTable}/?$orderby=id desc&$select=${select}&${filter}`);
        oModelList.attachRequestCompleted(function() {
        });
        this.getOwnerComponent().setModel(oModelList, "list");
        oModelList.refresh();
        this.getView().invalidate();
	}
    theClass.prototype.onAdd = function (evt) {
        RouterUtil.navToNew(this);
    }
    theClass.prototype.onDelete = function (evt) {
        var tb = this.byId("listTable");
        var rowid = tb.getSelectedIndices();

        for(let row of rowid) {
        	var id = tb.getRows()[row].getCells()[0].getText();
        	ApiUtils.delete(this.dataTable, id);
        }
        MessageToast.show("Successful");
        this.refresh();
    };
    
    theClass.prototype.openQuickView= function (oEvent, oModel) {
		this.createPopover();

		this._oQuickView.setModel(oModel);

		// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
		var oButton = oEvent.getSource();
		jQuery.sap.delayedCall(0, this, function () {
			this._oQuickView.openBy(oButton);
		});
	};

	theClass.prototype.onQuickView= function (oEvent) {
		this.openQuickView(oEvent, this.oModel);
	};

	theClass.prototype.createPopover= function() {
		if (!this._oQuickView) {
			this._oQuickView = sap.ui.xmlfragment("c1.share.quick.OCRD", this);
			this.getView().addDependent(this._oQuickView);
		}
	};
	return theClass;

});