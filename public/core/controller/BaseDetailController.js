sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"./FormMode",
	"c1/core/util/ApiUtils",
    "c1/core/util/RouterUtil",
    "c1/core/util/WidgetUtil",
], function (Controller, MessageToast, Fragment, JSONModel, FormMode, ApiUtils, RouterUtil, WidgetUtil) {
	"use strict";

	var BaseDetailController=Controller.extend("app.core.controller.BaseDetailController", {});

	BaseDetailController.prototype.onInit=function() {
			this.objectPageLayout = this.byId("objectPageLayout");
            this.editButton = this.byId("editButton");
            this.newButton = this.byId("newButton");
            this.deleteButton = this.byId("deleteButton");
			var oView = this.getView();
			oView.addEventDelegate({
			  onAfterRendering: function(evt){
				ApiUtils.finishBatchDesc();
			  },
			}, oView);
			
			var component =  this.getOwnerComponent();
			var oRouter = component.getRouter();
			oRouter.getRoute("detail").attachMatched(function(oEvent) {
			    this.dataId = oEvent.getParameter("arguments").id
			    if(this.dataId==="#")   {
			    	this.formMode = FormMode.addMode;
			        this.onInitData();
			    }
				else {
					this.formMode = FormMode.viewMode;
				    this.onLoadData(this.dataId);
				}
			}, this);
	};
	BaseDetailController.prototype.onLoadData = function(id) {
		this.dataId = id;
		var oModel = new JSONModel();
		this.oModel = oModel;
		oModel.loadData(`/api/${this.dataTable}/${id}`);
		this.getOwnerComponent().setModel(oModel);
		this.onRefreshUiStatus();
		this.getView().invalidate();
	}
	BaseDetailController.prototype.onInitData = function() {
	    var json = ApiUtils.init(this.dataTable);
        var oModel = new JSONModel(json);
		this.getOwnerComponent().setModel(oModel);
		this.onRefreshUiStatus();
	}
	BaseDetailController.prototype.onNavBack = function(){
		window.history.back();
	}
	BaseDetailController.prototype.onDelete = function(){
		ApiUtils.delete(this.dataTable, this.dataId);
		MessageToast.show("Successful");
		window.history.back();
	}
	BaseDetailController.prototype.onEdit = function()	{
		this.formMode=FormMode.editMode;
		this.onRefreshUiStatus();
	};
	BaseDetailController.prototype.onCancel = function()	{
		this.formMode=FormMode.viewMode;
        this.onRefreshUiStatus();
	};
	BaseDetailController.prototype.onSave = function()	{
	    this.saveObject();
		this.objectPageLayout.setShowFooter(false);
		MessageToast.show("Successful");
		window.history.back();
		//RouterUtil.navToList(this);
	};
	BaseDetailController.prototype.saveObject = function()	{
		var component =  this.getOwnerComponent();
		var model = component.getModel();
		var data = model.getData();
		console.log(data);
	    if(this.formMode === FormMode.addMode) {
    		ApiUtils.create(this.dataTable, data);
    	} else {
    	    ApiUtils.update(this.dataTable, this.dataId, data);
    	}

	}
	BaseDetailController.prototype.onNew = function()	{
		this.formMode=FormMode.addMode;
        this.onRefreshUiStatus();
	}


	BaseDetailController.prototype.onTest = function()	{
		var component =  this.getOwnerComponent();
		var omFormMode = component.getModel();
		var data = omFormMode.getData();
		//var data = this.oModel.getData();
		console.log(data);
		//this.onRefreshUiStatus();
	}
	BaseDetailController.prototype.onNext = function()	{
		var that = this;
		var id = ApiUtils.getNext(this.dataTable, this.dataId, function(id){
			that.onLoadData(id);
		}, function(){
			MessageToast.show("Last Records");
		});
		
	}
	BaseDetailController.prototype.onPrev = function()	{
		var that = this;
		var id = ApiUtils.getPrev(this.dataTable, this.dataId, function(id){
			that.onLoadData(id);
		}, function(){
			MessageToast.show("First Records");
		});
	}	
	BaseDetailController.prototype.onRefresh = function()	{
		this.onLoadData(this.dataId);
	}	
	BaseDetailController.prototype.onRefreshUiStatus = function()	{
		if(this.formMode === FormMode.addMode) {
	        this.objectPageLayout.setShowFooter(true);
	        this.editButton.setVisible(false);
	        this.newButton.setVisible(false);
	        this.deleteButton.setVisible(false);
	        WidgetUtil.scan(this.getView(), WidgetUtil.editableAddMode);
		}
		if(this.formMode === FormMode.viewMode) {
	        this.objectPageLayout.setShowFooter(false);
	        this.editButton.setVisible(true);
	        this.newButton.setVisible(true);
	        this.deleteButton.setVisible(true);
	        WidgetUtil.scan(this.getView(), WidgetUtil.editableFalse);
		}
		if(this.formMode === FormMode.editMode) {
	        this.objectPageLayout.setShowFooter(true);
	        this.editButton.setVisible(false);
	        this.newButton.setVisible(true);
	        this.deleteButton.setVisible(true);
	        WidgetUtil.scan(this.getView(), WidgetUtil.editableEditMode);
		}	
		this.getView().invalidate();	
	}

	return BaseDetailController;

});