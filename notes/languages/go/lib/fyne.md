---
title: fyne
---

# fyne

- [fyne-io/fyne](https://github.com/fyne-io/fyne)
  - MIT, Golang
  - 跨平台 GUI 库 - 组件
  - Material Design 风格
- 参考
  - [Pre-built Mesa3D drivers for Windows](https://github.com/pal1000/mesa-dist-win)
- 问题
  - 必须要有 OpenGL 2.0+ 环境 - Windows Server 环境不一定能用
  - Windows VM 可能有问题 - https://github.com/fyne-io/fyne/issues/410
  - 不支持 DnD - https://github.com/fyne-io/fyne/issues/142
  - 不支持托盘 - https://github.com/fyne-io/fyne/issues/283
    - 现有的 tray 都需要运行在 main 线程，且是阻塞运行 - 因此通常无法共存


```bash
# windows 构建
GOOS=windows GOARCH=amd64 CGO_ENABLED=1 CC=x86_64-w64-mingw32-gcc go build main.go
```
