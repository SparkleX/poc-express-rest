sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"c1/core/util/CoreUtil"
], function (UIComponent, JSONModel, CoreUtil) {
	"use strict";
	return UIComponent.extend("c1.app.OCRD.Component", {
		metadata : {
			manifest: "json"
		},
		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
			CoreUtil.init();
			this.getRouter().initialize();
		}
	});

}, /*export*/ true);