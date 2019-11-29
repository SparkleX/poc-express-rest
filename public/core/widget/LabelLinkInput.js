sap.ui.define([
	"./BaseLabelControl",
	"./LinkInput",
	"sap/m/Label"
],
function(BaseClass, LinkInput, Label) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.LabelLinkInput", { 
		metadata: {
			aggregations: {
				"_input" : {type : "c1.core.widget.LinkInput", multiple : false}
		    },			
		}
	});

    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		var oInput = new LinkInput({
			type:"Text",
			width:"100%",
			dataValue: {parts: [{path: this.getBindingPath("dataValue")}]},
			dataFormat: this.getDataFormat(),
		});
		this.setAggregation("_input", oInput);
    	return rt;
     }	  
	return theClass;
});