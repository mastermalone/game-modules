(function () {
    define(function () {
        "use strict";
        
        function DOMElement (type, attrs, attrVal, parent) {
            this.defaultID = "element";
            this.type = type;
            this.attrs = attrs;
            this.attrVal = attrVal;
            this.parent = parent;
            this.makeElement(this.type, this.attrs, this.attrVal, parent);
        }
        
        DOMElement.prototype = {
            constructor: DOMElement,
            hasPropery: function (obj, value) {
                  return obj.hasOwnProperty(value);
            },
            makeElement: function () {
                var i, el, text, frag = document.createDocumentFragment();
                //Solution for custom parent/child DOMElements
                if (typeof this.type === "object" && this.type.id) {
                    if (document.getElementById(this.type.id[0])) {
                        //console.log("TYPE:", typeof this.type.type, "THE MODAL:", document.getElementById(this.type.id[0]));
                        return; 
                    }else {
                        //Create the DOM elements                        
                        for (i = 0; i < this.type.type.length; i++) {
                            el = document.createElement(this.type.type[i]);
                            
                           //Set options if they have been seet during invocation
                            if (this.type.id) {
                                if (typeof this.type.id[i] !==  "undefined") {
                                    el.setAttribute("id", this.type.id[i]);
                                }else {
                                    el.id = !el.parentNode ? "window-"+this.defaultID+i : "child-"+i;
                                }
                            }
                            if (this.type.dataAttr) {
                                if (typeof this.type.dataAttr[i] !==  "undefined") {
                                    el.setAttribute("data", this.type.dataAttr[i]);
                                }else {
                                    el.setAttribute("data", +this.defaultID+i+"child-"+i);
                                }
                            }
                            if (this.type.className) {
                                if (typeof this.type.className[i] !==  "undefined") {
                                    el.setAttribute("class", this.type.className[i]);
                                }else {
                                    el.setAttribute("class", +this.defaultID+i+"child-"+i);
                                }
                            }
                            if (this.type.text) {
                                if (typeof this.type.text[i] !==  "object") {
                                    text = document.createTextNode(this.type.text[i]);
                                    el.appendChild(text);
                                }
                            }
                            if (this.type.nested && i > 0) {
                                //If nested is set, create parent child nesting of created DOM elements
                                console.log("DATA ATTRIBUTE", el.getAttribute("data-id"), this.type.nested);
                                    
                                if (document.getElementById(this.type.id[i-1])) {
                                    //Append each preceeding element this element as it's child
                                    document.getElementById(this.type.id[i-1]).appendChild(el);
                                }
                            }else {
                                //Append the first element to the DOM
                                var parent = document.getElementById(this.type.parent);
                                //console.log("PARENT:", parent);
                                this.type.parent ?  parent.appendChild(el) : document.body.appendChild(el);
                            }
                        }
                    
                        el = null;
                    }
                }else {
                    //Single DOM element creation
                    el = document.createElement(this.type);
                    el.setAttribute(this.attrs, this.attrVal);
                    if(this.parent && typeof this.parent === "string") {
                        if(this.parent) {
                            var prnt = document.getElementById(this.parent);
                            prnt.appendChild(el);
                        }else {
                            throw new Error("The parent you specififed does not exist");
                            return;
                        }
                        
                    }else {
                        return el; //Use without parent option for adding multiple elements to dom via a document fragmen
                    }
                    
                }    
            }
        };
        
        return DOMElement;
    });
}());
