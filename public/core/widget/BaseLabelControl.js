sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/DatePicker",
	"sap/m/Label",
],
function(BaseClass, DatePicker, Label) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.BaseLabelControl", { 
		metadata: {
			interfaces : ["sap.ui.core.IFormContent"],
			properties: {
				label: { type: "string", group: "Misc", defaultValue: "" },
				dataFormat: { type: "string", group: "Misc", defaultValue: null },
				dataValue: { type: "string", group: "Misc", defaultValue: null },
				editableAddMode: { type: "boolean", group: "Misc", defaultValue: true},
				editableEditMode: { type: "boolean", group: "Misc", defaultValue: true},
				visibleAddMode: { type: "boolean", group: "Misc", defaultValue: true},
				visibleViewMode: { type: "boolean", group: "Misc", defaultValue: true},
				visibleEditMode: { type: "boolean", group: "Misc", defaultValue: true},				
			},
			aggregations: {
				"_label" : {type : "sap.m.Label", multiple : false},
		    },			
		}
	});
	theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		
		var oLabel = new Label({
			width:"100%", 
			text:this.getLabel()
			});
		this.setAggregation("_label", oLabel); 
	}
	return theClass;
});