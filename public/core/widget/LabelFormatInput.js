sap.ui.define([
	"./BaseLabelControl",
	"./FormatInput",
	"sap/m/Label",
	"c1/core/util/CoreUtil"
],
function(BaseClass, FormatInput, Label, CoreUtil) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.LabelFormatInput", { 
		metadata: {
			aggregations: {
				"_input" : {type : "c1.core.widget.FormatInput", multiple : false},
		    },	
			events: {
				dataChange:{
					parameters: {
						value: {
							type: "string"
						}
					}
				}
			}		
		}
	});
    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
    	
		var oInput = new FormatInput({
			type:"Text",
			width:"100%",
			dataValue: {parts: [{path: this.getBindingPath("dataValue")}]},
			dataFormat: this.getDataFormat(),
			editableAddMode: this.getEditableAddMode(),
			editableEditMode: this.getEditableEditMode(),
			dataChange: this.onDataChange
				});

		this.setAggregation("_input", oInput);
    	return rt;
    }	
    theClass.prototype.onDataChange = function(evt) {
    	var source = evt.getSource();
    	var that = source.getParent();
    	var params = evt.getParameters();
    	return that.fireDataChange(params);
     }    
	return theClass;
});