---
title: sub2api
---

# sub2api

- [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api)
  - LGPL-3.0, Go, Vue 3, Vite, Ent, PostgreSQL, Redis
  - Sub2API-CRS2 一站式开源 AI API 中转服务，让 Claude、Openai 、Gemini、Antigravity 订阅统一接入，支持拼车共享和成本分摊。
- 参考
  - [官网](https://sub2api.org)
  - [Demo](https://demo.sub2api.org/)

```bash
docker run -d --name sub2api \
  -p 8080:8080 \
  -v $(pwd)/data:/app/data \
  -e DATABASE_URL=postgres://sub2api:password@localhost:5432/sub2api \
  -e REDIS_URL=redis://localhost:6379 \
  -e JWT_SECRET=$(openssl rand -hex 32) \
  -e TOTP_ENCRYPTION_KEY=$(openssl rand -hex 32) \
  weishaw/sub2api:latest
```

# FAQ

### 配置

- 环境变量 `RUN_MODE=simple` 可进入简易模式。
- `JWT_SECRET` 和 `TOTP_ENCRYPTION_KEY` 推荐手动生成以保持状态。
- 通过 Nginx 反向代理时，需开启 `underscores_in_headers on;` 以支持 `session_id`。

### Antigravity 集成

支持专用端点：

- `/antigravity/v1/messages` -> Claude
- `/antigravity/v1beta/` -> Gemini

## 任务

```
POST   /v1/images/batches
GET    /v1/images/batches/{id}
GET    /v1/images/batches/{id}/items
GET    /v1/images/batches/{id}/items/{custom_id}/content
GET    /v1/images/batches/{id}/download
POST   /v1/images/batches/{id}/cancel
DELETE /v1/images/batches/{id}/outputs
```

```bash
curl --request POST "$SUB2API_BASE_URL/v1/images/batches" \
  --header "Authorization: Bearer $SUB2API_API_KEY" \
  --header "Content-Type: application/json" \
  --header "Idempotency-Key: product-cover-v1-001" \
  --data '{
    "model": "gemini-2.5-flash-image",
    "provider": "gemini_api",
    "task_name": "product-cover-v1",
    "image_size": "1K",
    "response_mime_type": "image/png",
    "items": [
      {
        "custom_id": "cover_001",
        "prompt": "A clean modern SaaS product hero image, teal and coral palette, subtle grid, no text",
        "output_count": 1
      }
    ]
  }'
```

## ChatGPT Live
```
POST /v1/live
POST /backend-api/codex/realtime/calls
```

```
{
  "sdp": "v=0\r\n...",
  "session": {
    "model": "gpt-live-...",
    "instructions": "..."
  }
}
```

## Session ID

```
session_id
conversation_id
X-Session-Affinity
X-Session-Id
X-OpenCode-Session
X-Conversation-ID
X-Claude-Code-Session-Id
```
