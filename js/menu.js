$(document).ready(function(){
	
	$("#addnew").on('click', function(){
		window.open("http://www.dmm.com/netgame");
		window.close();
	});
	
	$("#settings").on('click', function(){
		window.open("options.html", "based_options");
	});
	
	$("#shirohime").on('click', function(){
		window.open("../players/shirohime/index.html", "shh_game");
	});
	
	setTimeout(function(){
		$("html,body").css("height", $("#wrapper").height()+"px");
	},100);
});