'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const fs = require('fs')
const request = require('request')
const cors = require('cors')


//server config

//middleware
app.use(express.static('public'))
app.use(cors())
app.get('/',(req,res)=>{
	res.sendFile('views/index.html' , { root : __dirname})

})
app.get('/stream.m3u8',(req,res)=>{
	fs.createReadStream('videostream/stream.m3u8').pipe(res)
})
app.get('/:streamSegment',(req,res)=>{
	console.log('segment loading')
	fs.createReadStream(`videostream/${req.params.streamSegment}`).pipe(res)
})

server.listen(3000,()=>{
	console.log('server listening')
		
})



