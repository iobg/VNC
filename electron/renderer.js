const startBtn = document.getElementById('startBtn')
const endBtn = document.getElementById('endBtn')
const passwordGiven = document.getElementById('password')

const {startServer,startRecording,endRecording,password} = require('../server')
passwordGiven.innerText=`Password: ${password}`

let currentlyRecording = false;

startBtn.addEventListener('click',()=>{
	if(!currentlyRecording){
		startServer()
  	startRecording()
  	currentlyRecording=true;
  }
})
	
 

endBtn.addEventListener('click',()=>{
	if(currentlyRecording){
		endRecording()
		currentlyRecording=false
		console.log('end')
	}
	
})

