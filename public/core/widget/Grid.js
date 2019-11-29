sap.ui.define([
	"sap/ui/table/Table",
	"sap/m/Button",
	"sap/m/OverflowToolbar",
], function (BaseClass, Button, OverflowToolbar) {
	"use strict";
	var theClass =  BaseClass.extend("c1.core.widget.Grid", {
		metadata : {
			properties : {
				dataTable: { type: "string", group: "Misc", defaultValue: null },
			}
		}
	});
    theClass.prototype.applySettings = function(mSettings, oScope) {
    	var rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
    	this.oToolBar = new OverflowToolbar({});
    	var oAddButton = new Button({icon:"sap-icon://add",type:"Transparent", press: this.onAdd});
    	var oDeleteButton = new Button({icon:"sap-icon://delete",type:"Transparent", press: this.onDelete});
    	this.oToolBar.addContent(oAddButton);
    	this.oToolBar.addContent(oDeleteButton);
    	this.addExtension(this.oToolBar);
    }
    theClass.prototype.setEditable = function(bEditable) {
    	var rt = BaseClass.prototype.setEditable.call(this, bEditable);
    	this.oToolBar.setVisible(bEditable);
    	return rt;    	
    }
    theClass.prototype.onAdd = function(evt) {
    	//var dataTable = this.getDataTable();
    	var grid = evt.getSource().getParent().getParent();
		var rowid = grid.getSelectedIndices();
		var model = grid.getModel();
		var path = grid.getBindingPath("rows");
		var data = model.getProperty(path);
		if(!data) {
			model.setProperty(path, []);
		}
		data = model.getProperty(path);
		if (rowid.length==0) {
			data.push({});
		} else if(rowid.length==1) {
			var row =rowid[0];			
			data.splice(row,0,{});
		} else {
			MessageToast.show("more than one line selected");
		}
        model.refresh(true);   	
    }    
    theClass.prototype.onDelete = function(evt) {
		var grid = evt.getSource().getParent().getParent();
		var rowid = grid.getSelectedIndices();
		var model = grid.getModel();
		var path = grid.getBindingPath("rows");
		var data = model.getProperty(path);
		var count = 0;
        for(let row of rowid) {
			var removed = data.splice(row-count, 1);
			count++;
        }
        model.refresh(true);
        grid.clearSelection();
    }     
	return theClass;
});
