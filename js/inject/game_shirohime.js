/* GAME FRAME RESIZING
------------------------------------*/
$(window).on("load", function (){
	
	// Send Screen Size to Player
	chrome.runtime.sendMessage({
		game:"shirohime",
		action:"pageLoad",
		url: window.location.href,
		screen: $(document).height()
	}, function(response) {});
	
	// If game timers exist
	if($("#my_hime_task").length>0){
	
		// Get all timer values
		var timers = [];
		$(".is-countdown").each(function(){
			timers.push({
				type: $(this).parent().parent().attr("id"),
				name: $(".my_polt_title", $(this).parent()).text(),
				time: $(this).text().substring(3)
			});
		});
		
		// Send timer values to Player
		chrome.runtime.sendMessage({
			game:"shirohime",
			action:"timers",
			timers: timers
		}, function(response){});
	}
	
});

$(window).on("resize", function (){
	// Send new Screen Size to Player
	chrome.runtime.sendMessage({
		game:"shirohime",
		action:"screen_size",
		value: $(document).height()
	}, function(response) {});
});


/* Get Boot Data from Background
------------------------------------*/
var s = document.createElement('script');
var translations = {};
var elements = "";
chrome.runtime.sendMessage({
	game:"shirohime",
	action:"boot"
}, function(response) {
	// cTouch Injection
	if(response.enabled.ctouch==1){
		s.type = 'text/javascript';
		s.id = 'shh_touch';
		s.innerText = response.source;
		document.documentElement.appendChild(s);
	}
	
	// In-line Translations
	if(response.enabled.inline==1){
		translations = response.translations;
		elements = response.elements;
		implementTranslations();
	}
	
	// Image replacement
	if(response.enabled.image==1){
		var link = document.createElement("link");
		link.href = chrome.extension.getURL("players/shirohime/inject/game.css");
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
	}
});


/* After-load pop-up translation
------------------------------------*/
document.addEventListener('mousedown', function(e){
	setTimeout(implementTranslations, 300)
},true);


/* Implement translations
------------------------------------*/
function implementTranslations(){
	$(elements).each(function(){
		if($(this).hasClass("shh_tl_pass")){ return; }
		$(this).addClass("shh_tl_pass");
		
		if(typeof translations[$(this).text().trim()] !="undefined"){
			$(this).html(translations[$(this).text().trim()]);
		}else{
			if($(this).text().substr(0,3)=="レベル"){
				var levelMsgs = $(this).text().match(/\d+/g);
				$(this).html("Level "+levelMsgs[0]);
			}
		}
	});
};
