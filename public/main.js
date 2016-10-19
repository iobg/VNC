
  if(Hls.isSupported()) {
    var video = document.getElementById('video');
    var hls = new Hls({capLevelToPlayerSize:true});
    hls.loadSource('/stream.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
  });
 }

