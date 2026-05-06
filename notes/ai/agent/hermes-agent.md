---
title: Hermes Agent
tags: [Agent, CLI, Python]
---

# Hermes Agent

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
  - MIT, Python
  - 自我改进 AI agent，支持多平台集成（Telegram、微信、飞书、Discord 等）
- `~/.hermes/hermes-agent/` — 安装目录（独立 git repo）
- `~/.hermes/` — 配置/数据目录
  - `.env` — API keys
  - `config.yaml` — 主配置
  - `SOUL.md` — Agent 人格定制
  - `skills/` — 技能
  - `sessions/` — 会话历史
  - `memories/` — 持久记忆
- 运维文档：`wener-infra/.agents/docs/hermes-agent-ops.md`
- 参考
  - [PR #8134 fix codex.rate_limits](https://github.com/NousResearch/hermes-agent/pull/8134)

```bash
# 安装
# ~/.hermes/hermes-agent/
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash -s -- --skip-setup
hermes setup # 配置 API key

# 本质是 git pull, 依赖更新, 工具重新构建
hermes update

# 常用
hermes                 # 启动交互 CLI
hermes update          # 升级（git pull + 重装）
hermes config edit     # 编辑配置
hermes gateway install # 安装后台 gateway（Telegram/Discord/飞书等）


# profile
hermes profile create ops-agent --clone
ops-agent config
hermes --profile ops-agent chat -q 'Reply OK only.' --toolsets '' --quiet
```

## 配置 {#configuration}

```
~/.hermes/
├── config.yaml     # 核心配置
├── .env            # API Key & Secrets & Tokens
├── auth.json       # OAuth provider credentials
├── SOUL.md         # Primary agent identity (slot #1 in system prompt)
├── memories/       # Persistent memory (MEMORY.md, USER.md)
├── skills/         # Agent-created skills (managed via skill_manage tool)
├── cron/           # Scheduled jobs
├── sessions/       # Gateway sessions
└── logs/           # Logs (errors.log, gateway.log — secrets auto-redacted)
```

```bash
hermes config
hermes config check
# .env
# hermes config set K V
```

```yaml
model:
  provider: custom # custom / anthropic / openrouter / gemini 等
  default: gpt-5.4
  api_mode: codex_responses # chat_completions / codex_responses / anthropic_messages
  context_length: 1050000 # 显式覆盖，避免从 /v1/models 读到错误值
  base_url: https://wna.wener.me/v1

smart_model_routing:
  enabled: true
  max_simple_chars: 160
  max_simple_words: 28
  cheap_model:
    provider: custom
    model: gpt-5.4-mini
    base_url: https://wna.wener.me/v1
    api_mode: codex_responses

display:
  busy_input_mode: interrupt
```

| 字段             | 说明                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| `provider`       | 推理 provider，`custom` 表示自定义 OpenAI 兼容端点                      |
| `api_mode`       | 传输协议：`chat_completions` / `codex_responses` / `anthropic_messages` |
| `context_length` | 显式覆盖上下文长度，避免从 endpoint 读到错误值                          |
| `base_url`       | 自定义端点 URL                                                          |

## Smart Model Routing {#smart-model-routing}

- 定义：`agent/smart_model_routing.py`
- 满足**全部**条件才用 cheap_model，否则用主模型

| 条件            | 默认值      | 可配置             |
| --------------- | ----------- | ------------------ |
| 消息长度        | ≤ 160 字符  | `max_simple_chars` |
| 词数            | ≤ 28 词     | `max_simple_words` |
| 换行数          | ≤ 1 行      | 否                 |
| 不含反引号/代码 | 无 `` ` ``  | 否                 |
| 不含 URL        | 无 http/www | 否                 |
| 不含复杂关键词  | 无          | 否（硬编码）       |

复杂关键词（任一命中 → 主模型）：
`debug` `implement` `refactor` `patch` `error` `traceback` `analyze` `investigate`
`architecture` `design` `compare` `benchmark` `optimize` `review`
`terminal` `shell` `tool` `test` `plan` `delegate` `subagent` `cron` `docker` `kubernetes`

## Platforms / Bridges {#platforms}

| 平台           | 文件            | 说明                              |
| -------------- | --------------- | --------------------------------- |
| Telegram       | `telegram.py`   | Bot Token                         |
| Discord        | `discord.py`    |                                   |
| Slack          | `slack.py`      |                                   |
| WhatsApp       | `whatsapp.py`   | Baileys（非官方协议，需 Node.js） |
| 飞书 Feishu    | `feishu.py`     |                                   |
| 钉钉 DingTalk  | `dingtalk.py`   |                                   |
| 企业微信 WeCom | `wecom.py`      |                                   |
| 微信 Weixin    | `weixin.py`     | iLink Bot API，个人账号扫码登录   |
| Matrix         | `matrix.py`     | 仅 Linux                          |
| Email          | `email.py`      | IMAP/SMTP                         |
| Webhook        | `webhook.py`    | 通用                              |
| API Server     | `api_server.py` |                                   |

## 微信接入 {#weixin}

- 基于腾讯 iLink Bot API（`ilinkai.weixin.qq.com`），对接**个人微信账号**
- 登录：`hermes weixin`（扫码），token 保存到 `~/.hermes/weixin/accounts/`
- 需要 `aiohttp` + `cryptography`（`.[all]` 已包含）

```yaml
platforms:
  weixin:
    enabled: true
    extra:
      account_id: 'your-ilink-bot-id'
      dm_policy: open # open / allowlist / disabled
      group_policy: disabled
```

## 已知问题 {#known-issues}

### `codex.rate_limits` 顺序错误

- **症状**：`Expected to have received response.created before codex.rate_limits`
- **原因**：OpenAI SDK 严格要求 stream 第一个事件是 `response.created`，codex-lb 先发 `codex.rate_limits`
- **修复**：手动 apply [PR #8134](https://github.com/NousResearch/hermes-agent/pull/8134)，宽松匹配：
  ```python
  "Expected to have received" in err_text and "response.created" in err_text
  ```
  注：PR 原版 `"before response."` 不匹配 `codex.` 前缀，需改为上述宽松版本
- **注意**：`hermes update` 后需重新 apply

### skill `[error]`（非致命）

- **症状**：`📚 skill github:codebase-inspection 0.2s [error]`
- **原因**：agent 把 `category:name` 当 plugin namespace 查询，本地 bundled skill 只支持裸名
- **影响**：非致命，自动重试时用裸名成功加载

## Memory

- byterover — requires API key
- hindsight — API key / local
- holographic — local
- honcho — API key / local
- mem0 — API key / local
- openviking — API key / local
- retaindb — API key / local
- supermemory — requires API key
- Built-in only — MEMORY.md / USER.md (default)

---

- https://github.com/plastic-labs/honcho

### Honcho

~/.hermes/honcho.json

```json
{
  "hosts": {
    "hermes": {
      "peerName": "wener",
      "aiPeer": "hermes",
      "workspace": "wener",
      "observationMode": "directional",
      "writeFrequency": "async",
      "recallMode": "hybrid",
      "sessionStrategy": "per-directory",
      "enabled": true,
      "saveMessages": true
    }
  },
  "apiKey": "hch-v3-...",
  "baseUrl": "http://localhost:8056"
}
```
