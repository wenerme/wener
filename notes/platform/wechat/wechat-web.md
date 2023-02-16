---
title: Wechat Web
---

# Wechat Web

- skey 是获取联系人信息的关键信息(比如获取好友（包括订阅的公众号）头像信息），标识当前人的身份。还是检查 web 端微信心跳的标识。发消息时也会使用。
- pass_ticket 是在授权成功后进行初始化和收发消息使用的。
- wxsid 在收发消息会子啊 url 后或请求体中使用。
- wxuin 在发消息时使用
- 参考
  - [简述网页版微信扫码登录的过程](https://segmentfault.com/a/1190000011996725)
- 通过 https://wx.qq.com/?target=t 扫码登录检测有什么问题
  - 你需要开通 **微信支付**，才可继续操作。
- init
  - Ret 1101
    - 注销状态
- https://blog.csdn.net/u012478759/article/details/78376756
- https://filehelper.weixin.qq.com
  - https://dwei.xin
- 登录
  - qr `https://login.weixin.qq.com/l/<UUID>`
  - Web QR `https://login.weixin.qq.com/qrcode/<UUID>`
