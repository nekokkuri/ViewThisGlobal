var screen_size = [];

function followAddressBar(){
	$("#gameFrame").attr("src", $("#addressBar").val());
}

$(document).ready(function(){
	
	/* COMMON UI
	---------------------------------------*/
	$(".dataNav").on('click', function(){
		$(".dataTab").hide();
		$("#"+$(this).data("tab")).show();
		$(".active").removeClass("active");
		$(this).addClass("active");
		return false;
	});
	$("#default-tab").click();
	
	
	/* TOOLS
	---------------------------------------*/
	$("#screenshot_btn").on('click', function(){
		$(this).hide();
		takeScreenshot();
	});
	
	$("#addressBar").keyup(function(e){
		if(e.keyCode == 13){
			followAddressBar();
		}
	});
	followAddressBar();
	
	
	/* SCREEN SIZE
	---------------------------------------*/
	switch(localStorage['SH_screen_size']){
		case "1": screen_size = [500,750]; break;
		case "2": screen_size = [440,660]; break;
		case "3": screen_size = [380,570]; break;
		default: screen_size = [440,660]; break;
	}
	
	$("#screensize"+localStorage['SH_screen_size']).prop("checked", true);
	
	$("input[name=screensize]").on('change', function(){
		localStorage['SH_screen_size'] = $(this).val();
		window.location.reload();
	});
	
	$("#deviceBox").css("width", screen_size[0]+"px");
	$("#deviceBox").css("height", screen_size[1]+"px");
	$("#deviceView").css("width", (screen_size[0]-40)+"px");
	$("#deviceView").css("height", (screen_size[1]-40)+"px");
	$("#gameFrame").css("width", (screen_size[0]-60)+"px");
	
	canvas = document.createElement("canvas");
	canvas.width = screen_size[0]-60;
	canvas.height = screen_size[1]-40;
	context = canvas.getContext("2d");
	
	
	/* ENGLISH TRANSLATIONS
	---------------------------------------*/
	$("#SET_tlimage").prop("checked", (localStorage['SH_TL_image']==1)?true:false);
	$("#SET_tlimage").on('change', function(){
		localStorage['SH_TL_image'] = ($(this).prop("checked"))?1:0;
		followAddressBar();
	});
	
	$("#SET_tlinline").prop("checked", (localStorage['SH_TL_inline']==1)?true:false);
	$("#SET_tlinline").on('change', function(){
		localStorage['SH_TL_inline'] = ($(this).prop("checked"))?1:0;
		followAddressBar();
	});
	
	
	/* TOUCHSCREEN EMULATION
	---------------------------------------*/
	$("#SET_ctouch").prop("checked", (localStorage['SH_ctouch']==1)?true:false);
	$("#SET_ctouch").on('change', function(){
		localStorage['SH_ctouch'] = ($(this).prop("checked"))?1:0;
		followAddressBar();
	});
	
	
	/* TIMERS
	---------------------------------------*/
	$("#SET_notifscreen").prop("checked", (localStorage['SH_timer_screen']==1)?true:false);
	$("#SET_notifscreen").on('change', function(){
		localStorage['SH_timer_screen'] = ($(this).prop("checked"))?1:0;
	});
	
	$("#SET_notifsound").prop("checked", (localStorage['SH_timer_sound']==1)?true:false);
	$("#SET_notifsound").on('change', function(){
		localStorage['SH_timer_sound'] = ($(this).prop("checked"))?1:0;
	});
	
});

chrome.runtime.onMessage.addListener(function(request, sender, response) {
    if(request.game==="shirohime"){
		switch(request.action){
			case "screen_size":
				$("#gameFrame").css("height", request.value+"px");
				response({});
				break;
			case "gameUrl":
				$("#addressBar").val(request.value);
				$("#deviceView").animate({scrollTop: 0}, 0);
				response({});
				break;
			case "timers":
				destroyTimers();
				for(tctr in request.timers){
					createTimer(request.timers[tctr]);
				}
				response({});
				break;
			default:
				break;
		}
	}
});