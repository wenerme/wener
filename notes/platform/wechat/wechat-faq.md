---
tags:
  - FAQ
---

# Wechat FAQ

- unionid
  - 开发者下唯一 = 主体 - https://open.weixin.qq.com
  - 移动应用, 网站应用, 公众号, 小程序
- openid
  - 应用内唯一
- session_key
  - 用于加密签名验证
  - 用于 wx.getUserInfo 等操作
- uin
  - 数字编号
- 授权 != 登录


**跳转到公众号**

```
https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${btoa(uin)}&scene=124#wechat_redirect
```

**生成的公众号二维码**

```
http://weixin.qq.com/r/XXX?utm_source=XX
```

## 唤起微信

- https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/url-scheme/generateScheme.html
- https://juejin.cn/post/7182133487296577595
  - 3gimg.qq.com/html5/js/qb.js
  - jsapi.qq.com/get?api=app.share

## macOS 使用默认浏览器打开链接

> 目前是右键打开

- macOS 微信
- 搜索的地方输入 :recover
- 使用默认浏览器打开链接
  - 关闭使用微信打开链接

---

- Window 设置里面就有
