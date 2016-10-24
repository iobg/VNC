const startBtn = document.getElementById('startBtn')
const endBtn = document.getElementById('endBtn')
const passwordGiven = document.getElementById('password')

const {startServer,closeConnection,startRecording,endRecording,password} = require('../server')
passwordGiven.innerText=password

startBtn.addEventListener('click',()=>{
  startServer()
  startRecording()
})

endBtn.addEventListener('click',()=>{
	closeConnection()
	endRecording()
	console.log('end')
})

