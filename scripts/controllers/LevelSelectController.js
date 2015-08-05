(function () {
    define(['Subclass', 'BaseController', 'LevelSelectModel', 'LevelSelectView', 'Emitter'], function (Subclass, BaseController, LevelSelectModel, LevelSelectView, emitter) {
        'use strict';
        
        var subClass = new Subclass();
		
        function LevelSelectController () {
            this.retracted = true;
            this.lsm = '';
            this.lsv = '';
            this.position = {};
            this.targetPosition = {};
            
            BaseController.call(this);
        }
        
        //Extend the BaseController with LevelSelectController
        subClass.extend(LevelSelectController, BaseController);
        
        LevelSelectController.prototype.init = function (data) {
            //Listens for 'levelSelect' event to call the create the level select
            emitter.on('levelSelect', function() {
                this.showLevelSelect(data);
            }.bind(LevelSelectController.prototype));
        };
        
        LevelSelectController.prototype.showLevelSelect = function (data) {
            //Receives data from the initial app.init() call in app.js
            var ls;
            this.retracted = false;
            this.lsv = LevelSelectView;
            this.lsv.on.show(data);
            this.lsm = new LevelSelectModel();
            console.log('### lsm inside showLevelSelect:', this.lsm);
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
            var levelSelectPanel = document.getElementById('level-select');
            levelSelectPanel.addEventListener('mousedown', this.fireEvents, true);

            emitter.on('retract', this.retract);
        };
        
        LevelSelectController.prototype.fireEvents = function (e) {
            //Delegate events
            var targ = window.addEventListener ? e.target : e.srcElement, 
                isSelectBtn = (targ.id.indexOf('select-btn') !== -1);

            var levelNumber;
            
            console.log('Target: ', typeof targ.id, (targ.id.indexOf('select-btn') !== -1));
            switch (targ.id) {
                case 'selector':
                this.retract();
                break;
            }

            if (isSelectBtn) {
                levelNumber = targ.id.substring(10, parseInt(e.target.id.length));

                emitter.emit('displayModal', { lvlNum: levelNumber });
                emitter.emit('setLevel', { lvlNum: levelNumber });
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
            console.log('### lsm inside handleComplete:', this.lsm);
            if (this.retracted) {
                console.log('### lsm inside handleComplete retracted', this.lsm);
                this.lsm.getState('playing');
                document.getElementById('level-select').removeEventListener('mousedown');
                emitter.off('retract', this.retract);
                this.evts = null;
                this.lsm = null; 
                this.lsv = null;
                this.position = null;
                this.targetPosition = null;
                
                ls.parentNode.removeChild(ls);
                
            }
            ls = null;
        }.bind(LevelSelectController.prototype);
        
        
        return LevelSelectController;        
    });
}());