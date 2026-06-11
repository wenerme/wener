---
title: lark-cli
---

# lark-cli

- [larksuite/cli](https://github.com/larksuite/cli)
  - MIT, Go, TypeScript, Node.js
  - 飞书/Lark 官方 CLI，面向人类和 AI Agent，覆盖 IM、Docs、Drive、Base、Sheets、Slides、Calendar、Mail、Task、Wiki、VC、Approval、OKR 等域。
- 参考
  - [飞书开放平台文档](https://open.feishu.cn/document/)
  - [npm:@larksuite/cli](https://www.npmjs.com/package/@larksuite/cli)

# Install

```bash
# 推荐：从 npm 安装/更新
npx @larksuite/cli@latest install

# 从源码构建
# 需要 Go 1.23+、Node.js、Python 3
git clone https://github.com/larksuite/cli.git
cd cli
make install

# 安装 Agent Skills
npx skills add larksuite/cli -g -y
```

# Quick Start

```bash
# 初始化应用配置，交互式引导 app_id/app_secret 等信息
lark-cli config init

# 登录授权；--recommend 自动选择常用 scope
lark-cli auth login --recommend

# 检查当前认证状态
lark-cli auth status

# 健康检查：配置、认证、连通性
lark-cli doctor
```

AI Agent 场景通常使用非阻塞登录，让用户在浏览器完成授权：

```bash
# 创建新应用配置，输出授权链接
lark-cli config init --new

# 立即返回验证 URL，不阻塞等待
lark-cli auth login --recommend --no-wait

# 如果需要稍后继续轮询
lark-cli auth login --device-code <DEVICE_CODE>
```

# Command Model

`lark-cli` 有三层调用方式：

| 层级        | 形式                                    | 适用场景                                                    |
| ----------- | --------------------------------------- | ----------------------------------------------------------- |
| Shortcut    | `lark-cli <domain> +<name>`             | 人类/Agent 常用操作，参数更友好，有 dry-run、表格输出等封装 |
| API Command | `lark-cli <domain> <resource> <method>` | 与飞书 OpenAPI 元数据同步的精选命令                         |
| Raw API     | `lark-cli api METHOD /open-apis/...`    | 覆盖任意开放平台 API，适合探索或未封装接口                  |

```bash
# Shortcut：查看日程
lark-cli calendar +agenda

# Shortcut：发送消息，建议先 dry-run
lark-cli im +messages-send --chat-id "oc_xxx" --text "Hello" --dry-run
lark-cli im +messages-send --chat-id "oc_xxx" --text "Hello"

# API Command：查询日程实例
lark-cli calendar events instance_view \
  --params '{"calendar_id":"primary","start_time":"1700000000","end_time":"1700086400"}'

# Raw API：直接调用开放平台路径
lark-cli api GET /open-apis/calendar/v4/calendars
```

# Domains

常见 domain：

| Domain       | 能力                                            |
| ------------ | ----------------------------------------------- |
| `auth`       | OAuth 登录、登出、scope 检查、账号列表          |
| `config`     | 全局配置、应用配置、strict mode                 |
| `profile`    | 多 profile 管理                                 |
| `schema`     | API 参数、请求体、响应、scope 自省              |
| `api`        | 通用 OpenAPI 调用                               |
| `calendar`   | 日历、日程、忙闲、会议室                        |
| `im`         | 消息、群聊、回复、媒体上传/下载                 |
| `docs`       | 云文档创建、读取、更新、搜索                    |
| `drive`      | 文件上传下载、权限、评论                        |
| `markdown`   | Drive 原生 Markdown 文件创建、读取、patch、覆盖 |
| `base`       | 多维表格、字段、记录、视图、仪表盘、表单、权限  |
| `sheets`     | 电子表格读取、写入、追加、导出                  |
| `slides`     | 演示文稿读取和页面管理                          |
| `task`       | 任务、任务清单、子任务、提醒                    |
| `mail`       | 邮件浏览、搜索、阅读、发送、草稿                |
| `contact`    | 通讯录用户搜索和详情                            |
| `wiki`       | 知识空间、节点、文档                            |
| `vc`         | 视频会议记录、妙记/纪要产物                     |
| `minutes`    | 妙记元数据、摘要、待办、章节、媒体              |
| `approval`   | 审批任务和实例                                  |
| `attendance` | 考勤打卡记录                                    |
| `okr`        | OKR 目标、关键结果、对齐和进展                  |
| `event`      | WebSocket 实时事件消费和管理                    |
| `apps`       | HTML/Web 应用开发与发布                         |
| `whiteboard` | 画板/图表 DSL 渲染                              |

# Output

```bash
# 默认 JSON
lark-cli calendar +agenda --format json

# 人类可读
lark-cli calendar +agenda --format pretty
lark-cli calendar +agenda --format table

# 管道处理
lark-cli calendar +agenda --format ndjson
lark-cli sheets +read --format csv

# --json 是 --format json 的别名
lark-cli auth status --json
```

# Pagination

```bash
# 自动翻页获取全部数据
lark-cli calendar events instance_view --page-all \
  --params '{"calendar_id":"primary","start_time":"1700000000","end_time":"1700086400"}'

# 限制最多翻 5 页，每页间隔 500ms
lark-cli im chats list --page-all --page-limit 5 --page-delay 500
```

# Schema

`schema` 用来查看命令的参数、请求体、响应结构、支持身份和所需 scopes。写脚本或让 Agent 调 API 前，优先查 schema。

```bash
# 查看所有可用 schema
lark-cli schema

# 查看某个 API 命令
lark-cli schema calendar.events.instance_view
lark-cli schema im.messages.create

# JSON 形式便于 Agent/脚本解析
lark-cli schema calendar.events.instance_view --format json
```

# Auth & Scopes

```bash
# 查看当前登录状态和授权 scope
lark-cli auth status

# 按 domain 选择 scope
lark-cli auth login --domain calendar,task

# 精确 scope
lark-cli auth login --scope "calendar:calendar:read"

# 检查某个 scope 是否已授权，exit 0 表示有权限，1 表示缺失
lark-cli auth check --scope "calendar:calendar:read"

# 列出所有可用 scope
lark-cli auth scopes

# 多账号/多身份
lark-cli auth list
lark-cli calendar +agenda --as user
lark-cli im +messages-send --as bot --chat-id "oc_xxx" --text "Hello"
```

# Profile

多环境、多应用或多租户场景建议使用 profile 隔离配置。

```bash
lark-cli profile list
lark-cli profile add dev
lark-cli profile use dev
lark-cli auth status --profile dev
```

# Agent Skills

官方仓库提供 Agent Skills，覆盖常见业务域。安装后，Claude Code/Cursor/Gemini CLI 等 Agent 能更稳定地调用飞书。

```bash
# 安装全部 skills
npx skills add larksuite/cli -g -y

# 安装单个 domain skill
npx skills add larksuite/cli -s lark-calendar -y
npx skills add larksuite/cli -s lark-im -y
```

常见 skills：

| Skill           | 用途                                      |
| --------------- | ----------------------------------------- |
| `lark-shared`   | 应用配置、认证、身份切换、scope、安全规则 |
| `lark-calendar` | 日历、日程、忙闲、会议室                  |
| `lark-im`       | 消息、群聊、媒体、反应                    |
| `lark-doc`      | 文档创建、读取、更新、搜索                |
| `lark-drive`    | 文件、权限、评论                          |
| `lark-markdown` | Drive 原生 Markdown                       |
| `lark-base`     | 多维表格                                  |
| `lark-sheets`   | 电子表格                                  |
| `lark-task`     | 任务和任务清单                            |
| `lark-mail`     | 邮件                                      |
| `lark-contact`  | 通讯录                                    |
| `lark-event`    | 实时事件订阅                              |

# Safety

- 对会产生副作用的命令先用 `--dry-run`。
- 不要把 `app_secret`、access token、refresh token 写入笔记、脚本或日志。
- stdout 是数据，stderr 是提示/告警；写自动化时只解析 stdout。
- AI Agent 调用前优先用 `schema` 看参数和 scope。
- 缺权限时先 `auth check` 或 `auth login --domain ...`，不要盲目重试。

# FAQ


## 如何发现一个功能对应的命令？

```bash
lark-cli --help
lark-cli < domain > --help
lark-cli schema | grep -i keyword
```

## 什么时候用 Shortcut，什么时候用 Raw API？

- 优先用 Shortcut：参数友好、输出稳定、Agent 成功率高。
- Shortcut 覆盖不到时用 API Command。
- 新接口探索或低层能力才用 Raw API。

## CI/脚本里如何降低输出噪声？

当前 `lark-cli` 主要通过环境变量关闭 update/skills notice；源码中没有看到等价的 `lark-cli config set ...` 全局配置项。

```bash
export LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1
export LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1
```

如果想对本机所有 shell 全局生效，可以写入 shell profile：

```bash
# zsh
cat >> ~/.zshrc <<'EOF'
export LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1
export LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1
EOF

# bash
cat >> ~/.bashrc <<'EOF'
export LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1
export LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1
EOF
```

CI 环境一般会自动跳过 notice，因为 `CI`、`BUILD_NUMBER`、`RUN_ID` 任一环境变量存在时会 suppress。
