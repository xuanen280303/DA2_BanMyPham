var current_url_ad = "http://localhost:57708";
var current_url_img = "http://localhost:8888";
makeScript = function (url) {
	var script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('type', 'text/javascript');
	document.getElementById('mainDiv').appendChild(script);
};