sap.ui.define([
    "sap/ui/thirdparty/jquery",
    'sap/m/MessageBox',
], function (jquery, MessageBox) {
	"use strict";
	var theClass = {}
	
	theClass.ajax=function(params)  {
		params.contentType ='application/json';
		return jQuery.ajax(params);		
	}

	//MessageBox.error("Select a team in the \"Development\" area.\n\"Marketing\" isn't assigned to this area.");
	
    theClass.syncAjax=function(params)  {
        var rt;
        params.contentType ='application/json';
        params.async=false;
        params.success = function(data) {
            rt = data;
        }
        jQuery.ajax(params)
        .fail(function( jqXHR, textStatus, errorThrown ) {
        	MessageBox.error(`${errorThrown} (Status: ${jqXHR.status})`);
        });
        return rt;
    }

    theClass.listView=function(table)  {
        return this.syncAjax({url:`/api/list/?table=${table}`});
    }

	theClass.init = function (table) {
		var rt;
		this.ajax({ url: `/api/${table}/init`,
					async: false,
					success : function(data) {
						rt = data;
					}
				});
		return rt;
	}
	theClass.init = function (table) {
		var rt;
		this.ajax({ url: `/api/${table}/init`,
					async: false,
					success : function(data) {
						rt = data;
					}
				});
		return rt;
	}	
	theClass.create = function (table, data) {
		 var json = JSON.stringify(data);
        jQuery.ajax({
            url: `/api/${table}/`,
            async: false,
            method : 'post',
            contentType :'application/json',
            data : json,
            success : function(data) {
            }
        });
	}
	theClass.update = function (table, id, data) {
	    var json = JSON.stringify(data)
        jQuery.ajax({
            url: `/api/${table}/${id}`,
            async: false,
            method : 'put',
            contentType :'application/json',
            data : json,
            success : function(data) {

            }
        });
	}
	theClass.delete = function (table, id) {
        jQuery.ajax({
            url: `/api/${table}/${id}`,
            async: false,
            method : 'delete',
            success : function(data) {

            }
        });
	}
	theClass.getNext = function (table, id, fuSuccess, fnNoMore) {
        jQuery.ajax({
            url: `/api/${table}/${id}/.next`,
            async: false,
            method : 'get',
			statusCode: {
            	204: fnNoMore
			},
            success : function(data) {
            	if(data!==undefined) {
            		fuSuccess(data);
            	}
            }
        });
	}
	theClass.change = function (data, table, column, row) {
	    var json = JSON.stringify(data)
	    var params = jQuery.param({table:table,column:column,row:row});
	    var rt;
        jQuery.ajax({
            url: `/api/${table}/change?${params}`,
            async: false,
            method : 'post',
            contentType :'application/json',
            data : json,
            success : function(data) {
            	rt = data;
            }
        });
        return rt;
	}	
	theClass.getPrev = function (table, id, fuSuccess, fnNoMore) {
        jQuery.ajax({
            url: `/api/${table}/${id}/.prev`,
            async: false,
            method : 'get',
			statusCode: {
            	204: fnNoMore
			},
            success : function(data) {
            	if(data!==undefined) {
            		fuSuccess(data);
            	}
            }
        });
	}	
	theClass.batchDescList = [];
    theClass.getDescription=function(table, key, fnCallback) {
    	if (key===undefined || key===null) {
    		fnCallback("");
    		return;
    	}
    	var data = {table:table, id:key, fn:fnCallback}
    	this.batchDescList.push(data);
    }	
    theClass.finishBatchDesc=function() {
    	if (this.batchDescList.length==0) {
    		return;
    	}
    	var body = {};
    	for(let node of this.batchDescList) {
    		if(body[node.table] === undefined){
    			body[node.table] = {};
    		}
    		body[node.table][node.id]=null;
    	}
    	var rt;
        jQuery.ajax({
            url: "/api/batch/desc",
            method:"post",
            contentType :'application/json',
            data : JSON.stringify(body),
            async: false,
            success : function(data) {
                rt = data;
            }
        });
    	for(let node of this.batchDescList) {
    		var desc = rt[node.table][node.id];
    		node.fn(desc);
    	}        
    	this.batchDescList=[];

    }
	return theClass;
});