function validateForm() {
	var message = document.getElementById("message").value.trim();
	if(message.length <= 3){
		alert("Die Nachricht muss mindestens 4 Zeichen lang sein!");
		return false; // min. länge von 4
	}
	if(message.length > 1000){
		alert("Leider kann die Nachricht maximal 1000 Zeichen enthalten!");
		return false; // max. länge von 1000
	}
	message = message.toLowerCase();
	var isLegal = true;

	// (Evtl. auch mit patternmatching möglich, aber keinesfalls so verständlich! Also dies ist die Validierung, die nur mit JS funktioniert.)
	var illegalWords = ["fuck", "scheisse", "nazi", "hitler", "kacke", "shit"];
	illegalWords.forEach(word => {
		if(message.includes(word)){
			alert("Bitte keine unanständigen Wörter verwenden!");
			isLegal = false; // unanständige Wörter verwendet! 
		}
	});
	return isLegal;
}