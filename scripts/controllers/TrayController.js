(function () {
    define(['Subclass', 'BaseController', 'TrayModel', 'TrayView', 'jquery-ui', 'Emitter'],
        function (Subclass, BaseController, TrayModel, TrayView, jqueryUi, emitter) {
        'use strict';
        var subclass = new Subclass();
        var TrayData = {};
        
        function TrayController () {
            this.level = 1;
            this.view = '';
            this.model = '';
            this.apiData = '';
            
            BaseController.call(this);
        }

        subclass.extend(TrayController, BaseController);
        
        TrayController.prototype.init = function (data) {
            this.view = TrayView;
            TrayData.json = data;
            
            console.log("TRAYS DATA", this.data);
            //This controller listens the level changes and controls the puzzle pieces
            this.view.on.show(data);//Do the level select on.show() with an evt.addListener();  displatch event from here with level select dispatch event
            this.view.setLevel(data, this.level);
            document.getElementById('tray').addEventListener('mousedown', this.fireEvents);
            emitter.on('setLevel', this.setLevel);
            emitter.on('levelChangeConfirmation', this.confirmedLevelChange);
            this.view = null;
        };
        TrayController.prototype.getData = function (data) {
            return data;
        },
        TrayController.prototype.fireEvents = function (e) {
            var targ = window.addEventListener ? e.target : e.srcElement;
            
            switch (targ.getAttribute('data')) {
                case 'lv-sel':
                    emitter.emit('levelSelect');
                    break;
                case 'jigsaw-piece':
                    this.addContentToStage(targ, e);
                    break;
            }
        }.bind(TrayController.prototype);
        
        TrayController.prototype.setLevel = function (levelData) {
             //This gets set all the time, but will only be used when a level change is confirmed.
             this.level = levelData.lvlNum;
            console.log('SET LEVEL');
        }.bind(TrayController.prototype);
        
        TrayController.prototype.confirmedLevelChange = function (levelChangeData) {
            //This is called only when an event to change the level number occurs
            var lInd = document.getElementById('level-indicator');
            lInd.innerHTML = this.level;
            this.level >= 10 ? lInd.className = 'tens' : lInd.className = '';
            
            this.model = new TrayModel();
            this.model.userStats.level = levelChangeData.level;
            this.view = TrayView;

            this.destroy('.scroller-content', true);
            $('.jigsaw-piece').remove();
            
            emitter.emit('levelchange');
            this.model = null;
            
        }.bind(TrayController.prototype);
        
        TrayController.prototype.addContentToStage = function (piece, e) {
            //Takes the piece from the tray
            if (!piece) {
                return;
            }else {
                $('#tray').parent().append(piece);
                var offset = $('#main').offset();
                $(piece).css({
                    left: (e.pageX - offset.left) - ($(piece).width()/2),
                    top: (e.pageY - offset.top) - ($(piece).height()/2)
                });
            }
        };
        
        return TrayController;
    });
}());


