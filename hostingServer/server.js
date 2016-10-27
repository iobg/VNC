'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const io = socketio(server)
const { spawn } = require('child_process')
let streamArgs=['./stream-server.js', 'password']
// const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('../routes/routes')
let desktop = null

let stream = spawn('node', streamArgs)
const PORT = process.env.PORT || 3000
app.set('view engine', 'pug')
app.use(express.static('public'));
// app.use(cors())
app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next()
})
app.use(bodyParser())
app.use(routes)

io.on('connect',socket=>{
	console.log('connected')
	socket.on('firstConnect', password=>{
		console.log(password)
		module.exports={password}
	})
	socket.on('desktopId', id=>{
		desktop=id
		console.log(desktop)
	})
	socket.on('clientMouseClick',()=>{
		io.to(desktop).emit('clientMouseClick')
	})
	socket.on('clientMouseMove',mouseObj=>{
		io.to(desktop).emit('clientMouseMove',mouseObj)
	})
	socket.on('clientKeyPress',key=>{
		io.to(desktop).emit('clientKeyPress',key)
	})
	socket.on('shiftPressed',key=>{
		io.to(desktop).emit('shiftPressed',key)
	})
	socket.on('shiftReleased',key=>{
		io.to(desktop).emit('shiftReleased',key)
	})
	socket.on('clientScroll',wheelDeltaY=>{
	io.to(desktop).emit('clientScroll', wheelDeltaY)
})
})


server.listen(PORT,()=>{
	console.log('server listening')
})


var STREAM_SECRET = "password",
	STREAM_PORT = process.env.PORT || 8082,
	WEBSOCKET_PORT = process.env.PORT || 8084,
	STREAM_MAGIC_BYTES = 'jsmp'; // Must be 4 bytes

var width = 320,
	height = 240;

// Websocket Server
var socketServer = new (require('ws').Server)({port: WEBSOCKET_PORT});
socketServer.on('connection', function(socket) {
	// Send magic bytes and video size to the newly connected socket
	// struct { char magic[4]; unsigned short width, height;}
	var streamHeader = new Buffer(8);
	streamHeader.write(STREAM_MAGIC_BYTES);
	streamHeader.writeUInt16BE(width, 4);
	streamHeader.writeUInt16BE(height, 6);
	socket.send(streamHeader, {binary:true});

	console.log( 'New WebSocket Connection ('+socketServer.clients.length+' total)' );
	
	socket.on('close', function(code, message){
		console.log( 'Disconnected WebSocket ('+socketServer.clients.length+' total)' );
	});
});

socketServer.broadcast = function(data, opts) {
	for( var i in this.clients ) {
		if (this.clients[i].readyState == 1) {
			this.clients[i].send(data, opts);
		}
		else {
			console.log( 'Error: Client ('+i+') not connected.' );
		}
	}
};


// HTTP Server to accept incomming MPEG Stream
var streamServer = require('http').createServer( function(request, response) {
	var params = request.url.substr(1).split('/');

	if( params[0] == STREAM_SECRET ) {
		response.connection.setTimeout(0);
		
		width = (params[1] || 320)|0;
		height = (params[2] || 240)|0;
		
		console.log(
			'Stream Connected: ' + request.socket.remoteAddress + 
			':' + request.socket.remotePort + ' size: ' + width + 'x' + height
		);
		request.on('data', function(data){
			socketServer.broadcast(data, {binary:true});
		});
	}
	else {
		console.log(
			'Failed Stream Connection: '+ request.socket.remoteAddress + 
			request.socket.remotePort + ' - wrong secret.'
		);
		response.end();
	}
}).listen(STREAM_PORT);

console.log('Listening for MPEG Stream on http://127.0.0.1:'+STREAM_PORT+'/<secret>/<width>/<height>');
console.log('Awaiting WebSocket connections on ws://127.0.0.1:'+WEBSOCKET_PORT+'/');


