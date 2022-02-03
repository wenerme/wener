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

## 接口

- [huan/docker-wechat](https://github.com/huan/docker-wechat)
  - Wine
- [UOS Web 协议](https://wechaty.js.org/2021/04/13/wechaty-uos-web/)

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

## macOs

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
