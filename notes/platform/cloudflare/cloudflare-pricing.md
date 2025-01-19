---
tags:
  - Pricing
---

# Cloudflare Pricing

- [Pricing](https://developers.cloudflare.com/workers/platform/pricing/)
  - Free
    - Workers Bundled
      - 第一个请求后的延迟变低
      - 10 ms/请求
      - 100,000 请求/天
      - 最多 1000 秒/天, 一个月最多 30,000 秒, =500 分钟
    - KV
      - 全局性的低延迟键值边缘存储
      - 100,000 read/day
      - 1,000 update or list/day
  - Paid Plan - Bundled - US$5/月
    - 10 million 请求/月, +$0.50/million
    - 30s/请求
    - 100M/请求
    - 30Mms/CPU时间 - 500分钟, 约 8.3 小时
  - Paid plan - Unbound
    - 1 million 请求/月, + $0.15/million
    - 400,000 GB-s, +$12.50/million GB-s

**AI**

- Free
  - Text 10,000 token/day
  - Embeding 10,000 token/day
  - Images 250 steps/day
  - STT 10min/day

| model              |            price |
| ------------------ | ---------------: |
| **Text**           |
| <= 3B              |  $0.10/mil token |
| 3.1B - 8B          |  $0.15/mil token |
| 8.1B - 20B         |  $0.20/mil token |
| 20.1B - 40B        |  $0.50/mil token |
| 40.1B+             |  $0.75/mil token |
| **Embedding**      |
| <= 150M parameters | $0.008/mil token |
| 151M+ parameters   | $0.015/mil token |
| **Image**          |
| <=256x256          | $0.00025/5 steps |
| <=512x512          |  $0.0005/5 steps |
| <=1024x1024        |   $0.001/5 steps |
| <=2048x2048        |   $0.002/5 steps |
| **STT**            |      $0.0039/min |

**R2**

- Class A Operations - 修改、写入、上传
- Class B Operations - 读取
- Free
  - Storage 10 GB / month
  - Class A Operations 1 million requests / month
  - Class B Operations 10 million requests / month

| Feature            |         Standard Storage | Infrequent Access Storage |
| ------------------ | -----------------------: | ------------------------: |
| Storage            |        $0.015 / GB-month |          $0.01 / GB-month |
| Class A Operations | $4.50 / million requests |  $9.00 / million requests |
| Class B Operations | $0.36 / million requests |  $0.90 / million requests |
| Data Retrieval     |                     None |                $0.01 / GB |
| Egress             |                     Free |                      Free |

- Workers API, S3 API, r2.dev domains
- https://developers.cloudflare.com/r2/pricing/

## Limits

- URLs have a limit of 16 KB.
- Request headers total limit of 32 KB, each header is limited to 16 KB.
- 响应体大小 不限制，但是有缓存大小限制
- **缓存** 最大响应体大小
  - Free, Pro, Business: 100 MB
  - Enterprise: 1 GB

**Account Plan Limits**

| **Feature**                               | **Free**   | **Paid**     |
| ----------------------------------------- | ---------- | ------------ |
| Subrequests                               | 50/request | 1000/request |
| Simultaneous outgoing connections/request | 6          | 6            |
| Environment variables                     | 64/Worker  | 128/Worker   |
| Environment variable size                 | 5 KB       | 5 KB         |
| Worker size                               | 3 MB       | 10 MB        |
| Worker startup time                       | 400 ms     | 400 ms       |
| Number of Workers                         | 100        | 500          |
| Number of Cron Triggers per account       | 5          | 250          |

**Maximum Body Size**

| plan       | size    |
| ---------- | ------- |
| Free       | 100 MB  |
| Pro        | 100 MB  |
| Business   | 200 MB  |
| Enterprise | 500 MB+ |

**Worker Limits**

| Feature       | Free                          | Paid                                                                                                        |
| ------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Request       | 100,000 req/day, 1000 req/min | No limit                                                                                                    |
| Worker memory | 128 MB                        | 128 MB                                                                                                      |
| CPU time      | 10 ms                         | 30s HTTP request, 15 min Cron Trigger                                                                       |
| Duration      | No limit                      | No limit for Workers<br>15 min duration limit for Cron Triggers, Durable Object Alarms, and Queue Consumers |

```bash
# 查看 bundle 情况 - 构建大小
wrangler deploy --outdir bundled/ --dry-run
```

- https://developers.cloudflare.com/workers/platform/limits/
