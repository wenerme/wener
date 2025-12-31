---
title: Linux 桌面环境综述 (Linux Desktop Overview)
tags:
  - Linux
  - Desktop
  - DE
  - WM
  - X11
  - Wayland
---

# Linux 桌面环境综述 (Linux Desktop Overview) {#linux-desktop-overview}

- [Awesome Desktop](./desktop-awesome.md)
- [X11 Window System](./x11/README.md)

## 核心概念 (Core Concepts) {#core-concepts}

- **WM - Window Manager (窗口管理器)**
  - 管理窗口：位置、堆叠、焦点、输入、热键
  - 渲染合并层
  - 会话管理
- **DE - Desktop Environment (桌面环境)**
  - 提供完整桌面体验
  - 集成基础应用：归档器、媒体播放器、文本编辑器、截图工具、图片查看器等

> [!TIP]
> 没有 Window Manager 也能显示窗口内容，只是无法操作窗口（移动、缩放等）。

## 常见桌面环境 (Common DEs) {#common-des}

- Xfce (xfwm)
- GNOME
- Unity (Compiz)
- KDE (KWin)

- [Display server - Wikipedia](https://en.wikipedia.org/wiki/Display_server)

## 常见问题 (FAQ) {#faq}

### Wayland vs X11

- **X11**
  - C/S 结构
  - 安全性较难控制（服务总线事件共享）
- **Wayland**
  - 客户端通过 Compositor 直接交互
  - GUI 层实现隔离
  - 参考：[Wayland vs Xorg](https://www.secjuice.com/wayland-vs-xorg/)

### 调试工具

```bash
# X11 影响任意输入
xinput list
xinput test <id>
{{ ... }}
```
