'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const io = socketio(server)
const fs = require('fs')
const robot = require('robotjs')
const { spawn } = require('child_process')
const cors = require('cors')

//middleware
let args = ['-r','24','-f','avfoundation',
					 '-capture_cursor','1','-i','1',
					  '-vf','scale=1280:800','-preset','ultrafast',
					  '-tune','zerolatency','-g','0', 
					  '-hls_flags','delete_segments','-f','hls',
					  '-hls_time','0.5','-hls_list_size','2', 
					  '-hls_allow_cache','0','-hls_segment_filename',
					  'videostream/file%03d.ts','videostream/stream.m3u8']

let recording= spawn('ffmpeg', args )
console.log('video recording')
app.use(express.static('public'));
app.use(cors())

//routes
app.get('/',(req,res)=>{
	res.sendFile('views/index.html' , { root : __dirname})

})
app.get('/stream.m3u8',(req,res)=>{
	fs.createReadStream('videostream/stream.m3u8').pipe(res)
})
app.get('/:streamSegment',(req,res)=>{
		let read=fs.createReadStream(`videostream/${req.params.streamSegment}`)
		read.on('error',console.log)
		read.pipe(res)
	
})

server.listen(3000,()=>{
	console.log('server listening')
		
})

io.on('connect',socket=>{

	socket.on('clientMouseClick',()=>{
		robot.mouseClick()
	})
	socket.on('clientMouseMove',mouseObj=>{
		robot.moveMouse(mouseObj.x,mouseObj.y)
	})
	socket.on('clientKeyPress',key=>{
		if(key==='Enter'){
			robot.keyTap('enter')
		}
		else robot.keyTap(key)
	})
})



