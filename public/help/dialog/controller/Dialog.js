sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/ui/core/Fragment",
], function (Controller, JSONModel,Fragment) {
   "use strict";
   var theClass= Controller.extend("c1.app.controller.Dialog", {});
	   
   theClass.prototype.onCloseDialog = function (evt) {
	  var dialog=evt.getSource().getParent();
	  dialog.close();
	  dialog.destroy();
   }
	return theClass;
	
});
