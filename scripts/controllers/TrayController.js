(function () {
    define(['Subclass', 'BaseController', 'TrayModel', 'TrayView', 'Dispatch', 'Events'], function (Subclass, BaseController, TrayModel, TrayView, Dispatch, Events) {
        'use strict';
        var subclass = new Subclass();
        
        function TrayController () {
            this.evts = '';
            this.dsp = '';
            this.level = 1;
            this.view = TrayView;
            this.model = new TrayModel();
            
            BaseController.call(this);
        }
        
        subclass.extend(TrayController, BaseController);
        
        TrayController.prototype.init = function (data) {
            this.evts = new Events();
            //This controller listens the level changes and controls the puzzle pieces
            this.view.on.show(this.model.setData(data));//Do the level select on.show() with an evt.addListener();  displatch event rom here with level select dispatch event
            this.evts.addEvent('tray', ['mousedown'], this.fireEvents);
            this.evts.addEvent(window, ['setLevel'], this.setLevel);
            this.evts.addEvent(window, ['levelChangeConfirmation'], this.confirmedLevelChange);
        };
        
        TrayController.prototype.fireEvents = function (e) {
            var targ = window.addEventListener ? e.target : e.srcElement;
            
            switch (targ.getAttribute('data')) {
                case 'lv-sel':
                this.dsp = new Dispatch();                
                this.dsp.customEvent('level-selector', 'levelSelect');
                this.dsp = null;
                break;
                case 'jigsaw-piece':
                console.log('mousing down on puzzle piece');
                break;
            }
        }.bind(TrayController.prototype);
        
        TrayController.prototype.setLevel = function (e) {
             //This gets set all the time, but will only be used when a level change is confirmed.
             this.level = e.target.id.substring(10, parseInt(e.target.id.length));
        }.bind(TrayController.prototype);
        
        TrayController.prototype.confirmedLevelChange = function () {
            //This is called only when an event to change the level number occurs
            var lInd = document.getElementById('level-indicator');
            lInd.innerHTML = this.level;
            this.level >= 10 ? lInd.className = 'tens' : lInd.className = '';
            
        }.bind(TrayController.prototype);
        
        TrayController.prototype.alignPieces = function (pieces) {
            if (this) {
                console.log('The container has child elements');
            }
        };
        
        return TrayController;
    });
}());


