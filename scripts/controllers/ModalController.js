(function () {
    define(['BaseController', 'Subclass', 'Ajax', 'ModalModel', 'ModalView', 'Events', 'Dispatch', 'Tween', 'TweenCSS'], function (BaseController, SubClass, Ajax, ModalModel, ModalView, Events, Dispatch) {
        'use strict';
        var subclass = new SubClass;
        
        function ModalContoller () {
           this.targ = '';
           this.modal = '';
           this.lvlNum = '';
           this.evts = '';
           this.dsp = '';
           this.transitionEnd = '';
           this.mv = '';
           this.fadeFrom = '';
           this.fadeTo = '';
           this.modalIsHidden = '';
           
           BaseController.call(this);
        }
        
        subclass.extend(ModalContoller, BaseController);
        
        ModalContoller.prototype.init = function (data) {
            this.evts = new Events();
            
            this.evts.addEvent(window, ['displayModal'], function (e) {                
                //this.lvlNum = e.target.id.substring(10, parseInt(e.target.id.length));
                this.lvlNum = e.data.lvlNum;
                this.showModal(data, this.lvlNum);
            }.bind(ModalContoller.prototype));
            
            //this.evts.addEvent(window, ['modalLoaded'], this.addInteraction.bind(ModalContoller.prototype));
            this.evts = null;
        };
        
        ModalContoller.prototype.showModal = function (data, lvl) {
            this.mv = ModalView;
            this.mv.on.show(data, lvl);
            this.modal = document.querySelector('#lvs-modalBG');
            this.fadeFrom = {opacity: 0};
            this.fadeTo = {opacity:1};
            this.animate(this.modal, this.fadeFrom, this.fadeTo, createjs.Ease.cubicIn, 500);
            this.modalIsHidden = false;
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
            this.modal = document.querySelector('#lvs-modalBG');
            this.fadeFrom = {opacity: 1};
            this.fadeTo = {opacity:0};
            this.modalIsHidden = true;
            this.animate(this.modal, this.fadeFrom, this.fadeTo, createjs.Ease.cubicIn, 500);
        }.bind(ModalContoller.prototype);
        
        ModalContoller.prototype.changeLevel = function () {
            //Send the level number via the dispacthed event data object for any subscriber.
            this.dsp = new Dispatch();
            this.dsp.customEvent(this.targ.id, 'levelChangeConfirmation', {level:this.lvlNum});
            this.dsp = null;
        },
        ModalContoller.prototype.handleComplete = function (e) {
            //Removes modal from DOM and cleans up objects
            var targ = window.addEventListener ? e.target : e.srcElement;
            if (this.modalIsHidden) {
                this.dsp = new Dispatch();
                this.dsp.customEvent(targ.id, 'retract');
                this.dsp = null;
                this.transitionEnd = null;
                this.evts = null;
                this.destroy('#'+targ.id);
                targ = null;
            }
        }.bind(ModalContoller.prototype);
        
        return ModalContoller;
    });
}());
