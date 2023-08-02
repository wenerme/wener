---
title: Electron Dev
tags:
  - Devlopment
---

# Electron Dev

- preload
  - modules
    - electron - renderer process modules
    - events
    - timers
    - url
  - polyfills
    - Buffer
    - process
    - clearImmediate
    - setImmediate
- sandboxed
  - app.enableSandbox()
  - webPreferences.sandbox
- process.sandboxed
- process.contextIsolated
- 每个 JS 为一个 上下文
- app
  - web-contents-created
  - before-input-event
- BrowserWindow.getFocusedWindow()

| ipcMain | ipcRenderer |
| ------- | ----------- |
| on,once | send        |
| on,once | postMessage |
| on,once | sendSync    |
| on,once | sendTo      |
| on,once | sendToHost  |
| handle  | invoke      |

## Debug app

1. 自定义一个 DEBUG_PROD 变量做特殊处理
2. remote inspect

```bash
# https://localhost:8315
open /Applications/WhatsApp.app --args --remote-debugging-port=8315
```

## 主进程模块

- BrowserWindow - 窗口
- BrowserView - 视图
- ipcMain - 通讯
- webContents - 页面渲染和控制
- webFrame - 自定义当前页面渲染
- webFrameMain - 控制页面也 iframe
- WebRequest - 拦截和修改请求
- session - 管理浏览器会话、cookie、缓存、代理设置

## 渲染进程模块

- contextBridge - 隔离上下文之间的双向同步桥接
  - preload <-> renderer
  - electron 12+ 默认启用 contextIsolation
  - isolated 上下文 - preload 上下文 - 在渲染进程中
    - 可使用 node 模块
- ipcRenderer - renderer 和 main 进程异步通讯
  - EventEmitter + MessageChannel + invoke/sendSync + sendTo/sendToHost
  - invoke 返回 Promise 可用于 RPC
- webFrame - 自定义渲染
  - 缩放、拼写检查、CSS 修改、执行 JS、资源使用情况、缓存

## 公共模块

> main 和 renderer 都可以使用的模块

- clipboard
- crashReporter
- desktopCapturer
- nativeImage
- shell

### 无框窗口

- [frameless-window](https://www.electronjs.org/docs/api/frameless-window)

```css
.titlebar {
  /* 拖动 - 子元素可设置 no-drag */
  -webkit-app-region: drag;
  /* 避免拖动和选择冲突 */
  -webkit-user-select: none;
}
```
