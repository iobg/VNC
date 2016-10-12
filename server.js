'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const io = socketio(server)


//server config
app.set('view engine', 'pug')
//middleware
app.use(express.static('public'))
app.get('/',(req,res)=>{
	res.render('index')
})

io.on('connect',socket=>{
	console.log(`socket connected ${socket.id}`)
})

server.listen(3000,()=>{
	console.log('server listening')
})
