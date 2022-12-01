---
title: Electron
---

# Electron

- [electron/electron](https://github.com/electron/electron)
- 参考
  - [When a rewrite isn’t: rebuilding Slack on the desktop](https://slack.engineering/308d6fe94ae4)
    - Slack 资源占用降低
      - 2G -> 300M
    - 问题
      - 基于 HTML 模板的手动 DOM 更新 - 重构为使用 React - 响应式更新
      - 过早的数据加载 - 数据缓存、所有数据都假设为懒加载
      - 每个工作空间是一个独立进程 - 重构为单进程、组件感知工作空间 - 完全重写
  - [发布时间线和版本关系](https://www.electronjs.org/docs/tutorial/electron-timelines)
    - Electron 版本, Chrome 版本, Node 版本关系
  - [nodejs release](https://nodejs.org/en/download/releases/)
    - Node 版本 <-> 模块版本
  - [chromedriver](https://github.com/electron/chromedriver)
    - 下载 [ChromeDriver](https://sites.google.com/chromium.org/driver/)
  - [mksnapshot](https://github.com/electron/mksnapshot)
    JS -> 二进制
- Tray 使用 16x16 的 ICON
- https://electronjs.org/docs/api/native-image

tray
https://medium.com/@nahoc/lets-build-a-system-tray-cryptocurrency-tracker-for-mac-using-electron-part-1-7888747891b

:::tip

- electron 主要是提供环境
- 可以区分开发应用和打包应用
  - 开发使用自己熟悉的工具即可
  - 打包使用 electron-builder
- electron 区分 render 和 main 进程
  - main 运行在 node 环境
  - render 运行在 web 环境
  - Web 和 后端/main 通过 ipc 交互
- 前后端推荐使用 preload+contextBridge 进行建立 ipc 通讯

:::

```bash
# 生成 tray 图标
convert logo.png -resize 16x16 tray.png

echo -n 1 1.5 2 3 4 | xargs -d ' ' -n 1 -I {} sh -c 'convert logo.png -resize $(node -pe "16*{}") tray@{}x.png'
```

```bash
# 安装
# https://electronjs.org/docs/tutorial/installation
# 淘宝源开发依赖安装
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm install electron --save-dev

# 淘宝源全局安装
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm install electron -g
# 或者
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ yarn global add electron

# Node ABI 版本
yarn run -- electron -a

# -i,--interactive 交互式命令行
# -r,--require 预加载模块
# -a,--abi 显示 Node ABI
# 应用入口 index.js, folder/package.json, folder/index.js, .html/.htm, http://,https://,file://
electron --inspect=5858 -r ./.erb/scripts/babel-register ./src/main/main.dev.ts

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

# Notes

- 上下文隔离 - Electron 12+ 默认开启
  - 开启后 preload 访问的 window 不是实际的 window
  - 通过 contextBridge 交互
- Fuses - Package time feature toggles
- MessagePort - 类似 window.postMessage，但指定 MessageChannel
  - 浏览器自有接口
  - 使用 ipcRenderer.postMessage 和 WebContents.postMessage 进行交互
  - electron 在主进程支持 MessagePortMain, MessageChannelMain 实现类似语意
  - 新增 close

默认 userAgent 包含了 electron 版本信息，可自定义

```js
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL('http://www.whoishostingthis.com/tools/user-agent/', { userAgent: 'Chrome' });

  win.on('closed', () => {
    win = null;
  });
}
```

# FAQ

## vs NW.js vs Neutralinojs

- [neutralinojs/evaluation](https://github.com/neutralinojs/evaluation) - Neutralinojs vs Electron vs Nw.js
- [Electron vs NW](https://electronjs.org/docs/development/atom-shell-vs-node-webkit)
- [Why I prefer NW.js over Electron? ](https://hackernoon.com/e60b7289752)
  - 支持 chrome.\* 接口
  - 支持 chrome 扩展
  - 支持 bytecode
    - electron 可以自己手动添加
  - 支持移除 dev 工具
  - 支持旧系统
  - 入口可以是 js 或 html
  - 原生 PDF 插件
  - 最新版 Chromium
  - NW.js 支持直接使用 --url 打开一个页面
- Electron
  - 内建自动更新
  - 更大的社区
  - 对 gyp 模块支持的更好
    - electron-rebuild

## Mac 打包后非常大

- [electron/electron#2003](https://github.com/electron/electron/issues/2003)

```
osx       - 117.3 mb
linux32   -  60.3 mb
linux64   -  55.2 mb
win ia32  -  47.8 mb
win x64   -  66.2 mb
```
