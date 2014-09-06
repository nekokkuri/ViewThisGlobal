/* APP SETTINGS
------------------------------------*/
var default_options = {
	region_cookies: 1,
	profiles:[
		
	],
	shirohime: {
		screen_size: 2,
		TL_inline: 1,
		TL_image: 1,
		ctouch: 1,
		timer_screen: 1,
		timer_sound: 1
	}
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
		switch(request.action){
			case "translations":
				response({
					enabled:{
						inline: localStorage['TL_inline'],
						image: localStorage['TL_image']
					},
					translations: translations,
					elements: elements
				});
				break;
			case "inlineScript":
				if(localStorage['ctouch']==1){
					response({source: inlineScript});
				}else{
					response({source:""});
				}
				break;
			default:
				break;
		}
	}
});