(function () {
	 define(["Ajax", "CreateNode"], function (Ajax, CreateNode) {
	     "use strict";
        console.log("Value of CREATENODE", CreateNode);
	 	function LevelSelect () {
	 		//Empty Constructor
	 	}
	 	
	 	LevelSelect.prototype = {
	 		constructor: LevelSelect,
	 		setParent: function (el) {
	 			if(!el){
	 				logger.error("LevelSelect Module: You did not pass in the ID of the target element");
	 				return;
	 			}
	 			this.el = el;
	 			var targetElm = document.getElementById(this.el);
	 			return targetElm;
	 		},
	 		animateLevels: function (Bool) {
	 			this.animate = Bool;
	 			if(!this.animate){
	 				logger.error("You did not set this to true");
	 				return;
	 			}
	 			console.log("Got passed the check for bool", this.animate);
	 		},
	 		render: function (data) {
	 			console.log("Rendiering the content", data);
	 			var i, levels = data, length = Object.keys(data).length, holder = new CreateNode(), frag = document.createDocumentFragment();
	 			holder.makeElement("DIV", "id", "level-select", "Level"); 
	 			for(i = 0; i < length; i++){
	 			    console.log("length of the object", levels['level'+(i+1)].image);
	 			    console.log("length of the object", levels['level'+(i+1)].completed);
	 			    
	 			}
	 			/*for(var level in levels){
	 			    console.log("LEVEL", levels['level'+(i+1)].image);
	 			    console.log("LEVEL", Object.keys(levels).length);
	 			}*/
	 			
	 		}
	 	};
	 	
	 	return LevelSelect;
	 });
})();
