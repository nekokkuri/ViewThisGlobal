var detectGameApi = -1;
var CurrentRequest = {};

// Listen to Chrome network logs
chrome.devtools.network.onRequestFinished.addListener(function(request){
	// Check if OLET API. Do not handle other requests such as images, scripts, etc
	detectGameApi = request.request.url.indexOf("/?ctl=");
	if(detectGameApi > -1){
		// Get response body from network logs
		request.getContent(function(response){
			// Process the prepared request and response
			handleContent(
				getApiCallName(request.request.queryString),
				HandleBinary(response)
			);
		});
	}
});

// Get Name of API call from QueryString
function getApiCallName(queryString){
	for(i in queryString){
		if(queryString[i].name == "ctl"){
			return queryString[i].value;
		}
	}
	return "";
}

// Handle API Call and apply contents to Panel UI
function handleContent(ApiCall, response){
	switch(ApiCall){
		case "login":
			$("#logs").append("[OLET] Initial login<br />");
			console.info("[OLET] Initial login");
			console.log(response);
			break;
		case "constant":
			$("#logs").append("[OLET] Game constants received<br />");
			console.info("[OLET] Game constants received");
			console.log(response);
			break;
		case "homeinit":
			$("#logs").append("[OLET] Home page data received<br />");
			console.info("[OLET] Home page data received");
			console.log(response);
			break;
		case "reqinit":
			$("#logs").append("[OLET] List of Quests received<br />");
			console.info("[OLET] List of Quests received");
			console.log(response);
			break;
		case "iteminit":
			$("#logs").append("[OLET] List of Player Items received<br />");
			console.info("[OLET] List of Player Items received");
			console.log(response);
		case "batheinit":
			$("#logs").append("[OLET] Onsen<br />");
			console.info("[OLET] Onsen");
			console.log(response);
			break;
			
		default: console.log("Unahandled API call: "+ApiCall); break;
	}
}