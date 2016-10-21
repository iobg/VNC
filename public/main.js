const socket = io()
const video = document.getElementById('video');


  if(Hls.isSupported()) {
    var hls = new Hls({capLevelToPlayerSize:true});
    hls.loadSource('stream.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
  });
 }
 

video.addEventListener('click',()=>{
	socket.emit('clientMouseClick')
})

video.addEventListener('mousemove',event=>{
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
