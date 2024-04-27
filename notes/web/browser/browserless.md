---
title: browserless
---

# browserless

- [browserless](https://github.com/browserless/browserless)
  - SSPLv1, TS

```bash
# https://docs.browserless.io/docker/docker-quickstart/
TOKEN=$(openssl rand -hex 16)
echo TOKEN=$TOKEN
docker run -p 3000:3000 \
  -e "CONCURRENT=10" \
  -e DATA_DIR=/data/browser \
  -e DOWNLOAD_DIR=/data/download \
  -e "TOKEN=$TOKEN" \
  --name browserless ghcr.io/browserless/chromium
```

| env                 | default                         | note                     |
| ------------------- | ------------------------------- | ------------------------ |
| TIMEOUT             | 30000                           | 默认 30s                 |
| CONCURRENT          | 10                              | 并发数                   |
| QUEUED              | 5                               | 超过则返回 429           |
| HOST                |
| DEBUG               |                                 | 关闭所有`-*`             |
| CORS                | false                           |
| CORS_ALLOW_METHODS  | GET,POST,OPTIONS                |
| CORS_ALLOW_ORIGIN   | \*                              |
| CORS_MAX_AGES       | 2592000                         |
| METRICS_JSON_PATH   | /metrics                        |
| DATA_DIR            |
| DOWNLOAD_DIR        | /data/browserless-download-dirs |
| ALLOW_GET           | false                           |
| PROXY_HOST          |
| PROXY_PORT          |
| PROXY_SSL           |
| ALLOW_FILE_PROTOCOL |
| HEALTH              |                                 | 如果资源紧张，会返回 503 |
| MAX_MEMORY_PERCENT  | 99                              | 健康内存阀值             |
| MAX_CPU_PERCENT     | 99                              | 健康CPU阀值              |
| QUEUE_ALERT_URL     |
| REJECT_ALERT_URL    |
| TIMEOUT_ALERT_URL   |
| FAILED_HEALTH_URL   |

```js
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000?token=6R0W53R135510',
});
const page = await browser.newPage();

await page.goto('https://wener.me');
const data = await page.screenshot();
browser.close();
```

| param        | for                                          |
| ------------ | -------------------------------------------- |
| token        |
| proxy        |
| proxyCountry |
| blockAds     |
| launch       | 自定义启动参数，JSON, 可以设置 user-data-dir |

## API

- https://docs.browserless.io/HTTP-APIs/apis
