(function () {
    define(function () {
        "use strict";
        
        function DOMElement (type, attrs, attrVal) {
            this.defaultID = "element";
            this.type = type;
            this.attrs = attrs;
            this.attrVal = attrVal;
            console.log("MAKING THE NEW ELEMENT");
            this.makeElement(this.type, this.attrs, this.attrVal);
        }
        
        DOMElement.prototype = {
            constructor: DOMElement,
            makeElement: function () {
                var i, el, frag = document.createDocumentFragment();
                //Solution for custom parent/child DOMElements
                
                if (typeof this.type === "object" && this.type.id) {
                    if (document.getElementById(this.type.id[0])) {
                        console.log("TYPE:", typeof this.type.type, "THE MODAL:", document.getElementById(this.type.id[0]));
                        return; 
                    }else {                            
                        for (var option in this.type) {
                            console.log("Options:", option);
                        }
                        
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
                                if (typeof this.type.dataAttr[i] !==  "undefined") {
                                    el.setAttribute("data", this.type.dataAttr[i]);
                                }else {
                                    el.setAttribute("data", +this.defaultID+i+"child-"+i);
                                }
                                if (typeof this.type.className[i] !==  "undefined") {
                                    el.setAttribute("class", this.type.className[i]);
                                }else {
                                    el.setAttribute("class", +this.defaultID+i+"child-"+i);
                                }
                                
                               // el.setAttribute("data-id", i);
                                
                                if (this.type.makeHeiarachy && i > 0) {
                                    console.log("DATA ATTRIBUTE", el.getAttribute("data-id"), this.type.makeHeiarachy);
                                        
                                    if (document.getElementById(this.type.id[i-1])) {
                                        //Append each preceeding element this element as it's child
                                        document.getElementById(this.type.id[i-1]).appendChild(el);
                                    }
                                }else {
                                    //Append the first element to the DOM
                                    document.body.appendChild(el);
                                }
                                console.log("TYPEOF ID", this.type.id[i]);
                            }
                        }
                        el = null;
                    }
                }else {
                    console.log("THE TYPE WAS NOT AN OBJECT", this.type);
                }
                
                //If the parent dynamic element exists, exit
                /*if (document.getElementById(this.type.id[0])) {
                    console.log("TYPE:", typeof this.type.type, "THE MODAL:", document.getElementById(this.type.id[0]));
                    return; 
                }else {
                    if (typeof this.type === "object") {
                        var i, el, frag = document.createDocumentFragment();
                        
                        for (var option in this.type) {
                            console.log("Options:", option);
                        }
                        
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
                                
                                el.setAttribute("data-id", i);
                                
                                if (this.type.makeHeiarachy && i > 0) {
                                    console.log("DATA ATTRIBUTE", el.getAttribute("data-id"), this.type.makeHeiarachy);
                                        
                                    if (document.getElementById(this.type.id[i-1])) {
                                        //Append each preceeding element this element as it's child
                                        document.getElementById(this.type.id[i-1]).appendChild(el);
                                    }else {
                                        console.log("THE DOM ELEMENT IS NOT HERE", this.type.id[i-1]);
                                    }
                                }else {
                                    //Append the first element to the DOM
                                    document.body.appendChild(el);
                                }
                                console.log("TYPEOF ID", this.type.id[i]);
                            }
                            
                            //el.setAttribute("data-", )
                            console.log("Createing Type from array", el);
                            
                            //if (typeof attrs === "object")
                        }
                    }else {
                        console.log("NOT AN ARRAY", arguments[2]);
                    }
                    el = null;
                }*/
                    
            }
        };
        
        return DOMElement;
    });
}());
