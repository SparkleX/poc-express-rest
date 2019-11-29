sap.ui.define([
	"sap/m/Switch"
],
function(Switch) {
	"use strict";
	var theClass = Switch.extend("c1.core.widget.Switch", { 
	metadata: {
		properties: {
			stateValue: { type: "string", group: "Misc", defaultValue: "F" },
			stateTrue: { type: "string", group: "Misc", defaultValue: "T" },
			stateFalse: { type: "string", group: "Misc", defaultValue: "F" }
		}
	}});

	theClass.prototype.setState = function(bState) {
		this.setProperty("state", bState, true);
		this._setDomState(this.getState());
		this.setProperty("stateValue", bState?this.getStateTrue():this.stateFalse(), true);
		return this;
	};


	theClass.prototype.setStateValue = function(value) {
		return this.setState(value==="T")
	};

	theClass.prototype.getStateTrue = function() {
		return this.getProperty("stateTrue");
	};
	theClass.prototype.stateFalse = function() {
		return this.getProperty("stateFalse");
	};

	return theClass;
});