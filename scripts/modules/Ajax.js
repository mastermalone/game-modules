(function () {
	define(function () {
		function Ajax () {
			//Empty Constructor
		}
		
		Ajax.prototype = {
			constructor: Ajax,
			get: function (url, callback) {
				var req, data;
				
				if(!url || typeof url !== "string"){
					logger.error("Ajax Module: You did not indicate a url to call of this request");
				}
				if(typeof callback !== "function"){
					logger.error("Ajax Module: The type of callback you specified is not of type, 'function'");
					return;
				}
				
				try{
					req = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP);
					req.onreadystatechange = function () {
						if(req.readyState === 4 && req.status === 200){
							data = req.responseText;
							if(typeof callback === "function"){
								callback(data);
							}
						}
					}
				}catch(err){
					logger.error("Ajax Module: This browser does not support Ajax");
				}
			}
		};
	});
})();
