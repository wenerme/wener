---
tags:
  - Backup
---

# 会话内容存档

:::caution

1. 会话存档保存 **5** 天
1. 从 Sequence+1 拉取，不包含 Sequence
1. GetChat limit 最大 1000
1. 图片 jpg, 音频 amr, 视频 mp4
1. 可能存在 MD5 为空字符串
1. MediaData 的 MD5 可能匹配不上，可以多次重试
1. MediaData 单次最多返回 512K
1. NewSDK, InitSDK 只需要调用一次
1. switch 切换企业日志不是真正的消息，与上述消息结构不完全相同。
1. 错误 10001-10003 可以重试
1. 接收事件回调 最小间隔 15s

:::

- libWeWorkFinanceSdk_C.so
  - 依赖 GLIBC
  - 使用了 libcurl
    - https_proxy 能生效
- 实际请求 qyapi.weixin.qq.com
- 「会话内容存档」Secret 权限
  - 群信息：群名、群主、群公告、群成员入群时间
  - 会话信息：会话发送方、会话发送时间、会话接收方、会话内容
- 参考
  - https://developer.work.weixin.qq.com/document/path/91774

```bash
# RSA2048 key
openssl genrsa -out wecom.pri.pem 2048
openssl rsa -in wecom.pri.pem -pubout -out wecom.pub.pem
```

---

获取 wr 和 wm 信息

- 内部群 - inner room
  - POST /cgi-bin/msgaudit/groupchat/get `{"roomid":""}`
  - 会话存档 Secret 可调用
- 外部客户群 - external contact group
  - POST /cgi-bin/externalcontact/groupchat/get `{"chat_id":""}`
- 外部客户群列表
  - POST /cgi-bin/externalcontact/groupchat/list
- **注意** 有的群是无法取到信息的，由微信拉起的群

## message

- action
  - send 发送消息
  - recall 撤回消息
  - switch 切换企业日志

---

- proxy 格式 socks5://10.0.0.1:8081, http://10.0.0.1:8081
- proxy credentials 格式 username:password
- 单聊
  - from 发送方, tolist 只有一个接收方
- 群聊
  - from 发送方, tolist 群内其他成员, roomid 非空
- 图片 jpg, 语音 amr, 视频 mp4
- 机器人与外部联系人的账号都是 external_userid ，其中机器人的external_userid是以"wb"开头
  - 获取机器人信息 `GET /cgi-bin/msgaudit/get_robot_info?access_token&robot_id`
    - data: robot_id, name, creator_userid
  - https://developer.work.weixin.qq.com/document/path/91774#%E8%8E%B7%E5%8F%96%E6%9C%BA%E5%99%A8%E4%BA%BA%E4%BF%A1%E6%81%AF
- 外部联系人的 external_userid 以"wo"或"wm"开头
- msgid以 `_external` 结尾的消息，表明该消息是一条外部消息。msgid以 `_updown_stream` 结尾的消息，表明该消息是一条上下游消息。
- roomid
  - 可能为内部群
  - 可能为外部群
- mediadata
  - index 格式为 Range:bytes=524288-655711
  - dataLen 默认 524288, 512k
- https://developer.work.weixin.qq.com/document/path/91774
- FAQ https://developer.work.weixin.qq.com/document/path/91552

## SDK 依赖

```bash
apt install gcc g++
```

# FAQ

## 10006: 解密失败 GetMediaData

:::caution

- 就是可能出现个别 文件 解密失败的情况

:::

请检查是否先进行 base64decode 再进行 rsa 私钥解密，再进行 DecryptMsg 调用。

## Quote

```
/^(这是一条引用\/回复消息：|This is a quote\/reply:)\n["“](?<user>[^\n]+)[：:]\s?\n(?<quote>.*?)[”"]\n-{6}\n(?<content>.*)$/s
```

```
/^「(?<user>[^\n]+)：\n?(?<quote>.*?)」\n-( -){14}\n(?<content>.+)$/s
```

**消息归档**

```
这是一条引用/回复消息：
"USER:
QUOTE"
------
CONTENT
```

**微信**

```
「USER：QUOTE」
- - - - - - - - - - - - - - -
CONTENT
```
