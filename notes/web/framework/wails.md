---
title: wails
---

# wails

- [wailsapp/wails](https://github.com/wailsapp/wails)
  - MIT, Go
  - 基于 Webview 的应用封装
- WML
- Windows - [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
- macOS - Safari
- Linux - gcc,libgtk3,libwebkit
- 可使用 upx 压缩, nsis 打包
- 开发环境
  - Vite

:::info

- Roadmap [#1484](https://github.com/wailsapp/wails/discussions/1484)
- 不支持多 WebView [#1452](https://github.com/wailsapp/wails/discussions/1452)
  - 目前只有 electron 支持
- DnD 获取真实文件路径 [#1090](https://github.com/wailsapp/wails/issues/1090)
- 自升级 [#1178](https://github.com/wailsapp/wails/issues/1178)

:::

```bash
# for V2
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

## app

- 注入内容
  - /wails/runtime.js
  - /wails/ipc.js
- `<div data-wails-drag>` -> `style="--wails-dragable:drag"`
  - `style="--wails-draggable:no-drag"`

```html
<!-- noautoinjectruntime, noautoinjectipc, noautoinject -->
<meta name="wails-options" content="[options]" />
```

```ts
window._wails;
window.wails;
```

- [Wails v3 Desktop Runtime](https://github.com/wailsapp/wails/tree/v3-alpha/v3/internal/runtime/desktop)

## wails v3

- v3
  - 声明式 -> 过程式
  - 多窗口
  - 集成 系统托盘
  - 优化 bindings 实现和生成逻辑
  - 使用 taskfile 构建
  - 优化事件
  - WML - Wails Markup Language
    - 有点类似 htmx
    - element 特殊属性
      - `wlm-window` - 操作窗口
        - Center,Close,Minimize,Maximize,UnMaximize,FullScreen,UnFullScreen,Restore
      - `wlm-event` - emit 事件
        - `wlm-trigger` - 触发条件
          - 例如 mouseover
- [Wails v3 Alpha Source](https://github.com/wailsapp/wails/tree/v3-alpha)
- [Wails v3 Alpha Docs](https://v3alpha.wails.io/)
- events
  - 三种类型
    - ApplicationEvent
    - WindowEvent
    - CustomEvent - 字符串
  - ApplicationEvent, WindowEvent 和 js 交互的时候会做 字符串 uint 的 mapping
  - events.Common.ApplicationStarted
    - events.Mac.ApplicationDidFinishLaunching
    - events.Windows.ApplicationStarted
  - events.Common.WindowRuntimeReady
    - WebView runtime

```bash
go install -v github.com/wailsapp/wails/v3/cmd/wails3@latest

wails3 version

wails3 init -n my-app
cd my-app
wails3 build
./bin/my-app
```

## syso

- 使用 [tc-hib/winres](https://github.com/tc-hib/winres)
- info.json
  - res.SetVersionInfo
  - RT_VERSION
  - langId
    - https://learn.microsoft.com/en-us/windows/win32/intl/language-identifiers
    - GetUserDefaultLocaleName
    - GetSystemDefaultLocaleName
    - https://github.com/cloudfoundry-attic/jibber_jabber
- wails.exe.manifest
  - [winres manifest.go](https://github.com/tc-hib/winres/blob/master/manifest.go)

```json title="info.json"
{
  "fixed": {
    "file_version": "",
    "product_version": "",
    "flags": "", // debug, prerelease, patched, privatebuild, specialbuild
    "type": "", // app, dll
    "timestamp": ""
  },
  "info": {
    // langID
    "000": {
      "file_version": "",
      "product_version": "",
      "flags": "",
      "type": "",
      "KEY": "Value"
    }
  }
}
```

```bash
# wails3 generate syso -arch {{.ARCH}} -icon icon.ico -manifest wails.exe.manifest -info info.json -out ../wails.syso
```

```go
// AppManifest describes an application manifest.
//
// Its zero value corresponds to the most common case.
type AppManifest struct {
	Identity                          AssemblyIdentity `json:"identity"`
	Description                       string           `json:"description"`
	Compatibility                     SupportedOS      `json:"minimum-os"`
	ExecutionLevel                    ExecutionLevel   `json:"execution-level"`
	UIAccess                          bool             `json:"ui-access"` // Require access to other applications' UI elements
	AutoElevate                       bool             `json:"auto-elevate"`
	DPIAwareness                      DPIAwareness     `json:"dpi-awareness"`
	DisableTheming                    bool             `json:"disable-theming"`
	DisableWindowFiltering            bool             `json:"disable-window-filtering"`
	HighResolutionScrollingAware      bool             `json:"high-resolution-scrolling-aware"`
	UltraHighResolutionScrollingAware bool             `json:"ultra-high-resolution-scrolling-aware"`
	LongPathAware                     bool             `json:"long-path-aware"`
	PrinterDriverIsolation            bool             `json:"printer-driver-isolation"`
	GDIScaling                        bool             `json:"gdi-scaling"`
	SegmentHeap                       bool             `json:"segment-heap"`
	UseCommonControlsV6               bool             `json:"use-common-controls-v6"` // Application requires Common Controls V6 (V5 remains the default)
}

// AssemblyIdentity defines the side-by-side assembly identity of the executable.
//
// It should not be needed unless another assembly depends on this one.
//
// If the Name field is empty, the <assemblyIdentity> element will be omitted.
type AssemblyIdentity struct {
	Name    string
	Version [4]uint16
}
```
