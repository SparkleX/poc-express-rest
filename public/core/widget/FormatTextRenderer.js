sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/TextRenderer",
	'sap/ui/core/Renderer'
], function (Control, TextRenderer, Renderer) {
	"use strict";
	var theClass = Renderer.extend(TextRenderer);
	return theClass;
});