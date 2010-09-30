// http://faye.jcoglan.com/node.html
var http = require('http'), faye = require('faye'), fs = require('fs');
var client = new faye.Client('http://localhost:8000/faye');
fs.watchFile('log', function(curr,prev) {
	if (curr.mtime.getTime() != prev.mtime.getTime()) {
	  console.log(curr.mtime.getTime() + " : " + prev.mtime.getTime());
		fs.readFile('log', function(err,data) {if (err) throw err;
			//console.log(data.toString('utf8', 0));
			client.publish('/q', {text: data.toString('utf8', 0)});
		})
	}
})
