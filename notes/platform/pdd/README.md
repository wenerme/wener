---
title: 拼多多
---

# 拼多多

- [授权说明](https://open.pinduoduo.com/application/document/browse?idStr=BD3A776A4D41D5F5)

| 账号类型           | 授权形式 | 授权页链接                                     |
| ------------------ | -------- | ---------------------------------------------- |
| 拼多多店铺         | WEB      | https://fuwu.pinduoduo.com/service-market/auth |
| 拼多多店铺         | H5       | https://mai.pinduoduo.com/h5-login.html        |
| 多多进宝推手       | WEB      | https://jinbao.pinduoduo.com/open.html         |
| 快团团团长         | WEB      | https://oauth.pinduoduo.com/authorize/ktt      |
| 拼多多电子面单用户 | WEB      | https://wb.pinduoduo.com/logistics/auth        |

```
https://{授权页链接}?response_type=code&client_id={应用client_id}&redirect_uri={client_id对应的回调地址}&state={自定义参数}
```
