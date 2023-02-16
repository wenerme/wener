---
title: 微信公众号
---

# 微信公众号

> Wechat Official Account

:::tip

- EncodingAESKey `[a-zA-Z0-9]{43}`

:::

2.出于安全考虑，开放平台网站提供了修改 EncodingAESKey 的功能（在 EncodingAESKey 可能泄漏时进行修改），所以建议公众账号保存当前的和上一次的 EncodingAESKey，若当前 EncodingAESKey 解密失败，则尝试用上一次的 EncodingAESKey 的解密。回包时，用哪个 Key 解密成功，则用此 Key 加密对应的回包。

- 微信公众平台接口调试工具 https://mp.weixin.qq.com/debug
- [微信公众平台开发概述](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html)

```
https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
```

- scope
  - snsapi_base
    - 静默授权
    - 只能获取到 openid
  - snsapi_userinfo
    - 昵称、性别、所在地
- state - `[a-zA-Z0-9]{0,128}`
- forcePopup
  - 是否强制弹窗确认

## Token

:::tip

- 7200 秒，120 分钟，2 小时
- 请求新 Token 后旧的 Token 会在 5 分钟后失效

:::

- GET https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code


## 关注 URL

- 获取 UIN
  - 前往 https://mp.weixin.qq.com/cgi-bin/home
  - 登陆后 window.wx.commonData.uin

```js
const href=`https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${btoa(uin)}&scene=110#wechat_redirect`
```

## 二维码

- 临时 - 30天、数量更多 - QR_SCENE
  - scene_str - 64位
- 长期 - 最多 10万个 - QR_LIMIT_SCENE
  - scene_id - 1-100000
- 返回 ticket 换取二维码
