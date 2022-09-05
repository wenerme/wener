---
id: faq
title: Chrome FAQ
tags:
- FAQ
---

# Chrome FAQ

## 离线安装下载

- https://www.google.com/intl/en/chrome/?standalone=1
- https://www.google.com/intl/en/chrome/browser/desktop/index.html?standalone=1

```
# ChromeStandaloneSetup64.exe
# https://dl.google.com/tag/s/appguid={8A69D345-D564-463C-AFF1-A69D9E530F96}&iid={E3751212-181B-0E06-8D37-4EC9E8CE331E}&lang=en&browser=4&usagestats=0&appname=Google%20Chrome&needsadmin=prefers&ap=x64-stable-statsdef_1&installdataindex=defaultbrowser/chrome/install/ChromeStandaloneSetup64.exe

# googlechrome.dmg
curl -LOJC- https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg
```

- https://dl.google.com/mac/install/googlesoftwareupdate.dmg

## 自动更新域名

- tools.google.com
- dl.google.com
- update.googleapis.com
- https://dl.google.com/mac/install/googlesoftwareupdate.dmg

## KSServerUpdateRequest fetch failed. The request timed out.

macOS 自动更新失败

## 证书错误继续访问

1. 页面内输入 - `thisisunsafe`
2. 控制台执行 - `sendCommand(SecurityInterstitialCommandId.CMD_PROCEED)`

## 取消所有 service worker 注册

- chrome://serviceworker-internals

```js
$$('.unregister').forEach((b) => b.click());
```
