require.config({
    urlArgs: "bust=" +  (new Date()).getTime(),//Remove before deployment
	baseUrl: "scripts/",
	paths: {
		"Ajax": "modules/Ajax",
		"BaseController": "controllers/BaseController",
		"BaseModel": "models/BaseModel",
		"BaseView": "views/BaseView",
		"CreateNode": "modules/CreateNode",
		"Events": "modules/Events",
		"jquery": "lib/jquery.min",
		"LevelSelect": "modules/LevelSelect",
		"LevelSelectView": "views/LevelSelectView",
		"LevelSelectController": "controllers/LevelSelectController",
		"LevelSelectModel": "models/LevelSelectModel",
		"Subclass": "modules/Subclass"
	},
	//waitSeconds: 15
});

require(["app"], function (App) {
	App.init();
});