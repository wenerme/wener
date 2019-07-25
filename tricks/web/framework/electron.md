# Electron

## Tips
* [中文](https://github.com/electron/electron/blob/master/docs-translations/zh-CN/project/README.md)
  * [文档](https://github.com/electron/electron/tree/master/docs-translations/zh-CN)
* 应用
  * [angular/angular-electron](https://github.com/angular/angular-electron)
  * [joaogarin/angular-electron](https://github.com/joaogarin/angular-electron)
    * 更新
  * [akveo/ng2-admin](https://github.com/akveo/ng2-admin)
    * Angular admin dashboard framework
* 参考
  * [AngularClass/awesome-angular](https://github.com/AngularClass/awesome-angular)

```bash
# 安装
# https://electronjs.org/docs/tutorial/installation
# 淘宝源开发依赖安装
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm install electron --save-dev

# 淘宝源全局安装
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm install electron -g
# 或者
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ yarn global add electron

# Mac 下需要 icns 作为图标, 如果安装了 libicns 可以使用命令转换
png2icns app-icon.icns favicon-16x16.png favicon-32x32.png

# 使用 app-icon-1024.png 生成个个尺寸的图标, 并生成 icns
mkdir app-icon.iconset
sips -z 16 16     app-icon-1024.png --out app-icon.iconset/icon_16x16.png
sips -z 32 32     app-icon-1024.png --out app-icon.iconset/icon_16x16@2x.png
sips -z 32 32     app-icon-1024.png --out app-icon.iconset/icon_32x32.png
sips -z 64 64     app-icon-1024.png --out app-icon.iconset/icon_32x32@2x.png
sips -z 128 128   app-icon-1024.png --out app-icon.iconset/icon_128x128.png
sips -z 256 256   app-icon-1024.png --out app-icon.iconset/icon_128x128@2x.png
sips -z 256 256   app-icon-1024.png --out app-icon.iconset/icon_256x256.png
sips -z 512 512   app-icon-1024.png --out app-icon.iconset/icon_256x256@2x.png
sips -z 512 512   app-icon-1024.png --out app-icon.iconset/icon_512x512.png
cp app-icon-1024.png app-icon.iconset/icon_512x512@2x.png
iconutil -c icns app-icon.iconset
rm -R app-icon.iconset
```


## FAQ

### vs NW.js vs Neutralinojs
* [neutralinojs/evaluation](https://github.com/neutralinojs/evaluation) - Neutralinojs vs Electron vs Nw.js
* [Electron vs NW](https://electronjs.org/docs/development/atom-shell-vs-node-webkit)
* [Why I prefer NW.js over Electron? ](https://hackernoon.com/e60b7289752)
  * 支持 chrome.* 接口
  * 支持 chrome 扩展
  * 支持 bytecode
    * electron 可以自己手动添加
  * 支持移除 dev 工具
  * 支持旧系统
  * 入口可以是 js 或 html
  * 原生 PDF 插件
  * 最新版 Chromium
  * NW.js 支持直接使用 --url 打开一个页面
* Electron
  * 内建自动更新
  * 更大的社区
  * 对 gyp 模块支持的更好
    * electron-rebuild


### Mac 打包后非常大
* [electron/electron#2003](https://github.com/electron/electron/issues/2003)

```
osx       - 117.3 mb
linux32   -  60.3 mb
linux64   -  55.2 mb
win ia32  -  47.8 mb
win x64   -  66.2 mb
```
