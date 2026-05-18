---
tags:
  - FAQ
---

# Windows Dev FAQ

| abbr. | stand for                | cn      | notes |
| ----- | ------------------------ | ------- | ----- |
| DWM   | Desktop Window Manager   | dwm.exe |
| WGC   | Windows Graphics Capture |
| UWP   | Universal Windows Platform |

- DWM
  - 窗口合成 compositing
  - 透明效果、阴影、动画
  - Aero / Fluent 视觉效果
  - 高 DPI 缩放相关合成
  - 多显示器桌面合成
  - VSync / 帧同步
  - 给一些截图 API 提供窗口画面来源

## 截屏

- GDI / BitBlt 截屏
  - `GetDC(NULL)`
  - `CreateCompatibleDC`
  - `CreateCompatibleBitmap`
  - `BitBlt`
  - 优点：
    - 简单
    - 兼容老系统
    - 适合截取桌面 DC
  - 缺点：
    - 对硬件加速窗口、DirectX、UWP、受保护内容支持不好
    - 可能截不到透明窗口、覆盖层、视频、游戏等内容
    - 多显示器、高 DPI 情况下需要额外处理
- PrintWindow
  - Win32API
  - 截取指定窗口
  - 截取被遮挡窗口
  - 获取窗口客户区或整个窗口
  - 优点：
    - 可以针对窗口句柄 `HWND`
    - 某些情况下能截取被遮挡窗口
  - 缺点：
    - 依赖目标窗口是否响应绘制请求
    - 对 GPU 加速窗口不稳定
    - Chromium、Electron、游戏、视频窗口可能黑屏或空白
    - UWP / DirectComposition 内容可能截不到
- DWM
  - `DwmRegisterThumbnail`
  - `DwmUpdateThumbnailProperties`
  - DWM thumbnails
  - DWM composition surface
- Windows Graphics Capture / WGC
  - Windows 10 1903+
  - `Windows.Graphics.Capture`
  - `GraphicsCaptureItem`
  - `Direct3D11CaptureFramePool`
  - `GraphicsCaptureSession`
  - 屏幕 display
  - 窗口 window
  - 应用区域
  - 优点：
    - 官方现代 API
    - 支持 GPU 路径
    - 适合实时录屏和窗口捕获
    - 对现代应用、DirectX、Electron、浏览器兼容性更好
    - 可捕获窗口而不依赖传统 GDI
  - 缺点：
    - 需要较新 Windows 版本
    - 通常需要用户授权/选择目标
    - 涉及 Direct3D / WinRT，代码复杂度比 GDI 高
    - 受保护内容仍然可能不能捕获
- DXGI Desktop Duplication
  - `IDXGIOutputDuplication`
  - `DuplicateOutput`
  - 优点：
    - 性能高
    - 适合全屏录制
    - GPU 路径
    - 能拿到桌面帧变化
  - 缺点：
    - 主要用于捕获显示器输出，不是单窗口捕获
    - 多显示器需要分别处理
    - 独占全屏、受保护内容、权限场景可能受限
    - 不适合直接捕获隐藏/遮挡窗口
  - 适合做录屏、远程桌面、直播推流这类场景。
- Magnification API
  - Windows 放大镜 API 也可以用于捕获屏幕区域。
  - `MagInitialize`
  - `MagSetWindowSource`
  - `MagSetImageScalingCallback`
  - 特点：
    - 可捕获屏幕区域
    - 有些历史截屏工具会用
    - 不是现代首选方案
    - 兼容性和限制比较多
- Media Foundation / Windows Capture APIs
  - Media Foundation
  - Windows.Graphics.Capture
  - Direct3D 11
  - DXGI
  - Windows.Media.Transcoding
  - 这类不是单纯“截一张图”，而是视频采集流水线。

## 自动化操作
- `SendInput`
- `mouse_event` / `keybd_event`，旧 API
- AutoHotkey
- pyautogui
- Power Automate Desktop
- WinAppDriver 某些场景

---

 Win32 消息：可以后台发，但兼容性有限

 - `SendMessage`
 - `PostMessage`
 - `WM_KEYDOWN`
 - `WM_KEYUP`
 - `WM_CHAR`
 - `WM_LBUTTONDOWN`
 - `WM_LBUTTONUP`
 - `BM_CLICK`
 - `WM_COMMAND`


 ---

 UI Automation / UIA：推荐的系统级 UI 自动化

- `Microsoft UI Automation
- `UIAutomationCore.dll`
- .NET `System.Windows.Automation`
- Python `pywinauto`
- FlaUI
- WinAppDriver
- Windows Application Driver

---

Accessibility / MSAA / IAccessible：老式无障碍接口

- Microsoft Active Accessibility，MSAA
- `IAccessible`
- `oleacc.dll`

---

COM Automation：Office / IE / Windows 组件常见

- Excel COM
- Word COM
- Outlook COM
- Shell.Application
- WMI
- Task Scheduler COM

---

PowerShell / WMI / Registry：系统管理自动化

适合自动化 Windows 系统本身：

- 服务管理
- 进程管理
- 注册表
- 计划任务
- 防火墙规则
- 网络配置
- 事件日志
- 用户/组
- 软件安装
- Windows 设置

代表：

- PowerShell
- WMI / CIM
- Registry
- `schtasks`
- `sc`
- `netsh`
- Windows Terminal / Shell 命令

---

 WebDriver / WinAppDriver / Appium for Windows

---

Hook / DLL 注入 / 内部渲染捕获：能力强，但侵入性高

- Windows Hook
- DLL Injection
- Detours
- EasyHook
- Frida
- DirectX Hook
- OpenGL/Vulkan Hook
- 游戏/图形程序内部捕获


---

RPA 平台：低代码，适合业务流程

- Power Automate Desktop
- UiPath
- Automation Anywhere
- Blue Prism
- AutoHotkey
- AutoIt
