const socket = io()
const video = document.getElementById('video');

  if(Hls.isSupported()) {
    var hls = new Hls({capLevelToPlayerSize:true});
    hls.loadSource('/stream.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
  });
 }

video.addEventListener('click',()=>{
	socket.emit('clientMouseClick')
})

video.addEventListener('mousemove',()=>{
	mouseObj = {}
	mouseObj.x = event.layerX
	mouseObj.y = event.layerY
	socket.emit('clientMouseMove',mouseObj)
})
window.addEventListener('keydown',()=>{
  socket.emit('clientKeyPress',event.key)
  })

