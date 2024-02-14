---
title: Platform Awesome
tags:
  - Awesome
---

# Platform Awesome

## 小程序平台

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

## Proxy/VPN

- [NordVPN](./nordvpn.md)
- ExpressVPN

## Subscriptions

| service                          |               month |                     annual | notes                     |
| -------------------------------- | ------------------: | -------------------------: | ------------------------- |
| **US**                           |
| ChatGPT Plus                     |            $20/m/mo |
| ChatGPT Team                     |         $30/user/mo |                 $25/user/y |
| Spotify Premium Duo              |           $14.99/mo |
| Spotify Premium Family           |           $16.99/mo |
| Netflix Standard with Ads        |               $7/mo |                            | FullHD, 2设备             |
| Netflix Standard                 | $15.5/mo+$8/slot/mo |                            | FullHD, 2设备, 1额外成员  |
| Netflix Premium                  |   $23/mo+$8/slot/mo |                            | UltraHD, 4设备, 2额外成员 |
| NordVPN                          |           $12.99/mo |        $67.35/y,$102.33/2y |
| Jetbrains All Pack Organizations |            $77.9/mo | $779/1st,$623/2nd,$467/3rd |
| Jetbrains All Pack Individual    |            $28.9/mo | $289/1st,$231/2nd,$173/3rd |
| Microsoft 356 Family for Home    |            $9.99/mo |                   $99.99/y |
| Microsoft 356 Personal for Home  |            $6.99/mo |                   $69.99/y |
| Google One Standard 200GB        |            $2.99/mo |                   $29.99/y |
| Google One Premium 2TB           |            $9.99/mo |                   $99.99/y |
| Google One Premium 5TB           |           $24.99/mo |                  $249.99/y |
| Google One Premium 10TB          |           $49.99/mo |                            |
| Apple Game Arcade                |            $6.99/mo |                    $49.9/y |
| Apple Music                      |             $1.9/mo |                    $19.9/y |
| About iCloud+ 50GB               |            $0.99/mo |
| About iCloud+ 200GB              |            $2.99/mo |
| About iCloud+ 2TB                |            $9.99/mo |
| About iCloud+ 6TB                |           $29.99/mo |
| About iCloud+ 12TB               |           $59.99/mo |
| About Music Student              |            $5.99/mo |
| About Music Individual           |           $10.99/mo |
| About Music Family               |           $16.99/mo |
| Apple One Individual 50G         |           $19.95/mo |
| Apple One Family 200G            |           $25.95/mo |
| Apple One Premier 2T             |           $37.95/mo |
| **China mainland**               |                     |
| About iCloud+ 50GB               |                  ¥6 |
| About iCloud+ 200GB              |                 ¥21 |
| About iCloud+ 2TB                |                 ¥68 |
| About iCloud+ 6TB                |                ¥198 |
| About iCloud+ 12TB               |                ¥398 |

- 10个月付12个月 - 节省 16%
- ChatGPT Team
  - 更高的消息量
  - 数据不被用于训练
- https://one.google.com/about/plans
- [iCloud+ plans and pricing](https://support.apple.com/en-hk/HT201238)
- https://www.apple.com/apple-one/
  - iCloud+
  - Apple TV+
  - Music
  - Apple Arcade
  - Apple Fitness+
  - Apple News+
- https://www.apple.com/shop/buy-giftcard/giftcard
- https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products
