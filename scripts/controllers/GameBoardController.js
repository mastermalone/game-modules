(function () {
    define(['BaseController', 'Subclass', 'GameBoardView', 'GameBoardModel', 'Emitter'], function (BaseController, Subclass, GameBoardView, GameBoardModel, emitter) {
        'use strict';
        var subclass = new Subclass();
        
        function GameBoardController () {
            this.gbv = GameBoardView,
            this.gbm = new GameBoardModel();
            
            BaseController.call(this);
        }
        
        subclass.extend(GameBoardController, BaseController);
        
        GameBoardController.prototype.init = function (data) {
            this.showGameBoard(data);

            emitter.on('levelchange', function() {
                this.destroy('#image-view');
                this.showGameBoard(data);
            }.bind(this));
        };
        
        GameBoardController.prototype.showGameBoard = function (data) {
            this.gbv.on.show(data);
        };
        
        GameBoardController.prototype.test = function (data) {
            console.log('GETTING THE LEVELSELECT EVENT', data);
        };
        return GameBoardController;
    });
}());
