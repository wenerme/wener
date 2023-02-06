---
title: WeChat
---

# WeChat

- 企业号
  - [企业号开发文档](http://qydev.weixin.qq.com/wiki/index.php?title=首页)
  - [微信企业号接口调试工具](http://qydev.weixin.qq.com/debug)
- 企业微信
  - [企业微信开发文档](https://work.weixin.qq.com/api/doc)
- 微信
  - [微信公众平台技术文档](https://mp.weixin.qq.com/wiki)
- [chanxuehong/wechat.v2](https://github.com/chanxuehong/wechat.v2)
  - 微信 Go SDK
- 微信小程序
  - [开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/)
  - [Tencent/omi](https://github.com/Tencent/omi)
    - 跨端
    -  Web Components, JSX/TSX
  - [Tencent/wepy](https://github.com/Tencent/wepy)
    - 组件化开发框架
    - Vue 风格
  - [Tencent/kbone](https://github.com/Tencent/kbone)
    - 微信小程序和 Web 端同构的解决方案
  - [weilanwl/ColorUI](https://github.com/weilanwl/ColorUI)
  - taro
  - [dcloudio/uni-app](https://github.com/dcloudio/uni-app)
  - [TalkingData/iview-weapp](https://github.com/TalkingData/iview-weapp)
  - [tailwindcss jit](https://developers.weixin.qq.com/community/develop/article/doc/00028ea8ab84d86c968d58d5b5bc13)

## 接口

- [huan/docker-wechat](https://github.com/huan/docker-wechat)
  - Wine
- [UOS Web 协议](https://wechaty.js.org/2021/04/13/wechaty-uos-web/)
  - 头里加 extspam 和 client-version
- [ljc545w/ComWeChatRobot](https://github.com/ljc545w/ComWeChatRobot)
  - PC微信机器人，实现获取通讯录，发送文本、图片、文件等消息，封装COM接口供Python、C#调用
- Web 微信 - wx.qq.com
  - 2017 后创建的账户不可用 - UOS 出现后可带 Header 绕过
  - WebAPI 不可以创建房间、邀请成员
  - 不能收发 企业微信
- [nodeWechat/wechat4u](https://github.com/nodeWechat/wechat4u)
  - JS
- [leochen-g/wechatBot](https://github.com/leochen-g/wechatBot)
- [leochen-g/wechat-assistant-pro](https://github.com/leochen-g/wechat-assistant-pro)
- [wechaty/puppet](https://github.com/wechaty/puppet)
  - [wechaty/puppet-padlocal](https://github.com/wechaty/puppet-padlocal)
    - 付费

## 备份

- [BlueMatthew/WechatExporter](https://github.com/BlueMatthew/WechatExporter)
- [tsycnh/WeChatExporter](https://github.com/tsycnh/WeChatExporter)
- [wxbackup](http://wxbackup.imxfd.com/)
- [12425/wechat-exporter](https://github.com/12425/wechat-exporter)

## EnMicroMsg

- SQLCipher3
- 解密密码=Left(Md5(IMEI 码+UIN 码),7)
  - IMEI - `*#06#`
- [chg-hou/EnMicroMsg.db-Password-Cracker](https://github.com/chg-hou/EnMicroMsg.db-Password-Cracker)

## 表情

- gif 1-104
  - https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/69.gif

## macOS

- ~/Library/Containers/com.tencent.xinWeChat/
  - Data/Library/Application Support/com.tencent.xinWeChat/
    - 版本/
- 参考
  - LLDB 获取 SQLCipher 密钥
    - http://xferris.cn/dao-chu-wei-xin-bei-fen-de-mac/
      - backup 时获取
    - https://www.v2ex.com/t/466053
      - 登陆时获取

```bash
ls ~/Library/Containers/com.tencent.xinWeChat/Data/Library/Application\ Support/com.tencent.xinWeChat/*/*/Message/*.db

# 判断最大的目录
du -s * | sort -h
```

## Data

- https://www.showdoc.com.cn/189873290278540/1076946966902629
- 朋友圈
  - snsId

## 域名地址

- http://dns.weixin.qq.com/cgi-bin/micromsg-bin/newgetdns
- hkshort.weixin.qq.com
- hkaxshort.weixin.qq.com
- hkextshort.weixin.qq.com
- hkdisas.weixin.qq.com
- hkshort6.weixin.qq.com
- hkshort.pay.weixin.qq.com
- hklong.weixin.qq.com
- hkminorshort.weixin.qq.com
- hkquic.weixin.qq.com
- sgshort.pay.wechat.com
- sglong.wechat.com
- sgminorshort.wechat.com
- sgshort.wechat.com
- sgaxshort.wechat.com
