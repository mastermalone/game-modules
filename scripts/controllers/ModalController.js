(function () {
    define(['BaseController', 'Subclass', 'Ajax', 'ModalModel', 'ModalView', 'Events', 'CssTransitions', 'Dispatch', 'Tween', 'TweenCSS'], function (BaseController, SubClass, Ajax, ModalModel, ModalView, Events, CssTransitions, Dispatch) {
        'use strict';
        var subclass = new SubClass;
        
        function ModalContoller () {
           var privateUpdate = function (url) {
               var ajax = new Ajax();
               ajax.getData(url, function (data) {
                   console.log('Getting Data now', data);
               });
           };
           
           this.targ = '';
           this.modal = '';
           this.lvlNum = '';
           this.evts = '';
           this.dsp = '';
           this.transitionEnd = '';
           this.mv = '';
           this.mm = new ModalModel();
           
           BaseController.call(this);
        }
        
        subclass.extend(ModalContoller, BaseController);
        
        ModalContoller.prototype.init = function (data) {
            this.evts = new Events();
            this.evts.addEvent(window, ['displayModal'], function (e) {                
                this.lvlNum = e.target.id.substring(10, parseInt(e.target.id.length));
                this.showModal(data, this.lvlNum);
            }.bind(ModalContoller.prototype));
            
            this.evts.addEvent(window, ['modalLoaded'], this.addInteraction.bind(ModalContoller.prototype));
            this.evts = null;
        };
        
        ModalContoller.prototype.showModal = function (data, lvl) {
            this.mv = ModalView;
            this.mv.on.show(data, lvl);
            this.mv = null;
        }.bind(ModalContoller.prototype);
        
        ModalContoller.prototype.addInteraction = function (e) {
            //Add event to the modal DOM Element;
            this.modal = e.target.id;
            this.evts = new Events();
            this.evts.addEvent(this.modal, ['mousedown'], this.fireEvents);
            this.evts = null;
        };
        
        ModalContoller.prototype.fireEvents = function (e) {
            this.targ = window.addEventListener ? e.target : e.srcElement;
            switch (this.targ.id) {
                case 'cancel':
                this.hideModal();
                break;
                case 'confirm':
                this.changeLevel();
                this.hideModal();
                break;
            }
           
        }.bind(ModalContoller.prototype);
        
        ModalContoller.prototype.hideModal = function () {
            this.transitionEnd = CssTransitions.transitionEnd();
            document.getElementById(this.modal).className = 'fade-out';
            this.evts = new Events();
            this.evts.addEvent(this.modal, [this.transitionEnd], this.transitionFinished);
        };
        
        ModalContoller.prototype.transitionFinished = function (e) {
            //Removes modal from DOM and cleans up objects
            var targ = window.addEventListener ? e.target : e.srcElement;
            this.evts.removeEvent(this.modal, [this.transitionEnd], this.transitionFinished);
            this.dsp = new Dispatch();
            this.dsp.customEvent(targ.id, 'retract');
            this.dsp = null;
            this.transitionEnd = null;
            this.evts = null;
            this.destroy(targ.id);
        }.bind(ModalContoller.prototype);
        
        ModalContoller.prototype.changeLevel = function () {
            //Use this.lvlNum to send the number of the level to the API or whatever means to change the current level
            this.dsp = new Dispatch();
            this.dsp.customEvent(this.targ.id, 'levelChangeConfirmation');
            this.dsp = null;
        };
        
        return ModalContoller;
    });
}());
