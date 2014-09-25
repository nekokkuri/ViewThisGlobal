$(document).ready(function(){
	
	// Play a Game
	$(".playAction").on('click', function(){
		var game = $(this).data("game");
		window.open("../players/"+game+"/index.html", "VTG_"+game);
	});
	
	// Region Cookies
	$("#cookies").on('click', function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				type: "BasedViewer",
				action: "activateCookies"
			}, function(response) {
				window.close();
			});
		});
	});
	
	// Configuration
	$("#settings").on('click', function(){
		window.open("options.html", "based_options");
	});
	
	// Re-check menu sizing to prevent scrollbars
	setTimeout(function(){
		$("html,body").css("height", $("#wrapper").height()+"px");
	},100);
});