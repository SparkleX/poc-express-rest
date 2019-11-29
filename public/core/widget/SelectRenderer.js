sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/SelectRenderer",
	'sap/ui/core/Renderer'
], function (Control, SelectRenderer, Renderer) {
	"use strict";
	var theClass = Renderer.extend(SelectRenderer);
	return theClass;
});