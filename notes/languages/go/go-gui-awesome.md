---
title: Go GUI Awesome
---

# Go GUI Awesome

- [fyne-io/fyne](https://github.com/fyne-io/fyne)
  - [#283](https://github.com/fyne-io/fyne/issues/283) - tray 支持
  - OpenGL 2.0+
  - 需要有显卡
- [therecipe/qt](https://github.com/therecipe/qt) - QT 绑定
  - Go, JavaScript/TypeScript, Dart/Flutter, Haxe, Swift
- [andlabs/ui](https://github.com/andlabs/ui)
  - [andlabs/libui](https://github.com/andlabs/libui) 的 Go 绑定
- [gotk3/gotk3](https://github.com/gotk3/gotk3)
- [mattn/go-gtk](https://github.com/mattn/go-gtk) - 不活跃
- 基于 Web
  - [webview/webview](https://github.com/webview/webview) - 基于本地浏览器
    - 依赖 DLL
      - [#366](https://github.com/webview/webview/issues/366) - Embed DLLs?
  - [asticode/go-astilectron](https://github.com/asticode/go-astilectron) - 基于 Electron
    - Go binding [asticode/astilectron](https://github.com/asticode/astilectron) - Electron API over TCP
  - [sciter-sdk/go-sciter](https://github.com/sciter-sdk/go-sciter)
    - 嵌入式 HTML/CSS/Script 引擎 - 不依赖浏览器
    - 目前只允许动态链接 - 8-15 MB
  - [wailsapp/wails](https://github.com/wailsapp/wails)
- 平台相关
  - Windows
    - [lxn/walk](https://github.com/lxn/walk) - Windows Application Library Kit
- 工具
  - [pkg/browser](https://github.com/pkg/browser) - 打开浏览器
  - [getlantern/systray](https://github.com/getlantern/systray)
    - 跨平台 tray
    - 问题
      - Quit 会退出程序而不是退出 loop
      - 主 Loop 会一直运行，无法退出
  - [zserge/tray](https://github.com/zserge/tray)
    - C 语言跨平台 tray
- 参考
  - https://golangr.com/gui/
- 结论
  1. fyne - 如果限制能满足
  2. libui - 如果不需要基于 web 的界面
  3. 打开 本地浏览器 - 使用 tray
  4. sciter - 集成浏览器，基础 web 功能
  5. walk - 如果只需支持 windows 且界面简单
  6. go-astilectron - 完整 web 功能 + 扩展
- 注意
  - macOS 要求在主线程操作 GUI - 多个 UI 库无法同时使用

## Keyboard

- [micmonay/keybd_event](https://github.com/micmonay/keybd_event) - simulates the key press on a keyboard

## Misc

- [fogleman/gg](https://github.com/fogleman/gg)
  2D rendering in Go

## Game

- [hajimehoshi/ebiten](https://github.com/hajimehoshi/ebiten)
  2D game library
  - Apache-2.0
- [faiface/pixel](https://github.com/faiface/pixel)
  hand-crafted 2D game library
  - MIT
