sap.ui.define([
	"c1/core/controller/BaseDetailController",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"c1/core/util/ApiUtils",
], function (BaseClass, MessageToast, Fragment, JSONModel, ApiUtils) {
	"use strict";

	var theClass =BaseClass.extend("c1.app.controller.Detail", {
		dataTable:'ORDR'
	});

	theClass.prototype.onInit=function() {
		BaseClass.prototype.onInit.call(this);

	}
	theClass.prototype.onDummy=function (evt) {
		alert('a');
	}
	theClass.prototype.onChange=function(evt) {

		var oView = this.getView();
		var oView2 = this.getView("idView");
		alert('a');
		/*var oModel = this.getOwnerComponent().getModel()
		var data = oModel.getData();
		var newData = ApiUtils.change(data,"ORDR","",0);
		oModel.setData(newData);
		this.getView().invalidate();*/
	}
	theClass.prototype.onTest=function(item) {
		var src = this.byId("test");
		src.getIcon().attachPress(this.onLoadItems.bind(this, true));
	}
	theClass.prototype.popup=function(item) {
		var src = this.byId("test");
		var data = {RDR1: [{id:1,desc:"a"},{id:2,desc:"b"}]};
		var oModel = new JSONModel(data);
		src.setModel(oModel);
		//src.bindItems("\RDR1");
		this.b = src.bindItems({
                path : "/RDR1", 
               // suspended: true,
                template : new sap.ui.core.Item({
                    key: "{id}",
                    text: "{id}"
                })
            });		
	}		
	theClass.prototype.onCalcTotal=function(evt) {
		var oModel = this.getView().getModel()
		var data = oModel.getData();
		var newData = ApiUtils.change(data,"ORDR","",0);
		oModel.setData(newData);

		this.getView().invalidate();
	}	
	theClass.prototype.onLoadItems=function(evt) {
		console.debug("onLoadItems");
		this.popup(null);
	}	
	
	return theClass;
});