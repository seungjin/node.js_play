// http://faye.jcoglan.com/node.html

var http = require('http');
var faye = require('faye');
var fs = require('fs');
var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});
// Handle non-Bayeux requests
var server = http.createServer(function(request,response) {
		switch (request.url) {
			case "/index.node" :
				fs.readFile('faye.html', function(err,data) {if (err) throw err; 
					response.writeHead(200, {'Content-Type': 'text/html'}); 
				  response.write( data ); 
				  response.end();	
				})
				break;
			
			default :
				var currentTime = new Date();
	    	console.log("non-Bayeux request received at " + currentTime + " " +  request);
	    	response.writeHead(200, {'Content-Type': 'text/plain'});
	    	response.write('non-Bayeux request');
	    	response.end();
				break;
		} 
});

bayeux.attach(server);
server.listen(8000);