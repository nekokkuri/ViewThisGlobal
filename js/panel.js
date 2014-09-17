var detectGameApi = -1;

// Listen to Chrome network logs
chrome.devtools.network.onRequestFinished.addListener(function(request) {
	
	// KANCOLLE
	detectGameApi = request.request.url.indexOf("/kcsapi/api_start2");
	if(detectGameApi > -1){
		request.getContent(function(response){
			chrome.runtime.sendMessage({
				game: "kancolle",
				action: "setMaster",
				data:  response.substring(7)
			}, function(response){
				window.location = "../players/kancolle/panel.html";
			});
		});
		return true;
	}
	
	// OLET
	detectGameApi = request.request.url.indexOf("/?ctl=");
	if(detectGameApi > -1){
		window.location = "../players/olet/panel.html";
		return true;
	}
	
});