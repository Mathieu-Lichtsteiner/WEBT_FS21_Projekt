function validateForm() {
	var message = document.getElementById("message").value.trim();
	if(message.length <= 3){
		return false; // min. länge von 4
	}
	if(message.length > 1000){
		return false; // max. länge von 1000
	}
	message = message.toLowerCase();
	var illegalWords = ["fuck", "scheisse", "nazi", "hitler", "kacke", "shit"];
	illegalWords.forEach(word => {
		if(message.includes(wor)){
			return false; // unanständige Wörter verwendet
		}
	});
	return true;
}