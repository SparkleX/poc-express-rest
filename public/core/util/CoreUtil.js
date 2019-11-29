sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/thirdparty/jquery",
    "c1/core/util/ApiUtils",
],
function(JSONModel, jQuery, ApiUtils) {
	"use strict";

	var theClass={};
	theClass.metadata = null;
	theClass.oadm = null;
	theClass.decimals = {};
	theClass.init=function() {
	    this.initMetadata();
	    this.initOADM();
    }
	theClass.initMetadata=function() {
		var data = ApiUtils.syncAjax({url: '/api/metadata/'})
        theClass.metadata = data;
		for(var table in theClass.metadata) {
			var oTable = theClass.metadata[table];
			oTable.columnMap = {};
			for(var colIndex in oTable.columns) {
				var oColumn = oTable.columns[colIndex];
				oTable.columnMap[oColumn.name] = oColumn;
			}
		}
	}
	theClass.initOADM=function() {
		//var data = ApiUtils.syncAjax({url: '/api/OADM/'})
		//var data = [{}];
        //theClass.oadm = data[0];
        theClass.decimals.MEASURE = 2
        theClass.decimals.PERCENT = 2;
        theClass.decimals.QUANTITY = 2;
        theClass.decimals.RATE = 2;
        theClass.decimals.SUM = 2;
        theClass.decimals.PRICE = 2;
	}

    theClass.getDataBindTable=function(bind){
        var str = bind.split(".")
        var table = str[0];
        return table;
    }
    theClass.getDataBindField=function(bind){
        var str = bind.split(".")
        var val = str[1];
        return val;
    }
	theClass.getDecimalPlaces = function(column) {
		if(column.editType==='NONE') {
			return null;
		}
	   	var rt = this.decimals[column.editType];
	   	return rt;
	}
    theClass.getMdColumnByBind=function(bind){
        var str = bind.split(".")
        var table = str[0];
        var column = str[1];
        return this.getMdColumn(table, column);
    }
	theClass.getMdColumn=function(table, column) {
	    var rt = this.metadata[table].columnMap[column];
	    if(rt===undefined) {
	    	alert(`${table}.${column} not exists`);
	    }
        return rt;
	}
	theClass.getMdTable=function(table) {
	    var rt = this.metadata[table];
        return rt;
	}
	return theClass;
});