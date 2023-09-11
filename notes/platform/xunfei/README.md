---
title: 讯飞
---

# 讯飞


| model           | price           |
| --------------- | --------------- |
| 认知大模型 V1.5 | 0.18/10k tokens |
| 认知大模型 V2.0 | 0.36/10k tokens |

- QPS=2
- 1token=1.5中文、0.8英文单词

## 星火认知大模型

- `wss://spark-api.xf-yun.com/v1.1/chat`
  - domain=general
- `wss://spark-api.xf-yun.com/v2.1/chat`
  - domain=generalv2
- https://www.xfyun.cn/doc/spark/Web.html

### authorization

hmac, APISecret, base64

```
host: spark-api.xf-yun.com
date: Fri, 05 May 2023 10:43:39 GMT
GET /v1.1/chat HTTP/1.1
```

```js
const {
  createHmac,
} = await import('node:crypto');

const apiSecret = 'MjlmNzkzNmZkMDQ2OTc0ZDdmNGE2ZTZi'
const date = new Date('Fri, 05 May 2023 10:43:39 GMT')
const hmac = createHmac('sha256', apiSecret);
hmac.update(`
host: spark-api.xf-yun.com
date: ${date.toUTCString()}
GET /v1.1/chat HTTP/1.1
`.trim());
console.log(hmac.digest('base64'));
```
