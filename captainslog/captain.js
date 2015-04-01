 $(document).ready(function(){
 	txt = $("#msg").value;
 	localStorage[new Date().getTime()] = txt;
 	elem = $("#log");
		output = "";
		for (key in localStorage) {
			output = output + "<p>" + localStorage[key] + "</p>\n";
		}
		elem.innerHTML = output;
 	$("#log").prepend(txt);
 });
