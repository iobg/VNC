'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const io = socketio(server)
const { spawn } = require('child_process')
let streamArgs=['./hostingServer/stream-server.js', 'password']
const bodyParser = require('body-parser')
const routes = require('../routes/routes')
let desktop = null

let stream = spawn('node', streamArgs)
stream.stderr.on('data',data=>{
	console.log(data.toString())
})

app.set('view engine', 'pug')
app.use(express.static('public'));
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
	socket.on('clientRightClick',()=>{
		io.to(desktop).emit('clientRightClick')
	})
})
server.listen(3000,()=>{
	console.log('server listening')
})

