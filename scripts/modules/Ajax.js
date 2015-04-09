(function () {
	define(function () {
	    "use strict";
	    
		function Ajax () {
			//Empty Constructor
		}
		
		Ajax.prototype = {
			constructor: Ajax,
			getData: function (url, callback, debugging) {
				var req, data;
				
				if(debugging === true){
				    if(!url || typeof url !== "string"){
                    console.log("Ajax Module: You did not indicate a url to call of this request");
                    }
                    if(typeof callback !== "function"){
                        console.log("Ajax Module: The type of callback you specified is not of type, 'function'");
                        return;
                    }
				}
				
				try{
					req = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
					req.onreadystatechange = function () {
						if(req.readyState === 4 && req.status === 200){						    
						    data = eval("("+req.responseText+")");//Temporary for testing
							//data = req.responseText;
							if(typeof callback === "function"){
								callback(data);
							}
						}
					};
					req.open("GET", url, true);
					req.send();
				}catch(err){
					console.log("Ajax Module: This browser does not support Ajax");
				}
			}
		};
		return Ajax;
	});
}());
