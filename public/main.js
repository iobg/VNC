  var client = new WebSocket( 'ws://10.0.0.166:8084/');
  let socket= io(client)

    var canvas = document.getElementById('videoCanvas');
    var player = new jsmpeg(client, {canvas:canvas});


canvas.addEventListener('click',()=>{
	socket.emit('clientMouseClick')
})

canvas.addEventListener('mousemove',event=>{
	mouseObj = {}
	mouseObj.x = event.layerX
	mouseObj.y = event.layerY
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
