---
title: wails
---

# wails

- [wailsapp/wails](https://github.com/wailsapp/wails)
  - MIT, Go
  - 基于 Webview 的应用封装
- Windows - [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
- macOS - Safari
- Linux - gcc,libgtk3,libwebkit
- 可使用 upx 压缩, nsis 打包
- 开发环境
  - Vite

:::info

- 不支持多 WebView [#1452](https://github.com/wailsapp/wails/discussions/1452)
  - 目前只有 electron 支持
- DnD 获取真实文件路径 [#1090](https://github.com/wailsapp/wails/issues/1090)
- 自升级 [#1178](https://github.com/wailsapp/wails/issues/1178)

:::

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest

brew install upx nsis # macOS 开发额外依赖
wails doctor          # 检查系统环境

wails init -n my-wails -t react-ts
cd ./my-wails/
wails dev

# -platform Download, Embed, Browser, Error
# -clean 清空 build/bin
# -debug 允许 inspect
wails build -trimpath -upx -platform windows/amd64 -webview2 Embed -nsis
wails build -trimpath -upx -platform darwin/amd64
```

- 生命周期
  - OnStartup
  - OnDomReady
  - OnBeforeClose
  - OnShutdown

## Binding/Bridge

- window.runtime
  - Log{Print,Trace,Debug,Info,Warning,Error,Fatal}
  - Events{On,OnMultiple,Off,Once,Emit}
  - Window{Reload,ReloadApp,SetSystemDefaultTheme,SetLightTheme,SetDarkTheme}
  - Window Center/Fullscreen/Maximise/ToggleMaximise/Unmaximise/Minimise/Unminimise
  - Window Get/Set Size/MaxSize/MinSize/Position
  - Window Hide/Show
  - Window SetRGBA
  - BrowserOpenURL
  - Environment
  - Quit - 退出应用
- Go Runtime
  - Dialog
  - Menu

```ts
export function Greet(arg1) {
  return window['go']['main']['App']['Greet'](arg1);
}
```
