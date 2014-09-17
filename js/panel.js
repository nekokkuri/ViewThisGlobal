// Listen to Chrome network logs
chrome.devtools.network.onRequestFinished.addListener(function(request) {
	
	// Check if [kancolle]
	var indexOfkcs = request.request.url.indexOf("/kcsapi/");
	if(indexOfkcs>-1){
		
	}
	
	// Check if [olet]
	var indexOfkcs = request.request.url.indexOf("/?ctl=");
	if(indexOfkcs>-1){
	
	}
	
});