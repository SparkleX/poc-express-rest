sap.ui.require([
	"sap/m/Shell",
	"sap/m/App",
	"sap/m/Page",
	"sap/ui/core/ComponentContainer"
], function(
	Shell, App, Page, ComponentContainer) {
	"use strict";

	sap.ui.getCore().attachInit(function() {
		new Shell ({
			app : new App ({
				pages : [
					new Page({
						title : "Controller Extension",
						enableScrolling : true,
						content : [
							new ComponentContainer({
								name : "sap.ui.core.sample.ControllerExtension",
								settings : {
									id : "sap.ui.core.sample.ControllerExtension"
								}
							})
						]
					})
				]
			})
		}).placeAt("content");
	});
});