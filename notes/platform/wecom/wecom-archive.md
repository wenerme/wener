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

:::


:::tip

- NewSDK, InitSDK 只需要调用一次

:::

- proxy 格式 socks5://10.0.0.1:8081, http://10.0.0.1:8081
- proxy credentials 格式 username:password
- 单聊
  - from 发送方, tolist 只有一个接收方
- 群聊
  - from 发送方, tolist 群内其他成员, roomid 非空
- 图片 jpg, 语音 amr, 视频 mp4
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
