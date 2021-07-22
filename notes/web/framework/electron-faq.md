---
title: Electron FAQ
---

# Electron FAQ

## 无边控窗口偶尔无法拖动

- [electron/electron#21621](https://github.com/electron/electron/issues/21621)

## 如何检测运行在 electron

```js
window && window.process && window.process.type;

process.versions['electron'];

// Electron/
navigator.userAgent;

// 如果 contextBridge.exposeInMainWorld
globalThis.electron;
```

- [electron/electron#2288](https://github.com/electron/electron/issues/2288)

## BrowserView vs webview

- BrowserWindow - 用于替代 webview 标签
  - Electron 接口 - 非 DOM - 位置相对于父窗口，需要自行管理
  - 不开启额外渲染进程 - 主进程控制
- webview - 不推荐使用
  - html tag - 好使用，好布局
  - 额外渲染进程 - out-of-process iframe - 所有通讯都是 IPC
  - 速度慢于 iframe

---

- 参考
  - [web-embeds](https://www.electronjs.org/docs/tutorial/web-embeds)

## Chrome 扩展支持情况

支持部分扩展

- [Chrome 扩展支持](https://www.electronjs.org/docs/api/extensions)

## Failed to fetch extension, trying 4 more times

最好启动时开代理，比如一般会加载 react devtool

- fmkadmapgofadopljbjfkapdkoienihi - React Developer Tools

```bash
ls "$HOME/Library/Application Support/Electron/extensions/"
```

## ExtensionLoadWarning: Warnings loading extension at

electron 高版本 插件加载失败

- [MarshallOfSound/electron-devtools-installer#191](https://github.com/MarshallOfSound/electron-devtools-installer/pull/191)

## 安全相关问题

- https://www.electronjs.org/docs/tutorial/security

## Electron Helper (Renderer) CoreText note: Client requested name ".PingFangSC-Semibold", it will get Times-Roman rather than the intended font. All system UI font access should be through proper APIs such as CTFontCreateUIFontForLanguage() or +[NSFont systemFontOfSize:].
