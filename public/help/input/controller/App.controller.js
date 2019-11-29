sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
   "use strict";
   return Controller.extend("c1.app.controller.App", {
	data : {value : "T"},
	onInit : function () {
		this.oModel = new JSONModel(this.data);
		this.getView().setModel(this.oModel);
	},	   
	onTest : function () {
		var data = this.oModel.getData();
		alert(data.value);
      }
   });
});
