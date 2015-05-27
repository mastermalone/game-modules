define(function(){
    function CreateNode () {
        //Constuctor
    }
    
    CreateNode.prototype = {
        constructor: CreateNode,
        makeElement: function (type, attr, attrVal, txt, addSpan) {
            var el = document.createElement(type), span = document.createElement('SPAN'), txt;
            el.setAttribute(attr, attrVal);
            
            if(addSpan === true){
                txt = document.createTextNode(txt);
                span.appendChild(txt);
                el.appendChild(span);
            }else{
                if(typeof txt === 'string'){
                    txt = document.createTextNode(txt);
                    el.appendChild(txt);
                }
            };
            
            return el;
        }
    };
    return CreateNode;
});