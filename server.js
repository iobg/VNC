'use strict'
const io = require('socket.io-client')
const socket = new io.connect('http://myvnc.herokuapp.com')
const robot = require('robotjs')
const { spawn } = require('child_process')

let recording=null

const makePassword=()=>{
	return Math.random().toString(36).slice(-6)
}
const password = makePassword()

socket.on('connect',()=>{
	socket.emit('firstConnect', password)
	socket.emit('desktopId', socket.id)
})

let recordArgs = ['-r', '20','-f','avfoundation',
						'-i','1','-f', 'mpeg1video',
						 '-b', '4000k', '-preset', 'ultrafast',
						 '-s', '1280x800',
						 'http://127.0.0.1:8082/password/1280/800']

const startRecording=()=>{
		recording = spawn('ffmpeg', recordArgs )
}
const endRecording=()=>{
	recording.kill()
}

const startServer=()=>{
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
}


module.exports={startServer,startRecording, endRecording, password}

