# messages
A webpage that outputs data from a JSON file using the XMLHttpRequest Javascript function. Created on March 9, 2015 solely by myself after spending about 2 hours of work. All aspects of the lab have been correctly implemented. 

Question: Is it possible to request the data from a different origin (e.g., http://messagehub.herokuapp.com/) or from your local machine (from file:///) from using XMLHttpRequest? Why or why not? 
It is not possible to request data from a different origin

Answer: It is not possible to request data from a different origin because Javascript has a same origin policy. If you need to get a resource, it must be in your same domain. XMLHttpRequest requests will only succeed if they are made to the host that served the original web page. Thus, it is possible to request data from your local machine. This same origin policy was created in order to prevent people from using Javascript to breach users' security through the exchange of information from one web site with that from another less secure and reputable one.
