sap.ui.define([
	"./BaseLabelControl",
	"sap/m/DatePicker",
	"sap/m/Label",
],
function(BaseClass, DatePicker, Label) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.LabelDatePicker", { 
		metadata: {
			aggregations: {
				"_input" : {type : "sap.m.DatePicker", multiple : false}
		    },			
		}
	});
    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
    	var oInput = new sap.m.DatePicker({
			width:"100%",
			dataValue: {parts: [{path: this.getBindingPath("dataValue")}]},
			dataFormat: this.getDataFormat(),
		});
    	this.setAggregation("_input", oInput);
    	return rt;
     }	  
	return theClass;
});