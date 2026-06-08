---
title: 企业微信 Inside
---

# 企业微信 Inside

> 安全边界：只整理目录、文件类型、DB 名称、存储分层与文件头特征；不要写入聊天内容、联系人明文、密钥、token、真实用户目录、企业名、账号 ID、profile hash。示例统一使用 `<profile>`、`<corp-or-user-id>`、`%USERPROFILE%` 脱敏。

# 结论

企业微信桌面端与微信 4.x 的 `xwechat_files` 统一账号结构不同：企业微信仍保留更明显的 **WXWork / Profiles / Data / CEF / WeDrive / WeMail** 分层。

核心差异：

| 维度          | macOS 企业微信                                                      | Windows 企业微信                                                          |
| ------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 主容器        | `~/Library/Containers/com.tencent.WeWorkMac/Data`                   | `%USERPROFILE%\Documents\WXWork`                                          |
| 运行时/日志   | 主容器内 `Documents/Network`、`Library/*`、辅助容器                 | `%APPDATA%\Tencent\WXWork`                                                |
| 用户/企业数据 | `Documents/Profiles/<profile>`                                      | `%USERPROFILE%\Documents\WXWork\<corp-or-user-id>` + `Profiles/<profile>` |
| Web/CEF 缓存  | `Library/WebKit`、`Profiles/*`、`com.tencent.WeWorkMac.MiniProgram` | `qtCef`、`WXWorkCefCache`、`%LOCALAPPDATA%\wxworkweb`                     |
| 微盘          | 容器内 WeDrive/IPC 相关目录                                         | `WeDrive/`、`WXDrive`、`%APPDATA%\WXDrive`                                |
| 邮件          | `ATencent.WXWork.IPC-WeMail`、`BTencent.WeMailQt.IPC-WeMail`        | `%APPDATA%\Tencent\WeMail`、Temp 下 WeMail                                |
| DB 加密       | 大量业务 DB 非 SQLite 明文头                                        | 大量业务 DB 非 SQLite 明文头，部分 cache/index/log DB 是明文 SQLite       |

# macOS

## 容器入口

观察到的 macOS 相关容器：

```text
~/Library/Containers/com.tencent.WeWorkMac/                 # 主容器，数据主体
~/Library/Containers/com.tencent.WeWorkMac.MiniProgram/     # 小程序/轻应用辅助容器
~/Library/Containers/com.tencent.WeWorkMac.launchxpc/       # XPC/启动辅助
~/Library/Containers/88L2Q4487U.com.tencent.WeWorkMac.IPCHelper/
~/Library/Group Containers/88L2Q4487U.com.tencent.WeWorkMac/
~/Library/Group Containers/88L2Q4487U.WeWorkMac/
```

主数据入口：

```text
~/Library/Containers/com.tencent.WeWorkMac/Data
```

当前观察中主容器体量最大，Group Containers 仅少量占位数据。

## 主容器结构

```text
~/Library/Containers/com.tencent.WeWorkMac/Data/
├── ATencent.WXWork.IPC-WeMail              # 邮件 IPC 相关
├── BTencent.WeMailQt.IPC-WeMail            # 邮件 IPC 相关
├── Tencent.WXWork.IPC-WeDrive              # 微盘 IPC 相关
├── Documents/
│   ├── AIModel/                            # 本地 AI/embedding 模型资源
│   ├── GYLog/                              # 日志
│   ├── GYOssLog/                           # OSS/上传类日志
│   ├── Network/                            # 网络配置、CDN、HTTPDNS、netcontext
│   ├── Profiles/                           # 核心 profile 数据
│   ├── UserAvatarUrl/                      # 头像缓存，按数字 ID 分桶
│   └── ...
├── Library/
│   ├── Application Support/
│   ├── Caches/
│   ├── Preferences/
│   └── WebKit/
└── tmp/
```

## `Documents/Profiles/<profile>`

macOS 企业微信的账号/企业工作数据核心在：

```text
Documents/Profiles/<profile>/
```

一个机器上可出现多个 `<profile>`，通常对应不同企业、账号、历史登录或 profile 上下文。`<profile>` 观察为 32 位十六进制目录名，文档中统一脱敏。

常见一层结构：

```text
Profiles/<profile>/
├── Messages1/                       # 消息与会话核心 DB
├── Contact/                         # 联系人/通讯录
├── collection/                      # 收藏
├── Calendar/                        # 日历
├── CorpGroup/                       # 企业/组织/群组相关
├── Customer/                        # 客户联系/客户数据
├── CustomerMessage/                 # 客户消息
├── CRMRoom/                         # CRM/客户群
├── QyDisk/                          # 企业盘/微盘
├── TcntDocStorage2/                 # 腾讯文档/在线文档缓存
├── WechatMessage/                   # 互通微信消息相关
├── WorkStatus/                      # 工作状态
├── VOIP/                            # 音视频/会议归档
├── MeetingPlugin/                   # 会议插件
├── Openapi/                         # OpenAPI/开放能力缓存
├── ReadConfirm/                     # 已读确认
├── FileSecurity/                    # 文件安全
├── user_label/                      # 用户标签
├── conversation_tag/                # 会话标签
├── weapp_ww/                        # 企业微信小程序/应用
├── workflow/                        # 审批/流程
├── wwocr/                           # OCR
├── app_store/                       # 应用市场资源
├── app_msg/                         # 应用消息草稿等
├── liteapp/                         # 轻应用包与数据
├── Publishsys/                      # 发布系统/资源包，通常体量最大
├── Caches/
├── sqlite_temp_dir/
├── setting.json
└── io_data.json
```

## macOS 主要 DB

代表性 DB：

```text
Messages1/
├── Info.db
├── InfoMFTS6.db
├── InfoCFTS.db
├── Session.db
└── SessionFTS.db

Contact/Contact.db
collection/Collection.db
Calendar/Calendar_tmp19.db
CorpGroup/CorpGroup2.db
Customer/Customer1.db
Customer/HomeSchool.db
Customer/IndustryNews.db
CustomerMessage/customer_message.db
CRMRoom/crm_room.db
QyDisk/qydiskv3.db
TcntDocStorage2/TcntDocStorage2_mixed_1000001.db
WechatMessage/wechat_message.db
WorkStatus/WorkStatus.db
VOIP/voiparchive.db
Openapi/Openapi.db
ReadConfirm/readconfirm.db
FileSecurity/file_sec.db
MeetingPlugin/MeetingPlugin.db
wwocr/wwocrservice2.db
weapp_ww/weapp.db
workflow/Workflow.db
roster.db
localproxy.db
common_kv_cache_with_vid.db
app_market.db
publishsys.db
industrynews.db
ai.db
openid.db
```

角色推断：

- `Messages1/Info.db`：消息主体。
- `Messages1/Session.db`：会话列表、未读、摘要等。
- `Messages1/*FTS*.db`：全文检索索引。
- `Contact/Contact.db`、`roster.db`：通讯录、组织成员、会话参与人等。
- `Customer*`、`CRMRoom`：客户联系、客户群、CRM 场景。
- `QyDisk`、`TcntDocStorage2`：微盘、腾讯文档/在线文件。
- `WechatMessage/wechat_message.db`：与微信互通能力相关的消息缓存。
- `WorkStatus`、`ReadConfirm`、`conversation_tag`、`user_label`：企业协同状态数据。
- `weapp_ww`、`liteapp`、`app_market`：企业应用、轻应用、小程序生态。
- `wwocr`、`ai*`：OCR 与本地 AI/embedding 相关能力。

## macOS 加密特征

企业微信核心业务 DB 文件头通常不是 SQLite 标准头：

```text
SQLite 明文头：53514c69746520666f726d6174203300  # "SQLite format 3\0"
业务 DB 示例：random bytes / fixed-prefix encrypted page / non-standard page header
```

观察到 `Messages1/Info.db`、`Messages1/Session.db`、`Contact/Contact.db`、`WechatMessage/wechat_message.db` 等均为非明文 SQLite 头，说明核心业务库存在加密或自定义 VFS/页格式。

# Windows

## 观察环境

## Windows 入口

```text
%USERPROFILE%\Documents\WXWork              # 主数据目录
%APPDATA%\Tencent\WXWork                    # 运行时、日志、网络、wwmapp
%LOCALAPPDATA%\wxworkweb                     # Web/Chromium 用户数据
%APPDATA%\WXDrive                            # 微盘辅助数据
%APPDATA%\Tencent\WXDrive                    # 微盘辅助数据
%APPDATA%\Tencent\WeMail                     # 邮件辅助数据
%LOCALAPPDATA%\Temp\Tencent\WXWork           # 崩溃/临时数据
%LOCALAPPDATA%\Temp\Tencent\WeMail           # 邮件临时数据
```

## `%USERPROFILE%\Documents\WXWork`

```text
%USERPROFILE%\Documents\WXWork
├── <corp-or-user-id>/               # 数字 ID 目录，可有多个企业/账号上下文
│   ├── Avator/                      # 头像缓存，拼写沿用客户端目录名
│   ├── Cache/
│   │   ├── File/
│   │   └── Image/
│   ├── CacheMapping/
│   ├── Data/                        # 账号/企业核心 DB
│   ├── Emotion/
│   ├── Index/                       # 搜索索引
│   ├── WeDrive/                     # 微盘本地同步/缓存
│   └── WXWorkCefCache/              # 该账号 CEF 缓存
├── Global/
│   ├── CDN/
│   ├── CDNcdn/
│   ├── CefCache/
│   ├── Statistic/
│   └── TempFile/
├── Profiles/<profile>/              # 企业应用/业务 profile 数据
├── qtCef/                           # 全局 CEF/Chromium profile
└── LocalPrefs.json
```

### `<corp-or-user-id>/Data`

Windows 企业微信账号/企业级核心 DB：

```text
Data/
├── message.db
├── message_lookup.db
├── session.db
├── user.db
├── user_extend.db
├── company.db
├── crm.db
├── calendar_r7.db
├── file.db
├── forever_store.db
├── govern.db
├── kv.db
├── tencent_doc_list.db
├── voip_meeting.db
└── avatar_store_v3.db
```

角色推断：

- `message.db`：消息主体。
- `message_lookup.db`：消息查找/索引辅助。
- `session.db`：会话列表、未读、摘要等。
- `user.db`、`user_extend.db`：通讯录/成员扩展资料。
- `company.db`：企业/组织资料。
- `crm.db`：客户联系/CRM 相关。
- `calendar_r7.db`：日历。
- `file.db`、`tencent_doc_list.db`、`WeDrive/`：文件、腾讯文档、微盘。
- `kv.db`、`forever_store.db`：本地 KV/长期状态。
- `voip_meeting.db`：音视频/会议。
- `avatar_store_v3.db`：头像索引；观察到可能为明文 SQLite。

### `<corp-or-user-id>/Index`

```text
Index/
├── message_index.db
├── message_index_v1_1.db
├── message_index_log.db
├── session_index.db
├── session_index_log.db
├── user_index.db
├── userdept_index_log.db
├── announce_index.db
├── collection_index.db
├── hot_index.db
├── sms_index.db
├── data_index.db
└── index_master.db
```

索引库中混合存在加密 DB 与明文 SQLite 日志/索引控制库。

### `<corp-or-user-id>` 大对象目录

```text
<corp-or-user-id>/
├── Cache/File/YYYY-MM/
├── Cache/Image/YYYY-MM/
├── Avator/YYYY-MM/
├── Emotion/YYYY-MM/
├── WeDrive/
└── WXWorkCefCache/
```

说明：

- 企业微信将图片、文件、表情、头像、微盘文件与 CEF 缓存放在文件系统。
- DB 主要保存元数据、索引、映射与状态。

## `Profiles/<profile>`

Windows 的 `Profiles/<profile>` 与 macOS `Documents/Profiles/<profile>` 是同类概念，但在当前观察中 Windows profile 更偏企业应用/发布系统/插件数据：

```text
Profiles/<profile>/
├── FileSecurity/file_sec.db
├── Fuli/
├── minicustomer/
├── Publishsys/
├── Solitaire/
├── VOIP/voiparchive.db
├── ai.db
├── common_kv_cache_with_vid.db
├── governV2.db
├── industrynews.db
├── localproxy.db
├── publishsys.db
├── roster.db
├── setting.json
└── io_data.json
```

## `qtCef` / `WXWorkCefCache` / `wxworkweb`

Windows 企业微信包含多层 Web/CEF 缓存：

```text
%USERPROFILE%\Documents\WXWork\qtCef/
├── Cache/
├── Code Cache/
├── IndexedDB/
├── Local Storage/
├── Network/
├── Service Worker/
├── Session Storage/
└── WebStorage/

%USERPROFILE%\Documents\WXWork\<corp-or-user-id>\WXWorkCefCache/
%LOCALAPPDATA%\wxworkweb\User Data/
```

这些目录对应企业微信内置浏览器、腾讯文档、H5 应用、管理后台页面、小程序/轻应用等 Web 能力。

## `%APPDATA%\Tencent\WXWork`

运行时、日志和网络层：

```text
%APPDATA%\Tencent\WXWork
├── cef/
├── FlutterPlugins/
├── Log/
│   ├── CEF/
│   ├── Critical/
│   ├── FlutterPlugins/
│   ├── H5Mail/
│   ├── HttpDns/
│   ├── MobileFramework/
│   ├── TMLog/
│   ├── web_httpdns/
│   ├── wwmapp/
│   └── wxvoip/
├── Network/
├── wwmapp/
│   └── userdata/
└── netflowstat.dat
```

含义：

- `Log`：多组件日志，包含 CEF、H5Mail、HttpDns、音视频等。
- `Network`：网络/HTTPDNS/CDN 相关。
- `wwmapp`：企业微信应用/小程序运行时或移动框架层数据。
- `FlutterPlugins`：说明部分能力以 Flutter 插件形态加载。

# macOS 与 Windows 对应关系

| 角色             | macOS                                       | Windows                                                  |
| ---------------- | ------------------------------------------- | -------------------------------------------------------- |
| 主数据根         | `com.tencent.WeWorkMac/Data/Documents`      | `%USERPROFILE%\Documents\WXWork`                         |
| Profile 业务数据 | `Documents/Profiles/<profile>`              | `Documents\WXWork\Profiles\<profile>`                    |
| 消息主体         | `Profiles/<profile>/Messages1/Info.db`      | `<corp-or-user-id>\Data\message.db`                      |
| 会话             | `Messages1/Session.db`                      | `<corp-or-user-id>\Data\session.db`                      |
| 通讯录           | `Contact/Contact.db`、`roster.db`           | `<corp-or-user-id>\Data\user.db`、`company.db`           |
| 搜索索引         | `Messages1/*FTS*.db`                        | `<corp-or-user-id>\Index/*_index*.db`                    |
| 客户/CRM         | `Customer/`、`CustomerMessage/`、`CRMRoom/` | `<corp-or-user-id>\Data\crm.db`、Profile 中 minicustomer |
| 微盘/文件        | `QyDisk/`、`TcntDocStorage2/`               | `<corp-or-user-id>\WeDrive`、`WXDrive`                   |
| Web/CEF          | `Library/WebKit`、Profile 下 liteapp/weapp  | `qtCef`、`WXWorkCefCache`、`wxworkweb`                   |
| 邮件             | WeMail IPC 目录                             | `%APPDATA%\Tencent\WeMail`、Temp WeMail                  |
| 日志/网络        | `GYLog`、`GYOssLog`、`Network`              | `%APPDATA%\Tencent\WXWork\Log`、`Network`                |

# 内部原理概览

## 1. 企业/账号与 profile 分离

企业微信不像个人微信那样统一在 `xwechat_files/<account>`，而是至少有两层：

- 企业/账号数字目录：消息、成员、公司、CRM、微盘文件、缓存。
- `Profiles/<profile>`：跨企业应用、发布系统、插件、轻应用、会议、OCR、开放能力等。

这符合企业微信多企业、多应用、多协同组件的产品形态。

## 2. DB 保存元数据，大对象进文件系统

核心模式：

```text
消息/会话/成员/公司/CRM/索引 -> DB
图片/文件/头像/表情/微盘/CEF 缓存 -> 文件系统
```

Windows 的 `Cache/File`、`Cache/Image`、`WeDrive`、`WXWorkCefCache` 与 macOS 的 `Publishsys`、`UserAvatarUrl`、各业务目录共同承担大对象与资源缓存。

## 3. DB 加密混合

企业微信中存在两类 DB：

- 核心业务 DB：多数为非 SQLite 明文头，说明加密或自定义页格式。
- 辅助缓存/索引控制 DB：部分是 `SQLite format 3\0` 明文头，例如某些头像、CacheMapping、CEF/Global 配置、日志型索引 DB。

因此不能简单用扩展名判断是否可直接读取。

## 4. CEF / Web / 小程序 / 轻应用是独立层

企业微信强依赖 Web 能力：

- 腾讯文档、微盘、审批、客户联系、邮件、应用市场、会议、OCR、轻应用等均有独立资源与缓存。
- Windows 上 `qtCef`、`WXWorkCefCache`、`wxworkweb` 很明显。
- macOS 上表现为 `Library/WebKit`、`Profiles/<profile>/liteapp`、`weapp_ww`、`app_store`、`Publishsys`。

## 5. 和个人微信的差异

- 个人微信 4.x：核心结构趋向统一的 `xwechat_files/<account>/db_storage/msg/cache`。
- 企业微信：仍按企业协同业务拆得更细，Windows 上保留 `Documents\WXWork\<corp-or-user-id>\Data` 这种传统 PC 布局。
- 企业微信 DB 名更业务化：`company.db`、`crm.db`、`calendar_r7.db`、`qydiskv3.db`、`TcntDocStorage2`、`WorkStatus`、`ReadConfirm` 等。

# 参考

- [企业微信开发文档](https://work.weixin.qq.com/api/doc/)
- [会话存档](./wecom-archive.md)
