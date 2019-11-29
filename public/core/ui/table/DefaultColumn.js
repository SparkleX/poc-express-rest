sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/core/Element"
], function (Object,Element) {
	"use strict";
	var theClass =  Element.extend("c1.core.ui.table.DefaultColumn", {
		metadata : {
			properties: {
				text: {type: "string", group: "Behavior", defaultValue: null},
				dataBind: {type: "string", group: "Behavior", defaultValue: null}
			}
		}
	});


	return theClass;
});