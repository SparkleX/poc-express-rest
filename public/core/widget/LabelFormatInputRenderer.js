sap.ui.define([
], function () {
	"use strict";
	var theClass = {};
	
	theClass.render=function(oRm, oElement){
		oRm.renderControl(oElement.getAggregation("_label"));
		oRm.renderControl(oElement.getAggregation("_input"));	
	}
	return theClass;
});