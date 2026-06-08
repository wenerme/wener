---
title: honcho
---

# honcho

- [plastic-labs/honcho](https://github.com/plastic-labs/honcho)
  - AGPL-3.0, Python, PostgreSQL
  - 专注于“辩证推理”的记忆库。它在后台通过 LLM 提取观察结果，并构建用户与 Agent 的动态模型，支持持久的跨会话状态。
- pgvector 维度 Vector(1536) 硬编码，qwen3-embedding-4b 2560 维不兼容 → 用 lancedb (`VECTOR_STORE_TYPE=lancedb`, `VECTOR_STORE_MIGRATED=true`)
- https://github.com/plastic-labs/honcho/blob/main/.env.template
- deriver
  - 推理引擎

```yaml
services:
  honcho-api:
    image: ghcr.io/plastic-labs/honcho:v3.0.6
    container_name: honcho-api
    entrypoint: ['sh', 'docker/entrypoint.sh'] # 自动跑 alembic migrations
    ports:
      - '8000:8000'
    volumes:
      - ./honcho/lancedb:/app/lancedb_data
    env_file: .env.honcho.local
    depends_on: [postgres, redis]
    restart: unless-stopped

  honcho-deriver:
    image: ghcr.io/plastic-labs/honcho:v3.0.6
    container_name: honcho-deriver
    entrypoint: ['/app/.venv/bin/python', '-m', 'src.deriver']
    volumes:
      - ./honcho/lancedb:/app/lancedb_data
    env_file: .env.honcho.local
    depends_on: [postgres, redis]
    restart: unless-stopped
```

- http://127.0.0.1:8000/openapi.json
- http://127.0.0.1:8000/redoc
- http://127.0.0.1:8000/docs
- 注意
  - pg 用的 vector，最长只有 2000 维
  - halfvec, max 4000 维，但是目前无法配置
  - 4b qwen3-embedding 有 2560 维，用不了

```ini
DB_CONNECTION_URI=postgresql+psycopg://postgres:PASSWORD@postgres:5432/honcho
CACHE_ENABLED=true
CACHE_URL=redis://:PASSWORD@redis:6379/2

# LLM — OpenAI-compatible endpoint
LLM_OPENAI_COMPATIBLE_BASE_URL=http://127.0.0.1:31235/v1
LLM_OPENAI_COMPATIBLE_API_KEY=no-key
LLM_EMBEDDING_PROVIDER=openrouter   # 用 openai/text-embedding-3-small → qwen3-embedding-4b alias

# Deriver
DERIVER_PROVIDER=custom
DERIVER_MODEL=qwen3.6-35b-a3b
DERIVER_FLUSH_ENABLED=true          # 跳过 batch token 阈值，立即处理
DERIVER_STALE_SESSION_TIMEOUT_MINUTES=5

# Dialectic levels (minimal/low/medium/high/max)
DIALECTIC_LEVELS__minimal__PROVIDER=custom
DIALECTIC_LEVELS__minimal__MODEL=qwen3.6-35b-a3b
DIALECTIC_LEVELS__minimal__THINKING_BUDGET_TOKENS=0
DIALECTIC_LEVELS__minimal__MAX_TOOL_ITERATIONS=1

# Vector store: lancedb 支持任意维度，VECTOR_STORE_DIMENSIONS 对 pgvector 无效
VECTOR_STORE_TYPE=lancedb
VECTOR_STORE_DIMENSIONS=2560        # qwen3-embedding-4b 输出维度
VECTOR_STORE_LANCEDB_PATH=/app/lancedb_data
VECTOR_STORE_MIGRATED=true          # 跳过 pgvector 向量存储

AUTH_USE_AUTH=false
```

```bash
curl http://localhost:8000/health

# 创建 workspace/peer/session/message
curl -s -X POST http://localhost:8000/v3/workspaces -d '{"id":"demo"}'
curl -s -X POST http://localhost:8000/v3/workspaces/demo/peers -d '{"id":"alice"}'
curl -s -X POST http://localhost:8000/v3/workspaces/demo/sessions \
  -d '{"id":"s1","peers":{"alice":{}}}'
curl -s -X POST http://localhost:8000/v3/workspaces/demo/sessions/s1/messages \
  -d '{"messages":[{"peer_id":"alice","content":"I love building AI infrastructure."}]}'

# deriver 处理后查 dialectic
curl -s -X POST http://localhost:8000/v3/workspaces/demo/peers/alice/chat \
  -d '{"query":"What does alice do?","session_id":"s1"}'
```

```ini
AUTH_USE_AUTH=true
# 生成 jwt 可以包含 scope
AUTH_JWT_SECRET=your-secret-key
```

```json
{
  "mcpServers": {
    "honcho": {
      "command": "bunx",
      "args": [
        "mcp-remote",
        "https://mcp.honcho.dev",
        "--header",
        "Authorization:Bearer <honcho-api-key>",
        "--header",
        "X-Honcho-User-Name:wener",
        "--header",
        "X-Honcho-Workspace-ID:wener-infra"
      ]
    }
  }
}
```

## Notes

- Memory Layer
- Reasoning Layer
- Workspaces
  - -> Peers
    - -> Sessions
  - -> Sessions
    - -> Messages
- Global Representation
  - Peer 在所有会话中的交互中提炼出来的合成见解
- Local Representation
  - Peer 基于特定的、观察到的交互/消息而形成的持久上下文
- message → deriver(LLM) → observations → pgvector → dialectic
- query → embedding → pgvector cosine 相似度检索 → top-K → 直接用
  - 没有做 rerank
- Dialectic（辩证）
  - 带记忆的问答 agent
- 记忆噪音 / 清洗 / 去重
  - DERIVER_DEDUPLICATE=true
    - 提取 observation 时，和已有的做相似度比对，重复的不存。
  - DreamerAgent
    - 归纳（induction）：把多条零散 observation 合并成更高层抽象
    - 演绎（deduction）：从已有 observation 推断新的结论
    - 删冗余：合并后删掉原始条目
    - DREAM_ENABLED=true
  - 分层 observation
    - explicit ← 直接从消息里提取的事实
    - deductive ← 从 explicit 推断的结论

## Peer 策略

- userPeer
  - HONCHO_PEER_NAME
  - ~/.honcho/config.json peerName
  - OS username
  - user
- aiPeer
  - HONCHO_AI_PEER
  - - ~/.honcho/config.json aiPeer

## mcp

- https://github.com/plastic-labs/claude-honcho
  - search, chat, create_conclusion, get_config, set_config
- https://github.com/plastic-labs/honcho/tree/main/mcp
- HONCHO_API_URL
- Workspace:
  - inspect_workspace (aggregates metadata, configuration, and peer/session IDs)
  - list_workspaces (enumerates accessible workspaces)
  - search (semantic search scoped by optional peer/session params)
  - get_metadata
  - set_metadata
- Peers:
  - create_peer
  - list_peers
  - chat
  - get_peer_card, set_peer_card, get_peer_context, get_representation
- Sessions:
  - create_session
  - list_sessions
  - delete_session
  - clone_session
  - add_peers_to_session
  - remove_peers_from_session
  - get_session_peers
  - inspect_session
  - add_messages_to_session
  - get_session_messages
  - get_session_message
  - get_session_context
- Conclusions:
  - list_conclusions
  - query_conclusions
  - create_conclusions
  - delete_conclusion
- System:
  - schedule_dream
  - get_queue_status

## honcho-cli

```bash
# ~/.honcho/config.json
uv tool install honcho-cli
```

## 配置

```json
{
  "environmentUrl": "",
  "apiKey": "",
  "hosts": {
    "pi": {
      "sessionStrategy": "repo",
      "endpoint": "http://127.0.0.1:8055"
    },
    "claude_code": {
      "workspace": "wener",
      "aiPeer": "claude"
    }
  },
  "endpoint": {
    "environment": "production",
    "baseUrl": "http://127.0.0.1:8055/v3"
  },
  "peerName": "wener",
  "sessions": {
    "": ""
  }
}
```

- sessionStrategy
