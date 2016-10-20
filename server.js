'use strict'
module.exports=()=>{
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
					  '-pixel_format','yuv420p','-i','1',
					  '-vcodec','h264',
					  '-vf','scale=1280:800','-preset','ultrafast',
					  '-tune','zerolatency','-g','0', 
					  '-hls_flags','delete_segments',
					  '-hls_time','0.5','-hls_list_size','2', 
					  '-hls_allow_cache','0','-segment_list_flags','live',
					  '-increment_tc', '1',
					  '-hls_segment_filename','videostream/file%03d.ts','videostream/stream.m3u8']

let recording= spawn('ffmpeg', args )

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
		read.on('error',()=>{
			return true
		})
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
		if(key.length >1){
			robot.keyTap(key.toLowerCase())
		}
		else robot.keyTap(key)
	})
})

}

