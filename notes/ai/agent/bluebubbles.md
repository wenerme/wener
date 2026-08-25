---
title: BlueBubbles
tags:
  - iMessage
  - Channel
---

# BlueBubbles

- [BlueBubblesApp/bluebubbles-server](https://github.com/BlueBubblesApp/bluebubbles-server)
  - Apache-2.0, TypeScript, macOS iMessage bridge
  - 将 macOS 上的 iMessage 能力桥接给 BlueBubbles 客户端和外部自动化程序的自托管 Server。

BlueBubbles 不是 Apple 官方 iMessage API，也不是可部署在普通 Linux/Windows 容器中的云服务。Server 依赖 macOS 的 Messages 应用、`chat.db`、AppleScript 及可选的 macOS 私有框架，因此运行位置必须是已登录 iMessage 的 macOS 主机或 macOS 虚拟化环境。

## 能力边界

- Server：读取 iMessage chat database、监听消息变化，并向外暴露客户端连接、REST API 与 Webhook。
- REST API：外部系统可查询消息/聊天/联系人等数据并发送消息；浏览器使用时需要有效 HTTPS 证书。
- Webhook：Server 在消息、聊天或 Server 状态等事件发生时向指定 URL 发起 HTTP POST，适合将入站 iMessage 接入 Agent、工作流或审计系统。
- Private API：用于 typing indicator、reaction 等增强能力的可选组件。它不是普通发收消息的默认依赖，启用需要调整 macOS System Integrity Protection (SIP)。

```text
iMessage client
    │
    ▼
macOS Messages + chat.db
    │
    ▼
BlueBubbles Server
    ├── BlueBubbles client
    ├── REST API ──────── Agent / automation outbound
    └── Webhook ───────── Agent / workflow inbound
```

## 与 Agent 集成

- 入站：官方 Webhook 文档没有定义请求签名或认证机制。优先让 receiver 仅经 VPN/tailnet 等私网入口可达；必须公网暴露时，在入口层限制来源网络或使用独立的随机 URL secret，并禁止记录完整 URL。接收端还要校验事件 schema，按消息 GUID 等可用事件标识做幂等和重放处理；不要在 webhook HTTP handler 内直接执行长时间 Agent run。
- 出站：Agent 的发送动作通过 REST API 调用 BlueBubbles Server。应保存业务消息 ID、BlueBubbles message GUID、聊天标识和发送结果，便于去重、重试与人工追踪。
- 会话：以聊天/参与者标识映射业务 session，不把 BlueBubbles Server URL 或 API password 当作 session identity。
- 媒体：附件上传、下载和转发应遵守独立的大小、MIME、存储与权限策略；不要把本机文件路径直接暴露给模型或外部 webhook consumer。
- 回环：若同一聊天既接收 Webhook 又允许 Agent 发消息，必须按 BlueBubbles message GUID 或业务 correlation ID 排除自身发送的消息，避免自动回复循环。

## 部署与安全

- macOS 主机必须稳定在线、保持 Messages/iMessage 登录状态，并避免休眠；Server 的 macOS 权限、自动启动和升级恢复属于运行维护的一部分。
- 不要将 Server 管理端口直接暴露到公网。优先通过受控 reverse proxy、VPN/tailnet 或受限入口提供访问，并为 API 与 Webhook 单独设置访问控制、日志脱敏和 rate limit。
- BlueBubbles REST API 大多数请求使用 URL query 中的 `guid`（也兼容 `password`、`token`）传递 Server password。query secret 容易进入 access log、历史记录与错误追踪；代理和应用日志必须避免记录完整 URL，且不要把该值提交到代码库。
- Private API 要求关闭 SIP，官方也明确提示风险。除非增强能力是明确的产品需求并接受 macOS 安全边界变化，否则保持关闭；不要把“关闭 SIP”写入普通 Server 的默认安装步骤。Apple Silicon Mac 关闭 SIP 后无法安装或运行 iOS App。
- macOS VM 或 Docker-OSX 方案本质仍是在虚拟化 macOS 中运行 Server，需单独验证 iMessage 登录、通知、升级与 Apple 服务可用性，不能把它等同于普通 Docker 部署。修改 SIP 前先创建 VM snapshot，保留可回滚点。

## FAQ

### BlueBubbles 能运行在 Linux Docker 或 Windows 上吗？

不能作为普通 Linux/Windows 容器或服务运行。它依赖 macOS 的 Messages 与本地数据库；Docker-OSX 等方案是在 Linux host 上运行 macOS 虚拟化层，仍需要处理 macOS 与 iMessage 的运行条件。

### 是否必须启用 Private API？

不必须。普通 Server 的消息桥接、REST API 与 Webhook 不以 Private API 为前提。只有需要其增强 iMessage 行为时才评估启用，而关闭 SIP 带来的安全影响应单独决策。

### Webhook 和 REST API 应如何分工？

Webhook 负责将 BlueBubbles 事件推入业务系统，REST API 负责查询和命令式操作，例如 Agent 发送消息。两者都属于不可信网络边界：Webhook 不应假定有官方签名，需由部署入口限制与接收端去重；REST 调用要保护 password 并限制调用方权限。

## 参考

- [BlueBubbles Server Documentation](https://docs.bluebubbles.app/server)
- [REST API & Webhooks](https://docs.bluebubbles.app/server/developer-guides/rest-api-and-webhooks)
- [Manual Setup](https://docs.bluebubbles.app/server/installation-guides/manual-setup)
- [macOS Virtualization](https://docs.bluebubbles.app/server/advanced/macos-virtualization)
- [BlueBubbles Private API Installation](https://docs.bluebubbles.app/private-api/installation)
