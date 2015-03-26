define(function(){
    function CreateNode () {
        //Constuctor
    }
    
    CreateNode.prototype = {
        constructor: CreateNode,
        makeElement: function (type, attr, attrVal, txt) {
            console.log("Making Element");
            var el = document.createElement(type);
            el.setAttribute(attr, attrVal);
            
            if(typeof txt === "string"){
                var span = document.createElement("SPAN"), txt = document.createTextNode(txt);
                span.appendChild(txt);
                el.appendChild(span);
            };
            
            return el;
        }
    };
    return CreateNode;
});