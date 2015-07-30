(function () {
    define(['BaseController', 'Subclass', 'GameBoardView', 'GameBoardModel', 'Events'], function (BaseController, Subclass, GameBoardView, GameBoardModel, Events) {
        'use strict';
        var subclass = new Subclass();
        
        function GameBoardController () {
            this.evts = new Events(),
            this.gbv = GameBoardView,
            this.gbm = new GameBoardModel();
            
            BaseController.call(this);
        }
        
        subclass.extend(GameBoardController, BaseController);
        
        GameBoardController.prototype.init = function (data) {
            this.showGameBoard(data);
            this.evts.addEvent(window, ['levelchange'], function () {
                this.destroy('#image-view');
                this.showGameBoard(data);
            }.bind(this));
        };
        
        GameBoardController.prototype.showGameBoard = function (data) {
            this.gbv.on.show(data);
        };
        
        return GameBoardController;
    });
}());
