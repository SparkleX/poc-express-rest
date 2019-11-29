sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"c1/core/util/CoreUtil"
], function (UIComponent, JSONModel, CoreUtil) {
	"use strict";
	return UIComponent.extend("c1.app.ORDR.Component", {
		metadata : {
			manifest: "json"
		},

		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
			CoreUtil.init();
			this.getRouter().initialize();
			/*var oModelList = new JSONModel();
			oModelList.loadData("mock/list.json",null,false);	
			this.setModel(oModelList, "list");*/
			
			
			/*var oModelList = new JSONModel();
			oModelList.loadData("/api/ORDR/");
			oModelList.attachRequestCompleted(function() {
		        //console.log(oModelList.getData());
		    });
			this.setModel(oModelList, "list");	*/
			
			//var oModel = new JSONModel();
			//oModel.loadData("http://127.0.0.1/data/config.json");
			//console.log(JSON.stringify(oModel.getData()));
		}
	});

}, /*export*/ true);