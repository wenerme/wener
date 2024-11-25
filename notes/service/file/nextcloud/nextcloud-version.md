---
title: Nextcloud 版本
---

# Nextcloud 版本

:::caution

- 一次只能升级一个大版本

:::

- [Changelog](https://nextcloud.com/changelog/)
- [Releases](https://nextcloud.com/release-channels/)
  - production - 企业版 - 通过企业客户渠道获取
  - stable - 每个版本有第一个 minor fix 后才进入 stable
  - beta - 面向测试人员，自动生成，每日开发版本
  - daily - 自动生成的每日构建版本
- https://nextcloud.com/changelog-unsupported/
  - 不再支持的版本

| version                       | date       | Notes           |
| ----------------------------- | ---------- | --------------- |
| [Nextcloud 30](#nextcloud-30) | 2024-09-14 | Nextcloud Hub 9 |
| [Nextcloud 29](#nextcloud-29) | 2024-04-24 | Nextcloud Hub 8 |
| [Nextcloud 28](#nextcloud-28) | 2023-12-12 | Nextcloud Hub 7 |
| [Nextcloud 27](#nextcloud-27) | 2023-06-13 | Nextcloud Hub 6 |
| [Nextcloud 26](#nextcloud-26) | 2023-03-21 |
| [Nextcloud 25](#nextcloud-25) | 2022-10-19 |
| [Nextcloud 24](#nextcloud-24) | 2022-05-03 |
| [Nextcloud 23](#nextcloud-23) | 2021-11-30 |
| [Nextcloud 23](#nextcloud-23) | 2022-05-03 |
| [Nextcloud 22](#nextcloud-22) | 2021-07-06 |

## Nextcloud 30

- **设计改进**:
  - 更紧凑的界面设计，优化了输入字段、按钮和链接的大小。
  - 使用圆角设计，提升视觉平衡。
  - 支持动态背景，界面颜色方案根据背景自动调整。
- **Nextcloud Flow**:
  - 基于 Windmill 的新应用，支持企业级流程自动化。
  - 提供图形界面设计、管理和监控工作流。
- **Nextcloud Whiteboard**:
  - 新的协作白板应用，支持手绘、多种形状和图像导入。
  - 与 Nextcloud Talk 无缝集成，支持实时协作。
- **联邦功能**:
  - 支持跨实例的联邦视频通话。
  - 用户可以使用联邦云 ID 加入其他 Nextcloud 服务器的群聊和视频通话。
- **性能和可扩展性**:
  - 切换到 Vite 工具，减少应用程序大小，提高加载速度。
  - 支持高性能后端，改进了 Nextcloud Text 的同步性能。
  - 数据库分片和异步复制，支持更多用户。
- **AI 和 Nextcloud Assistant**:
  - 引入聊天界面，支持对话格式的交互。
  - 支持数百种语言的翻译。
  - 与 Analytics 应用集成，支持上下文聊天查询数据。
- **Nextcloud Files**:
  - 新增文件请求功能，支持安全收集文件。
  - 文件过滤功能，支持按文件类型、修改日期和人员过滤。
  - 文件夹树视图，简化复杂文件夹路径的导航。
- **Nextcloud Office**:
  - 支持 PDF 模板和表单填写。
  - 幻灯片支持 3D 过渡效果。
  - 改进的安全性和互操作性，包括 ODF 文件的全面加密。
- **Nextcloud Talk**:
  - 改进的聊天管理功能，支持用户禁言和移除。
  - 支持离线浏览聊天记录。
  - 支持 Apple Vision Pro 设备。
- **Nextcloud Groupware**:
  - 邮件应用支持智能跟进提醒和高级搜索过滤。
  - 日历应用改进了事件窗口和资源可用性显示。
  - 联系人应用支持设置外出替代人员。
- **新集成**:
  - 支持 LLama 3 和 XWiki 等新应用。
  - 引入捐赠机制，支持开发者通过应用商店接受捐赠。

## Nextcloud 29

- **Nextcloud Assistant 2.0**:
  - 引入上下文感知功能，包括 Context Chat 和 Context Write，提升工作效率。
  - 支持生成邮件回复和自动创建日历事件。
  - 提供聊天总结功能，自动生成会议记录和任务。
  - 增加了内置图像生成和语音转文本功能。
- **Nextcloud Teams**:
  - 全新团队概览，快速访问共享资源和仪表板小部件。
- **Nextcloud Mail**:
  - 背景同步速度提升两倍。
  - 改进的用户界面和 AI 驱动的回复建议。
- **Nextcloud Talk**:
  - 支持跨实例的联邦消息传递。
  - 增加消息编辑功能。
  - 改进的会议功能，包括演讲者画中画和投票功能。
- **Nextcloud Files**:
  - 新增个人文件部分，提供干净的私人空间。
  - 支持一次性下载链接和生成二维码共享。
  - 改进的照片导航和预览加载。
- **Nextcloud Office**:
  - 支持生成 QR 码和条形码。
  - 电子表格中的单元格保护和条件格式化功能。
  - 改进的文档布局和变更跟踪功能。
- **Nextcloud Groupware**:
  - 改进的邮件同步和事件创建功能。
  - 日历自动建议空闲时间。
- **新集成**:
  - 支持 Paperless-ngx 文档管理解决方案。
  - 新的 LLM 模型集成，包括 NeuralBeagle14 7B 和 Smaug-72B。
- **性能优化**:
  - 引入数据库分片功能，提升可扩展性。
  - 改进的读写行为，支持更多数据库集群节点。

## Nextcloud 28

- **统一搜索**:
  - 改进的统一搜索功能，可以在所有核心应用和外部位置（如 GitHub、GitLab、Giphy、Reddit 等）中搜索。
  - 通过单一搜索框查找文件、任务、通信记录等。
- **全局外出状态**:
  - 在个人设置中配置外出状态，自动应用于邮件自动回复、日历事件和 Talk 聊天。
  - 在联系人资料中显示共享的文件、任务、事件、邮件等。
- **AI 和 Nextcloud Assistant**:
  - 引入 Aleph Alpha 和本地 Stable Diffusion 模型，用于图像生成和文本生成。
  - 支持 AI 请求限制和任务通知。
- **Nextcloud Photos**:
  - 支持 iOS Live Photos 上传和查看。
  - 显示照片的 EXIF 元数据，包括拍摄时间、地点和相机信息。
- **Nextcloud Files**:
  - 迁移到 Vue.js，提高性能和加载速度。
  - 支持 PDF 注释和表单填写。
  - 自定义导航栏顺序，合并评论和活动标签。
- **Nextcloud Office**:
  - 支持生成 QR 码和条形码。
  - 电子表格中的条件格式化功能。
  - 共享笔记和改进的重新连接体验。
  - 改进的无障碍支持和键盘快捷键。
- **Nextcloud Groupware**:
  - 联系人应用中显示共享的项目和自动“忙碌”状态。
  - 邮件应用支持在邮件正文中搜索、按日期排序和改进的标签管理。
  - Deck 应用支持卡片封面图像、“完成”状态和键盘快捷键。
- **Nextcloud Talk**:
  - 支持屏幕共享时的演讲者画中画。
  - 录音同意功能和通过电话号码邀请通话。
  - 支持自定义来宾名称和通知中的通话链接。
  - 动画反应和“自我笔记”聊天功能。
  - 文件共享时支持文件说明。
- **新集成**:
  - 支持 Aleph Alpha 和 Memegen 应用。
  - 提供示例应用程序，帮助开发者快速入门。

## Nextcloud 27

- **AI 功能和集成**:
  - 智能收件箱和相关资源
  - 照片中的面部和对象识别
  - Nextcloud Talk 中的背景图像和背景模糊
  - 基于提示的图像生成
  - Nextcloud Translate 翻译功能，集成于 Nextcloud Talk 和 Nextcloud Text
  - Nextcloud Dictation 语音识别
  - 视频通话记录的转录
- **Nextcloud Files**:
  - 高级版本控制，支持命名版本和时间算法
  - 文件推荐功能
  - 改进的桌面客户端和移动应用，包括虚拟文件支持和文档扫描
  - 标签功能增强，支持自动分类和安全策略
- **Nextcloud Talk**:
  - 桌面客户端预览版
  - 录音和分组讨论室功能
  - 消息过期和直接从聊天栏上传文件
  - 提高加载速度和减少服务器负载
  - 实时消息翻译和虚拟背景图像
- **Nextcloud Groupware**:
  - 共享邮箱和 S/MIME 支持
  - 日历应用支持附件
  - Mail 应用改进，包括 XOAUTH2 支持和智能收件箱
  - 系统通讯录和组织结构图
- **Nextcloud Office**:
  - 实时光标跟踪
  - Collectives 应用改进，支持文件关联
  - Deck 应用支持实时编辑和 CSV 导出
  - 文档模板和导航侧栏
- **性能和安全**:
  - 提高文件夹挂载和容器处理速度
  - OCS API 请求速度提高 3 倍
  - 改进的端到端加密，支持文件夹共享和文件上传
- **新应用和集成**:
  - Nextcloud Tables: 开源的 SharePoint 替代方案
  - 深度集成 Zimbra、Cisco Webex、NUITEQ Stage、OpenProject、Google Drive 和 Microsoft OneDrive
  - Outlook 和 Teams 集成

## Nextcloud 26

- **智能功能集成**:
  - **Smart Picker**: 跨应用的智能选择器，支持 AI 语音转文本、图像生成和 ChatGPT 文本生成。
  - **语音转文本**: 使用 Whisper via Replicate 实现语音转文本功能。
  - **图像生成**: 使用 Dall-E 2 和 StableDiffusion 生成图像。
  - **ChatGPT 文本生成**: 使用 GPT-3 技术生成智能文本。
- **Nextcloud Talk**:
  - 桌面客户端预览版。
  - 录音和分组讨论室功能。
  - 消息过期和直接从聊天栏上传文件。
  - 提高加载速度和减少服务器负载。
- **Nextcloud Files**:
  - 高级版本控制，支持命名版本和时间算法。
  - 文件推荐功能。
  - 改进的桌面客户端和移动应用，包括虚拟文件支持和文档扫描。
- **Nextcloud Groupware**:
  - 共享邮箱和 S/MIME 支持。
  - 日历应用支持附件。
  - Mail 应用改进，包括 XOAUTH2 支持和智能收件箱。
- **Nextcloud Office**:
  - 实时光标跟踪。
  - Collectives 应用改进，支持文件关联。
  - Deck 应用支持实时编辑和 CSV 导出。
- **性能和安全**:
  - 提高文件夹挂载和容器处理速度。
  - OCS API 请求速度提高 3 倍。
  - 改进的端到端加密，支持文件夹共享和文件上传。
- **新应用和集成**:
  - Nextcloud Tables: 开源的 SharePoint 替代方案。
  - Notes 应用成为核心应用，移动应用免费。
  - 深度集成 Zimbra、Cisco Webex、NUITEQ Stage、OpenProject、Google Drive 和 Microsoft OneDrive。

## Nextcloud 25

- **全新设计**: 引入了全新的 Nextcloud 界面设计，强调个性化和可访问性。
- **Photos 2.0**:
  - 新的平铺视图
  - 照片相册和共享选项
  - 内置照片上传器
  - 照片编辑器
  - AI 自动面部和对象识别
- **Nextcloud Talk**:
  - 消息反应和媒体标签
  - 改进的桌面集成和工作时间配置
  - 消息过期和直接从聊天栏上传文件
- **Groupware 改进**:
  - Mail 2.0: 改进的性能和用户界面，支持撤销发送和计划发送
  - Contacts: 引入组织结构图视图
  - 改进了服务器端和端到端加密技术
- **新集成**:
  - 与 Zimbra、Cisco Webex、NUITEQ Stage、OpenProject、Google Drive 和 Microsoft OneDrive 的更深层次集成

## Nextcloud 24

- 用户迁移功能 - 从一个 Nextcloud 实例导出并导入到另一个实例，包括用户和配置文件设置、日历、邮件设置、评论、收藏等。
- 智能文件锁定 - 自动锁定正在编辑的文件，防止并发写入冲突。
- 数据库负载降低 4 倍
- Nextcloud Talk 增加消息反应和媒体标签
- 邮件应用新增撤销发送和计划发送功能
- Nextcloud Office 引入新标签菜单界面
- Nextcloud Text 增加表格、信息框、直接图片上传和表情符号自动完成功能

## Nextcloud 23

- Nextcloud Files
- Nextcloud Office - Collabora
- Docker-All-In-One
- Nextcloud Backup

## Nextcloud 22

## Nextcloud 21

- 优化客户端 polling 性能, 减少客户端和和服务端负载
- 白板功能
- Nextcloud Talk - 消息状态提示
- [Blog](https://nextcloud.com/blog/nextcloud-hub-21-out-with-up-to-10x-better-performance-whiteboard-and-more-collaboration-features/)

## Nextcloud 20

- [Blog](https://nextcloud.com/blog/nextcloud-hub-20-debuts-dashboard-unifies-search-and-notifications-integrates-with-other-technologies/)

## Nextcloud 19

- [Blog](https://nextcloud.com/blog/nextcloud-hub-brings-productivity-to-home-office/)

## Nextcloud 18

- ONLYOFFICE 内建支持
- Photos - 相册
- Calendar 2.0
- [Blog](https://nextcloud.com/blog/the-new-standard-in-on-premises-team-collaboration-nextcloud-hub/)
