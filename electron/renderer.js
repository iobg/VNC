const startBtn = document.getElementById('startBtn')
const endBtn = document.getElementById('endBtn')
const passwordGiven = document.getElementById('password')

const {startServer,startRecording,endRecording,password} = require('../server')
passwordGiven.innerText=`Password: ${password}`

startBtn.addEventListener('click',()=>{
  startServer()
  startRecording()
})

endBtn.addEventListener('click',()=>{
	endRecording()
	console.log('end')
})

