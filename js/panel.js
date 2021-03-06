var detectGameApi = -1;
var doListen = true;

// Listen to Chrome network logs
chrome.devtools.network.onRequestFinished.addListener(function(request) {
	
	// Cancel listening on marker
	if(!doListen) return;
	
	/* KANCOLLE (Master)
	-------------------------------------------*/
	detectGameApi = request.request.url.indexOf("/kcsapi/api_start2");
	if(detectGameApi > -1){
		doListen = false;
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
	
	
	/* KANCOLLE (Non-master)
	-------------------------------------------*/
	detectGameApi = request.request.url.indexOf("/kcsapi/");
	if(detectGameApi > -1){
		doListen = false;
		
		// Check if master data is already set in background.js
		chrome.runtime.sendMessage({
			game: "kancolle",
			action: "isMasterSet"
		}, function(response){
			if(response.value){
				// Open KanColle panel only if master is already set
				window.location = "../players/kancolle/panel.html";
			}else{
				// If not set, Resume listening for further API calls
				doListen = true;
			}
		});
		return true;
	}
	
	
	/* OLET
	-------------------------------------------*/
	detectGameApi = request.request.url.indexOf("/?ctl=");
	if(detectGameApi > -1){
		doListen = false;
		window.location = "../players/olet/panel.html";
		return true;
	}
	
});