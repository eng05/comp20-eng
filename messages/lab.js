function parse() {
	request = new XMLHttpRequest();
	request.onreadystatechange = parseData;
	request.open ("GET", "data.json", true);
	request.send();
}

function parseData() {
	if (request.readyState == 4 && request.status == 200) {
		messagesDiv = document.getElementById("messages");
		converted = JSON.parse(request.responseText);
		for (i=0; i<converted.length; i++) {
			messagesDiv.innerHTML += "<p>" + converted[i]['content'] + " " + converted[i]['username'];
		}
	} 
	else if (request.readyState == 4 && request.status != 200) {
		alert("Hacked");
	}
	else {
		console.log("Not done yet");
	}
}