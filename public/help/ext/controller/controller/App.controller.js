sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "c1/app/controller/SampleExtension"
], function (Controller, JSONModel, SampleExtension) {
   "use strict";
   return Controller.extend("c1.app.controller.App", {
	   aaa: SampleExtension,
	   data : {value : "T"},
	onInit : function () {
		this.oModel = new JSONModel(this.data);
		this.getView().setModel(this.oModel);
	},	   
	onTest : function () {
		var data = this.oModel.getData();
		alert(data.value);
		this.aaa.onHook();
      },
	loadPlugin: function(){
		var sCode = jQuery.sap.loadResource(
			jQuery.sap.getResourceName("c1.app.ext.CustomerExtension"),
			{
				dataType: "text"
			}
		);
		this._addControllerExtension(sCode, "c1.app.ext");
		MessageBox.confirm("We will reload the page to apply the controller extension", {
			onClose: function(){
				window.location.reload();
			}
		});
	},      
   });
});
