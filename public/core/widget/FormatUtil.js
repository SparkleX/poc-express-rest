sap.ui.define([
    "c1/core/util/CoreUtil",
    "sap/ui/core/format/NumberFormat",
    "c1/core/util/ApiUtils",
    "sap/ui/model/type/Float",
],
function(CoreUtil,NumberFormat,ApiUtils,Float) {
	"use strict";

	var theClass={};
	theClass.format=function(dataFormat) {
		var metaCol = CoreUtil.getMdColumnByBind(dataFormat);
		var rt = {right:false, editSize :metaCol.dbSize};
		
		if(metaCol.editSize) {
			rt.editSize = metaCol.editSize;
		}
		
		if(!metaCol.linkTo) {			
			switch(metaCol.dbType) {
			case "IDENTITY":
			case "INTEGER":
			case "DECIMAL":
				rt.right=true;
			}
		}
		rt.decimalPlaces = CoreUtil.getDecimalPlaces(metaCol);
		
		return rt;
	}
	theClass.formatValue=function(dataFormat, dataValue, fnCallback) {
		if(dataValue==null) {
			fnCallback(null);
			return ;
		}
		var metaCol = CoreUtil.getMdColumnByBind(dataFormat);
		
		switch(metaCol.dbType) {
		case "DECIMAL":
			var decimalPlaces = CoreUtil.getDecimalPlaces(metaCol);
			var oFormat = NumberFormat.getFloatInstance({decimals: decimalPlaces});
			var rt =oFormat.format(dataValue);
			fnCallback(rt);
			return;
		}
		
		if(metaCol.linkTo) {
			ApiUtils.getDescription(metaCol.linkTo, dataValue, fnCallback);
			return ;
		}
		fnCallback(dataValue);
	}
	
	theClass.fromString=function(metaCol, str) {
		if(str==null) {
			return null;
		}
		switch(metaCol.dbType) {
			case "IDENTITY":
			case "INTEGER":
				return parseInt(str);
			case "DECIMAL":
				return parseFloat(str);
		}
		return str;
	}
	theClass.toString1 = function (metaCol, value) {
		if(!value) {
			return "";
		}
		if(metaCol.validValue) {
		    for(let vv of metaCol.validValue) {
		        if(vv.id==value) {
		            return vv.value;
		        }
		    }
		}
		switch(metaCol.dbType) {
			case "ALPHA_NUMERIC":
				return value;
		}
		var decimalPlaces = CoreUtil.getDecimalPlaces(metaCol);

		var oFormat = NumberFormat.getFloatInstance({decimals: decimalPlaces});
		var formattedVal = null;
		if(value!=null) {
			formattedVal = oFormat.format(value);
		}
		
		return formattedVal;
	}	
	return theClass;
});


