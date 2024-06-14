---
title: Chrome Version
tags:
  - Version
---

# Chrome Version

| version                   | date       | notes                                             |
| ------------------------- | ---------- | ------------------------------------------------- |
| [Chrome 125](#chrome-125) |            | css anchor                                        |
| [Chrome 123](#chrome-123) |            | WebSocketStream                                   |
| [Chrome 123](#chrome-123) |            | css field-sizing                                  |
| [Chrome 122](#chrome-122) |            | zstd                                              |
| [Chrome 121](#chrome-121) |            | EditContext                                       |
| [Chrome 120](#chrome-120) | 2023-12-29 |                                                   |
| [Chrome 119](#chrome-119) |            |                                                   |
| [Chrome 118](#chrome-118) |            |                                                   |
| [Chrome 117](#chrome-117) |            | `@starting-style`                                 |
| [Chrome 116](#chrome-116) |            |                                                   |
| [Chrome 115](#chrome-115) |            |                                                   |
| [Chrome 114](#chrome-114) |            | popovertarget,popover                             |
| [Chrome 113](#chrome-113) |            |                                                   |
| [Chrome 112](#chrome-112) |            |                                                   |
| [Chrome 111](#chrome-111) |            |                                                   |
| [Chrome 110](#chrome-110) |            | `<popup>`                                         |
| [Chrome 109](#chrome-109) |
| [Chrome 108](#chrome-108) |
| [Chrome 107](#chrome-107) |
| [Chrome 106](#chrome-106) |
| [Chrome 105](#chrome-105) | 2022-08-30 | Container Query, :has, import.meta.resolve, HEVC  |
| [Chrome 104](#chrome-104) |            |
| [Chrome 103](#chrome-103) |            | Local Font Access                                 |
| [Chrome 102](#chrome-102) | 2022-05-24 | DNS HTTPS, Navigation                             |
| [Chrome 101](#chrome-101) |            |
| [Chrome 100](#chrome-100) | 2022-03-29 |
| [Chrome 99](#chrome-99)   |            | OPFS, @layer                                      |
| [Chrome 98](#chrome-98)   |
| [Chrome 97](#chrome-97)   |
| [Chrome 96](#chrome-96)   |
| [Chrome 95](#chrome-95)   | 2021-09-20 |
| [Chrome 94](#chrome-94)   |
| [Chrome 93](#chrome-93)   |
| [Chrome 92](#chrome-92)   |
| [Chrome 91](#chrome-91)   |
| [Chrome 90](#chrome-90)   | 2021-02-28 |
| [Chrome 89](#chrome-89)   |            |
| [Chrome 88](#chrome-88)   |            |
| [Chrome 87](#chrome-87)   |            |
| [Chrome 86](#chrome-86)   | 2020-10-06 | File System Access API                            |
| [Chrome 86](#chrome-86)   |            |
| [Chrome 85](#chrome-85)   |            |
| [Chrome 84](#chrome-84)   |            |
| [Chrome 83](#chrome-83)   |            |
| [Chrome 81](#chrome-81)   |            |
| [Chrome 80](#chrome-80)   | 2019-12-05 |
| [Chrome 70](#chrome-70)   | 2018-08-29 | AV1                                               |
| [Chrome 60](#chrome-60)   | 2017-05-23 |
| [Chrome 49](#chrome-49)   | 2016-03-02 | last Windows XP, Vista; Mac OS X 10.6, 10.7, 10.8 |
| [Chrome 28](#chrome-28)   | 2013-07-09 | Blink                                             |
| Chrome 1                  | 2008-12-11 |

- 基本一年 8-10 个版本, 大约 30 天一个版本
- https://chromestatus.com/features
- https://chromestatus.com/roadmap
  - 每个版本的特性变化
  - 关注 Enabled by default
- https://webstatus.dev/
- https://bugs.chromium.org/p/chromium/issues/list
- https://chromiumdash.appspot.com/schedule
- [What's New in DevTools](https://developer.chrome.com/tags/new-in-devtools/)
- 参考
  - [Getting started with Trust Tokens](https://web.dev/trust-tokens/)
    - combat fraud, distinguish bot without passive tracking
  - [Getting started with Chrome's origin trials](https://developer.chrome.com/blog/origin-trials/)
    - test a new or experimental web platform feature
    - [Chrome Origin Trials](https://developer.chrome.com/origintrials/#/trials/active)
  - [Web on Android Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity/)
    - PWA Android
  - https://web.dev/reporting-api/
  - [Google Chrome version history](https://en.wikipedia.org/wiki/Google_Chrome_version_history)

:::tip

- [2023 CSS 总结](https://developer.chrome.com/blog/css-wrapped-2023)
- 暴露 Socket - 支持 TCP 和 UDP - [Raw Sockets API](https://chromestatus.com/feature/6398297361088512)
- Container Query - Chrome 105
- :has - Chrome 105 - https://chromestatus.com/feature/5794378545102848
- Sanitizer API
  - https://web.dev/sanitizer/
  - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
- OPFS - Origin Private File System, CSS @layer - Chrome 99
- structuredClone - Chrome 98
- WebTransport - Chrome 97

:::

:::caution

- blocked ports
  - 989, 990 - FTPS
  - 10080, 554
    - NAT Slipstream 2.0 attack
    - samy.pl/slipstream/
  - 5060, 5061 - SIP
    - slipstream attack
  - 69, 137, 161, 1719, 1720, 1723, 6566
    - NAT Slipstream 2.0 attack
    - 1720 - H.323
- 部分特性受 Feature-Policy/Permissions-Policy 控制
  - 需要服务端返回 Header 包含
  - 避免被 iframe 滥用
  - mdn [Feature Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy)

:::

- 外部设备
  - SerialPort, HIDDevice, WebUSB, WebMIDI, WebBluetooth, GamePad

## Interop

- URL interop 2023

### Interop 2023

- https://wpt.fyi/interop-2023

### Interop 2022

- 2022 Focus Areas
  - Cascade Layers - @layer
  - Collor Spaces and Functions - accent-color, color-schema
  - Containment
  - Dialog Element
  - Forms
  - Scrolling - scroll snap, scroll-behavior, overscroll-behavior
  - Subgrid
  - Typography and Encodings - font-variant-alternates, font-variant-position, ic
  - Viewport Units - {d,l,s}v{h,w,min,max}
  - Web Compat
- 2021 Focus Areas
  - Aspect Ratio
  - Flexbox
  - Grid
  - Sticky Positioning
  - Transforms
- 2022 Investigation
  - Editing, contentEditable, execCommand
  - Pointer and Mouse Events
  - Vieport Measurement
- 参考
  - https://web.dev/interop-2022
  - https://wpt.fyi/interop-2022
  - [What's new for the web platform](https://youtu.be/5b4YcLB4DVI) 2022 年 5 月 12 日

## Chrome 125

- WebSocket 接受 http/https URL
- Compute Pressure - 检测当前 PC 的压力 - cpu/内存
  - PressureObserver
  - PressureRecord
  - https://developer.chrome.com/docs/web-platform/compute-pressure
- CSS anchor
  - `anchor-name`
  - `position-anchor`
  - `anchor()`
  - `inset-area`
  - 能实现 https://floating-ui.com/ 类似的浮动效果 - 通过锚点定位，确保内容在页面内，避免滚动导致内容不可见
  - https://anchor-tool.com/
- CSS steeped value - `rounded()`, `mod()`, `rem()`
- Declarative shadow DOM serialization
  - `getHTML({serializableShadowRoots:bool, shadowRoots:[roots]})`
  - 能够将 shadowDOM 序列化出来
- Direct Sockets API in Chrome Apps
  - TCPSocket, UDPSocket
  - https://wicg.github.io/direct-sockets/
  - https://github.com/WICG/direct-sockets/blob/main/docs/explainer.md
- Extending Storage Access API (SAA) to non-cookie storage
  - https://privacycg.github.io/saa-non-cookie-storage/
  - https://github.com/privacycg/storage-access
    - [Chrome 119](#chrome-119)
- Keyboard-focusable scroll containers

## Chrome 124

- setHTMLUnsafe,parseHTMLUnsafe
- ReadableStream async iteration - 支持 `for await...of`
- WebSocketStream
  - 和 WebSocket 目的类似，但暴露为 Stream 类似的接口
  - 不在基于 Event 而是作为 stream 的方式处理
  - 能支持 backpressure
  - https://web.dev/websocketstream/
  - [CarterLi/websocketstream-polyfill](https://github.com/CarterLi/websocketstream-polyfill)
- SVG context-fill, context-stroke
- Document Render-Blocking - https://chromestatus.com/feature/5113053598711808
  - 主要用于 View Transitions
  - 等待资源加载完成
- Event pageswap - https://chromestatus.com/feature/5479301497749504
  - 用于 View Transitions
- HTTP 支持 priority 头
- Windows ClearType Text Tuner Integration
- `[writingsuggestions]` 可关闭拼写建议

```js
const wss = new WebSocketStream(url, {
  // 扩展协议选择
  protocols: ['chat', 'chatv2'],
  // 避免长时间 handshake
  signal: AbortSignal.timeout(1000),
});
const { readable, writable, protocol, extensions } = await wss.opened;
const reader = readable.getReader();
while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  await process(value);
}
//
wss.close({ closeCode: 4000, reason: 'Game over' });
const { closeCode, reason } = await wss.closed;
```

## Chrome 123

- import with
  - `import data from 'data.json' with {type:'json'}`
  - Chrome 91 增加的 import assert
- pagereveal 事件
- 支持 zstd
- CSS
  - ` light-dark(a,b)` - 根据 prefers-color-scheme 选择 a 或 b
  - align-content 支持 block, list-item, table-cell
    - 不再需要 flex 或者 grid 也能方便 center 了
  - text-spacing-trim
    - 主要用于 CJK 的括号等，让括号之类的变窄，更好看
    - https://drafts.csswg.org/css-text-4/#text-spacing-trim-property
    - https://output.jsbin.com/figixaq
  - field-sizing=content
    - 让输入内容自动调整输入框的大小
    - textarea

## Chrome 122

- `navigator.clipboard.read({ unsanitized: ['text/html'] })`
  - 读取未经过清理的剪贴板内容
- [Iterator helper](https://github.com/tc39/proposal-iterator-helpers)
  - iterator 增加 `map`, `filter`, `take`, `drop`, `flatMap`, `reduce`, `toArray`, `forEach`, `some`, `every`, `find`
  - `Iterator.from(object)`
- [Set methods](https://github.com/tc39/proposal-set-methods/)
  - Set 增加 `intersection`, `union`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`
- Storage Buckets API

## Chrome 121

- Array.fromAsync
- EditContextAPI
  - 影响如何实现编辑器
  - https://w3c.github.io/edit-context/
- HTMLSelectElement.showPicker()
  - 手动 select 的 option popover
- `ClipboardItem.supports('text/html')`
  - 检测 ClipboardItem 支持的类型
  - 以前需要尝试写入
- CSS
  - font-palette 支持动画
  - scrollbar-color
  - scrollbar-width
  - `::spelling-error` - 拼写错误
  - `::grammar-error` - 语法错误

## Chrome 120

- CSS
  - `:dir()`
  - 数学函数 pow(), sqrt(), hypot(), log(), exp()
  - 字体 FontFaceSet: check()
    - document.fonts.check()
    - 修改逻辑
  - masking
- document.requestStorageAccess
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/requestStorageAccess
- [CloseWatcher](https://github.com/WICG/close-watcher)
  - dialog 修改为使用 CloseWatcher
- Attribution Reporting API: further gating for trigger verbose debug reports
  - `ar_debug` cookie
  - https://chromestatus.com/feature/5092796566601728
  - https://github.com/WICG/attribution-reporting-api/pull/1088

## Chrome 119

- CSS
  - `:user-valid`,`:user-invalid`
    - 类似于 `:valid`, 但是在用户交互过后
  - Relative Color Syntax (RCS)
    - https://www.w3.org/TR/css-color-5/#relative-colors
      - `background: rgb(from var(--bg-color) r g b / 80%);`
- HTML
  - select 内可以有 hr 来分割选项
- WebAssembly Garbage Collection (WasmGC)
- Read Chrome device attributes
  - https://github.com/WICG/WebApiDevice/blob/main/README.md
  - `navigator.managed.getManagedConfiguration`
- ~~WebSQL~~
- ~~Sanitizer API~~

## Chrome 118

- CSS
  - `@scope`
  - logical flow-relative values
    - float: inline-start|inline-end
    - clear: inline-start|inline-end
    - resize: block|inline
  - `prefers-reduced-transparency`
- HTML search element
  - 容器元素，在 form 之外，表示这部分内容为搜索相关
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search
  - https://github.com/whatwg/html/pull/7320
- HTTP/3 protocol upgrade for HTTPS DNS records with h3 alpn parameter
  - 尝试连接 H3 协议
  - 通过 HTTPS DNS 记录路的 alpn 参数发现
  - https://chromestatus.com/feature/5154357283651584
- Enrollment for Privacy Sandbox (PSB)
  - https://developer.chrome.com/blog/announce-enrollment-privacy-sandbox/
- WebUSB in Extension Service Workers

## Chrome 117

- Array grouping
- Back/forward cache NotRestoredReason API
- Clear Client Hints via Clear-Site-Data header
- Clear-Site-Data header wildcard syntax
- contain-intrinsic-size: auto none support
- CSS
  - cap and rcap font units
  - overlay property
  - @starting-style Rule
  - Subgrid
  - text-wrap: pretty
  - transition-behavior property
- CustomElementsGetName
- Iterator helpers
  - Iterator.from
  - Iterator.prototype.{map,filter,take,drop,flatMap,reduce,toArray,forEach,some,every,find}
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
  - https://github.com/tc39/proposal-iterator-helpers
  - https://tc39.es/proposal-iterator-helpers/
  - https://github.com/zloirock/core-js#iterator-helpers
- Make CaptureController derive from the EventTarget interface
- RFC 7616 Digest auth: Support SHA-256 and username hashing
  - https://datatracker.ietf.org/doc/html/rfc7616
- TLS Encrypted Client Hello (ECH)
  - https://tls-ech.dev/
  - chrome://flags/#encrypted-client-hello

## Chrome 116

- AbortSignal.any()
- BYOB support for Fetch
- CSS Motion Path
- Display and content-visibility animations
- Document picture-in-picture

## Chrome 115

- CSS
  - display 支持多个值
    - `display: inline flow` -> `inline-block`
    - `display: block flex` -> `flex`
  - Scroll-driven animations
    - scroll-timeline
    - https://scroll-driven-animations.style/
- HTTPS Upgrades - 优先尝试 HTTPS
- WebAssembly
  - Module 8MB 限制
- https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md

## Chrome 114

- DOM
  - popover
    - https://developer.chrome.com/blog/introducing-popover-api/
  - Scrollend Event
- CSS
  - `overflow:overlay` 作为 `overflow:auto` 别名

## Chrome 113

- **WebGPU**
- CSS
  - media - overflow-inline, overflow-block
  - media update - print, slow, fast
  - [image-set](https://developer.mozilla.org/en-US/docs/Web/CSS/image/image-set)
  - Linear easing - `linear()`
- Fetch: Headers.getSetCookie()
- [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API)
  - for iframe
  - `document.hasStorageAccess()`
  - `document.requestStorageAccess()`

## Chrome 112

- CSS
  - CSS animation-composition property
  - CSS Nesting
- Javascript
  - RegExp v
    - https://v8.dev/features/regexp-v-flag
    - `(/^\p{RGI_Emoji}$/v).test('⚽')`
    - https://www.unicode.org/reports/tr18/#domain_of_properties
- WebAssembly
  - Tail Call
- DOM
  - FormData submitter 参数

## Chrome 111

- CSS
  - oklch - 比 rgb,hsl 多 30% 颜色
    - https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
  - baseline-source
  - CSS Color Module Level 4 and color-mix()
  - CSS Root Font Units: 'rex', 'rch', 'ric', 'rlh'
  - CSS Selectors 4 Pseudo-Class :nth-child(an + b of S)
  - CSS Trigonometric functions
  - font-variant-alternates and the @font-feature-values at-rule
  - Style Container Queries for CSS Custom Properties
- Javascript
  - String.prototype.isWellFormed, toWellFormed
  - ArrayBuffer.prototype.{resize,resizable,maxByteLength}
- DOM
  - View Transitions API
- Media
  - WebRTC Scalable Video Coding extensions

## Chrome 110

- HTMLPopupElement - Pop-Up API
  - 类似于 dialog 效果 - 使用页面元素
  - 显示为弹出窗口
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Popup/explainer.md

## Chrome 109

- Anonymous iframes
  - COEP credentialless
- CSS
  - lh 长度单位
  - `hyphenate-limit-chars` property
- Private State Token API
  - propagating user signals across sites
- Snap border, outline and column-rule widths before layout

## Chrome 108

- Federated Credentials Management - WebID
- FileSystemHandle::remove()
- ContentVisibilityAutoStateChanged event
  - `content-visibility: auto`
  - 辅助检测是否可见，代码控制是否渲染 - 例如: React, canvas
  - https://github.com/vmpstr/web-proposals/blob/main/explainers/cv-auto-event.md
- CSS
  - break-after, break-before, break-inside
  - Overflow for replaced elements
  - CSS Values and Units Module Level 4: Small/Large/Dynamic/Logical viewport units
- LayoutNG printing
- Variable COLRv1

## Chrome 107

- **HEVC**
- CSS
  - grid-template interpolation
- `<form rel="noreferrer">`

## Chrome 106

- CSS
  - ic 长度单位 - CJK 文字单位
- Intl.NumberFormat v3

## Chrome 105

- CSS
  - **Container Query**
  - :has
  - :modal
- ESM `import.meta.resolve()`
- `fetch()` 上传流
- Federated Credentials Management/FedCM/WebID
- script,style,link - blocking=render - 避免 FOUC
- Writable directory prompts for the File System Access API
  - `showDirectoryPicker` 可以请求返回一个 **可写** 的目录
- Sanitizer API MVP - https://web.dev/sanitizer/
  - 目前主流库 [cure53/DOMPurify](https://github.com/cure53/DOMPurify)

```js
// Sanitizer API
$div.setHTML(
  `<em>hello world</em><img src="" onerror=alert(0)>`,
  new Sanitizer({
    allowElements: ['b', 'em'],
    allowAttributes: { style: ['span'] },
  }),
);
```

## Chrome 104

- CSS
  - object-view-box
  - visual-box on overflow-clip-margin
- Media Queries Level 4 Syntax & Evaluation
- Region Capture - 部分截取媒体流
  - `CropTarget.fromElement()`
  - cropTo
- Multi-Screen Window Placement: Fullscreen Companion Window
- Web Custom formats for Async Clipboard API

## Chrome 103

- `AbortSignal.timeout()`
- Block external protocol in sandboxed iframe
  - 恢复 allow-top-navigation-to-custom-protocols
    - allow-popups
    - allow-top-navigation
    - allow-top-navigation-with-user-activation
- Local Font Access - https://web.dev/local-fonts
- deflate-raw
- Speculation Rules - 探测可预加载的 URL
- Trial
  - Multi-Screen Window Placement: Fullscreen Companion Window
  - Focusgroup

## Chrome 102

- Navigation API - window.navigation - [WICG/navigation-api](https://github.com/WICG/navigation-api)
  - 焦点管理
  - 提升 history 体验
- DNS HTTPS 记录触发跳转 HTTP->HTTPS
- Capture Handle
- File Handling - Web 定义有能力处理指定类型文件
- Secure Payment Confirmation API V3 https://github.com/w3c/secure-payment-confirmation
- inert 属性 https://github.com/WICG/inert
  - 性能优化
  - polyfill wicg-inert
  - Temporarily offscreen/hidden content
  - On-screen but non-interactive content - pointer-events: none，user-select: none

## Chrome 101

- MediaCapabilities API for WebRTC
- Priority Hints - fetchpriority=auto|low|high
- @font-palette-values

## Chrome 100

- AbortSignal.prototype.throwIfAborted
- Capability Delegation API - 类似 `<iframe allow>`
- Digital Goods API - Android Play Billing API
- Hints delegation for third-party content - `<meta name="accept-ch" content="sec-ch-width=( https://foo.bar )">`
- Multi-Screen Window Placement - https://github.com/w3c/window-placement

## Chrome 99

- CSS
  - `@layer`
  - cacl 允许 infinity,-infinity,NaN
  - text-emphasis: text-emphasis-{color,position,style}
- ShadowDOM
  - adoptedStyleSheets: FrozenArray -> ObservableArray
    - 可以 push 而不需要整个替换
- HTMLInputElement.showPicker - 显示 input 的选择器
- Handwriting Recognition API - [WICG/handwriting-recognition](https://github.com/WICG/handwriting-recognition)
- Intl Enumeration API
- Intl.Locale
- New Canvas 2D API - https://github.com/fserb/canvas2d

## Chrome 98

- CSS
  - color-scheme: **only** light
- self.structuredClone
- COLRv1 Color Gradient Vector Fonts
- FS
  - FileSystemHandle::Remove - 之前需要获取到 Parent 来删除

## Chrome 97

- JavaScript Array, TypedArray: findLast, findLastIndex
- HTMLScriptElement.supports(type)
- WebTransport
  - 类似 WebSocket 和 RTCDataChannel 的角色
  - 期望未来替代 WebSockets
  - 基于 HTTP/3 UDP
  - https://web.dev/webtransport/

## Chrome 96

- [Clipboard: Preserve PNG metadata](https://www.chromestatus.com/features/5629962485760000)
  - 之前没有元数据 - 且很慢
- [HTTP->HTTPS redirect for HTTPS DNS records](https://www.chromestatus.com/features/5485544526053376)
  - 支持直接访问 HTTPS
- WebAssembly Reference Types
- [URL Protocol Handler Registration for PWAs](https://www.chromestatus.com/features/5151703944921088)
- DevTool
  - CSS Overview panel
  - Emulate the Chrome’s Auto Dark Theme feature
  - 复制 CSS 为 JS 格式
  - 网络面板新的 Payload

## Chrome 95

- Cookie size limits
  - RFC 6265
  - 总 4K, 单个最大 1K
- EyeDropper API - `<input type=color>` 支持屏幕取色
- [Note taking new note URL](https://www.chromestatus.com/features/5205972320518144)
- Remove FTP support
- [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
  - URL 匹配接口
- [self.reportError()](https://www.chromestatus.com/features/5634523220934656)
- DevTool
  - CSS 长度单位选择、滑动修改
  - 自定义属性会粗体优先显示

## Chrome 94

- [Idle Detection](https://www.chromestatus.com/features/4590256452009984)
  - https://web.dev/idle-detection/
- [VirtualKeyboard API](https://www.chromestatus.com/features/5680057076940800)
- [WebCodecs](https://www.chromestatus.com/features/5669293909868544)
- DevTool
  - 支持 本地化 - 多语言
  - CSS @container badage
  - Shift + click 颜色 切换显示格式

## Chrome 93

- [CSS Flexbox: alignment start, end, self-start, self-end, left, right](https://www.chromestatus.com/features/5777880099323904)
- CSS module scripts
  - `import styleSheet from "./styles.css" assert { type: "css" };`
- Error.cause
- `meta[name="theme-color"]`
  - https://web.dev/add-manifest/#theme-color
- Object.hasOwn
  - `Object.hasOwn(o,'key')` 等同于 `o.hasOwnProperty('key')`
- 从新添加 `contain:strict` 和 `contain:content`
  - mdn [contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
- WebOTP API: cross-device support
- User Preference Media Features Client Hints Headers
  - http 请求带客户端的 prefers-color-scheme
  - Sec-CH-Prefers-Color-Scheme: dark
- DevTool
  - 预览 Web bundle - chrome://flags#enable-experimental-web-platform-features
    - https://web.dev/web-bundles/
  - 格式化响应 JSON

## Chrome 92

- Relative indexing method for Array, String, and TypedArrays
  - ` [1,2,3,4].at(-1)` 返回 4
- `crypto.randomUUID()` - 生成 UUIDv4
- DevTool
  - CSS Grid editor
  - console 允许 const 重复定义
  - Elements iframe 右键详情
  - Network 新增 Wasm 资源类型
  - 实验 Puppeteer Recorder

## Chrome 91

- Class static initializer blocks
- Clipboard: read-only files support
  - 剪切板支持读取文件
- ES Modules for service workers
  - service worker 支持 ESM
- GravitySensor API
- Import Assertions
- JSON Modules
  - 请求使用 cors + strict MIME type checking
- WebAssembly SIMD
- WebOTP API: cross-origin iframe support
- WebSockets over HTTP/2
  - RFC 8441
- DevTool
  - Performance 显示 Web Vitals
  - CSS scroll-snap 可视化
  - ArrayBuffer Memory inspector
  - Styles 右键查看计算后的值

```js
// import 断言 - JSON Module
import json from './foo.json' assert { type: 'json' };

class C {
  static s_field;
  // 新支持
  static {
    this.s_field = doSomeInitialization();
  }
}
```

## Chrome 90

- AV1 Encoder
- AbortSignal in addEventListener
  - 可以更方便移除 listener
- CSS `overflow: clip`, `overflow-clip-margin`
  - 完全禁止 scroll
- Declarative Shadow DOM - 直接 HTML 定义 ShadowDOM
  - https://web.dev/declarative-shadow-dom/
- Protect `application/x-protobuffer` via Cross-Origin-Read-Blocking
- DevTool
  - CSS flexbox 编辑器
  - Core Web Vitals overlay
  - Network Remote Address Space 列
  - fn.displayName -> fn.name

```html
<!-- 声明式 Shadow DOM -->
<template shadowroot="open">
  <!-- 只影响内部 -->
  <style>
    button {
      color: seagreen;
    }
  </style>
  <link rel="stylesheet" href="/comicsans.css" />
  <button>
    <slot></slot>
  </button>
</template>
```

```js
// 获取包含 shadowdom 的 HTML
const html = element.getInnerHTML({ includeShadowRoots: true, closedRoots: [] });
```

## Chrome 89

- SameParty cookie attribute
  - 限定允许的 cookie
  - 避免三方钓鱼
- CSS `::target-text`
  - style scroll-to-text fragments
- CSS flow-relative Corner Rounding properties
  - `border-*-radius`
  - 新支持 逻辑角落定义 - border-start-start-radius, border-start-end-radius, border-end-start-radius, border-end-end-radius
    - 映射为 physical
    - 受 writing-mode, direction, text-orientation 影响
  - 之前支持 物理 角落定义 top-left, bottom-left, top-right, bottom-right
- FLoC - Federated Learning of Cohorts
- Import maps
  - ESM Import 映射
- Sec-CH-UA Client Hints
  - https://web.dev/user-agent-client-hints/
  - https://user-agent-client-hints.glitch.me/
- Top-level await
- Web NFC
- Web Serial API
- Web Share API
  - https://web.dev/web-share/
- Web Share API Level 2
- Web Share Target
- Web Share Target Level 2
- WebHID - Human Interface Device
- navigator.webdriver === false
  - 检测是否自动化
- performance.measureUserAgentSpecificMemory()

```
GET /downloads HTTP/1.1
Host: example.site

Sec-CH-UA: "Chromium";v="84", "Google Chrome";v="84"
Sec-CH-UA-Mobile: ?0
```

## Chrome 88

- CSS :is(), :where()
- CSS 复杂 :not() - 例如 `:not(.a + .b .c)`
- CSS aspect-ratio
- Remove Flash Player

## Chrome 87

- Cookie Store API - HTTPS only
  - [cookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore)
- Intl.Segmenter - 分词，支持中文
  - http://unicode.org/reports/tr29/
- isInputPending
- Local Font Access
  - https://web.dev/local-fonts/
- Pan/Tilt support for Camera
  - https://web.dev/camera-pan-tilt-zoom/
- [Portals](https://www.chromestatus.com/features/4828882419056640)
  - seamless transitions across navigations

```js
const segmenter = new Intl.Segmenter('zh', { granularity: 'word' });
// 输出 ['你好', '世界']
Array.from(segmenter.segment('你好世界')).map((v) => v.segment);
// 可用于优化 CPU 重场景
navigator.scheduling.isInputPending({ includeContinuous: true });
```

## Chrome 86

- well-known URL for changing passwords
  - /.well-known/change-password
- beforematch 事件
  - find-in-page (ctrl+f)
  - element fragment navigation (example.com/#foo)
  - scroll-to-text navigation (example.com/#:~:text=foo)
- CSS Selectors 4 Pseudo-Class :focus-visible
  - 避免隐藏全部 focus outlines，可以针对 a 和 button 设置 `:not(:focus-visible)` 隐藏 outline
  - 例如 给 button `:focus-visible` 样式只有在键盘 tab 过去的时候会显示，鼠标不会显示
- Document-Policy: force-load-at-top
- FetchEvent.handled
- File System Access - 访问本地文件目录
  - https://web.dev/file-system-access/
  - https://web.dev/browser-nativefs/
- Imperative Shadow DOM Distribution API
- [Intensive throttling of Javascript timer wake ups](https://www.chromestatus.com/features/4718288976216064)
- DOM ParentNode.replaceChildren
- registerProtocolHandler 包含 cabal, dat, did, dweb, ethereum, hyper, ipfs, ipns, ssb
- Third-party origin trials
  - https://web.dev/third-party-origin-trials
- WebRTC Insertable Streams
- Clipboard API 支持 async text/html
  - HTML is sanitized
- document.fragmentDirective - [scroll-to-text-fragment](https://wicg.github.io/scroll-to-text-fragment)
  - #:~:text=
  - 滚动到文字

```js
var portal = document.createElement('portal');
portal.src = 'http://example.com';
document.body.appendChild(portal);

window.onportalactivated = function (oldPortal) {};
// 替换当前页面
portal.activate();
```

## Chrome 85

- CSS @property
  - 直接通过 CSS 自定义属性
  - 之前已经支持 CSS.registerProperty
  - 使用 自定义属性 让变量更有意义
  - https://web.dev/at-property/
  - https://developer.mozilla.org/en-US/docs/Web/CSS/@property
- AVIF Image Decode
- App shortcuts
  - https://web.dev/app-shortcuts/
- CSS content-visibility
  - 用于渲染优化
  - https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
- CSS counter-set
- Cookies default to SameSite=Lax
- Event Timing API
- JavaScript logical assignment operators - ||=, &&=, ??=
- [Media Feeds](https://www.chromestatus.com/features/5695114963845120)
- Promise.any
- Referrer Policy: Default to strict-origin-when-cross-origin
- Reject insecure SameSite=None cookies
- String.prototype.replaceAll
- Web Bluetooth getDevices()

## Chrome 84

- Content Indexing API
  - 用于离线场景
  - https://web.dev/content-indexing-api/
- CSS flexbox: row-gap, column-gap
- JavaScript WeakReferences
- JavaScript 私有 方法 和 accessors
- Screen Wake Lock API
  - 用于避免电脑休眠
  - https://web.dev/wake-lock/
- CSS appearance unprefixed
- CSS ruby-position unprefixed
- Web Animations API
- WebOTP
  - navigator.credentials
  - 短信包含内容，自动验证 - 最后一行格式 `@www.example.com #123456`
  - https://web.dev/web-otp/
- CSS revert 关键字 - 恢复属性

## Chrome 83

- CSS `font-display: optional` without relayout
- CSS @supports selector() 特性检测
- Barcode Detection API
  - 可直接检测 image, video, canvas
  - https://web.dev/shape-detection/
- CSS contain-intrinsic-size
  - 优化渲染
- Cross-Origin-Embedder-Policy
- Cross-Origin-Opener-Policy
- ES Modules for shared workers
- IndexedDB relaxed durability transactions

## Chrome 81

- CSS image-orientation property

## Chrome 80

- Compression Streams
- Contacts API
  - https://web.dev/contact-picker/
- ES Modules for dedicated workers
- 移除 Custom Elements V0
- 移除 HTML Imports
- JavaScript optional chaining - `o?.func()`
- JavaScript Nullish coalescing - `a ?? b`
- Media Capabilities: decoding encrypted media
- Periodic Background Sync
  - https://web.dev/periodic-background-sync/
- Scroll to Text Fragment - `#:~:`
- 移除 Shadow DOM v0
- SVG in favicons
- WebAssembly Multi-Value
- WebVR v1.1
- Payments shipping address and contact info delegation
- CSS line-break: anywhere
- CSS overflow-wrap: anywhere
