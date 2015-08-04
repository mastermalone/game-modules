(function () {
    define(['Subclass', 'BaseController', 'LevelSelectModel', 'LevelSelectView', 'Events', 'Dispatch', 'EventList'], function (Subclass, BaseController, LevelSelectModel, LevelSelectView, Events, Dispatch, EventList) {
        'use strict';
        
        var subClass = new Subclass();
		
        function LevelSelectController () {
            this.retracted = true;
            this.evts = ''; 
            this.lsm = ''; 
            this.lsv = '';
            this.dsp;
            this.position = {};
            this.targetPosition = {};
            
            BaseController.call(this);
        }
        
        //Extend the BaseController with LevelSelectController
        subClass.extend(LevelSelectController, BaseController);
        
        LevelSelectController.prototype.init = function (data) {
            //Listenes for 'levelSelect' event to call the create the level select
            this.evts = new Events();
            this.evts.addEvent(window, ['levelSelect'], function (e) {
                this.showLevelSelect(data);
            }.bind(LevelSelectController.prototype));

            EventList.publish('levelSelectLoaded', {loaded:true});
            this.evts = null;
        };
        
        LevelSelectController.prototype.showLevelSelect = function (data) {
            alert('### showLevelSelect');
            //Receives data from the initial app.init() call in app.js
            var ls;
            this.retracted = false;
            this.lsv = LevelSelectView;
            this.lsv.on.show(data);
            this.lsm = new LevelSelectModel();
            this.lsm.getState('level Select Open');
            
            this.lsm.userStats.user = 'Mike';
            console.log('WHATS MY DATA?:', this.lsm.userStats);
                        
            ls = document.getElementById('level-select');
            ls.style.left = ls.parentNode.offsetWidth+'px';
            this.position = {left: ls.parentNode.offsetWidth, top: 0};
            this.targetPosition = {left: 0, top: 0};
                        
            this.animate(ls, this.position, this.targetPosition, createjs.Ease.cubicOut, 1500);//Defined in BaseController
            this.addInteraction();
            ls = null;
        };
        
        LevelSelectController.prototype.addInteraction = function () {
            this.evts = new Events();
            //this.evts.addEvent('level-select', ['mousedown'], this.fireEvents);
            document.getElementById('level-select').addEventListener('mousedown', this.fireEvents);
            this.evts.addEvent(window, ['retract'], this.retract);
        };
        
        LevelSelectController.prototype.fireEvents = function (e) {
            //Delegate events
            var targ = window.addEventListener ? e.target : e.srcElement, 
                isSelectBtn = (targ.id.indexOf('select-btn') !== -1);
            
            console.log('Target: ', typeof targ.id, (targ.id.indexOf('select-btn') !== -1));
            switch (targ.id) {
                case 'selector':
                this.retract();
                break;
            }
            //Dispatch event to open the Level Select Modal
            switch (isSelectBtn) {
                case true:
                this.dsp = new Dispatch();
                //this.dsp.customEvent(targ.id, 'displayModal');
                    this.dsp.customEvent(targ.id, 'displayModal', {
                        lvlNum: targ.id.substring(10, parseInt(e.target.id.length))
                    });
                this.dsp.customEvent(targ.id, 'setLevel');
                this.dsp = null;
                break;
            }
        }.bind(LevelSelectController.prototype);
        
        LevelSelectController.prototype.retract = function (e) {
            var ls = document.getElementById('level-select');
            
            this.position = {left: 0, top: 0};
            this.targetPosition = {left: ls.parentNode.offsetWidth, top: 0};
            this.animate(ls, this.position, this.targetPosition, createjs.Ease.cubicIn, 1000);
            this.retracted = true;
            ls = null;
        }.bind(LevelSelectController.prototype);
        
        LevelSelectController.prototype.handleComplete = function () {
            var ls = document.getElementById('level-select');
            if (this.retracted) {
                this.lsm.getState('playing');
                this.evts.removeEvent('level-select', ['mousedown'], this.fireEvents);
                this.evts.removeEvent(window, ['retract'], this.retract);
                this.evts = null;
                this.lsm = null; 
                this.lsv = null;
                this.dsp = null;
                this.position = null;
                this.targetPosition = null;
                
                ls.parentNode.removeChild(ls);
                
            }
            ls = null;
        }.bind(LevelSelectController.prototype);
        
        
        return LevelSelectController;        
    });
}());