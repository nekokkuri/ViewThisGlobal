var timers = [];
var snd;
var tmp = {};
var time;
var seconds;
var timerID;
var htmlBox;
var timer ;
var timerLinks = {
	"my_government_area":"http://a60462.app.gree-pf.net/page/government/list",
	"my_hime_repair_area":"http://a60462.app.gree-pf.net/page/himerepair/repairlist",
	"my_hime_build_area":"http://a60462.app.gree-pf.net/page/build/buildselect",
	"my_facility_build_area":"http://a60462.app.gree-pf.net/page/build/buildselect",
	"my_hime_rebuild_area":"http://a60462.app.gree-pf.net/page/rebuild/rebuildlist",
	"my_facility_rebuild_area":"http://a60462.app.gree-pf.net/page/rebuild/rebuildlist"
};

function destroyTimers(){
	for(dtctr in timers){
		timers[dtctr].stop();
	}
	timers = [];
	$("#timersBox").html("");
}

function createTimer(data){
	time = data.time.split(":");
	seconds = parseInt(time[0]*3600, 10)+parseInt(time[1]*60, 10)+parseInt(time[2], 10);
	timerID = "t"+timers.length;
	
	htmlBox = $("#factory .timerBox").clone().appendTo("#timersBox");
	$(".timerName", htmlBox).text(data.name);
	htmlBox.addClass(data.type);
	htmlBox.attr("id", "timerBox_"+timerID);
	htmlBox.data("type", data.type);
	htmlBox.on('click', function(){
		$("#gameFrame").attr("src", timerLinks[$(this).data("type")]);
	});
	
	timer = {
		id: timerID,
		type: data.id,
		seconds: seconds-1,
		interval: {},
		start: function(){
			this.interval = setInterval(
				(function(self){ return function(){ self.tick(); }})(this)
			, 1000);
		},
		tick:function(){
			this.seconds--;
			tmp.sec = this.seconds;
			tmp.h = Math.floor(tmp.sec/3600); tmp.sec-=(tmp.h*3600); if(tmp.h<10){ tmp.h="0"+tmp.h; }
			tmp.m = Math.floor(tmp.sec/60); tmp.sec-=(tmp.m*60); if(tmp.m<10){ tmp.m="0"+tmp.m; }
			tmp.s = tmp.sec; if(tmp.s<10){ tmp.s="0"+tmp.s; }
			$("#timerBox_"+this.id+" .timerTime").html(tmp.h+":"+tmp.m+":"+tmp.s);
			if(this.seconds<=0){
				this.stop();
				
				if(localStorage['timer_sound']==1){
					snd = new Audio("../snd/bell.mp3"); snd.play();
				}
				
				if(localStorage['timer_screen']==1){
					chrome.notifications.clear("shhNotif", function(){});
					chrome.notifications.create("shhNotif", {
						type: "basic",
						title: "ShiroHime Quest",
						message: "In-game timer notification",
						iconUrl: "../img/icons/128.png"
					}, function(){});
				}
			}
		},
		stop: function(){
			clearInterval(this.interval);
			$(this.id).hide()
		}
	};
	timer.start();
	timers.push(timer);
}