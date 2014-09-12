$(document).ready(function(){
	
	$("#profiles .profile").on('click', function(){
		window.open("../players/"+$(this).data('game')+"/index.html#"+$(this).data('id'));
	});
	
	$("#profiles .profile .refresh").on('click', function(e){
		window.open("profile.html#"+$(this).parent().data('id'), "based_profile");
		e.stopPropagation();
	});
	
	$("#addnew").on('click', function(){
		window.open("profile.html#0", "based_profile");
	});
	
	$("#settings").on('click', function(){
		window.open("options.html", "based_options");
	});
	
	$("#cookies").on('click', function(){
		chrome.runtime.sendMessage({
			type: "BasedViewer",
			action: "activeCookies"
		}, function(response){});
	});
	
	$("#shirohime").on('click', function(){
		window.open("../players/shirohime/index.html", "shh_game");
	});
	
	setTimeout(function(){
		$("html,body").css("height", $("#wrapper").height()+"px");
	},100);
});