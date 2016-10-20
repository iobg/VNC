const startBtn = document.getElementById('startBtn')
const server = require('./server')
startBtn.addEventListener('click',()=>{
  server()
})
