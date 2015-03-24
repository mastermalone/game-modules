require.config({
	baseUrl: "./scripts/",
	paths: {
		"Ajax": "modules/Ajax",
		"LevelSelect": "modules/LevelSelect",
		"LevelSelectView": "views/LevelSelectView",
	}
});

require(["app"], function (App) {
	App.init();
});