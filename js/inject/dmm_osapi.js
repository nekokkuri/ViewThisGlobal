/* Get DMM aid (GameId) from Query String
------------------------------------------*/
function GetGameId(){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]aid=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* Check for API link every 100ms
------------------------------------------*/
function CheckForApiLink(){
	if(document.getElementById("externalswf")){
		ApiLinkDetected();
	}else{
		setTimeout(CheckForApiLink, 100);
	}
}

/* API link detected, extract
------------------------------------------*/
function ApiLinkDetected(){
	chrome.runtime.sendMessage({
		type: "BasedViewer",
		action: "supplyProfileData",
		gameId: GetGameId(),
		gameLink: document.getElementById("externalswf").getAttribute("src")
	}, function(response){
		window.close();
	});
}

/* Start process. Check if profileWait
------------------------------------------*/
chrome.runtime.sendMessage({
	type: "BasedViewer",
	action: "isProfileWaiting"
}, function(response){
	if(response.value){
		CheckForApiLink();
	}
});