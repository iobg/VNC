  var client = new WebSocket( 'ws://10.0.0.166:8084/');
  let socket= io(client)

    let canvas = document.getElementById('videoCanvas');
    let player = new jsmpeg(client, {canvas:canvas});
    let fsBtn = document.getElementById('fullscreen')

fsBtn.addEventListener('click',()=>{
  canvas.webkitRequestFullScreen()
})

canvas.addEventListener('click',()=>{
	socket.emit('clientMouseClick')
})
canvas.addEventListener('mousemove',event=>{
	mouseObj = {}
	mouseObj.x = event.layerX/ window.innerWidth
	mouseObj.y = event.layerY/ window.innerHeight
	socket.emit('clientMouseMove',mouseObj)
})
canvas.addEventListener('keydown',event=>{
  socket.emit('clientKeyPress',event.key)
  })
canvas.addEventListener('keydown',event=>{
  if(event.key==="Shift") socket.emit('shiftPressed',event.key)
  })
canvas.addEventListener('keyup',event=>{
  if(event.key==="Shift") socket.emit('shiftReleased',event.key)
})
canvas.addEventListener('mousewheel',event=>{
  socket.emit('clientScroll',event.wheelDeltaY)
},{passive:true})
canvas.addEventListener('contextmenu',event=>{
  event.preventDefault()
  socket.emit('clientRightclick')
  return false
}, false)
 
