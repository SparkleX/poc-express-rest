sap.ui.define([
	"sap/ui/table/TableRenderer",
	'sap/ui/core/Renderer'
], function (TableRenderer, Renderer) {
	"use strict";
	var theClass = Renderer.extend(TableRenderer);
	return theClass;
});