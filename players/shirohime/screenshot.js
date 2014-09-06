var canvas;
var context;

function cropImage(base64img, callback){
	var ss_image = new Image();
	ss_image.onload = function() {
		context.drawImage(ss_image, $("#deviceView").offset().left, $("#deviceView").offset().top, screen_size[0]-60, screen_size[1]-40, 0, 0, screen_size[0]-60, screen_size[1]-40);
		callback(canvas.toDataURL("image/jpeg"));
	}
	ss_image.src = base64img;
}

function takeScreenshot(){
	$("#screenshot_process").html("Capturing screen...");
	chrome.tabs.captureVisibleTab(null, {format:"jpeg"}, function(base64img){
		$("#screenshot_process").html("Cropping image....");
		cropImage(base64img, function(base64img){
			$("#screenshot_process").html("Checking imgur credits.....");
			$.ajax({
				url: 'https://api.imgur.com/3/credits',
				method: 'GET',
				headers: {
					Authorization: 'Client-ID 088cfe6034340b1',
					Accept: 'application/json'
				},
				success: function(response){
					if(response.data.UserRemaining>10 && response.data.ClientRemaining>100){
						$("#screenshot_process").html("Uploading to imgur......");
						$.ajax({
							url: 'https://api.imgur.com/3/image',
							method: 'POST',
							headers: {
								Authorization: 'Client-ID 088cfe6034340b1',
								Accept: 'application/json'
							},
							data: {
								image: base64img.substring(23),
								type: 'base64'
							},
							success: function(response){
								window.open(response.data.link, "_blank");
								$("#screenshot_btn").show();
								$("#screenshot_process").html("");
							}
						});
					}else{
						window.open(base64img, "_blank");
						$("#screenshot_btn").show();
						$("#screenshot_process").html("");
					}
				}
			});
		});
	});
}