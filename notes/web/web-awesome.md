---
title: Web Awesome
tags:
  - Awesome
---

# Web Awesome

## Web

- https://www.c82.net/iconography/
- https://www.photopea.com/
- [ryohey/signal](https://github.com/ryohey/signal)
  - MIT, TS
  - Online MIDI Editor: signal
- http://oskarstalberg.com/Townscaper/
- https://remove-white-background.imageonline.co/
- https://teetow.github.io/elementary_grid
- [varkor/quiver](https://github.com/varkor/quiver)
- Code to Image / Text to Image
  - https://carbon.now.sh/
    - [carbon-app/carbon](https://github.com/carbon-app/carbon)

## Spec

- WebPush
  - [web.dev/explore/notifications](https://web.dev/explore/notifications)
  - [webpush-protocol](https://datatracker.ietf.org/doc/html/draft-ietf-webpush-protocol)
  - [webpush-encryption](https://datatracker.ietf.org/doc/html/draft-ietf-webpush-encryption)
  - 实现
    - [web-push-libs/web-push](https://github.com/web-push-libs/web-push)

## Runtime

- nodejs
- deno
- quickjs

## Read

- [Google Docs will now use canvas based rendering](https://workspaceupdates.googleblog.com/2021/05/Google-Docs-Canvas-Based-Rendering-Update.html)
  - 2021-05-11
  - 文本处理器对 渲染、布局、增量更新有专门的要求
  - Canvas 能实现跨平台
  - [HN](https://news.ycombinator.com/item?id=27129858)
- [hotwire](https://hotwire.dev/)
- https://web.dev/ps-on-the-web/
  - 图像处理基于 https://halide-lang.org/
- https://andreasbm.github.io/web-skills/

## Desktop

- [wails](./framework/wails.md)
  - Go
- [neutralinojs/neutralinojs](https://github.com/neutralinojs/neutralinojs)
  - 使用 Native WebView
- [nwjs/nw.js](https://github.com/nwjs/nw.js)
  - Chromium + node.js
  - 在 DOM 可使用 Node 环境
- [Elanis/web-to-desktop-framework-comparison](https://github.com/Elanis/web-to-desktop-framework-comparison)
- [tauri-apps/tauri](./framework/tauri.md)
  - Build desktop applications with a web frontend
  - 基于 rust tao
  - 底层引擎为 rust 实现 - 轻、资源占用少
    - 但规范实现不完整，部分应用可用
    - 但实际占用资源的都是 WebView - 无法避免 - 所以实际使用资源差不多
- [windowjs/windowjs](https://github.com/windowjs/windowjs)
- [webview/webview](https://github.com/webview/webview)
  - C/C++/Golang/Deno
- [c-smile/sciter-sdk](https://github.com/c-smile/sciter-sdk)
  - embeddable HTML/CSS/scripting engine
  - ~~RustDesk~~、Teamviewer、Todesk
- netsurf
- electron vs nwjs
  - https://www.electronjs.org/docs/latest/development/electron-vs-nwjs

## Build

- [bundlers.tooling.report](https://bundlers.tooling.report/)
- vite
- rollup
- esbuild
- webpack
- parcel

## 测试

- [facebook/flipper](https://github.com/facebook/flipper)
  - desktop debugging platform for mobile
- [microsoft/playwright](https://github.com/microsoft/playwright)
  - automate Chromium, Firefox, WebKit
- [codeceptjs/CodeceptJS](https://github.com/codeceptjs/CodeceptJS)
- [webdriverio/webdriverio](https://github.com/webdriverio/webdriverio)
- [Tencent/vConsole](https://github.com/Tencent/vConsole)

## Bootstrap

- [Bootstrap Zero](http://www.bootstrapzero.com/)
- [Top Github Repo](https://github.com/search?o=desc&q=Bootstrap&s=stars&type=Repositories)
- [bootstrap-material-design](https://github.com/FezVrasta/bootstrap-material-design)
- [startbootstrap](http://startbootstrap.com)
- [bootswatch](http://bootswatch.com)
  - 比较喜欢的 [paper](https://bootswatch.com/paper/) 样式
- [wrapbootstrap](https://wrapbootstrap.com/)
- [shapebootstrap](http://shapebootstrap.net/)
- [newsmartwave](http://newsmartwave.net/)
- [Bootstrap 4 Cheat Sheet](http://hackerthemes.com/bootstrap-cheatsheet)

## UI 框架

- https://getmdl.io/
- https://www.polymer-project.org
- https://react.rocks

## 框架

- jsx 系
  - [react](./react/README.md) - 定位是 库
  - [preact](./react/preact.md) - mini 版 react
  - [MithrilJS/mithril.js](https://github.com/MithrilJS/mithril.js)
  - [aidenybai/million](https://github.com/aidenybai/million)
    - 无 vdom
    - 与 mithril.js 非常类似
    - 类似 react+svelte 结合体
  - [jorgebucaran/hyperapp](https://github.com/jorgebucaran/hyperapp)
    - 最简的 jsx
  - [ryansolid/solid](https://github.com/ryansolid/solid)
    - 快、小、类 React
    - jsx 直接预先生成 dom 模板，属性变化动态插入到 dom 里 - 没有 react 的 vdom 比较合并
- WebComponent 系
  - lit
  - stencil
- angular
  - angular v1 - 新项目已经不会再用
  - angular
- 单文件 - 自编译
  - svelte
  - vue2
  - vue3
  - riot
- alpinejs
- [developit/htm](https://github.com/developit/htm)
- 参考
  - 用户事件优先优于框架性能 https://news.ycombinator.com/item?id=32294051
    - React 18
  - https://krausest.github.io/js-framework-benchmark/current.html

:::info

- React 版权事件 - 2017 年 - 已正式变更为 MIT [facebook/react#11091](https://github.com/facebook/react/pull/11091)
  - 百度放弃 React/RN 转型 Vue
  - WordPress gutenberg 考虑放弃 React [#2733](https://github.com/WordPress/gutenberg/issues/2733)

:::

## 开发框架

- React
  - [remix](./framework/remix.md)
  - [nextjs](./framework/nextjs.md)
  - [rakkasjs/rakkasjs](https://github.com/rakkasjs/rakkasjs)
    - 类似 NextJS
    - 使用 Vite
- nestjs
- [inertiajs/inertia](https://github.com/inertiajs/inertia)
  - quickly build modern single-page React, Vue and Svelte apps
- [livebud/bud](https://github.com/livebud/bud)
  - Full-Stack Web Framework for Go
- 国产 - 考虑 KPI 关系，一般不推荐使用
  - umijs
  - taro - 跨端、小程序
  - weex

> **Note**
>
> 国内非常擅长各种合并集成、开箱即用、全家桶，但是缺点都是难有人持续维护，定制化难，只考虑提供了的功能，不考虑扩展。

## 样式

- DSL
  - tailwindcss - ⭐️ 推荐 - 基于 PostCSS 插件
  - [tw-in-js/twind](https://github.com/tw-in-js/twind) JS 实时生成
  - windicss - 目前 antfu 维护 - 复刻的 tailwindcss - 不需要 PostCSS
  - unocss - by antfu
- css-in-js
  - [styled-components](./style/styled-components.md)
  - emotion
  - [styled-jsx](./react/styled-jsx.md)
  - [cristianbote/goober](https://github.com/cristianbote/goober)
- CSS Module
- Library
  - [lukeed/clsx](https://github.com/lukeed/clsx)
  - [kripod/style-vendorizer](https://github.com/kripod/style-vendorizer)
  - [frenic/csstype](https://github.com/frenic/csstype)

## JS

- http://roughjs.com/
  - 绘制手写效果的图
- [julianshapiro/velocity](https://github.com/julianshapiro/velocity)
  - Accelerated JavaScript animation.
- [nextapps-de/winbox](https://github.com/nextapps-de/winbox)
  - 窗口管理器
- [niklasvh/html2canvas](https://github.com/niklasvh/html2canvas)
  - 截屏
- [ian-nai/In-Browser-OCR](https://github.com/ian-nai/In-Browser-OCR)
  - Tesseract.js
- [krausest/js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)
- [josdejong/mathjs](https://github.com/josdejong/mathjs)
- [handsontable/hyperformula](https://github.com/handsontable/hyperformula)
- [BuilderIO/partytown](https://github.com/BuilderIO/partytown)
- [remotestorage/remotestorage.js](https://github.com/remotestorage/remotestorage.js)
  - [protocol](https://remotestorage.io/protocol/)
- [francisrstokes/construct-js](https://github.com/francisrstokes/construct-js)
- [jsxgraph](https://jsxgraph.org/)
  - Dynamic Mathematics with JavaScript
- [pubkey/client-side-databases](https://github.com/pubkey/client-side-databases)
- [omgovich/colord](https://github.com/omgovich/colord)
  - tiny yet powerful tool for high-performance color manipulations and conversions

## Dev

- [modernweb-dev/web](https://github.com/modernweb-dev/web)

## tty

- [xtermjs/xterm.js](https://github.com/xtermjs/xterm.js)
- [yudai/gotty](https://github.com/yudai/gotty)
- [maxmcd/webtty](https://github.com/maxmcd/webtty)
- [wrfly/container-web-tty](https://github.com/wrfly/container-web-tty)

## Browser

- [RenderingNG](https://developer.chrome.com/blog/renderingng)

## Audio

- [Theodeus/tuna](https://github.com/Theodeus/tuna)
  audio effects library
- [Tonejs/Tone.js](https://github.com/Tonejs/Tone.js)
  - [HN](https://news.ycombinator.com/item?id=19512922)
- [bit101/tones](https://github.com/bit101/tones)
- [nick-thompson/elementary](https://github.com/nick-thompson/elementary)
- [nick-thompson/react-juce](https://github.com/nick-thompson/react-juce)
  - [juce-framework/JUCE](https://github.com/juce-framework/JUCE)
- [projectM-visualizer/projectm](https://github.com/projectM-visualizer/projectm)
  - [HN](https://news.ycombinator.com/item?id=28970988)
- 参考
  - [What's In A Sound?](https://www.soundonsound.com/techniques/whats-sound)
  - youtube [Synthesizer Basics: Amplitude, Oscillators, Timbre](https://www.youtube.com/watch?v=c3udLCvoCC0)
  - [Functional, Declarative Audio Applications](https://www.nickwritesablog.com/functional-declarative-audio-applications/)

## Script

- [emscripten-core/emscripten](https://github.com/emscripten-core/emscripten)
- https://bundlescanner.com/

## Tool

- [atapas/webapis-playground](https://github.com/atapas/webapis-playground)
  - https://webapis-playground.vercel.app/

## Application

- [MattKetmo/darkroomjs](https://github.com/MattKetmo/darkroomjs)
  - MIT, JS
  - 照片编辑器
- [tldraw/tldraw](https://github.com/tldraw/tldraw)
  - MIT, TS
  - 制图
- [hoppscotch/hoppscotch](https://github.com/hoppscotch/hoppscotch)
- https://mynoise.net/

## Dev

- [jackdomleo7/Checka11y.css](https://github.com/jackdomleo7/Checka11y.css)

## 有趣

- https://beforeidieproject.com/
- https://www.insideoutproject.net/
- https://github.com/hunar4321/particle-life
- [airbnb/lottie-web](https://github.com/airbnb/lottie-web)
- [DustinBrett/daedalOS](https://github.com/DustinBrett/daedalOS)
- https://aaronos.dev/AaronOS/aosBeta.php
- https://www.vantajs.com/
- [copy/v86](https://github.com/copy/v86)
  - https://copy.sh/v86/
  - x86 virtualization in browser
- https://github.com/sharat87/prestige
  - text-based HTTP client in the browser - interface-less Postman
- [timc1/kbar](https://github.com/timc1/kbar)
- https://www.67tool.com/
- https://github.com/yf-dev/mahjong-hand-guessing-game
  - https://mahjong-handle.update.sh/
- https://calculator.apps.chrome/
- [HughChen/qr_image](https://github.com/HughChen/qr_image)
  - generate valid QR codes with readable images
- [1History/1History](https://github.com/1History/1History)
  - history in one file
- http://radio.garden/
- https://webcode.tools/
- https://github.com/mbrlabs/Lorien
  - Infinite canvas drawing/whiteboarding app for Windows, Linux and macOS. Made with Godot
- Web Desktop/Web OS
  - [HeyPuter/puter](https://github.com/HeyPuter/puter)
    - AGPLv3, JS
    - Web OS
    - https://news.ycombinator.com/item?id=39597030
  - [MercuryWorkshop/anuraOS](https://github.com/MercuryWorkshop/anuraOS)
    - AGPLv3, JS
    - WebOS
    - 支持模拟 Linux
  - https://simone.computer/
  - https://github.com/syxanash/awesome-web-desktops
- https://copy.sh/v86/

## Reference

- Awesome of [Awesome](https://github.com/sindresorhus/awesome)
- Awesome [Web](https://www.awesomeweb.com/)
- [cheatsheet1999/FrontEndCollection](https://github.com/cheatsheet1999/FrontEndCollection)
- https://dev.to/iainfreestone/series/7129
- https://stateofcss.com/
- http://stateofjs.com/
- https://photopea.com
- https://boxy-svg.com/app
- https://tldraw.com
- https://globs.design
- https://alma.sh
- https://audiomass.co
- https://hexed.it
- https://webvm.io

## CDN

- http://www.jsdelivr.com/
  - MaxCDN
- https://cdnjs.com/
  - cdnjs.cloudflare.com
- https://unpkg.com/
- https://fonts.googleapis.com/
  - https://fonts.yecdn.com/
  - ~~https://fonts.css.network ~~
  - https://googlefonts.cn/
  - https://fonts.font.im
  - https://fonts.proxy.ustclug.org
- https://lib.sinaapp.com/
  - 新浪云
- https://www.staticfile.org/
  - 七牛云
- https://www.bootcdn.cn
- https://lug.ustc.edu.cn/wiki/start
- https://u.sb/css-cdn/
- https://cdn.baomitu.com/index/fonts

---

- https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap
  - https://fonts.font.im/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap

```
fonts.gstatic.com fonts-gstatic.proxy.ustclug.org
fonts.googleapis.com fonts.proxy.ustclug.org
ajax.googleapis.com ajax.proxy.ustclug.org
ajax.googleapis.com ajax.loli.net
registry-1.docker.io docker.mirrors.ustc.edu.cn
packages.elastic.co elastic.proxy.ustclug.org
ppa.launchpad.net launchpad.proxy.ustclug.org
archive.cloudera.com/cdh5/ cloudera.proxy.ustclug.org/cdh5/
downloads.lede-project.org lede.proxy.ustclug.org
downloads.openwrt.org openwrt.proxy.ustclug.org
registry.npmjs.org npmreg.proxy.ustclug.org
www.npmjs.com npm.proxy.ustclug.org
themes.googleusercontent.com google-themes.proxy.ustclug.org
secure.gravatar.com gravatar.proxy.ustclug.org
```

## performance

- lighthouse
- https://web.dev/measure/
- https://www.webpagetest.org/lighthouse
- https://developers.google.com/web/tools/chrome-user-experience-report
