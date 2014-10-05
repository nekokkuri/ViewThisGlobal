/* Ask for injection code
------------------------------------------*/
chrome.runtime.sendMessage({
	type: "BasedViewer",
	action: "getInjectionCode",
	scope: "osapi"
}, function(response){
	
	// Inject script
	if(response.script != ""){
		var jsInject = document.createElement('script');
		jsInject.type = 'text/javascript';
		jsInject.src = response.script;
		document.documentElement.appendChild(jsInject);
	}
	
	// Inject style
	if(response.style != ""){
		var cssInject = document.createElement('link');
		cssInject.rel = 'stylesheet';
		cssInject.href = response.style;
		document.documentElement.appendChild(cssInject);
	}
	
});