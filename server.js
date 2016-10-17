'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const fs = require('fs')


//server config

//middleware
app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.sendFile('views/index.html' , { root : __dirname})

})

server.listen(3000,()=>{
	console.log('server listening')
		
})



