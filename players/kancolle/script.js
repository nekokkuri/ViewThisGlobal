// Get Profile ID from hash tag of URL
var ProfileID = window.location.hash.substring(1);
var CurrentProfiles;

$(document).ready(function(){

	// Get all existing profiles
	CurrentProfiles = JSON.parse(localStorage["profiles"]);
	
	// Find requested profile and execute
	for(ProfileCtr in CurrentProfiles){
		if(CurrentProfiles[ProfileCtr].id == ProfileID){
			document.title = "KanColle: "+CurrentProfiles[ProfileCtr].name;
			$("#game_swf").attr("src", CurrentProfiles[ProfileCtr].link);
		}
	}
	
});

$(window).on('resize', function(){
	if($(document).height() > 500){
		$("#wrapper").css("margin", "10px auto 0px");
	}else{
		$("#wrapper").css("margin", "0px auto");
	}
});