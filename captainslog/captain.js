 $(document).ready(function(){
 	txt = $("#msg").value;
 	localStorage[new Date().getTime()] = txt;
 	$("#log").prepend("txt");
 });
