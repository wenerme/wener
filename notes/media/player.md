# Player

## ExoPlayer
* [google/ExoPlayer](https://github.com/google/ExoPlayer)
* An extensible media player for Android

## video.js
* [videojs/video.js](https://github.com/videojs/video.js)

## hls.js
* [video-dev/hls.js](https://github.com/video-dev/hls.js)
  * JavaScript HLS client using Media Source Extension
* http://video-dev.github.io/hls.js/demo
* [API.md](https://github.com/video-dev/hls.js/blob/master/docs/API.md)
* [How to Add Subtitles to a Live HLS Stream](http://hlsbook.net/how-to-add-subtitles-to-a-live-hls-stream/)

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<video id="video"></video>
<script>
  var video = document.getElementById('video');
  if(Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
  });
 }
 // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
 // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
 // This is using the built-in support of the plain video element, without using hls.js.
 // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
 // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
    video.addEventListener('loadedmetadata',function() {
      video.play();
    });
  }
</script>
```

```js
/**
 * auto detect and load hls
 * <video data-hls-src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8">
 */
(function () {
    function HlsInit() {
        document.querySelectorAll('video[data-hls-src]').forEach(function (video) { __HlsVideo(video) })
        function __HlsVideo(video) {
            var src = video.getAttribute('data-hls-src');
            video.removeAttribute('data-hls-src');
            // click to play or pause
            video.addEventListener('click', function () { if (video.paused) { video.play() } else { video.pause() } });
            if (Hls.isSupported()) {
                var hls = new Hls({ maxBufferLength: 10, maxBufferSize: 20 });
                hls.loadSource(src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    // video.play(); //  use autoplay to control
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = src;
                video.addEventListener('loadedmetadata', function () {
                    // video.play();
                });
            }
        }
    };
    if(window.Hls){
        HlsInit()
    }else{
        var script = document.createElement('script');
        // better to remove the amd and cmd module detect
        script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
        script.onload = HlsInit
        document.head.appendChild(script);
    }
})();
```

## dash.js
* [Dash-Industry-Forum/dash.js](https://github.com/Dash-Industry-Forum/dash.js)
* A reference client implementation for the playback of MPEG DASH via Javascript and compliant browsers.

```js
if ( typeof ( window.MediaSource || window.WebKitMediaSource ) === "function" ) {
  // 支持 dash.js
}
```

```html
<!doctype html>
<html>
    <head>
        <title>Dash.js Rocks</title>
    </head>
    <body>
        <div>
            <video id="videoPlayer" controls style="width: 640px;height: 360px;"></video>
        </div>
        <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
        <!-- http://reference.dashif.org/dash.js/nightly/dist/dash.all.min.js -->
        <!-- http://reference.dashif.org/dash.js/nightly/dist/dash.all.debug.js -->
        <script>
            (function(){
                var url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
                var player = dashjs.MediaPlayer().create();
                player.initialize(document.querySelector("#videoPlayer"), url, true);
            })();
        </script>
    </body>
</html>
```
