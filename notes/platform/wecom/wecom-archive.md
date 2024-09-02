---
tags:
  - Backup
---

# 会话内容存档

- action
  - send 发送消息
  - recall 撤回消息
  - switch 切换企业日志

:::caution

- switch 切换企业日志不是真正的消息，与上述消息结构不完全相同。
- 消息 5天 失效
- 错误 10001-10003 可以重试
- file
  - 可能 md5 为空字符串

:::

:::tip

- 通过 sequence 获取的数据是获取 sequence+1 而不会取到 sequence 这一条
- NewSDK, InitSDK 只需要调用一次

:::

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

## SDK

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
