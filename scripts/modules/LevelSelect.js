(function () {
	 define(["CreateNode"], function (CreateNode) {
	     "use strict";

	 	function LevelSelect () {
	 		//Empty Constructor
	 	}
	 	
	 	LevelSelect.prototype = {
	 		constructor: LevelSelect,
	 		placeContent: function (el, content) {
	 			if(!el || el === ""){
	 				console.log("LevelSelect Module: You did not pass in the ID of the target element");
	 				return;
	 			}
	 			this.el = el;
	 			var targetElm = document.getElementById(this.el);
	 			targetElm.appendChild(content);
	 			//return targetElm;
	 		},
	 		animateLevels: function (Bool) {
	 			this.animate = Bool;
	 			if(!this.animate){
	 				console.log("You did not set this to true");
	 				return;
	 			}
	 			console.log("Got passed the check for bool", this.animate);
	 		},
	 		render: function (data) {
	 			console.log("Rendiering the content", data);
	 			//Create elements for the level select view based on the data object returned
	 			var i, levels = data, length = Object.keys(data[Object.keys(data)]).length, holder = new CreateNode(), hld, selectBtn = new CreateNode(), sb, selector = new CreateNode(), slctr, frag = document.createDocumentFragment();
	 			
	 			console.log("VALUE OF FIRST CHILD", Object.keys(data[Object.keys(data)]).length);
	 			hld = holder.makeElement("DIV", "id", "level-select");
	 			slctr = selector.makeElement("SPAN", "id", "selector", "1", true);
	 			
	 			for(i = 0; i < length; i++){
	 			    //console.log("length of the object", levels["level"+(i+1)].image);
	 			    //console.log("length of the object", levels["level"+(i+1)].completed);
	 			    sb = selectBtn.makeElement("DIV", "id", "select-btn"+(i+1), (i+1+""));
	 			    frag.appendChild(sb);
	 			}
                frag.appendChild(slctr);
	 			hld.appendChild(frag);
	 			
	 			this.placeContent("main", hld);
	 			//return hld;
	 		}
	 	};
	 	
	 	return LevelSelect;
	 });
})();
