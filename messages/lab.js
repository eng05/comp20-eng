function parse() {
	request = new XMLHttpRequest();
	request.onreadystatechange = parseData;
	request.open ("GET", "data.json", true);
	request.send();
}

function parseData() {
	if (request.readystate == 4 && request.status == 200) {
		messagesDiv = document.getElementById("messages");
		converted = JSON.parse(request.responseText);
		for (i=0; i<converted.length; i++) {
			messagesDiv.innerHTML += "<p>" + converted[i]['content']
		}
	}
	else if (request.readystate == 4 && request.status != 200) {
		alert("Hacked");
	}
	else {
		console.log("Not done yet...");
	}
}