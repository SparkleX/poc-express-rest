sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/InputRenderer",
	'sap/ui/core/Renderer'
], function (Control, InputRenderer, Renderer) {
	"use strict";
	//var theClass = Renderer.extend(InputRenderer);

	var theClass = Renderer.extend(InputRenderer);
	return theClass;
	
	/*theClass.writeInnerValue = function(oRm, oControl) {
		oRm.writeAttributeEscaped("value", oControl.getDataDesc());
	};*/
	//return theClass;
});