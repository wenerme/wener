---
title: Platform Awesome
tags:
  - Awesome
---

# Platform Awesome

## Cloud Provider

| abbr. | full name           | Note                |
| ----- | ------------------- | ------------------- |
|       | Aliyun              |
|       | Kamatera            |
|       | [Linode]            | 🌟 灵活，速度还不错 |
|       | Vultr               |
| AWS   | Amazon Web Services |
| BWG   | [BandwagonHost]     |
| DO    | DigitalOcean        |
| GCP   | Google Cloud        |

[linode]: ./linode.md
[bandwagonhost]: https://bandwagonhost.com/

- Vultr
  - ~~1C0.5G 10GB 0.5TB $2.5/mo - IPv6~~
  - ~~1C0.5G 10GB 0.5TB $3.5/mo - IPv4~~
  - 1C1G 25GB 1TB $5/mo
  - 1C1G 25GB 2TB $6/mo
  - **注意** Alpine 需要通过挂载 ISO 安装，有点麻烦
- Kamatera - 1C1G 20GB 1T $4/mo
- BandwagonHost - 1C1G 20GB 1T $50/an ~ $4.2/mo - 联通专线
  - 速度测试 https://www.bandwagonhost.net/test-ip
  - https://1kb.day/deals.html
- [joedicastro/vps-comparison](https://github.com/joedicastro/vps-comparison)

## Wechat

- [Tencent/kbone](https://github.com/Tencent/kbone)
  - 小程序和 Web 端同构解决方案
- [NervJS/taro](https://github.com/NervJS/taro)
  - 开放式跨端跨框架解决方案
- [YaoZeyuan/stablog](https://github.com/YaoZeyuan/stablog)
  - 备份导出微博记录

## Status

- https://www.vercel-status.com/
  - https://twitter.com/vercel_status
- https://www.stackstatus.net/

## Aliyun

- 应用实时监控服务 ARMS

### Prometheus

- 按量付费
  - 单日 > 1200w - 0.25 元/百万次
- 计算
  - 通常 15s 一次
  - 统计指标数量
    - `count({__name__=~".+"})`
    - prometheus_tsdb_head_series
  - 1 节点集群+基础服务约 5w 条
  - `15*5*10000*4*60*24~=4000百万~=900元/天`

### 日志

- 费用=存储+流量+数据加工+数据投递+请求+告警+Shard+SQL 分析
  - 存储=热存储+冷存储+时序存储
  - 流量=读+写+索引+时序索引+外网读取
- https://help.aliyun.com/document_detail/259690.html
