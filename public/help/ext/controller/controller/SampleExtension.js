sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	'sap/ui/core/mvc/OverrideExecution'
	], function(ControllerExtension, OverrideExecution) {
  "use strict";
  return ControllerExtension.extend("c1.app.controller.SampleExtension", {
    metadata: {
        methods: {
            "onHook": {"public": true, "final": true},
			"onTest": { "public": true, "final": false, 
				overrideExecution: OverrideExecution.Instead}
        }
    },
    onTest: function() {
		alert('onTest');
	},
        
    onHook: function() {
		alert('onHook');
	},
    override: {
      onInit: function() {
      	alert('onInit');
      },
  	  
    }
  });
});