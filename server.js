'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const io = socketio(server)
const robot = require('robotjs')
const { spawn } = require('child_process')
const cors = require('cors')
const enableDestroy = require('server-destroy')(server)
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
let recording=null


//middleware

let args = ['-r','24','-f','avfoundation',
					  '-pixel_format','yuv420p','-i','1',
					  '-vcodec','h264','-vf','scale=1280:800',
					  '-preset','ultrafast','-tune','zerolatency',
					  '-g','0','-hls_flags','delete_segments',
					  '-hls_time','0.5','-hls_list_size','2', 
					  '-hls_allow_cache','0','-segment_list_flags','+live',
					  '-increment_tc', '1',
					  '-hls_segment_filename','videostream/file%03d.ts',
					  'videostream/stream.m3u8']
app.set('view engine', 'pug')
app.use(express.static('public'));
app.use(cors())
app.use(bodyParser())
app.use(routes)

const startRecording=()=>{
 // recording=spawn('ffmpeg', args )
}
const closeConnection=()=>{
	server.destroy()
}
const endRecording=()=>{
	recording.kill()
}
const makePassword=()=>{
	return Math.random().toString(36).slice(-6)
}
const password = makePassword()

const startServer=()=>{

server.listen(3000,()=>{
	console.log('server listening')
		
})

io.on('connect',socket=>{
	console.log(socket.id)
	let shift=false;
	socket.on('clientMouseClick',()=>{
		robot.mouseClick()
	})
	socket.on('clientMouseMove',mouseObj=>{
		robot.moveMouse(mouseObj.x,mouseObj.y)
	})
	socket.on('clientKeyPress',key=>{
		console.log(key)
		if(key === 'Meta'){
			robot.keyTap('command')
		}
		else if(key === 'ArrowUp'){
			robot.keyTap('up')
		}
		else if(key === 'ArrowDown'){
			robot.keyTap('down')
		}
		else if(key === 'ArrowLeft'){
			robot.keyTap('left')
		}
		else if(key === 'ArrowRight'){
			robot.keyTap('right')
		}
		else if(key.length > 1){
			robot.keyTap(key.toLowerCase())
		}
		else{
			if(shift) robot.keyTap(key.toLowerCase(),'shift')
			robot.keyTap(key)
		} 
	})
	socket.on('shiftPressed',()=>{
		shift=true;
	})
	socket.on('shiftReleased',()=>{
		shift=false;
	})
	socket.on('error',(err)=>{
		console.log(err)
	})
})
}

module.exports={startServer,closeConnection,startRecording, endRecording, password}

