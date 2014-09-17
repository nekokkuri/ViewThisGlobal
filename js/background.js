/* APP SETTINGS
------------------------------------*/
var default_options = {
	latest: 0,
	version: 0,
	profile_ctr: 1,
	profiles: "[]",
	SH_screen_size: 2,
	SH_TL_inline: 1,
	SH_TL_image: 1,
	SH_ctouch: 1,
	SH_timer_screen: 1,
	SH_timer_sound: 1,
	SH__elements: "",
	SH__affairs: "{}",
	SH__castles: "{}",
	SH__info: "{}",
	SH__messages: "{}",
	SH__other: "{}",
	SH__quests: "{}",
};

// Set to default if not yet set
for(i in default_options){
	if(typeof localStorage[i] == "undefined"){
		localStorage[i] = default_options[i];
	}
}

// Remove remnants of unused settings
for(i in localStorage){
	if(typeof default_options[i] == "undefined"){
		localStorage.removeItem(i);
	}
}


/* INITIALIZATION SCRIPTS
------------------------------------*/
$(function(){
	// Check for Updates
	$.ajax({
		url: "https://raw.githubusercontent.com/dragonjet/Based/master/data/version.json",
        jsonp: false,
		success:function(response){
			localStorage['latest'] = response;
		}
	});
});


/* BROWSER PERSISTENTS
------------------------------------*/
var kancolle_master = false;
var SH_translations = false;
var SH_cTouchScript = false;


/* REQUEST LISTENER
------------------------------------*/
chrome.runtime.onMessage.addListener(function(request, sender, response){
	/* KANCOLLE */
	if(request.game==="kancolle"){
		switch(request.action){
			case "isMasterSet":
				if(!kancolle_master){
					response({value:false});
				}else{
					response({value:true});
				}
			case "setMaster":
				kancolle_master = JSON.parse(request.data);
				response({success:true});
			default:
				break;
		}
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
			case "boot":
				var responseData = {
					enabled:{
						inline: localStorage['SH_TL_inline'],
						image: localStorage['SH_TL_image'],
						ctouch: localStorage['SH_ctouch']
					}
				};
				
				// include in-line translations
				if(localStorage['SH_TL_inline']==1){
					// build translation list if not yet stored on browser persistents
					if(!SH_translations){
						SH_translations = {};
						SH_translations = $.extend(SH_translations, JSON.parse(localStorage['SH__affairs']));
						SH_translations = $.extend(SH_translations, JSON.parse(localStorage['SH__castles']));
						SH_translations = $.extend(SH_translations, JSON.parse(localStorage['SH__info']));
						SH_translations = $.extend(SH_translations, JSON.parse(localStorage['SH__messages']));
						SH_translations = $.extend(SH_translations, JSON.parse(localStorage['SH__other']));
						SH_translations = $.extend(SH_translations, JSON.parse(localStorage['SH__quests']));
					}
					// add requested info to response
					responseData.translations = SH_translations;
					responseData.elements = localStorage['SH__elements'];
				}
				
				// include cTouch script
				if(localStorage['SH_ctouch']==1){
					if(!SH_cTouchScript){
						SH_cTouchScript = $.ajax({
							url: "../players/shirohime/inject/touch.js",
							jsonp: false,
							async: false
						}).responseText;
					}
					responseData.source = SH_cTouchScript;
				}
				
				response(responseData);
				break;
			default:
				break;
		}
	}
});


/* SHIROHIME UA-SPOOFING
------------------------------------*/
chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
		var headers = details.requestHeaders,
		blockingResponse = {};
		for( var i = 0, l = headers.length; i < l; ++i ) {
			if( headers[i].name == 'User-Agent' ) {
				headers[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53';
				break;
			}
		}
		blockingResponse.requestHeaders = headers;
		return blockingResponse;
	},
	{ urls: ["*://a60462.app.gree-pf.net/*", "*://*.gree.net/*"]},
	['requestHeaders','blocking']
);