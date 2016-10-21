const startBtn = document.getElementById('startBtn')
const endBtn = document.getElementById('endBtn')
const {startServer,closeConnection,startRecording,endRecording} = require('./server')

startBtn.addEventListener('click',()=>{
  startServer()
  startRecording()
})

endBtn.addEventListener('click',()=>{
	closeConnection()
	endRecording()
	console.log('end')
})

