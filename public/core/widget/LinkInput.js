sap.ui.define([
	"sap/m/Input",
	"c1/core/view/choose/ChooseDialog",
    "sap/ui/model/json/JSONModel",
    "c1/core/util/CoreUtil",
    "c1/core/util/ApiUtils",
    "c1/core/widget/FormatUtil",
],
function(BaseClass, ChooseDialog, JSONModel, CoreUtil,ApiUtils,FormatUtil) {
	"use strict";
	var theClass = BaseClass.extend("c1.core.widget.LinkInput", { 
	metadata: {
		properties: {
			dataFormat: { type: "string", group: "Misc", defaultValue: null },
			dataValue: { type: "string", group: "Data", defaultValue: null, bindable: "bindable" },
		//	dataDesc: { type: "string", group: "Misc", defaultValue: null }
		}
	}});

	theClass.prototype.init = function () {
		BaseClass.prototype.init.call(this);
		
		this.setPlaceholder("Enter ...");
		this.setShowSuggestion(true);
		this.setShowValueHelp(true);
		this.setShowTableSuggestionValueHelp(false);
		this.attachValueHelpRequest(this._onChooseFromList);
		//this.setSuggestionItems("")
	    this.attachSuggestionItemSelected(this.onSuggestionItemSelected);
	    this.attachSuggest(this._onSuggest);
	};
    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
    	var dataFormat = this.getDataFormat();
    	this.metaCol = CoreUtil.getMdColumnByBind(dataFormat);
    	
    	//var path = this.getBindingPath("dataValue");
    	//this.bindDataValue({parts: [{path: this.getBindingPath("dataValue"), type:"sap.ui.model.type.Integer"}]});
    	this.buildSuggestions();

    	return rt;
     }
    theClass.prototype.buildSuggestions = function() {
		var oModel = new JSONModel([]);
		this.setModel(oModel,"suggest");

    	var metaLinkToTable = CoreUtil.getMdTable(this.metaCol.linkTo);

    	for(var metaLinkToColumn of metaLinkToTable.column) {
	    	var oLabel = new sap.m.Label({text:metaLinkToColumn.description});
	    	var oColumn = new sap.m.Column({
	    		demandPopin:true,
	    		popinDisplay:"Inline",
	    		header:oLabel
	    		});
    		this.addSuggestionColumn(oColumn);
    	}
    	var cells = [];
    	for(var metaLinkToColumn of metaLinkToTable.column) {
    		var oLabel = new sap.m.Label({
    		   // id:metaLinkToColumn.id,
    		    text:"{suggest>"+metaLinkToColumn.id+"}"
    		});
   			cells.push(oLabel);
    	}
    	var oColListItem = new sap.m.ColumnListItem({
    		cells: cells
    	});
    	this.bindSuggestionRows({
    		  path : "suggest>/",
    		  template : oColListItem
    	});
    }
    theClass.prototype.setValue = function (value) {
	   	var rt = BaseClass.prototype.setValue.call(this, value);
	   	var str = value;
	   	if(value=="") {	 
	   		str = undefined;
	   	}
	   	this.setProperty("dataValue", str);
		return rt;
    }

	theClass.prototype.setDataValue = function (value) {

		this.setProperty("dataValue", value);
		var linkToTable = this.metaCol.linkTo;
		var that = this;
		var desc = ApiUtils.getDescription(linkToTable, value, function(val){
			BaseClass.prototype.setValue.call(that, val);		
		});
		//ApiUtils.finishBatchDesc();
	}
	/*theClass.prototype.getDataValue = function () {
		var str = this.getProperty("dataValue");
		var dataFormat = this.getDataFormat();
		var table = CoreUtil.getDataBindTable(dataFormat);
		var field = CoreUtil.getDataBindField(dataFormat);
		this.metaCol = CoreUtil.getMdColumn(table, field);		
		var value = FormatUtil.fromString(this.metaCol, str);
		return value;
	}*/
	theClass.prototype._onChooseFromList = function (oEvent) {
		var sInputValue = this.getDataValue();
		var dataFormat = this.getDataFormat();
		var table = CoreUtil.getDataBindTable(dataFormat);
		var field = CoreUtil.getDataBindField(dataFormat);
		this.metaCol = CoreUtil.getMdColumn(table, field);
		table = this.metaCol.linkTo;
		this._cflDialog = new ChooseDialog(this, table);
        this._cflDialog.open(sInputValue);
	};
	theClass.prototype.onSuggestionItemSelected = function (evt) {
		var value = evt.getParameters("selectedRow").selectedRow.getCells()[0].getText();
		this.setDataValue(value);
		ApiUtils.finishBatchDesc();
	}
	theClass.prototype._onSuggest = function (evt) {
		var sTerm = evt.getParameter("suggestValue");
		var oModel = new JSONModel();
		var url ="/api/"+this.metaCol.linkTo+"/";//"?id="+sTerm;
		oModel.loadData(url,null,false);
		this.setModel(oModel,"suggest");
	}
	return theClass;
});