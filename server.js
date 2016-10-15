'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
var stdin = process.openStdin()



//server config
app.set('view engine', 'pug')
//middleware
app.use(express.static('public'))
app.get('/',(req,res)=>{
	res.render('index')
})


server.listen(3000,()=>{
	console.log('server listening')
		stdin.on('data', chunk=>{
		console.log(chunk)
})
})



