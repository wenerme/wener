---
tags:
  - Inside
---

# WeChat Inside

> 本文记录微信本地数据目录结构与内部原理。当前覆盖 macOS 与 Windows 微信 4.x 观察结果。
>
> 安全边界：只整理目录、文件类型、存储分层和可复用探索方法；不要把聊天内容、联系人明文、密钥、token、账号目录名写入文档。示例统一用 `<account>`、`<wxid>`、`<chat-hash>`、`%USERPROFILE%` 脱敏。

- SQLCipher / WCDB 加密 SQLite
  - 多数业务 `.db` 文件头不是 `SQLite format 3\0`，而是随机字节或非标准页头，说明页面级加密/自定义 VFS 生效。
  - 常见工具按 SQLCipher 3 兼容参数尝试解密。
- 不同系统、不同安装环境，DB key 不共享。
- WeChat 4.x 桌面端是 Qt 5.15.x

# 结论

macOS 与 Windows 的**账号核心数据结构高度一致**：都以 `xwechat_files/<account>` 为账号级根目录，并在其下按 `business/cache/config/db_storage/msg/resource/temp` 分层。差异主要在：

- 容器根路径不同
  - macOS：`~/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files`
  - Windows：`%USERPROFILE%\xwechat_files`
- 运行时/插件路径不同
  - macOS：`.wxapplet/`、`Data/Library/...`
  - Windows：`%APPDATA%\Tencent\xwechat\radium`、`xplugin`
- 共享数据位置略有不同
  - macOS 观察到 `login/`、`head_imgs/` 可在账号目录下。
  - Windows 观察到 `all_users/` 保存共享 `login/head_imgs/sqlite/config`，账号目录更聚焦业务数据。

# 共享结构：`xwechat_files`

## 入口映射

| 平台    | 核心数据入口                                                              |
| ------- | ------------------------------------------------------------------------- |
| macOS   | `~/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files` |
| Windows | `%USERPROFILE%\xwechat_files`                                             |

典型结构：

```text
xwechat_files/
├── all_users/                         # Windows 常见，共享配置、登录、头像、sqlite 等
├── Backup/                            # 备份/迁移相关
└── <account>/                         # 账号级数据目录
    ├── apm_record/                    # 性能与进程时长统计
    ├── business/                      # 业务域资源
    ├── cache/                         # 按月组织的消息/HTTP/表情/朋友圈/小程序图标缓存
    ├── config/                        # 账号级客户端配置，常伴随 .crc 或 specialCharacter
    ├── db_storage/                    # 加密数据库核心区
    ├── msg/                           # 聊天附件、文件、视频等大对象
    ├── resource/                      # 资源文件
    └── temp/                          # 临时文件
```

macOS 账号目录中还可能见到：

```text
<account>/
├── head_imgs/
├── login/<wxid>/key_info.db
└── sqlite/
```

Windows 4.x 观察到这些共享目录更常位于：

```text
xwechat_files/all_users/
├── config/
├── head_imgs/
├── login/<wxid>/key_info.db
└── sqlite/
```

## `business`

```text
business/
├── emoticon/                # 表情持久化、缩略图、临时文件
├── favorite/                # 收藏资源 data/mid/thumb
├── migrate/                 # 迁移相关
├── sns/                     # 朋友圈相关资源
├── xeditor/                 # 编辑器相关 MMKV/缓存
└── xweb/                    # XWeb 资源与配置
```

## `cache/YYYY-MM`

按月份组织，常见结构：

```text
cache/YYYY-MM/
├── Message/<chat-hash>/Bubble/*.dat
├── Message/<chat-hash>/ImageTemp/
├── Message/<chat-hash>/Thumb/
├── HttpResource/<hash>
├── Emoticon/<prefix>/<hash>
├── Sns/Img/<prefix>/
├── Sns/Temp/
└── WeAppIcon/
```

含义推断：

- `Message/<chat-hash>/Bubble/*.dat` 是消息气泡渲染、图片预览、富文本片段等缓存。
- `<chat-hash>` 是会话或资源的哈希桶，不建议直接当作 wxid。
- `HttpResource` 缓存外链、图片、网页等 HTTP 下载资源。
- `WeAppIcon` 缓存小程序图标。
- 这些目录可作为缓存理解，但删除前要关闭微信并备份，因为微信可能依赖缓存提升历史消息打开速度。

## `db_storage`

`db_storage` 按业务域拆分 DB。多数 DB 为加密 SQLite/WCDB 文件，通常还会有 `-wal`、`-shm` 等 sidecar 文件。

```text
db_storage/
├── MMKV/
├── bizchat/bizchat.db
├── contact/
│   ├── contact.db
│   └── contact_fts.db
├── emoticon/emoticon.db
├── favorite/
│   ├── favorite.db
│   └── favorite_fts.db
├── general/general.db
├── hardlink/hardlink.db
├── head_image/head_image.db
├── message/
│   ├── message_0.db
│   ├── message_1.db
│   ├── message_2.db
│   ├── biz_message_0.db
│   ├── biz_message_1.db
│   ├── biz_message_2.db
│   ├── media_0.db
│   ├── message_fts.db
│   ├── message_resource.db
│   └── weclaw.db                 # Windows 观察到，可能与客户端辅助/组件有关
├── session/session.db
├── sns/sns.db
└── solitaire/solitaire.db
```

> 并非每个安装都一定有所有分片。例如新安装或数据较少时可能只有 `message_0.db`、`biz_message_0.db`；历史较长时可能有 `message_0..2.db`。

### DB 角色推断

- `message/message_N.db`
  - 聊天消息主表分片。分片用于控制单库大小、降低索引和 WAL 压力。
- `message/biz_message_N.db`
  - 公众号/企业/业务消息分片。
- `message/media_0.db`
  - 媒体消息索引或元数据。
- `message/message_fts.db`
  - 全文搜索索引。FTS 文件同样可能加密或使用自定义页格式。
- `message/message_resource.db`
  - 消息资源索引，用于把消息记录与附件、图片、视频、下载资源关联。
- `contact/contact.db` / `contact_fts.db`
  - 联系人主体与联系人搜索索引。
- `session/session.db`
  - 会话列表、置顶、未读、最后消息摘要等状态。
- `favorite/favorite.db` / `favorite_fts.db`
  - 收藏主体与收藏搜索索引。
- `hardlink/hardlink.db`
  - 资源去重/硬链接/路径索引。微信会把图片、视频、文件等大对象放在文件系统中，DB 里保留索引和映射。
- `head_image/head_image.db`
  - 头像索引与缓存元数据。
- `emoticon/emoticon.db`
  - 表情元数据。
- `sns/sns.db`
  - 朋友圈相关本地缓存。
- `general/general.db`
  - 通用配置/状态。
- `bizchat/bizchat.db`
  - 企业/业务聊天相关。
- `solitaire/solitaire.db`
  - 接龙相关。

## `msg`

`msg` 是聊天相关大文件主要存放处，通常比 DB 大很多。

```text
msg/
├── attach/      # 图片、语音、附件等消息资源，常按 <chat-hash>/YYYY-MM/Img 分桶
├── file/        # 文件消息
├── video/       # 视频消息
└── migrate/     # 迁移相关
```

核心模式：

```text
消息/联系人/会话/收藏元数据 -> db_storage/*.db
图片/视频/文件/语音等大对象 -> msg/、cache/、business/ 下的文件
索引/映射/路径/搜索 -> message_resource.db、hardlink.db、*_fts.db
```

## 加密特征

业务 DB 文件头通常不是 SQLite 标准头：

```text
SQLite 明文头：53514c69746520666f726d6174203300  # "SQLite format 3\0"
业务库示例：random bytes / zero-like encrypted page / non-standard page header
```

说明：

1. 核心业务库是 SQLCipher/WCDB 或微信自定义封装的加密 SQLite。
2. 登录/密钥元信息可能存在普通 SQLite 中，但并不等于可直接拿到明文 DB key。
3. 解密需要额外 key 获取流程，且 key 与设备、账号、系统环境相关。

# macOS

## 容器入口

- `~/Library/Containers/com.tencent.xinWeChat/`
  - 主容器。当前机器存在。
- `~/Library/Containers/com.tencent.xinWeChatShare/`
  - 分享扩展/Share Extension 相关容器。当前机器未发现，可能与版本、是否启用分享扩展、是否使用过相关功能有关。

```bash
BASE=~/Library/Containers/com.tencent.xinWeChat/Data
XFILES="$BASE/Documents/xwechat_files"
```

## macOS 顶层结构

```text
~/Library/Containers/com.tencent.xinWeChat/
├── .com.apple.containermanagerd.metadata.plist   # macOS 容器元数据，可能受系统保护限制读取
└── Data/                                         # App 沙盒内的“用户主目录”
    ├── .wxapplet/                               # 小程序 / WMPF / XWeb 运行时与资源
    ├── Documents/
    │   ├── xwechat_files/                       # 账号级核心数据，最大头
    │   ├── app_data/                            # 应用数据缓存
    │   ├── ConfSDK/
    │   ├── cacheDir/
    │   └── mmkv/
    ├── Library/
    │   ├── Application Support/com.tencent.xinWeChat/
    │   ├── Caches/
    │   ├── HTTPStorages/
    │   ├── Preferences/
    │   ├── WebKit/
    │   └── Logs/
    ├── SystemData/
    └── tmp/
```

实际体量上，`Documents/xwechat_files` 通常占主要空间；`.wxapplet` 数百 MB，`Library` 百 MB 级别。

## `.wxapplet`

小程序和 XWeb/WMPF 运行时相关。

```text
.wxapplet/
├── WMPF/              # WeChat Mini Program Framework，体量最大
├── packages/          # 小程序包或运行时包
├── Applet/            # 小程序实例/资源
├── WeAppOld/          # 老版本小程序资源
├── WmpfCache/
├── cache/
├── data/
├── icon/
├── ilink/
├── mmkv/
├── web/
├── xlog/              # 小程序侧日志
├── xworker/
├── storage_host.bin
└── storage_runtime.bin
```

原理：

- macOS 微信内置小程序运行时，不完全依赖系统浏览器。
- `WMPF`、`packages`、`Applet` 存放运行时与小程序包。
- `mmkv` 是腾讯常用的 mmap key-value 存储。
- `xlog` 是腾讯 Mars/XLog 风格日志，通常不是普通明文日志。

## `Library` 子目录

```text
Library/
├── Application Support/com.tencent.xinWeChat/<version>/
│   ├── CGI/
│   ├── KeyValue/
│   ├── MMResourceMgr/
│   ├── MMappedKV/
│   ├── NewMMappedKV/
│   ├── WeVoIP/
│   └── topinfo.data 等
├── Caches/
│   ├── CdnCom/
│   ├── ImageCache/
│   ├── Matrix/
│   ├── WebKit/
│   ├── assetload/
│   ├── com.tencent.xinWeChat/
│   └── profiles/
├── HTTPStorages/
├── Preferences/
│   ├── com.tencent.xinWeChat.plist
│   ├── com.qtproject.plist
│   └── wxplayer.plist
└── WebKit/
```

含义：

- `Application Support/com.tencent.xinWeChat/<version>` 是历史/版本化应用状态、资源管理、KeyValue/MMappedKV 等。
- `Caches/WebKit` 与 `Library/WebKit` 是 WebView/WebKit 相关缓存和状态。
- `Caches/CdnCom` 是 CDN 下载缓存/配置。
- `Caches/Matrix` 是腾讯 Matrix 性能、崩溃、内存统计。
- `Preferences/*.plist` 是 macOS 偏好配置。

# Windows

## 观察环境

- Windows 10/11 系列环境。
- PowerShell Core：`pwsh 7.6.1`。
- 主进程：`C:\Program Files\Tencent\Weixin\Weixin.exe`。
- 小程序/运行时进程：`WeChatAppEx.exe`，路径位于 `%APPDATA%\Tencent\xwechat\xplugin\plugins\RadiumWMPF\...\runtime\WeChatAppEx.exe`。

## Windows 入口

```text
%USERPROFILE%\xwechat_files               # 账号级核心数据，和 macOS xwechat_files 结构高度一致
%APPDATA%\Tencent\xwechat                 # 运行时、插件、网络、日志、小程序/Radium
%APPDATA%\Tencent\WeChat                  # 旧/兼容目录，当前观察到主要只有 log
%LOCALAPPDATA%\Temp\WeChat Files          # 临时目录
```

当前观察中不存在或不是主入口：

```text
%USERPROFILE%\Documents\WeChat Files
%LOCALAPPDATA%\Tencent\WeChat
%LOCALAPPDATA%\Tencent\WeChatAppStore
%APPDATA%\Tencent\WeChatAppStore
```

> 旧版 PC 微信常见 `Documents\WeChat Files`；Windows 微信 4.x 观察到核心数据转为 `%USERPROFILE%\xwechat_files`。

## `%USERPROFILE%\xwechat_files`

```text
%USERPROFILE%\xwechat_files
├── all_users/
│   ├── config/
│   ├── head_imgs/
│   ├── login/<wxid>/key_info.db
│   └── sqlite/
├── Backup/
└── <account>/
    ├── apm_record/
    ├── business/
    ├── cache/
    ├── config/
    ├── db_storage/
    ├── msg/
    ├── resource/
    └── temp/
```

当前机器的账号核心数据很小（约几十 MB），说明可能是新安装、轻量使用或历史数据未迁入，但结构已经完整。

## `%APPDATA%\Tencent\xwechat`

Windows 4.x 的运行时、插件、网络与小程序层。

```text
%APPDATA%\Tencent\xwechat
├── config/
├── crashinfo/
│   ├── attachments/
│   └── reports/
├── ilink/
│   ├── kvcomm/
│   ├── netbridge/
│   └── wechat/
├── log/
├── login/
├── net/
│   ├── cdncomm/
│   ├── host/
│   ├── ipxx/
│   ├── kvcomm/
│   └── payhost/
├── net_1/
├── radium/
├── uh/
├── update/
└── xplugin/
```

### `radium`

`radium` 对应 Windows 侧小程序/XWeb/Chromium profile 运行时，和 macOS `.wxapplet` 在角色上相近。

```text
radium/
├── cache/
├── crashpad/
├── ilink/<profile-hash>/
├── locales/
├── mmkv/
├── users/<profile-hash>/
│   ├── applet/
│   ├── mmkv/
│   ├── udr/
│   └── xworker/
└── web/
    ├── profiles/
    │   ├── game/
    │   ├── game_<profile-hash>/
    │   ├── multitab/
    │   ├── multitab_<profile-hash>/
    │   ├── web_shell/
    │   └── webview_<profile-hash>/
    └── profiles_to_delete/
```

### `xplugin`

插件化组件目录，观察到包括：

```text
xplugin/
├── config/
├── info/
└── plugins/
    ├── CourgettePatch/
    ├── RadiumWMPF/
    ├── UpdateNotify/
    ├── WaveAudioModel/
    ├── WeChatOcr/
    ├── WeChatPlayer/
    ├── WeChatUtility/
    ├── WeixinUpdate/
    ├── WinWeixinShare/
    ├── WMPFDrm/
    ├── XEditor/
    └── XFilesOfficeReader/
```

含义：

- `RadiumWMPF` 是小程序运行时插件，运行 `WeChatAppEx.exe`。
- `WeChatOcr`、`XFilesOfficeReader`、`WeChatPlayer` 等说明 OCR、文件预览、播放器被拆成独立插件。
- `CourgettePatch`、`WeixinUpdate`、`UpdateNotify` 与更新/差分补丁相关。
- `WinWeixinShare` 与 Windows 分享/系统集成相关。

## Windows 与 macOS 对应关系

| 角色                     | macOS                                           | Windows                                                           |
| ------------------------ | ----------------------------------------------- | ----------------------------------------------------------------- |
| 账号核心数据             | `Data/Documents/xwechat_files/<account>`        | `%USERPROFILE%\xwechat_files\<account>`                           |
| 共享登录/头像            | 常见于 `<account>/login`、`<account>/head_imgs` | `%USERPROFILE%\xwechat_files\all_users`                           |
| 小程序运行时             | `Data/.wxapplet`                                | `%APPDATA%\Tencent\xwechat\radium` + `xplugin\plugins\RadiumWMPF` |
| WebView/Chromium profile | `Data/Library/WebKit`、`.wxapplet/web`          | `xwechat\radium\web\profiles`                                     |
| 插件                     | app bundle / `.wxapplet` 内部资源               | `xwechat\xplugin\plugins`                                         |
| 日志                     | `.wxapplet/xlog`、`Library/Logs`                | `xwechat\log`、`WeChat\log`                                       |
| CDN/网络缓存             | `Library/Caches/CdnCom`                         | `xwechat\net\cdncomm`、`ilink\netbridge`                          |

# 内部原理概览

## 1. 平台容器不同，账号核心结构相同

macOS 是 App Sandbox，微信进程看到的沙盒 Home 在：

```text
~/Library/Containers/com.tencent.xinWeChat/Data
```

Windows 没有 macOS 沙盒容器，微信 4.x 直接在用户目录下放核心数据：

```text
%USERPROFILE%\xwechat_files
```

两者账号核心目录基本一致，说明 4.x 客户端在跨平台层统一了数据组织模型。

## 2. 账号级隔离

`xwechat_files/<account>` 是账号级根目录。多账号、历史登录、迁移、占位目录会导致多个 `<account>` 并存。

## 3. 元数据进 DB，大对象进文件系统

微信不会把所有内容塞进一个 DB：

- DB 保存索引、消息元数据、联系人、会话、搜索索引。
- 文件系统保存图片、视频、文件、表情、小程序资源。
- `hardlink.db`、`message_resource.db` 负责连接 DB 记录与文件资源。

## 4. DB 按业务域和分片拆分

- 按业务域拆分：message/contact/session/favorite/sns/emoticon/head_image 等。
- 对大表再分片：`message_0.db`、`message_1.db`、`message_2.db`。
- 对搜索建立独立 FTS 库：`message_fts.db`、`contact_fts.db`、`favorite_fts.db`。

## 5. 加密与 key

- 业务 DB 是 SQLCipher/WCDB 加密库或微信自定义封装。
- 解密 key 与账号、设备、系统环境相关。
- macOS 与 Windows 的 key 获取方式不同；同一账号不同系统 key 也不能直接复用。
- key dump 工具一般需要从运行进程、内存、Keychain/DPAPI 或本地 key 元信息链路中恢复 key；这是单独主题。

## 6. 小程序运行时独立成层

小程序运行时独立于聊天 DB：

- macOS：`.wxapplet`
- Windows：`xwechat\radium` + `xwechat\xplugin\plugins\RadiumWMPF`

其包含包管理、Runtime、Web/Chromium profile、MMKV、xworker、日志、插件等。
