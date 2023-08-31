---
title: JS Cookbook
tags:
  - Cookbook
---

# JS Cookbook

- https://developer.mozilla.org/en-US/docs/Web/Events

```js
// 简单的播放音频
var audio = new Audio('audio_file.mp3');
audio.play();

// JSON 序列化缩进
JSON.stringify({ a: 1, b: 2, c: { d: 1, e: [1, 2] } }, null, 4); // Indented 4 spaces
JSON.stringify({ a: 1, b: 2, c: { d: 1, e: [1, 2] } }, null, '\t'); // Indented with tab

// 模拟按键
var keyboardEvent = document.createEvent('KeyboardEvent');
var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

keyboardEvent[initMethod](
  'keydown', // event type : keydown, keyup, keypress
  true, // bubbles
  true, // cancelable
  window, // viewArg: should be window
  false, // ctrlKeyArg
  false, // altKeyArg
  false, // shiftKeyArg
  false, // metaKeyArg
  40, // keyCodeArg : unsigned long the virtual key code, else 0
  0, // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
);
document.dispatchEvent(keyboardEvent);

// 模拟 jq 按键事件
jQuery.event.trigger({ type: 'keypress', which: character.charCodeAt(0) });

/**
 * 全屏
 *
 * @see http://fullscreen.spec.whatwg.org/
 * @see https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
 */
function fullscreen() {
  var element = document.body;
  // Check which implementation is available
  var requestMethod =
    element.requestFullScreen ||
    element.webkitRequestFullscreen ||
    element.webkitRequestFullScreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen;

  if (requestMethod) {
    requestMethod.apply(element);
  }
}
```

```js
//
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function (search, rawPos) {
      var pos = rawPos > 0 ? rawPos | 0 : 0;
      return this.substring(pos, pos + search.length) === search;
    },
  });
}
```

## 检测方向

- [Prevent orientation change in iOS Safari](https://stackoverflow.com/a/7061983/1870054)

```js
var query = window.matchMedia('(orientation:landscape)');
var isPortrait = !query.matches;

function getOrientation() {
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
}

// https://developer.mozilla.org/en-US/docs/Web/API/Screen
// http://caniuse.com/screen-orientation/embed/
screen.orientation.type;

// https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange
window.addEventListener('orientationchange', function () {
  alert('the orientation of the device is now ' + screen.orientation.angle);
});
```

## 检测网络连通性

```js
function doConnectFunction() {}
function doNotConnectFunction() {}

var i = new Image();
i.onload = doConnectFunction;
i.onerror = doNotConnectFunction;
// CHANGE IMAGE URL TO ANY IMAGE YOU KNOW IS LIVE
i.src = 'http://server.com/some.png?t=' + Date.now();
```

## 检测窗口激活状态

```js
// 切换 tab 后会触发
document.addEventListener('visibilitychange', (e) => console.log('visibilitychange', e));
document.hidden;

// 窗口获取焦点后触发
window.addEventListener('focus', (e) => console.log('focus', e));
document.hasFocus();
```

## sessionStorage 跨 Tab

```js
// transfers sessionStorage from one tab to another
var sessionStorage_transfer = function (event) {
  if (!event) {
    event = window.event;
  } // ie suq
  if (!event.newValue) return; // do nothing if no value to work with
  if (event.key == 'getSessionStorage') {
    // another tab asked for the sessionStorage -> send it
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    // the other tab should now have it, so we're done with it.
    localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
  } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
    // another tab sent data <- get it
    var data = JSON.parse(event.newValue);
    for (var key in data) {
      sessionStorage.setItem(key, data[key]);
    }
  }
};

// listen for changes to localStorage
if (window.addEventListener) {
  window.addEventListener('storage', sessionStorage_transfer, false);
} else {
  window.attachEvent('onstorage', sessionStorage_transfer);
}

// Ask other tabs for session storage (this is ONLY to trigger event)
if (!sessionStorage.length) {
  localStorage.setItem('getSessionStorage', 'foobar');
  localStorage.removeItem('getSessionStorage', 'foobar');
}
```

## 检测虚拟机

```js
var canvas = document.createElement('canvas');
var gl = canvas.getContext('webgl');

var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

console.log(vendor);
console.log(renderer);
```

- [Virtual Machine Detection In The Browser](https://bannedit.github.io/Virtual-Machine-Detection-In-The-Browser.html)

## formatBytes

- https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
- filesize
- pretty-bytes

```js
function formatBytes(bytes, decimals) {
  if (bytes == 0) return '0 Bytes';
  var k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Usage:
// formatBytes(bytes,decimals)

formatBytes(1024); // 1 KB
formatBytes('1024'); // 1 KB
formatBytes(1234); // 1.21 KB
formatBytes(1234, 3); // 1.205 KB
```
