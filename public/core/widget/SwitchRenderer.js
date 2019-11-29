sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/SwitchRenderer",
	'sap/ui/core/Renderer'
], function (Control, SwitchRenderer, Renderer) {
	"use strict";
	var theClass = Renderer.extend(SwitchRenderer);
	return theClass;
});