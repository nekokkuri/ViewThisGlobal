// Get my tab ID for checking later
var myTabId = 0;
chrome.tabs.getCurrent(function(myTab){
	myTabId = myTab.id;
});

// Wait for injection code request
chrome.runtime.onMessage.addListener(function(request, sender, response){
	
	// Check if its a code request
	if(request.type=="BasedViewer" && request.action=="getInjectionCode"){
		
		// Check if request is from the same tab
		if(myTabId==sender.tab.id){
			// scope is osapi
			if(request.scope=="osapi"){
				response({
					script:"",
					style:"chrome-extension://"+chrome.runtime.id+"/players/olet/inject/osapi.css",
				});
			}
			
			// scope is netgame
			if(request.scope=="netgame"){
				response({
					script:"",
					style:"chrome-extension://"+chrome.runtime.id+"/players/olet/inject/netgame.css",
				});
			}
		}else{
			console.log("ok request, but not for my tab");
		}
		
	}else{
		console.log("request seen, but not for me");
	}
});

// onResize change frame margins
$(window).on('resize', function(){
	if($(document).height() > 500){
		$("#wrapper").css("margin", "10px auto 0px");
	}else{
		$("#wrapper").css("margin", "0px auto");
	}
});

// Focus to document every second to enable key functions
setInterval(function(){
	$(window).focus();
},1000);