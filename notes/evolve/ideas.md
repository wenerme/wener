---
title: Ideas
---

# Ideas

- 还在 云盘
  - 简单的非常小的云盘
  - 主打一个不会丢失
- 看懂 字幕
  - 提供字幕翻译
  - 免费提供字幕服务
  - opensubtitles 现在收费了
  - subhd 依赖广告收入
- hn relay
  - 提供 Hacker news 的代理服务
  - 提供翻译为多个语言
  - 提醒新回复
- 站点评论浏览器插件
  - 浏览器插件
  - 提供 Hacker news 的评价
  - 允许用户留下标记/评论
- 播放器弹幕插件
  - 为现在的开源播放器 IINA, MPV 提供弹幕服务
- Free Mind
  - 定时推送让人生活更有意义的事情/图片
  - 定时提醒出去走走
- 游戏“加速器”
  - 个人不好运营
  - 但容易实现
- AI Promots Index
  - 收集整理提示词
  - 提供给 AI 生成器
- QQ相册导出
- 微信聊天导出 & 基础 UI
- 调优小规模 LLM 模型
  - 例如 14B
  - 针对行业

## 记账软件

- 支持导入和集成多方的数据导入
- 数据来源
  - 支付宝
  - 银行流水对账单

## 企业 NAC

- 企业网络接入控制
- 功能
  - 网络准入（NAC）
  - VPN
- 其他功能
  - 上网审查
  - 无线投屏
  - 音视频会议
  - 软电话
  - 软件管家
- 例如
  - 阿里郎
    - https://alilang.alibaba-inc.com/portal/help.htm
  - 阿里 云壳

## NAS

- 个人 NAS 服务
- 企业 NAS 服务
- 现在的云盘都不 “安全” 不 “可靠”
- 自托管成为主流

**案例**

- NextCloud

## OminiChat

- AI Chat Client
- 复刻 ChatGPT 功能的客户端即可
- 基础功能
  - 登陆 - 微信、公众号
  - 会话管理
  - 会话记录
- 扩展功能
  - 会话共享
  - 实时对话
  - TTS/STT - 语音转文字、文字转语音
  - 记忆
- 额外管理功能
  - 项目 - 组织会话上下文
  - Profile - 切换 Profile 实现多人使用 - 或者实现多个角色
    - Profile 绑定 memory
- 高级功能
  - 专门场景 Agent
    - 例如: mud - 基于文本的游戏，直接给出玩家选项
  - 支持自定义 API/Token
  - 对话生成的 markdown 支持更高级的交互
    - 例如: 预览 HTML, 预览 js 执行结果
  - 支持图像、文件
  - RAG/本地知识库
  - 扩展集成多模型
    - 根据不同场景选用不同模型
    - 例如 对接不同的 图像 生成模型
- 目标客户对象
  - 无法访问 AI 的个人
  - 需要整体管理 AI 接入的 企业
  - 家庭
  - 教育

---

**案例**

- Chatbox
  - 客户端开源
  - 通过提供 AI 模型访问来盈利
  - 针对使用平台 AI 的场景来进行产品优化
  - 对平台 AI 扩展刚刚
- [lobehub/lobe-chat](https://github.com/lobehub/lobe-chat)

## 会话共享+内置代理 的浏览器

- 基于 Electron 封装
- 会话共享
  - 共享 Cookie/localstorage 信息实现免登陆
  - 参考
    - https://chromewebstore.google.com/detail/glifngepkcmfolnojchcfiinmjgeablm
    - https://chromewebstore.google.com/detail/jcnbanhdjeeeacgdffdakdopacfppbfo
- 代理
  - 避免触发异地
  - 针对网站的代理 - 有些网站本身需要代理才能登陆
    - 例如: 访问公司内网
  - p2p 代理 - 从初始登陆的用户进行代理
    - 例如: frp 实现 p2p 代理通道

## 小家

> **Notes**
>
> - Your Date is Yours.
> - 私人数据相关服务
> - 私人相册共享同步

数据离线、私有，使用 SQLite WASM。

- 小家云盘
- 小家账本
- 小家相册
- 小家通讯录
- 数据
  - 微信聊天数据
  - 抓取其他平台 - 例如：幼儿园 发照片的 APP

## Tech Fun

- 抽象的多语言的 PEG
- Clash 支持日志到 DB
- Nebula Mobile 支持中心化配置
- ldapapply - merge if exists
- alpine
  - ~~lib asan https://github.com/google/sanitizers~~
    - do not support musl
- twitter relay
  - 类似于代理 - 中间加缓存
  - UI 可增加额外的交互
    - 收藏
    - 媒体
  - 不需要 proxy 也能访问

## Wode

- wode - Wener NodeJS monorepo
- @wener/utils - JS 基础库
- @wener/client - 客户端，外部库
- @wener/reaction - React 基础库
- @wener/console - 实现 Console 应用的基础前端、公共 UI、 Oppioned UI 组件
- @wener/miniquery - 实现 MiniQuery 简单的查询语法
- apps/server - 服务端包，多个应用
  - wode-api-server
    - 入口 apis.wener.me, api.wener.tech
  - 一些小工具，代码的 playground, 后端为主
- apps/demo/mode - 前端
  - 入口 demo.wener.me, demo.wener.tech, wode.vercel.app
  - wode -> demo -> mode
  - 合并以前的一些工具，添加一些新的工具
  - 实验性质
- assistant - 桌面应用
  - wails
  - 工具桌面端，一些小尝试，封装简单工具
  - 封装 assistant ui 代理请求
  - Applet 支持渲染到单个窗口？
  - 怎么处理本地登录问题

---

- wode/demo
  - BlockNote
  - codemirror
  - colors
  - [x] systemsjs
  - [x] systemjs -> try ai/ml
  - [x] calc -> systemjs app
  - ~~bp theme for daisy~~ - 没必要，意义不大
- apis
  - rebuild
  - ~~uri schema editor - with json schema~~ - 基于 Schema 的 Editor 意义不大
    - ldap
    - redis
    - postgres
    - s3
- Indexer
  - Torrent
  - Media
  - APK

<!--
## Web3

- 婚姻登记
- r/pixel

不再对 OHM 感兴趣，繁琐没有 pegjs 直接简单
- ohm AST 生成 railroad-diagrams
  - https://github.com/harc/ohm
  - https://github.com/tabatkins/railroad-diagrams
-->

## Torrent Indexer

- Metadata
  - Probe Initial Data Block
- Torrent Builder
  - v1
  - v2
- Search By File
- Announces & Trackers
- Cralwers

## Media Indexer

- 媒体元信息关联 - douban、imdb、烂番茄、open movie

---

- 字幕索引
- 台词索引
- 翻译/多语言

## APK Indexer

- AlpineLinux APK Indexer

## DevWebTool

- https://emn178.github.io/online-tools/sha256.html
- https://toolwa.com/

## AI 驱动的儿童教育文字冒险游戏

- 动态交互故事绘本
- 核心定位： 面向儿童教育的互动文字冒险游戏，寓教于乐。
- 交互形式： 主要通过选择题、填空题等文字交互方式推进故事。
- 核心亮点 1 (AI动态内容)： 利用 AI 动态生成故事分支、角色互动和情境描述，增加故事的丰富性和重玩性，实现“交互式绘本”的动态体验。
- 核心亮点 2 (TTS无障碍)： 全文内容和选择均支持 TTS 语音朗读，解决儿童识字不足的问题。
- 内容方向：
  - 以寓言、童话、经典文学章节（如《爱丽丝梦游仙境》）等为蓝本进行改编和创作。
  - 内容形式为一个个结构完整的小故事。
- 基本框架：
  - 包含基础故事设定（上下文、角色）。
  - 具备游戏整体结构和逻辑（交互处理、选择记录与影响）。
  - 支持简单的存档与读取功能。

## 参考

- https://www.josh.ing/hn-slop
  - https://news.ycombinator.com/item?id=44434938
- https://profithunt.co/
- https://www.sideprojectors.com/
- https://www.reddit.com/r/SideProject/
- https://what-to-code.com/
- https://github.com/dailyidea/dailyidea.com---ARCHIVE
- http://github-help-wanted.com/
