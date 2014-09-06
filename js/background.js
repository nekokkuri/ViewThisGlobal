console.log("Starting BasedViewer...");

var default_options = {
	region_cookies: 1,
	profiles:[]
};

for(i in default_options){
	if(typeof localStorage[i] == "undefined"){
		console.log("Setting default value of "+i+" to "+default_options[i]);
		localStorage[i] = default_options[i];
	}
}