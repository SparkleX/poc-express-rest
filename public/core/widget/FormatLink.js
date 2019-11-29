sap.ui.define([
	"sap/m/Link",
	"sap/ui/core/TextAlign",
	"sap/ui/core/format/NumberFormat",
	"c1/core/util/CoreUtil",
	"c1/core/util/ApiUtils",
	"sap/ui/model/json/JSONModel",
],
function(BaseClass, TextAlign,NumberFormat, CoreUtil, ApiUtils, JSONModel) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.FormatLink", { 
	metadata: {
		properties: {
			dataFormat: { type: "string", group: "Misc", defaultValue: null },
			dataValue: { type: "string", group: "Misc", defaultValue: null }
		}
	}});
    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
    	var dataFormat = this.getDataFormat();
    	this.metaCol = CoreUtil.getMdColumnByBind(dataFormat);
		this.attachPress(this.onPress);
    	return rt;
     }	
	theClass.prototype.setDataValue = function (value) {
		this.setProperty("dataValue", value);
		var that = this;
		ApiUtils.getDescription(this.metaCol.linkTo, value, function(desc) {
            that.setText(desc);
        });
	}


	theClass.prototype.onPress= function (evt) {
		var table = this.metaCol.linkTo;
		if (!this._oQuickView) {
			
			this._oQuickView = sap.ui.xmlfragment("c1.share.quick."+table, this);
		}
		var oModel = new JSONModel();
		var url ="/api/"+table+"/"+this.getDataValue();
		oModel.loadData(url,null,false)
		this._oQuickView.setModel(oModel);

		var oButton = evt.getSource();
		jQuery.sap.delayedCall(0, this, function () {
			this._oQuickView.openBy(oButton);
		});

	}	

	return theClass;
});