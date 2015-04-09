define(["LevelSelectController", "LevelSelectModel"], function (LevelSelectController, LevelSelectModel) {
    "use strict";
	var App = {
		init: function (url) {
			//Kick off the views
			var lvc = new LevelSelectController("MIKE", "4/6/2015");
			lvc.showContent(url);
			console.log("Initting the app");
		}
	};
	return App;
});
