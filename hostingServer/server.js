'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const io = socketio(server)
const { spawn } = require('child_process')
let streamArgs=['./node_modules/stream-server.js', 'password']
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('../routes/routes')
let desktop = null

let stream = spawn('node', streamArgs)

app.set('view engine', 'pug')
app.use(express.static('public'));
app.use(cors())
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
	socket.on('clientMouseMove',mouseObj=>{
		io.to(desktop).emit('clientMouseMove',mouseObj)
	})
	socket.on('clientKeyPress',key=>{
		io.to(desktop).emit('clientkeyPress',key)
	})
	socket.on('shiftPressed',key=>{
		io.to(desktop).emit('shiftPressed',key)
	})
	socket.on('shiftReleased',key=>{
		io.to(desktop).emit('shiftReleased',key)
	})
})

server.listen(3000,()=>{
	console.log('server listening')
})

