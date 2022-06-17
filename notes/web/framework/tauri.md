---
title: tauri
---

# tauri

- [tauri-apps/tauri](https://github.com/tauri-apps/tauri)
  - 支持 多 WebView - core+WebView 进程
  - IPC 走 core 进程路由 - 全局状态应该在 core 进程维护
- Windows WebView2
- macOS 10.13+ WKWebView
- Linux webkitgtk

:::caution

- 不支持类似 Electron 叠加 BrowserView/webview [#2709](https://github.com/tauri-apps/tauri/issues/2709)

:::

```bash
# {x86_64,aarch64,universal}-apple-darwin
# i686-pc-windows-msvc
tauri build --target x86_64-apple-darwin

# 32bit windows
# rustup target add i686-pc-windows-msvc
rustup target list
rustc --version
```
