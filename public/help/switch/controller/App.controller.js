sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
   "use strict";
   return Controller.extend("c1.app.controller.App", {
	data : {value : "T"},
	onInit : function () {
		var oModel = new JSONModel(this.data);
		this.getView().setModel(oModel);
	},	   
	onTest : function () {
		alert(this.data.value);
      }
   });
});
