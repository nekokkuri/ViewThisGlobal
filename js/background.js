/* APP SETTINGS
------------------------------------*/
var default_options = {
	region_cookies: 1,
	profiles:[
		
	]
};

for(i in default_options){
	if(typeof localStorage[i] == "undefined"){
		localStorage[i] = default_options[i];
	}
}

/* REQUEST LISTENER
------------------------------------*/
chrome.runtime.onMessage.addListener(function(request, sender, response) {
	/* KANCOLLE */
	if(request.game==="kancolle"){
		
	}
	
	/* KANPANI */
	if(request.game==="kanpani"){
		
	}
	
	/* OLET */
	if(request.game==="olet"){
		
	}
	
	/* SHIROCOLLE */
	if(request.game==="shirocolle"){
		
	}
	
	/* SHIROHIME */
    if(request.game==="shirohime"){
		
	}
});