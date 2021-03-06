require.config({
    urlArgs: 'bust=' +  (new Date()).getTime(),//Remove before deployment
	baseUrl: 'scripts/',
	paths: {
		'Ajax': 'modules/Ajax',
		'BaseController': 'controllers/BaseController',
		'BaseModel': 'models/BaseModel',
		'BaseView': 'views/BaseView',
		'CreateNode': 'modules/CreateNode',
		'CssTransitions': 'modules/CssTransitionEvents',
		'Dispatch': 'modules/Dispatch',
		'domReady': 'lib/domReady',
		'Events': 'modules/Events',
		'jquery': 'lib/jquery.min',
		'LevelSelect': 'modules/LevelSelect',
		'LevelSelectView': 'views/LevelSelectView',
		'LevelSelectController': 'controllers/LevelSelectController',
		'LevelSelectModel': 'models/LevelSelectModel',
		'ModalController': 'controllers/ModalController',
        'ModalModel': 'models/ModalModel',
        'ModalView': 'views/ModalView',
        'ModalViewModule': 'modules/ModalViewModule',
		'Subclass': 'modules/Subclass',
		'TrayController': 'controllers/TrayController',		
		'TrayModel': 'models/TrayModel',
		'TrayModule': 'ui-components/TrayModule',
		'TrayView': 'views/TrayView',
		'Tween': 'lib/tweenjs/tweenjs-0.6.0.min'
	},
	//waitSeconds: 15
});

require(['app'], function (App) {
	App.init();
});