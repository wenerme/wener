---
title: Chrome FAQ
tags:
  - FAQ
---

# Chrome FAQ

## 离线安装下载

- https://www.google.com/intl/en/chrome/?standalone=1

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

## open /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq: No such file or directory

Docker 环境，非 root

## Widevine Content Decryption Module

- CDM - Content Decryption Module - 内容解密模块
  - 实现 DRM
  - for Chrome、Firefox、Edge
- L1：最高安全级别，要求所有内容处理和加密/解密操作都在受保护的硬件环境中进行。
- L2：允许内容处理在操作系统的普通环境中进行，但加密/解密操作必须在受保护的硬件中进行。
- L3：对于没有受保护硬件的设备，所有操作都可以在操作系统的普通环境中进行，这是最低的安全级别。
- DRM - Digital Rights Management - 数字版权管理
  - adopted by Netflix、Amazon Prime Video
- https://www.widevine.com/
- https://support.mozilla.org/en-US/kb/enable-drm
