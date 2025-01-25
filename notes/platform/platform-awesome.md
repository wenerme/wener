---
title: Platform Awesome
tags:
  - Awesome
---

# Platform Awesome

## 小程序平台 {#miniprogram}

- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [京东小程序](https://mp.jd.com/)
- [百度智能小程序](https://smartprogram.baidu.com/developer/index.html)
- [支付宝小程序](https://opendocs.alipay.com/mini/developer/getting-started)
- [字节跳动小程序](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/overview)
- [QQ 小程序](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [钉钉小程序](https://open.dingtalk.com/document/org/develop-org-mini-programs)
- [企业微信小程序](https://developers.weixin.qq.com/miniprogram/dev/devtools/qywx-dev.html)
- [支付宝 IOT 小程序](https://opendocs.alipay.com/iot/multi-platform/vcs0fv)
- [飞书小程序](https://open.feishu.cn/document/uYjL24iN/uMjNzUjLzYzM14yM2MTN)
- 快手小程序
- 抖音小程序 -> 字节跳动小程序
- 飞书小程序 -> 字节跳动小程序
- [快应用](https://www.quickapp.cn/)
- 支付宝开放平台可以关联其他平台
  - 支付宝 IoT
  - 天猫精灵
  - 阿里车
  - 阿里云盘
  - UI浏览器
  - 口碑商家版
  - 钉钉
  - 优酷
  - 夸克

---

- PWA - Progressive Web App
- [H5](https://developer.mozilla.org/zh-CN/docs/Web)
- [ReactNative](https://reactnative.dev/)
- https://nervjs.github.io/taro/docs/
- https://zh.uniapp.dcloud.io/tutorial/miniprogram-subject.html
- https://jaq-doc.alibaba.com/docs/doc.htm?treeId=478&articleId=120776&docType=1
- 工具下载
  - [微信小程序/下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
    - [Stable](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)

## 跨端小程序开发

| framwork         | for               | by   |
| ---------------- | ----------------- | ---- |
| uni-app          | vue2, vue3        |
| uni-app for vite | vue3              |
| [Taro] v3        | React, vue2, vue3 | 京东 |
| [remax]          | React             | 阿里 |
| [rax]            | React             | 阿里 |
| [kbone]          | Web 端同构        | 腾讯 |
| [omi]            |                   | 腾讯 |
| [mpx]            | vue               | didi |

[mpx]: https://github.com/didi/mpx
[rax]: https://github.com/alibaba/rax
[remax]: https://github.com/remaxjs/remax
[taro]: https://github.com/nervjs/taro
[kbone]: https://github.com/Tencent/kbone
[omi]: https://github.com/Tencent/omi

## Message

- [gallonyin/worktool](https://github.com/gallonyin/worktool)
- [Hanson/vbot](https://github.com/Hanson/vbot)
- [zhayujie/chatgpt-on-wechat](https://github.com/zhayujie/chatgpt-on-wechat)
- [zhayujie/bot-on-anything](https://github.com/zhayujie/bot-on-anything)
  - MIT, Python
  - 微信、公众号、QQ、Telegram、Gmail、Slack、Web、企业微信、飞书、钉钉

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

- [Vultr](https://www.vultr.com/)
  - ~~1C0.5G 10GB 0.5TB $2.5/mo - IPv6~~
  - ~~1C0.5G 10GB 0.5TB $3.5/mo - IPv4~~
  - 1C1G 25GB 1TB $5/mo
  - 1C1G 25GB 2TB $6/mo
  - **注意** Alpine 需要通过挂载 ISO 安装，有点麻烦
- Kamatera - 1C1G 20GB 1T $4/mo
- [BandwagonHost](https://bandwagonhost.com)
  - 速度测试 https://www.bandwagonhost.net/test-ip
  - 1C1G 20GB 1T $50/an ~ $4.2/mo - 联通专线
  - https://1kb.day/deals.html
- CSTserver
  - 香港, 美国, CN2
  - https://cstserver.com/
  - Promot Code CSTOU4 CVM EPYC X2 22.4$/year 2C2G
- https://www.arosscloud.com/
  - 香港业务为主
- https://www.simcentric.com/
- CstoneCloud
- https://cloud.colocrossing.com
  - CODE: BLACKFRIDAY25
  - ccs
- [joedicastro/vps-comparison](https://github.com/joedicastro/vps-comparison)
- 美国CN2 GIA线路
- 欧洲AS9929线路
- 日本CN2 GIA/Softbank线路
- 香港CN2 GIA/CMI线路
- CN2 GIA/CTGNet
- HK85线路

### 香港中国优化普通型不限流量带宽

中国优化普通型带宽表示带宽峰值为 **50M**，不限制流量，但不得长时间满载使用。
**6小时**内平均流量超过**30%**，将在48小时内被**限速至30%**。

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

## VPN

- [NordVPN](./nordvpn.md)
- ExpressVPN

## CDN

- cloudfront
- fastly
- akamai
- cloudflare
  - https://cdnjs.cloudflare.com/
    - [cdnjs/cdnjs](https://github.com/cdnjs/cdnjs)
- https://jsdelivr.net
  - 商业化、功能多速度快
  - cdn.jsdelivr.net
    - 使用 Fastly
    - 国内大部分地区不可用
  - testingcf.jsdelivr.net
    - 使用 Cloudflare

## Lookup

- https://bgp.tools/
- https://www.netify.ai/resources
