// http://faye.jcoglan.com/node.html
var faye = require('faye'), fs = require('fs');
var client = new faye.Client('http://localhost:8000/faye');

console.log(process.argv.length);

fs.readFile(process.argv[2], function(err,data) {if (err) throw err;
	client.publish('/q', {type: "raw", text: data.toString('utf8', 0)});
})

client.disconnect();
