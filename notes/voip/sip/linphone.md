---
title: Linphone
---

# Linphone

- https://www.linphone.org/technical-corner/linphone
- [正式版下载](https://www.linphone.org/releases)
- [Snapshot 下载](https://www.linphone.org/snapshots)
  - Windows 4.3.0 还没有正式发布
    - 修复了 UTF8 编码问题
- 项目
  - [BelledonneCommunications/linphone-desktop](https://github.com/BelledonneCommunications/linphone-desktop)

```bash
# 命令行触发呼叫
linphone "call sip-address=sip:10086@192.168.1.1"
```

## Linphone Desktop

- 数据
  - call-history.db - 呼叫日志
  - friends.db - 联系人
  - linphone.db - 主数据库
  - avatars
  - logs
  - thumbnails
  - zidcache
- 配置
  - linphonerc 应用和 SDK 配置文件
  - linphone.conf Qt 配置

| Type   | Env     | Dir                                    |
| ------ | ------- | -------------------------------------- |
| Data   |
|        | Linux   | ~/.local/share/linphone                |
|        | MacOS   | ~/Library/Application Support/linphone |
|        | Windows | %LOCALAPPDATA%/linphone                |
| Config |
|        | Linux   | ~/.config/linphone                     |
|        | MacOS   | ~/Library/Preferences/linphone/        |
|        | Windows | %LOCALAPPDATA%/linphone                |

## Crash

- macOS v4.2.5 asterisk pjsip originate 导致 linphone 崩溃
  - `channel originate pjsip/6002 extension 901@default`
