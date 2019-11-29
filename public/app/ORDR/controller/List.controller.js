sap.ui.define([
	"c1/core/controller/BaseListController",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
	"use strict";

	var theClass = Controller.extend("c1.app.controller.List", {
		dataTable : "ORDR"
	});
	
	return theClass;

});