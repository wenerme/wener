---
title: Puppeteer
---

# Puppeteer

- [puppeteer](https://github.com/puppeteer/puppeteer)
  - [Chrome Devtools Protocol](./chrome-headless.md) 客户端
- 参考
  - 使用了 [Chrome for Testing](./chrome-for-testing.md)

:::caution

- Alpine 下有问题 [#7746](https://github.com/puppeteer/puppeteer/issues/7746)
  - 在 Alpine 下额外安装，然后配置 PUPPETEER_EXECUTABLE_PATH
- 保持浏览器运行 [#8261](https://github.com/puppeteer/puppeteer/issues/8261)
  - https://github.com/puppeteer/puppeteer/blob/main/packages/browsers/src/detectPlatform.ts

:::

```bash
npm add puppeteer

# linux 依赖
apk add nss nspr at-spi2-atk cups-libs libxcomposite mesa-gbm libxkbcommon pango cairo alsa-lib
# at-spi2-core

# Linux 环境使用
export DISPLAY=:1

node
.editor
```

```js
var puppeteer = await import('puppeteer');
var browser = await puppeteer.launch();
var page = await browser.newPage();
```

- Browser
  - 事件
    - disconnected
    - targetchanged - URL 变化
    - targetcreated - 例如 window.open, browser.newPage
    - targetdestroyed
  - BrowserContext
    - 事件: targetchanged, targetcreated, targetdestroyed
    - 可以创建 incognito 上下文
    - Target - page, background_page, service_worker, shared_worker, other, browser, webview
    - Page - 正常网页
      - Frame
      - mainFrame - 当前主窗口

```bash
# macOS 手动启动
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')

# Windows
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

- http://127.0.0.1:9222/json/version
- 默认使用 --remote-debugging-port=0
  - 随机 port
- https://github.com/puppeteer/puppeteer/blob/v14.4.1/docs/api.md

```js
// 获取当前的 ws url
browser.wsEndpoint();
```

## browser

- ~/.cache/puppeteer/chrome
- PUPPETEER_SKIP_DOWNLOAD=true
  - 避免下载
- PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
- PUPPETEER_DOWNLOAD_BASE_URL
- ~~PUPPETEER_SKIP_CHROMIUM_DOWNLOAD~~ -> PUPPETEER_SKIP_DOWNLOAD
- ~~PUPPETEER_DOWNLOAD_HOST~~ -> PUPPETEER_DOWNLOAD_BASE_URL
- ~~PUPPETEER_CHROMIUM_REVISION~~ -> PUPPETEER_BROWSER_REVISION

```ini title=".npmrc"
puppeteer_download_base_url="https://cdn.npmmirror.com/binaries/chrome-for-testing"
```

```bash
npx @puppeteer/browsers --help
```

- https://pptr.dev/browsers-api
- https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions.json

## adblock

```bash
npm add puppeteer-extra puppeteer-extra-plugin-adblocker
```

```js
const puppeteer = require('puppeteer-extra');

// Add adblocker plugin, which will transparently block ads in all pages you
// create using puppeteer.
const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require('puppeteer');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(
  AdblockerPlugin({
    // Optionally enable Cooperative Mode for several request interceptors
    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
  }),
);
```

- https://github.com/ghostery/adblocker
  - https://raw.githubusercontent.com/cliqz-oss/adblocker/master/packages/adblocker/assets/easylist/easylistgermany.txt

## 添加扩展

- --disable-extensions-except=/path/to/extension
- --load-extension=/path/to/extension

## Notes

- @puppeteer/browsers
  - 安装和启动浏览器
  - 启动 https://github.com/puppeteer/puppeteer/blob/main/packages/browsers/src/launch.ts
- puppeteer-core
  - CDP API
  - launch & connect
  - launch 通过 `@puppeteer/browsers` 启动
    - https://github.com/puppeteer/puppeteer/blob/main/packages/puppeteer-core/src/node/ProductLauncher.ts

# FAQ

## Docker user

```bash
addgroup -S pptruser
adduser -S -g pptruser pptruser
mkdir -p /home/pptruser/Downloads /app
chown -R pptruser:pptruser /home/pptruser
chown -R pptruser:pptruser /app
```

## AlpineLinux musl

默认下载的不支持

```bash
Error relocating /chrome-linux/chrome: __mbrlen: symbol not found
Error relocating /chrome-linux/chrome: __close: symbol not found
Error relocating /chrome-linux/chrome: initstate_r: symbol not found
Error relocating /chrome-linux/chrome: random_r: symbol not found
```

- https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-on-alpine

```bash
apk add chromium chromium-lang
# chromium-chromedriver
```

```js
var browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium-browser',
  headless: false,
  args: ['--no-sandbox', '--disable-gpu'],
});
```

- root 必须要 `--no-sandbox`

## Failed to adjust OOM score of renderer with pid 799: Permission denied

- --no-sandbox
- SYS_ADMIN
- seccomp
- https://github.com/Zenika/alpine-chrome/issues/109
- https://github.com/Zenika/alpine-chrome/blob/master/examples/k8s/deployment.yml

## Failed to connect to the bus: Failed to connect to socket /var/run/dbus/system_bus_socket: No such file or directory

```bash
apk add dbus
service dbus start
```

## The profile appears to be in use by another Chromium process on another computer

```txt
The profile appears to be in use by another Chromium process on another computer. Chromium has locked the profile so that it doesn't get corrupted. If you are sure no other processes are using this profile, you can unlock the profile and relaunch Chromium.
```

```bash
# $DataDir/Singleton*
rm -rf ~/.config/chromium/Singleton*
```

- SingletonSocket
- SingletonLock
- SingletonCookie

## Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
