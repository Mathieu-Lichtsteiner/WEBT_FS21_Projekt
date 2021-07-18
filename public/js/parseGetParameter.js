function httpGetParameters() {
	var urlSubstring = window.location.search.substring(1);
	var pairs = urlSubstring.split("&");
	var parameters = [pairs.length];
	for (var i = 0; i < parameters.length; i++) {
		var pair = pairs[i].split("=");
		parameters[pair[0]] = pair[1];
	}
	return parameters;
}