(function () {
    define(['Subclass', 'BaseController', 'LevelSelectModel', 'LevelSelectView', 'Events', 'Dispatch', 'Easel'], function (Subclass, BaseController, LevelSelectModel, LevelSelectView, Events, Dispatch) {
        'use strict';
        
        var update, 
            subClass = new Subclass(), 
            evts = new Events(), 
            lsm = new LevelSelectModel(), 
            lsv = LevelSelectView, 
            dsp,
            position = {},
            target = {};
			
		//var canvas = document.createElement('canvas');
        //var stage = new createjs.Stage(canvas); 
		
        function LevelSelectController () {
            this.retracted = false;
            BaseController.call(this);
        }
        
        //Extend the BaseController with LevelSelectController
        subClass.extend(LevelSelectController, BaseController);
        
        LevelSelectController.prototype.init = function (data) {
            //Listenes for 'levelSelect' event to call the create the level select
            evts.addEvent(window, ['levelSelect'], function (e) {
                this.showLevelSelect(data);
            }.bind(LevelSelectController.prototype));  
            
        };
        
        LevelSelectController.prototype.showLevelSelect = function (data) {
            //Receives data from the initial app.init() call in app.js
            var ls;
            this.retracted = false;
            this.updateModel(data, lsv.on.show(lsm.setData(data)));
                        
            ls = document.getElementById('level-select'), position, target;
            ls.style.left = ls.parentNode.offsetWidth+'px';
            position = {left: ls.parentNode.offsetWidth, top: 0};
            target = {left: 0, top: 0};
                        
            this.animate(ls, position, target, createjs.Ease.cubicOut, 1500);//Defined in BaseController
            this.addInteraction();
        };
        
        LevelSelectController.prototype.addInteraction = function () {
            evts.addEvent('level-select', ['mousedown'], this.fireEvents);
            evts.addEvent(window, ['retract'], this.retract);
        };
        
        LevelSelectController.prototype.fireEvents = function (e) {
            //Delegate events
            var targ = window.addEventListener ? e.target : e.srcElement, 
            isSelectBtn = (targ.id.indexOf('select-btn') !== -1);
            
            console.log('Target: ', typeof targ.id, (targ.id.indexOf('select-btn') !== -1));
            switch (targ.id) {
                case 'selector':
                //Expand Level Select to view the available levels
                switch (targ.childNodes[0].nodeType) {
                    case 1: console.log('HELLO', this); break;
                }
                break;
            }
            //Dispatch event to open the Level Select Modal
            switch (isSelectBtn) {
                case true:
                dsp = new Dispatch();
                dsp.customEvent(targ.id, 'displayModal');
                dsp.customEvent(targ.id, 'setLevel');
                dsp = null;
                break;
            }
        }.bind(LevelSelectController.prototype);
        
        LevelSelectController.prototype.retract = function (e) {
            var ls = document.getElementById('level-select'), position, target;
            
            position = {left: 0, top: 0};
            target = {left: ls.parentNode.offsetWidth, top: 0};
            
            this.animate(ls, position, target, createjs.Ease.cubicIn, 1000);
            this.retracted = true;
        }.bind(LevelSelectController.prototype);
        
        LevelSelectController.prototype.handleComplete = function () {
            var ls = document.getElementById('level-select');
            if (this.retracted) {
                ls.parentNode.removeChild(ls);
            }
        }.bind(LevelSelectController.prototype);
        
        return LevelSelectController;        
    });
}());