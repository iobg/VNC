  // var client = new WebSocket( 'wss://myvnc.herokuapp.com');
  let socket= io()

    let canvas = document.getElementById('videoCanvas');
    let player = new jsmpeg(socket, {canvas:canvas});
    let fsBtn = document.getElementById('fullscreen')

fsBtn.addEventListener('click',()=>{
  canvas.webkitRequestFullScreen()
})

canvas.addEventListener('click',()=>{
	socket.emit('clientMouseClick')
})
canvas.addEventListener('touchstart',()=>{
  canvas.focus()
})

canvas.addEventListener('mousemove',event=>{
	mouseObj = {}
	mouseObj.x = event.layerX/ window.innerWidth
	mouseObj.y = event.layerY/ window.innerHeight
	socket.emit('clientMouseMove',mouseObj)
})
window.addEventListener('keydown',event=>{
  socket.emit('clientKeyPress',event.key)
  })
window.addEventListener('keydown',event=>{
  if(event.key==="Shift") socket.emit('shiftPressed',event.key)
  })
window.addEventListener('keyup',event=>{
  if(event.key==="Shift") socket.emit('shiftReleased',event.key)
})
window.addEventListener('mousewheel',event=>{
  socket.emit('clientScroll',event.wheelDeltaY)
},{passive:true})
 
