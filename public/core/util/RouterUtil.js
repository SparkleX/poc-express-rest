sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";
	var theClass = {}

	theClass.navTo = function (view, id) {
        var oRouter = UIComponent.getRouterFor(view);
        oRouter.navTo("detail",{id: id});
	}
	theClass.navToNew = function (view) {
	    this.navTo(view, "#")
	}
	theClass.navToList = function (controller) {
        var oRouter = UIComponent.getRouterFor(controller);
        oRouter.navTo("list");
	}
	return theClass;
});