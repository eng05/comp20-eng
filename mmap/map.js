var myLat = 0;
var myLng = 0;
var myLogin = "IMConnell";
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
			otherStudents(request.responseText);
			var unique = {
	                 url: "smiley.png",
	                 scaledSize: new google.maps.Size(30, 30), 
	                 origin: new google.maps.Point(0,0)
	         };
			marker = new google.maps.Marker({
				position: me,
				icon: unique,
				title: myLogin + ": I Am Here!"
			});
			marker.setMap(map);
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(marker.title);
				infowindow.open(map, marker);
			});
		}
	}
	request.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("login=IMConnell&lat=" + myLat + "&lng=" + myLng);
}

function otherStudents(text) {
	data = JSON.parse(text);
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
	distance = findDistance(otherLat, otherLng);
	otherMarker = new google.maps.Marker({
		position: student,
		title: otherLogin + " " + distance
	});
	otherMarker.setMap(map);
	google.maps.event.addListener(otherMarker, 'click', function() {
				infowindow.setContent(this.title);
				infowindow.open(map, this);
			});
}

function findDistance(otherLat, otherLng) {
	var R = 3958.76 // 6371km = 3958.76 miles
var x1 = otherLat-myLat;
var dLat = toRad(x1);  
var x2 = otherLng-myLng;
var dLon = toRad(x2);  
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(toRad(myLat)) * Math.cos(toRad(otherLat)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c; 
var roundedDist = Math.round(d);
		return roundedDist; 
}

	function toRad (x) {
		return x * Math.PI / 180;
	}