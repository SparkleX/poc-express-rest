sap.ui.define([
	"sap/m/CheckBox"
],
function(BaseClass) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.CheckBox", { 
	metadata: {
		properties: {
			label: { type: "string", group: "Misc", defaultValue: null },
			dataValue: { type: "string", group: "Misc", defaultValue: null },
			dataYes: { type: "string", group: "Misc", defaultValue: "Y" },
			dataNo: { type: "string", group: "Misc", defaultValue: "N" }
		}
	}});

	theClass.prototype.setLabel = function(value) {
		return this.setText(value);
	}
	theClass.prototype.setDataValue = function(value) {
		//var rt = this.setProperty("dataValue", value);
		this.setSelected(value===this.getDataYes());
		//return rt;
	}
	theClass.prototype.setSelected = function(value) {
		this.setProperty("dataValue", value?this.getDataYes():this.getDataNo());
		var rt = BaseClass.prototype.setSelected.call(this,value);
		return rt;
	}

	return theClass;
});