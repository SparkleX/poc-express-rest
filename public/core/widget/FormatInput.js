sap.ui.define([
	"sap/m/Input",
	"sap/ui/core/TextAlign",
	"c1/core/util/CoreUtil",
	"c1/core/widget/FormatUtil"
],
function(BaseClass, TextAlign, CoreUtil, FormatUtil) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.FormatInput", { 
	metadata: {
		properties: {
			dataFormat: { type: "string", group: "Misc", defaultValue: null },
			dataValue: { type: "string", group: "Misc", defaultValue: null },
			editableAddMode: { type: "boolean", group: "Misc", defaultValue: true, multiple : false},
			editableEditMode: { type: "boolean", group: "Misc", defaultValue: true, multiple : false},
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
	}});
	
    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);    	
    	var dataFormat = this.getDataFormat(); 
    	this.metaCol = CoreUtil.getMdColumnByBind(dataFormat);
    	var format = FormatUtil.format(dataFormat);
    	if(format.right){
    		this.setTextAlign(TextAlign.Right);
    	}
		this.setWidth("100%");	
		this.setMaxLength(format.editSize);
		this.attachChange(this.onChangeHandler);
    	return rt;
     }	
	theClass.prototype.setValue = function (str) {
		var value = FormatUtil.fromString(this.metaCol, str);
		var str = FormatUtil.toString1(this.metaCol,value);
		BaseClass.prototype.setValue.call(this, str);
		
		
		this.setProperty("dataValue", value);
		
	}
	theClass.prototype.setDataValue = function (value) {
		this.setProperty("dataValue", value);
		var str = FormatUtil.toString1(this.metaCol, value);
		BaseClass.prototype.setValue.call(this, str);		
	};	
	theClass.prototype.setEditable = function (value) {
		BaseClass.prototype.setEditable.call(this, value);		
	};	
	theClass.prototype.onChangeHandler = function (evt) {
		return this.fireDataChange(evt);
	};	
	return theClass;
});