sap.ui.define([
	"c1/core/controller/BaseDetailController",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function (BaseDetailController, MessageToast, Fragment, JSONModel) {
	"use strict";
	var theClass =BaseDetailController.extend("c1.app.CINF.controller.Detail", {
		dataTable:'CINF'
	});

	theClass.prototype.onInit=function() {
		BaseDetailController.prototype.onInit.call(this);

	}
	
	theClass.prototype.onDefaultAddress=function(evt) {
		var source = evt.getSource();
		var index = source.getParent().getIndex();
		var model = source.getModel();
		var data = model.getData();
		for(let o of data.CRD1) {
			o.dfltAddr = 'N';
		}
		data.CRD1[index].dfltAddr = 'Y';

	}
	return theClass;
});