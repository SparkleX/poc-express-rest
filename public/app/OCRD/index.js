sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "c1.app.OCRD",
		settings : {
			id : "order"
		},
		async: true
	}).placeAt("content");
});