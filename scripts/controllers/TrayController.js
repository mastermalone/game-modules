(function () {
    define(['Subclass', 'BaseController', 'TrayModel', 'TrayView', 'Dispatch', 'Events'], function (Subclass, BaseController, TrayModel, TrayView, Dispatch, Events) {
        'use strict';
        var subclass = new Subclass(), tm = new TrayModel(), tv = TrayView, dsp = new Dispatch(), evts = new Events();
        
        function TrayController () {
            this.level = 1;
            BaseController.call(this);
        }
        
        subclass.extend(TrayController, BaseController);
        
        TrayController.prototype.init = function (data) {
            //This controller listens the level changes and controls the puzzle pieces
            tv.on.show(tm.setData(data));//Do the level select on.show() with an evt.addListener();  displatch event rom here with level select dispatch event
            evts.addEvent('tray', ['mousedown'], this.fireEvents);
            evts.addEvent(window, ['setLevel'], this.setLevel);
            evts.addEvent(window, ['levelChangeConfirmation'], this.confirmedLevelChange);
        };
        
        TrayController.prototype.fireEvents = function (e) {
            var targ = window.addEventListener ? e.target : e.srcElement;
            
            switch (targ.id) {
                case 'level-selector':
                dsp.customEvent('level-selector', 'levelSelect');
                break;
                case 'level-indicator':
                //Do stuff ..maybe
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
        
        return TrayController;
    });
}());


