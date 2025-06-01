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
- `/MP_verify_0000000000000000.txt`
  - 公众号可信域名验证
- `/WW_verify_0000000000000000.txt`
  - 企业微信可信域名验证
- `/Abcde12345.txt`
  - 小程序业务域名验证
- 公众号/订阅号
  - 权限低、门槛低、功能少
  - 个人主体
    - 不能实现网页登陆
    - 不能申请认证
- 服务号
  - 面向企业、平台服务

## ID

| ID              | for    | demo |
| --------------- | ------ | ---- |
| gh_000000000000 | 小程序 |

**Wecom**

> 目前长度达多都是 32 - 2前缀 + 30随机 `[-_a-zA-Z0-9]`

| ID Prefix             | stand for                  | demo                             |
| --------------------- | -------------------------- | -------------------------------- |
| oa                    | union id                   |
| o                     | openid                     |
| `ww[0-9a-z]{16}`      | CorpID/SuitID              | ww000000000000000a               |
| wr                    | wecom room id              | wrjc7bDwAASxc8tZvBErFE02BtPWyAAA |
| `wm[-_a-zA-Z0-9]{30}` | external open/user id      | wmeDKaCQAAIQ_p7ACnxksfeBJSGocAAA |
| wmV                   | external member wechat     |
| wrV                   | external rootm id          |
| `wo[-_a-zA-Z0-9]{30}` | 企业微信外部联系人 open id | 对方是企业微信用户               |
| wb                    | wecom robot app            |
| wx                    | 小程序                     |
| tj                    | suite id/早期套件          | tjddddccc7775555aaa              |
| 1000000               | 自建 agent id              | 1000001                          |
| 2000000               | 系统应用 agent id          | 2000004 会话归档                 |
| 3000000               | 管理应用 agent id          | 3010084 日程                     |
| `gh_[0-9a-f]{12}@app` | 小程序消息的用户名         | gh_000000000000@app              |

- 企业微信 第三方应用
  - 加密
    - corpid
    - userid
    - external_userid
  - ~~unionid~~ 不再返回
- 客户群 -> 外部群聊
  - 外部=外部联系人
  - Contact 概念默认是企业内部人员
  - 因此 外部联系人 - 也就是 Contact Customer / External Contact
- opengid
  - opengid -> 客户群 chat_id
  - https://developer.work.weixin.qq.com/document/path/94822
- [企业微信账号ID安全性全面升级](https://developer.work.weixin.qq.com/document/path/96516)
  - 2024/07/18

## Auth

**网页登陆**

- 二维码 扫码

```
https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redire
```

- scope
  - snsapi_login

**跳转登陆**

```
https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
```

- scope
  - snsapi_base
  - snsapi_userinfo
- state - `a-zA-Z0-9`, 128

---

- 开放平台/网站应用微信登录 https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
  - 二维码
- 公众号/网页授权 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html

## URL

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

## 公众号文章参数

- https://soaked.in/2020/08/wechat-platform-url/

## 导出收藏的语音

- 文件格式 silk

```bash
# macOS
# ==========
# 相关目录
find ~/Library/Containers/com.tencent.xinWeChat -type d -name 'Favorites'
# silk 文件
find ~/Library/Containers/com.tencent.xinWeChat -path '*Favorites*' -iname '*.silk'

mkdir -p ~/Download/dump
find ~/Library/Containers/com.tencent.xinWeChat -path '*Favorites*' -iname '*.silk' -exec cp {} ~/Download/dump \;

# rename 为 01.silk 这种名字
# rename -v  -N 01 -e '$_ = $N . ".silk"' *.silk

git clone --depth 1 https://github.com/kn007/silk-v3-decoder
cd silk-v3-decoder/silk
make
cd ..

# 转换整个目录
sh converter.sh input/path output/path mp3

# silk -> pcm
./silk/decoder a.silk a.pcm
# pcm -> mp3
ffmpeg -y -f s16le -ar 24000 -ac 1 -i a.pcm a.mp3
```

- SILK
  - by Skype Limited
  - 2009 年 开发用于替代 SVOPC codec
  - Opus codec 的前身
- [kn007/silk-v3-decoder](https://github.com/kn007/silk-v3-decoder)
- wikipedia [SILK](https://en.wikipedia.org/wiki/SILK)
