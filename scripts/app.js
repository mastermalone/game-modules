define(["LevelSelectController", "LevelSelectModel"], function (LevelSelectController, LevelSelectModel) {
    "use strict";
	var App = {
		init: function () {
			//Kick off the views
			var lvc = new LevelSelectController();
			lvc.showContent();
			console.log("Initting the app");
		}
	};
	return App;
});
