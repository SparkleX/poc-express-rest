sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var GeneralPage =  BlockBase.extend("c1.app.ORDR.pages.General", {
		metadata: {
			events: {
				"dummy": {}
			}
		}
	});
	

	/*GeneralPage.prototype.onInit=function() {
		BlockBase.prototype.onInit.call(this);
	}
	GeneralPage.prototype.onChangeBpCurrency=function(oEvent) {
		console.log("change");
	}
	GeneralPage.prototype.onChangeFName=function(oEvent) {
		console.log("change");
	}*/
	return GeneralPage;
}, true);
