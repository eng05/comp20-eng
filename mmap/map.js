var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
	zoom: 13, 
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;

function init() {
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by web browser.");
	}
}

function renderMap() {
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			marker = new google.maps.Marker({
				position: me,
				title: "I Am Here!"
			});
			marker.setMap(map);
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(marker.title);
				infowindow.open(map, marker);
			});
			otherStudents(request.responseText);
		}
	}
	request.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("login=IMConnell&lat=" + myLat + "&lng=" + myLng);
	console.log("I am sent");
}

function otherStudents(request.responseText) {
	data = JSON.parse(request.responseText);
	for (i=0; i<data.length; i++) {
		otherLogin=data[i]["login"];
		otherLat=data[i]["lat"];
		otherLng=data[i]["lng"];
		otherTime=data[i]["created_at"];
		makeMarkers(otherLogin, otherLat, otherLng, otherTime);
		}
}

function makeMarkers(otherLogin, otherLat, otherLng, otherTime) {
	student = new google.maps.LatLng(otherLat, otherLng);
	otherMarker = new google.maps.Marker({
		position: me,
		title: "Over There!"
	});
	otherMarker.setMap(map);
}