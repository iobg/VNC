'use strict'
const io = require('socket.io-client')
const socket = new io.connect('http://localhost:3000')
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
const checkOs=()=>{
	if(process.platform==="darwin"){
		return ['-r','20','-f','avfoundation',
				'-i','1', '-b:v','4000k','-maxrate', '10000k', 
				 '-bufsize','2000k', 
				 '-preset', 'veryslow','-q:v', '8','-f', 'mpeg1video',
				 '-s', '1280x800', '-preset', 'ultrafast',
				 'http://127.0.0.1:8082/password/1280/800']
	}
	else if(process.platform==="win32"){
		return ['-r','20','-f','dshow',
				'-i','video=screen-capture-recorder', 
				'-b:v','4000k','-maxrate', '10000k', 
				 '-bufsize','2000k', 
				 '-preset', 'veryslow','-q:v', '8','-f', 'mpeg1video',
				 '-s', '1280x800', '-preset', 'ultrafast',
				 'http://127.0.0.1:8082/password/1280/800']
	}
	else if(process.platform==="linux"){
		return ['-r','20','-f','x11grab',
				'-i',':0.0', 
				'-b:v','4000k','-maxrate', '10000k', 
				 '-bufsize','2000k', 
				 '-preset', 'veryslow','-q:v', '8','-f', 'mpeg1video',
				 '-s', '1280x800', '-preset', 'ultrafast',
				 'http://127.0.0.1:8082/password/1280/800']
	}
}
let recordArgs = checkOs()
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
	socket.on('clientRightClick',()=>{
		robot.mouseClick('right')
	})
	socket.on('clientMouseMove',mouseObj=>{
		let x = mouseObj.x * 1280
		let y = mouseObj.y * 800
		robot.moveMouse(x,y)
	})
	socket.on('clientKeyPress',key=>{
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
	socket.on('clientScroll', wheelDeltaY=>{
		if(wheelDeltaY > 0){
			robot.scrollMouse(1, "up")
		}
		else{
			robot.scrollMouse(1, "down")
		}
	})
	socket.on('error',(err)=>{
		console.log(err)
	})
}


module.exports={startServer,startRecording, endRecording, password}

