// Convert Game Name into Formal name
function GetFormalGameName(GameName){
	return {
		"kancolle": "KANTAI COLLECTION",
		"shirocolle": "SHIRO COLLECTION",
		"olet": "OVER LEGEND ENDLESS TOWER",
		"kanpani": "KANPANI",
	}[GameName];
}

$(document).ready(function(){

	// Show profile list
	var CurrentProfiles = JSON.parse(localStorage["profiles"]);
	var tmpProfileBox = {};
	for(ProfileCtr in CurrentProfiles){
		tmpProfileBox = $("#factory .profile").clone().appendTo("#profiles");
		tmpProfileBox.data("id", CurrentProfiles[ProfileCtr].id);
		tmpProfileBox.data("game", CurrentProfiles[ProfileCtr].game);
		$(".icon img", tmpProfileBox).attr("src", "../img/profiles/"+CurrentProfiles[ProfileCtr].game+".png");
		$(".game", tmpProfileBox).text(GetFormalGameName(CurrentProfiles[ProfileCtr].game));
		$(".name", tmpProfileBox).text(CurrentProfiles[ProfileCtr].name);
	}
	
	// Open a specific profile
	$("#profiles .profile").on('click', function(){
		window.open(
			"../players/"+$(this).data('game')+"/index.html#"+$(this).data('id'),
			"based_play_"+$(this).data('id')
		);
	});
	
	// Refresh specific Profile
	$("#profiles .profile .refresh").on('click', function(e){
		window.open("profile.html#"+$(this).parent().data('id'), "based_profile");
		e.stopPropagation();
	});
	
	// Add a new Profile
	$("#addnew").on('click', function(){
		window.open("profile.html#0", "based_profile");
	});
	
	// Configuration
	$("#settings").on('click', function(){
		window.open("options.html", "based_options");
	});
	
	// Activate Region Cookies
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
	
	// Play ShiroHime Quest
	$("#shirohime").on('click', function(){
		window.open("../players/shirohime/index.html", "based_play_shirohime");
	});
	
	// Re-check menu sizing to prevent scrollbars
	setTimeout(function(){
		$("html,body").css("height", $("#wrapper").height()+"px");
	},100);
});