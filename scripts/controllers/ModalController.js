(function () {
    define(['BaseController', 'Subclass', 'Ajax', 'ModalModel', 'ModalView', 'Tween', 'TweenCSS', 'Emitter'], function (BaseController, SubClass, Ajax, ModalModel, ModalView, Tween, TweenCSS, emitter) {
        'use strict';
        var subclass = new SubClass;
        
        function ModalController () {
           this.targ = '';
           this.modal = '';
           this.lvlNum = '';
           this.transitionEnd = '';
           this.mv = '';
           this.fadeFrom = '';
           this.fadeTo = '';
           this.modalIsHidden = '';
           
           BaseController.call(this);
        }
        
        subclass.extend(ModalController, BaseController);
        
        ModalController.prototype.init = function (data) {
            emitter.on('displayModal', function(levelData) {
                this.lvlNum = levelData.lvlNum;
                this.showModal(data, this.lvlNum);
            }.bind(this));

            emitter.on('modalLoaded', this.addInteraction.bind(ModalController.prototype));
        };
        
        ModalController.prototype.showModal = function (data, lvl) {
            this.mv = ModalView;
            this.mv.on.show(data, lvl);
            this.modal = document.querySelector('#lvs-modalBG');
            this.fadeFrom = {opacity: 0};
            this.fadeTo = {opacity:1};
            this.animate(this.modal, this.fadeFrom, this.fadeTo, createjs.Ease.cubicIn, 500);
            this.modalIsHidden = false;
            this.mv = null;
        }.bind(ModalController.prototype);
        
        ModalController.prototype.addInteraction = function (modalData) {
            //Add event to the modal DOM Element;
            this.modal = modalData.modalId;

            var modal = document.getElementById(this.modal);
            modal.addEventListener('mousedown', this.fireEvents);
        };
        
        ModalController.prototype.fireEvents = function (e) {
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
        }.bind(ModalController.prototype);
        
        ModalController.prototype.hideModal = function () {
            this.modal = document.querySelector('#lvs-modalBG');
            this.fadeFrom = {opacity: 1};
            this.fadeTo = {opacity:0};
            this.modalIsHidden = true;
            this.animate(this.modal, this.fadeFrom, this.fadeTo, createjs.Ease.cubicIn, 500);
        }.bind(ModalController.prototype);
        
        ModalController.prototype.changeLevel = function () {
            //Send the level number via the dispacthed event data object for any subscriber.
            emitter.emit('levelChangeConfirmation', { level: this.lvlNum });
        },
        ModalController.prototype.handleComplete = function (e) {
            //Removes modal from DOM and cleans up objects
            var targ = window.addEventListener ? e.target : e.srcElement;
            if (this.modalIsHidden) {
                emitter.emit('retract');
                this.transitionEnd = null;
                this.destroy('#'+targ.id);
                targ = null;
            }
        }.bind(ModalController.prototype);
        
        return ModalController;
    });
}());
