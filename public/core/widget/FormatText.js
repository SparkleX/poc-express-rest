sap.ui.define([
	"sap/m/Text",
	"sap/ui/core/TextAlign",
	"sap/ui/core/format/NumberFormat",
	"c1/core/util/CoreUtil",
	"./FormatUtil"
],
function(Text, TextAlign,NumberFormat, CoreUtil, FormatUtil) {
	"use strict";
	var theClass = Text.extend("c1.core.widget.FormatText", { 
	metadata: {
		properties: {
			dataFormat: { type: "string", group: "Misc", defaultValue: null },
			dataValue: { type: "string", group: "Misc", defaultValue: null }
		}
	}});
    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = Text.prototype.applySettings.call(this, mSettings, oScope);    	
    	var dataFormat = this.getDataFormat();
    	this.metaCol = CoreUtil.getMdColumnByBind(dataFormat);
    	var format = FormatUtil.format(dataFormat);
    	if(format.right){
    		this.setTextAlign(TextAlign.Right);
    	}
		this.setWidth("100%");		
    	return rt;
     }	

	theClass.prototype.setDataValue = function (value) {
		this.setProperty("dataValue", value);
		var str = FormatUtil.toString1(this.metaCol, value);
		this.setText(str);
	}
	
	return theClass;
});