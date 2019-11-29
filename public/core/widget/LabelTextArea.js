sap.ui.define([
	"./BaseLabelControl",
	"sap/m/TextArea",
	"sap/m/Label",
	"c1/core/util/CoreUtil"
],
function(BaseClass, TextArea, Label, CoreUtil) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.LabelTextArea", { 
		metadata: {
			aggregations: {
				"_input" : {type : "sap.m.TextArea", multiple : false}
		    },			
		}
	});

    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		var oInput = new TextArea({width:"100%", 
			value:{parts: [{path: this.getBindingPath("dataValue")}] },
			width:"100%",
			rows: 4
		});
		this.setAggregation("_input", oInput);
    	return rt;
     }	  

	return theClass;
});