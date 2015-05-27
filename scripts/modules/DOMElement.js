(function () {
    define(function () {
        "use strict";
        
        function DOMElement (type, attrs, attrVal, parent, text) {
            this.defaultID = "element";
            this.type = type;
            this.attrs = attrs;
            this.attrVal = attrVal;
            this.parent = parent;
            this.text = text;
            this.makeElement(this.type, this.attrs, this.attrVal, parent, text);
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
                                console.log(this.type.hasOwnProperty());
                                
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
                                if (typeof this.type.className[i] !==  "object") {
                                    el.setAttribute("class", this.type.className[i]);
                                }else {
                                    //el.setAttribute("class", +this.defaultID+i+"child-"+i);
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
                                    
                                if (document.getElementById(this.type.id[i-1])) {
                                    //Append each preceeding element this element as it's child
                                    document.getElementById(this.type.id[i-1]).appendChild(el);
                                }
                            }else {
                                //Append the first element to the DOM
                                var parent = document.getElementById(this.type.parent);
                                this.type.parent ?  parent.appendChild(el) : document.body.appendChild(el);
                            }
                        }
                    
                        el = null;
                    }
                }else {
                    //Single DOM element creation
                    el = document.createElement(this.type);
                    
                    el.setAttribute(this.attrs, this.attrVal);
                                        
                    var prnt = (typeof this.parent === "string") ? document.getElementById(this.parent) : this.parent;
                    
                    //Add text node if the text parameter contains a string
                    if (this.text && typeof this.text === "string") {
                        var txt = document.createTextNode(this.text);
                        el.appendChild(txt);
                    }
                    
                    prnt.appendChild(el);
                    el = null;
                }                 
            }
        };
        
        return DOMElement;
    });
}());
