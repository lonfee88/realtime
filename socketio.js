var http = require('http');
var fs = require('fs');
var path = require('path');


var server = http.createServer(handler);
var io = require('socket.io').listen(server);
console.log('Server started.');

var handler = function(req, res){
//function handler (req, res){
	console.log('request starting...');
	var filePath = '.' + req.url;
	if(filePath == './')
		filePath = './realtime-demo.html';
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch(extname){
		case '.js':
		   	contentType = 'text/javascript';
			break;
		case '.css':
		   	contentType = 'text/css';
			break;
	}
	fs.exists(filePath, function(exists){
		if(exists){
			fs.readFile(filePath, function(error, content){
				if(error){
					res.writeHead(500);
					res.end();
				}
				else{
					res.writeHead(200, {'Content-Type' : contentType});
					res.end(content, 'utf-8');
				}
			});
		}
		else{
			res.writeHead(404);
			res.end();
		}
	});
};

io.sockets.on('connection', function(socket){
	console.log('connected.');
	var dataPusher = setInterval(function(){
		socket.volatile.emit('data', Math.random()*100);
	}, 1000);

});

server.listen(8080);
