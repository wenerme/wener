---
tags:
  - Command
---

# Chrome CLI

:::tip

- Proxy 只能配置全局，不可以按页面配置
  - [puppeteer#678](https://github.com/puppeteer/puppeteer/issues/678)
  - Context 可以配置代理 https://pptr.dev/next/api/puppeteer.browsercontextoptions/
- 不支持 PAC
- [puppeteer#540](https://github.com/puppeteer/puppeteer/issues/540)
  - 多个 cert 会出现选择

:::

- devtools-ws-url
  - --remote-debugging-port=9222
    - /json
- flags
  - --user-data-dir=$DIR
  - --blink-settings=imagesEnabled=false
- DevToolsActivePort
  - 第一行为端口
  - 第二行为 路径 `/devtools/browser/UUID`
- Crashpad -> Chromium 的崩溃报告系统
- https://www.chromium.org/developers/design-documents/network-settings/
  - --proxy-server=127.0.0.1:7890
- [List of Chromium Command Line Switches](https://peter.sh/experiments/chromium-command-line-switches/)

| flag                                                 | for                    |
| ---------------------------------------------------- | ---------------------- |
| --headless=[new]                                     |
| --no-sandbox                                         |
| --disable-extensions                                 |
| --remote-debugging-port=PORT                         | 开启远程调试           |
| --user-data-dir=PATH                                 |
| --disable-background-timer-throttling                | 禁用后台任务的时间限制 |
| --mute-audio                                         | 静音所有音频输出       |
| --disable-popup-blocking                             |
| --enable-automation                                  |
| --ozone-platform=headless                            | 图形系统模式           |
| --use-angle=swiftshader-webgl                        | 使用 ANGLE 渲染器      |
| --disable-gpu-compositing                            | 禁用 GPU 合成          |
| --disable-dev-shm-usage                              | 禁用 /dev/shm 使用     |
| --enable-crash-reporter                              | 启用崩溃报告           |
| --force-color-profile=srgb                           | 强制颜色配置           |
| --allow-pre-commit-input                             |
| --disable-background-networking                      |
| --disable-backgrounding-occluded-windows             |
| --disable-breakpad                                   |
| --disable-client-side-phishing-detection             |
| --disable-component-extensions-with-background-pages |
| --disable-component-update                           |
| --disable-default-apps                               |
| --disable-hang-monitor                               |
| --disable-infobars                                   |
| --disable-field-trial-config                         |
| --disable-ipc-flooding-protection                    |
| --disable-prompt-on-repost                           |
| --disable-renderer-backgrounding                     |
| --disable-search-engine-choice-screen                |
| --disable-sync                                       |
| --export-tagged-pdf                                  |
| --generate-pdf-document-outline                      |
| --metrics-recording-only                             |
| --no-first-run                                       |
| --password-store=basic                               |
| --use-mock-keychain                                  |
| --disable-features=FEATURES                          |
| --enable-featuresFEATURES                            |
| --hide-scrollbars                                    |
| --auto-open-devtools-for-tabs                        |

- `--remote-debugging-port=0`
  - 随机端口

| features                             | for |
| ------------------------------------ | --- |
| Translate                            |
| AcceptCHFrame                        |
| MediaRouter                          |
| OptimizationHints                    |
| ProcessPerSiteUpToMainFrameThreshold |
| NetworkServiceInProcess2             |

| --type           | for                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| browser          | 主进程 - 管理用户界面和浏览器的核心功能，如地址栏、书签、后台选项卡等。                                     |
| zygote           | 在 Linux 系统中，zygote 进程作为模板进程，用于快速生成新的浏览器进程，提高进程创建的效率。                  |
| gpu-process      | GPU 进程 - 硬件加速渲染                                                                                     |
| utility          | 工具进程 - 执行特定的后台任务，如网络服务、存储管理等                                                       |
| renderer         | 渲染进程 - 负责渲染网页。每个标签页一般都有自己的渲染进程，这样即使一个标签页崩溃，也不会影响到其他标签页。 |
| crashpad-handler | Crashpad 崩溃处理程序                                                                                       |

- about:blank

**browserless**

```
--allow-pre-commit-input --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-breakpad --disable-client-side-phishing-detection
--disable-component-extensions-with-background-pages --disable-component-update --disable-default-apps
--disable-dev-shm-usage --disable-extensions
--disable-field-trial-config --disable-hang-monitor --disable-infobars --disable-ipc-flooding-protection
--disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding
--disable-search-engine-choice-screen --disable-sync --enable-automation --export-tagged-pdf
--generate-pdf-document-outline --force-color-profile=srgb --metrics-recording-only --no-first-run
--password-store=basic --use-mock-keychain --disable-features=Translate,AcceptCHFrame,MediaRouter,OptimizationHints,ProcessPerSiteUpToMainFrameThreshold
--enable-features=NetworkServiceInProcess2 --headless=new --hide-scrollbars --mute-audio about:blank --remote-debugging-port=42017 --no-sandbox --user-data-dir=/data/browser/browserless-data-dir-UUID
```

**puppeteer**

- https://github.com/puppeteer/puppeteer/blob/main/packages/puppeteer-core/src/node/ChromeLauncher.ts
