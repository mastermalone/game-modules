(function () {
    define(function () {
        "use strict";
        
        function DOMElement (type, attrs, attrVal) {
            this.defaultID = "element";
            this.type = type;
            this.attrs = attrs;
            this.attrVal = attrVal;
            this.makeElement(this.type, this.attrs, this.attrVal);
        }
        
        DOMElement.prototype = {
            constructor: DOMElement,
            hasPropery: function (obj, value) {
                  return obj.hasOwnProperty(value);
            },
            makeElement: function () {
                var i, el, frag = document.createDocumentFragment();
                //Solution for custom parent/child DOMElements
                //console.log("HAS OWN PROP", this.hasPropery(this.type, "knife"));
                if (typeof this.type === "object" && this.type.id) {
                    if (document.getElementById(this.type.id[0])) {
                        //console.log("TYPE:", typeof this.type.type, "THE MODAL:", document.getElementById(this.type.id[0]));
                        return; 
                    }else {
                        //Create the DOM elements                        
                        for (i = 0; i < this.type.type.length; i++) {
                            el = document.createElement(this.type.type[i]);
                            
                            //Set the id if it is passed in via the options object (type is an object with options)
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
                            if (this.type.makeHeiarachy && i > 0) {
                                console.log("DATA ATTRIBUTE", el.getAttribute("data-id"), this.type.makeHeiarachy);
                                    
                                if (document.getElementById(this.type.id[i-1])) {
                                    //Append each preceeding element this element as it's child
                                    document.getElementById(this.type.id[i-1]).appendChild(el);
                                }
                            }else {
                                //Append the first element to the DOM
                                var parent = document.getElementById(parent);
                                console.log("PARENT:", parent);
                                //this.type.parent ?  parent.appendChild(el) : document.body.appendChild(el);
                                document.body.appendChild(el);
                            }
                            //console.log("TYPEOF ID", this.type.id[i]);
                        }
                    
                        el = null;
                    }
                }else {
                    console.log("THE TYPE WAS NOT AN OBJECT", this.type);
                    el = document.createElement(this.type);
                    
                    return el;
                }    
            }
        };
        
        return DOMElement;
    });
}());
