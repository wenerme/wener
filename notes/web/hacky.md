# Hacky

* http://desowin.org/usbpcap/
* https://github.com/dominicgs/USBProxy
* onlinehashcrack.com
* https://github.com/jvinet/knock

## tampermonkey
tampermonkey 是一款很棒的用户脚本管理工具,以下的一些操作都是使用 tampermonkey 运行的.

* 脚本网站
  * https://greasyfork.org/zh-CN

## 解决百度云盘不能下载大文件的问题

* 百度云盘的移动端是能够直接下载的
* 但是访问移动端页面时会自动跳转到 Web 端
* 因此只需要避免跳转即可
* 是否跳转是根据 navigator.platform 判断的

__修改 navigator.platform__

```js
// 一定要在加载之前运行
// @run-at: document-start
var fakePlatformGetter = function () {
    return "Android";
};
if (Object.defineProperty) {
    Object.defineProperty(navigator, "platform", {
        get: fakePlatformGetter
    });
} else if (Object.prototype.__defineGetter__) {
    navigator.__defineGetter__("platform", fakePlatformGetter);
}
```
