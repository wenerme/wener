---
title: Chrome FAQ
tags:
  - FAQ
---

# Chrome FAQ

## 离线安装下载

- https://www.google.com/intl/en/chrome/?standalone=1

```bash
# ChromeStandaloneSetup64.exe
# https://dl.google.com/tag/s/appguid={8A69D345-D564-463C-AFF1-A69D9E530F96}&iid={E3751212-181B-0E06-8D37-4EC9E8CE331E}&lang=en&browser=4&usagestats=0&appname=Google%20Chrome&needsadmin=prefers&ap=x64-stable-statsdef_1&installdataindex=defaultbrowser/chrome/install/ChromeStandaloneSetup64.exe

# https://dl.google.com/tag/s/appguid={}&iid={}&lang=en&browser=4&usagestats=0&appname=Google%20Chrome&needsadmin=prefers&ap=x64-stable-statsdef_1&installdataindex=empty/chrome/install/ChromeStandaloneSetup64.exe

#
curl -o ChromeStandaloneSetup64.en.exe "https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B87584CE6-0E38-80EC-E64B-445DE6CAC662%7D%26lang%3Den%26browser%3D4%26usagestats%3D0%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/chrome/install/ChromeStandaloneSetup64.exe"
#
curl -o ChromeStandaloneSetup64.zh-CN.exe "https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B1AF1CCDF-A7FA-8A43-6E6D-A889DB429A87%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D0%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/chrome/install/ChromeStandaloneSetup64.exe"

# macOS
curl -LOJC- https://dl.google.com/chrome/mac/universal/stable/GGRO/googlechrome.dmg
curl -LOJC- https://dl.google.com/chrome/mac/universal/stable/CHFA/googlechrome.dmg

# googlechrome.dmg 87.0
curl -LOJC- https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg

# pkg 版本
curl -LOJC- https://dl.google.com/chrome/mac/universal/stable/gcem/GoogleChrome.pkg

# 获取版本号
strings ChromeStandaloneSetup64.exe | grep -i '<manifest version='
```

| Brand Code | Name Fragments             | Notes                                                                        |
| :--------- | :------------------------- | :--------------------------------------------------------------------------- |
| GGRO       | Stable-PureOrganic         | 纯自然安装 (Pure organic installs)。                                         |
| CHFA       | Stable-OffNetworkMarketing | 非网络营销安装 (Off-network marketing installs)，即不源自 `google.xx` 营销。 |
| MACD       | Stable-DistributionDeals   | 分销合作 (Distribution deals)。                                              |
| GGRM       | Stable-GoogleMarketing     | 谷歌营销渠道 (google.xx marketing channels)，例如站内广告、toast 促销等。    |

- https://chromium.googlesource.com/chromium/reference_builds/chrome_mac/+/master/Google%20Chrome%20Packaging/generate_dmgs
  - 生成镜像的命名逻辑
- https://chromiumdash.appspot.com/fetch_releases?channel=Stable&platform=Mac
- https://chromiumdash.appspot.com/fetch_releases?channel=Stable&platform=Windows
- Windows 11 x86_64
  - appguid 8A69D345-D564-463C-AFF1-A69D9E530F96
  - iid 87584CE6-0E38-80EC-E64B-445DE6CAC662
- https://dl.google.com/mac/install/googlesoftwareupdate.dmg

## 自动更新域名

- tools.google.com
- dl.google.com
- update.googleapis.com
- https://dl.google.com/mac/install/googlesoftwareupdate.dmg

## KSServerUpdateRequest fetch failed. The request timed out.

macOS 自动更新失败

## manifest v2

- 打开 `chrome://flags/`
- 搜索 `mv2`
- 允许

---

- https://github.com/violentmonkey/violentmonkey/issues/2284

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
- https://www.freshports.org/www/linux-widevine-cdm/

## Chrome vs Chromium

- Chromium
  - BSD-3 - 开源
  - 更新频繁
  - 不支持 DRM
    - https://www.freshports.org/www/linux-widevine-cdm/
  - 只包含基本编码: Opus, Theora, Vorbis, VP8, VP9, WAV
    - **可能是最大的影响**
    - https://www.chromium.org/audio-video/
    - http://hpr.dogphilosophy.net/test/
- Chrome
  - Google Chrome - 商业产品
  - 分三个版本: Stable, Beta/Canary, Dev
  - **DRM** - 支持 Netflix, Amazon Prime Video
  - 支持更多编码: AC, H.264, MP3,
  - 额外内容
    - [can i use format](https://caniuse.com/?search=format)
    - 自动更新功能
    - 用户跟踪
    - 安全检测

## Bookmarks

```html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file. It will be read and overwritten. -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>

<DL><p>
    <DT><H3 ADD_DATE="1698514800" LAST_MODIFIED="1698601200">Folder 1</H3>
    <DL><p>
        <DT><A HREF="https://www.example.com" ADD_DATE="1698514800" ICON="https://example.com/favicon.ico">Example</A>
    </DL><p>
    <DT><A HREF="https://www.anotherexample.com" ADD_DATE="1698514800">Another Example</A>
</DL><p>
```

- chrome://bookmarks/
