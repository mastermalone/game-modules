(function () {
	 define(["Ajax"], function (Ajax) {
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
	 			this.animate = false;
	 			if(!Bool){
	 				logger.error("You did not set this to true");
	 				return;
	 			}
	 		},
	 		render: function () {
	 			console.log("Rendiering the content");
	 		}
	 	};
	 	
	 	return LevelSelect;
	 });
})();
