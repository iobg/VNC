'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const fs = require('fs')

var total = 100000000     // fake a large file
var partialstart = 0
var partialend = total - 1



var start = parseInt(partialstart, 10); 
var end = partialend ? parseInt(partialend, 10) : total;  

var chunksize = (end-start)+1; 





//server config

//middleware
app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.sendFile('views/index.html' , { root : __dirname})

})


app.get('/stream.m3u8',(req,res)=>{
	res.writeHead('206', {
    'Transfer-Encoding': 'chunked'
   , 'Content-Type': 'video/mp4'
   , 'Content-Length': chunksize
   , 'Accept-Ranges': 'bytes ' + start + "-" + end + "/" + total
	});
	let read=fs.createReadStream('./stream.m3u8')
	read.on('data',chunk=>{
		res.send(res)
	})
})


server.listen(3000,()=>{
	console.log('server listening')
		
})



