/* GAME FRAME RESIZING
------------------------------------*/
$(window).on("load", function (){
	chrome.runtime.sendMessage({
		game:"shirohime",
		action:"screen_size",
		value: $(document).height()
	}, function(response) {});
	
	if($("#my_hime_task").length>0){
		var timers = [];
		$(".is-countdown").each(function(){
			timers.push({
				type: $(this).parent().parent().attr("id"),
				name: $(".my_polt_title", $(this).parent()).text(),
				time: $(this).text().substring(3)
			});
		});
		chrome.runtime.sendMessage({
			game:"shirohime",
			action:"timers",
			timers: timers
		}, function(response){});
	}
	
});

$(window).on("resize", function (){
	chrome.runtime.sendMessage({
		game:"shirohime",
		action:"screen_size",
		value: $(document).height()
	}, function(response) {});
});


/* EMBED TOUCH EVENTS
------------------------------------*/
chrome.runtime.sendMessage({
	game:"shirohime",
	action:"gameUrl",
	value: window.location.href
}, function(response){});


/* EMBED TOUCH EVENTS
------------------------------------*/
var s = document.createElement('script');
chrome.runtime.sendMessage({
	game:"shirohime",
	action:"inlineScript"
}, function(response) {
	if(response.source!=""){
		s.type = 'text/javascript';
		s.id = 'shh_touch';
		s.innerText = response.source;
		document.documentElement.appendChild(s);
	}
});


/* GET TRANSLATIONS
------------------------------------*/
var translations = {};
var elements = "";
chrome.runtime.sendMessage({
	game:"shirohime",
	action:"translations"
}, function(response) {
	if(response.enabled.inline==1){
		translations = response.translations;
		elements = response.elements;
		implementTranslations();
	}
	
	if(response.enabled.image==1){
		var link = document.createElement("link");
		link.href = chrome.extension.getURL("inject/game.css");
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
	}
});


/* TRANSLATE ON-CLICK (for popups)
------------------------------------*/
document.addEventListener('mousedown', function(e){
	setTimeout(implementTranslations, 300)
},true);


/* IMPLEMENT TRANSLATIONS ON-SCREEN
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
			}else{
				// console.log("[Shh] Untranslated: "+$(this).text().trim());
			}
		}
	});
};
