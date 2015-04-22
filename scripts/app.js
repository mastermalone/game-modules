define(["LevelSelectController", "ModalController"], function (LevelSelectController, ModalController) {
    "use strict";
	var App = {
		init: function (url) {
			//Kick off the views
			//Perhaps make the ajax call here so that I make only one call
			var lvc = new LevelSelectController("MIKE", "4/6/2015");
			var mc = new ModalController();
			lvc.showContent(url);
			console.log("Initting the app");
		}
	};
	return App;
});
