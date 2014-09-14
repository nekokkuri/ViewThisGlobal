// Get Profile ID from hash tag of URL
var ProfileID = window.location.hash.substring(1);
var CurrentProfiles;

$(document).ready(function(){
	// Support hashchanges
	$(window).bind( 'hashchange', function(e){
		window.location.reload();
	});
	
	// Get all existing profiles
	CurrentProfiles = JSON.parse(localStorage["profiles"]);
	
	if(ProfileID=="0"){
		// Update Profile Header as New
		$("#profileID").text("#"+localStorage["profile_ctr"]);
		$("#profileInput").val("Untitled");
		
	}else{
		// Update Profile Header as Existing
		for(ProfileCtr in CurrentProfiles){
			if(CurrentProfiles[ProfileCtr].id == ProfileID){
				$("#profileID").text("#"+CurrentProfiles[ProfileCtr].id);
				$("#profileGame img").attr("src", "../img/profiles/"+CurrentProfiles[ProfileCtr].game+".png");
				$("#profileInput").val(CurrentProfiles[ProfileCtr].name);
				console.log(CurrentProfiles[ProfileCtr].name);
			}
		}
	}
	
});

// Convert AppID into Game Name
function GetGameName(GameId){
	return {
		"854854":"kancolle",
		"149569":"shirocolle",
		"137465":"olet",
		"181259":"kanpani",
	}[GameId];
}

// Listen for osapi-inject requests
chrome.runtime.onMessage.addListener(function(request, sender, response){
	if(request.type==="BasedViewer"){
		switch(request.action){
			
			// Return true, waiting for profile data
			case "isProfileWaiting":
				console.log("[profile] asked if waiting, say true");
				response({value:true});
				break;
				
			// Receive profile data from osapi
			case "supplyProfileData":
				
				if(ProfileID=="0"){
					// Add profile as new entry
					CurrentProfiles.push({
						id: localStorage["profile_ctr"],
						name: $("#profileInput").val(),
						game: GetGameName(request.gameId),
						link: request.gameLink
					});
					
				}else{
					// Update existing profile
					for(ProfileCtr in CurrentProfiles){
						if(CurrentProfiles[ProfileCtr].id == ProfileID){
							CurrentProfiles[ProfileCtr].name = $("#profileInput").val();
							CurrentProfiles[ProfileCtr].game = GetGameName(request.gameId);
							CurrentProfiles[ProfileCtr].link = request.gameLink;
						}
					}
				}
				
				localStorage["profiles"] = JSON.stringify(CurrentProfiles);
				window.close();
				break;
				
			default: break;
		}
	}
});