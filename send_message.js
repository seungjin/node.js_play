// http://faye.jcoglan.com/node.html
var http = require('http'), faye = require('faye');
var client = new faye.Client('http://localhost:8000/faye');
//client.publish('/new_log', {text: process.argv[2]});
var stdin = process.openStdin();
stdin.setEncoding('utf8');
//stdin.on('data', function (chunk) {client.publish('/new_log', {text: "<script type=\"text/javascript\">"+chunk+"</script>"});});
stdin.on('data', function (chunk) {client.publish('/q', {type: "msg" , text: chunk});});
stdin.on('end', function () { process.stdout.write('end');});