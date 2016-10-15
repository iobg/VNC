'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
var stdin = process.openStdin()
var total = 999999999         // fake a large file
var partialstart = 0
var partialend = total - 1



var start = parseInt(partialstart, 10); 
var end = partialend ? parseInt(partialend, 10) : total;  

var chunksize = (end-start)+1; 





//server config
app.set('view engine', 'pug')
//middleware
app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.render('index')


})


app.get('/movie.avi',(req,res)=>{
	res.writeHead(206, {
    'Transfer-Encoding': 'chunked'
   , 'Content-Type': 'video/avi'
   , 'Content-Length': chunksize
   , 'Accept-Ranges': 'bytes ' + start + "-" + end + "/" + total
	});
	stdin.on('data', chunk=>{
		stdin.pipe(res)
})

})


server.listen(3000,()=>{
	console.log('server listening')
		
})



