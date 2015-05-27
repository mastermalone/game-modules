(function () {
    define(['BaseController', 'Subclass', 'GameBoardView', 'GameBoardModel', 'Events'], function (BaseController, Subclass, GameBoardView, GameBoardModel, Events) {
        'use strict';
        var subclass = new Subclass(),
        evts = new Events(),
        gbv = GameBoardView,
        gbm = new GameBoardModel();
        
        function GameBoardController () {
            BaseController.call(this);
        }
        
        subclass.extend(GameBoardController, BaseController);
        
        GameBoardController.prototype.init = function (data) {
            console.log('Loading up GameBoard Controller', this);
            this.showGameBoard(data);
        };
        
        GameBoardController.prototype.showGameBoard = function (data) {
            console.log('Showing the gameboard', data);
            this.updateModel(data, gbv.on.show(gbm.setData(data)));
        };
        return GameBoardController;
    });
}());
