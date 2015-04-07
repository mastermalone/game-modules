define(["LevelSelectController", "LevelSelectModel"], function (LevelSelectController, LevelSelectModel) {
    "use strict";
	var App = {
		init: function () {
			//Kick off the views
			var lvc = new LevelSelectController("MIKE", "4/6/2015");
			lvc.showContent();
			console.log("Initting the app");
		}
	};
	return App;
});
