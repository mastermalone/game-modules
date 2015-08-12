(function () {
    define(['BaseController', 
    'Subclass', 
    'GameBoardView', 
    'GameBoardModel', 
    'Events', 
    'EventList'], 
    function (BaseController, Subclass, GameBoardView, GameBoardModel, Events, EventList) {
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
            EventList.subscribe('levelSelectLoaded', this.test);
        };
        
        GameBoardController.prototype.test = function (data) {
            console.log('GETTING THE LEVELSELECT EVENT', data);
            EventList.remove('levelSelectLoaded');
        };
        return GameBoardController;
    });
}());
