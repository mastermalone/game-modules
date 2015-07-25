(function () {
	define(function () {
        'use srict';
        function Ajax () {
            //Empty
        }
        Ajax.prototype = {
            constructor: Ajax,
            get: function (url, debugging) {
                if(debugging === true){
                    if(!url || typeof url !== 'string'){
                    console.log('Ajax Module: You did not indicate a url to call of this request');
                    }
                    if(typeof callback !== 'function'){
                        console.log('Ajax Module: The type of callback you specified is not of type, function');
                        return;
                    }
                }
                
                try {
                    //Ajax using Promise
                    return new Promise(function (resolve, reject) {
                        var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                        //Onload is the new way vs onreadystatechange.
                        req.onload = function () {
                            if (req.readyState === 4 && req.status === 200) {
                                resolve(req.response);
                            }else {
                                reject(Error(req.statusText));
                            }
                        };
                        
                        req.onerror = function () {
                            reject(Error(req.statusText));
                        };
                        
                        req.open('GET', url, true);
                        req.send();
                    });
                }catch (err) {
                    if (debugging === true) {
                        console.log('From AJAX Module:  This browser does not support AJAX');    
                    }
                }
            }  
        };
        
        return Ajax;
    });
}());
