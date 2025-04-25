---
tags:
  - Awesome
---

# Chrome Awesome

- [ChromeDevTools/awesome-chrome-devtools](https://github.com/ChromeDevTools/awesome-chrome-devtools)
- [Chrome Flags for Tooling](https://github.com/GoogleChrome/chrome-launcher/blob/main/docs/chrome-flags-for-tools.md)
- https://chromedevtools.github.io/devtools-protocol/
- https://github.com/GoogleChrome/chrome-launcher/blob/master/docs/chrome-flags-for-tools.md
- https://niek.github.io/chrome-features/
- [blink features](https://source.chromium.org/chromium/chromium/src/+/master:out/Debug/gen/third_party/blink/renderer/platform/runtime_enabled_features.cc;l=1559;drc=170473ad887b7990079f1f996b126548569c5902)
- [RuntimeEnabledFeatures](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/platform/RuntimeEnabledFeatures.md)
- Chrome Extensions
  - [Picture-in-Picture Extension (by Google)](https://chromewebstore.google.com/detail/picture-in-picture-extens/hkgfoiooedgoejojocmhlaklaeopbecg)
    - [GoogleChromeLabs/picture-in-picture-chrome-extension](https://github.com/GoogleChromeLabs/picture-in-picture-chrome-extension)

## Awesome

- [puppeteer](https://github.com/puppeteer/puppeteer)
  - Apache-2.0, TS
  - Chrome 团队支持
- [microsoft/playwright](https://github.com/microsoft/playwright)
  - 支持 多浏览器 - Chromium, Firefox, WebKit
  - patch Firefox, WebKit 实现
- Golang
  - [chromedp/chromedp](https://github.com/chromedp/chromedp)
    - [chromedp/examples](https://github.com/chromedp/examples)
  - [sensepost/gowitness](https://github.com/sensepost/gowitness)

## Extensions

- 规则代理/代理
  - [zero-peak/ZeroOmega](https://github.com/zero-peak/ZeroOmega)
    - SwitchyOmega fork
    - https://chromewebstore.google.com/detail/proxy-switchyomega-3-zero/pfnededegaaopdmhkdmcofjmoldfiped
  - ~~[Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)~~
- [Quick source viewer](https://chrome.google.com/webstore/detail/quick-source-viewer/cfmcghennfbpmhemnnfjhkdmnbidpanb/related)
  更方便查看源码
- [AndrewWalsh/openapi-devtools](https://github.com/AndrewWalsh/openapi-devtools)
  - 在浏览时生成 OpenAPI
- Ads
  - uBlock Origin / uBO
    - [gorhill/uBlock](https://github.com/gorhill/uBlock)
      - GPLv3, JS
      - 不支持 Manifest v3
  - uBO Lite (uBOL)
  - AdBlock
    - 现在也被 eyeo GmbH 收购
  - Adblock Plus / ABP
    - 德国公司 eyeo GmbH
    - inspired by Adblock for Firefox
    - 起源更早，最初主要为 Firefox 开发
- user script
  - 篡改猴 / [Tampermonkey](https://github.com/Tampermonkey/tampermonkey)
    - 2013年1月 2.9 后闭源
    - 5.2 后支持 Manifest v3
  - 暴力猴 / [Violentmonkey](https://github.com/violentmonkey/violentmonkey)
    - 目前只支持 Manifest v2 [#1934](https://github.com/violentmonkey/violentmonkey/issues/1934)
  - https://greasyfork.org/zh-CN
  - https://www.userscript.zone/

## WebDriver

- [W3C WebDriver](https://w3c.github.io/webdriver/webdriver-spec.html)
  - 控制浏览器
- [electron/chromedriver](https://github.com/electron/chromedriver)
  - 下载 [ChromeDriver](https://sites.google.com/chromium.org/driver/)
  - https://chromedriver.chromium.org/
  - https://chromedriver.storage.googleapis.com/index.html
- webdriver
  - Python `from selenium import webdriver`

## Chromium

- https://chromiumdash.appspot.com/
  - Chromium data, all in one place.
- https://www.chromium.org/developers/version-numbers/
  - MAJOR.MINOR 版本相同
- 下载/二进制
  - https://download-chromium.appspot.com/
  - [Chromium History Versions Download](https://vikyd.github.io/download-chromium-history-version/)
  - https://chromium.woolyss.com/
    - [HTML5 audio/video tester](https://tools.woolyss.com/html5-audio-video-tester/)
- ~~[StaZhu/enable-chromium-hevc-hardware-decoding](https://github.com/StaZhu/enable-chromium-hevc-hardware-decoding)~~
  - 官方已经支持 HEVC
  - 可直接下载
  - 不能网飞 4K [#6](https://github.com/StaZhu/enable-chromium-hevc-hardware-decoding/issues/6)
