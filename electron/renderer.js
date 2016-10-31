const startBtn = document.getElementById('startBtn')
const endBtn = document.getElementById('endBtn')
const passwordGiven = document.getElementById('password')
const status = document.getElementById('status')

const {startServer,startRecording,endRecording,password} = require('../server')
passwordGiven.innerText=`Password: ${password}`

let currentlyRecording = false;

startBtn.addEventListener('click',()=>{
	if(!currentlyRecording){
		startServer()
  	startRecording()
  	status.innerText = "Connection Open"
  	status.className = "start"
  	currentlyRecording=true;
  }
})
	

endBtn.addEventListener('click',()=>{
	if(currentlyRecording){
		endRecording()
		currentlyRecording=false
		status.innerText = "Connection Closed"
		status.className = "end"
		console.log('end')
	}
	
})

