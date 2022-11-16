---
title: Puppeteer
---

# Puppeteer

- ~/.cache/puppeteer/chrome
- PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
  - 避免下载
- PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

:::caution

- Alpine 下有问题 [#7746](https://github.com/puppeteer/puppeteer/issues/7746)

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
