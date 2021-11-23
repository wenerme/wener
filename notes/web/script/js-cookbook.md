---
title: JS Cookbook
tags:
  - Cookbook
---

# JS Cookbook

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
