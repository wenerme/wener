---
title: crawl4ai
---

# crawl4ai

- [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)
  - Apache-2.0, Python, Playwright/Chromium, Redis
  - Open-source LLM Friendly Web Crawler & Scraper
  - 面向 AI/LLM 的网页抓取、清洗、Markdown 生成、结构化抽取工具
  - 支持复杂页面、浏览器控制、截图、PDF、缓存、异步任务、Webhook
- 官方文档
  - https://docs.crawl4ai.com/
  - https://docs.crawl4ai.com/api/parameters/

## Features

- Generate Clean Markdown
  - 将网页转为适合 LLM/RAG 使用的 Markdown
  - 支持 `fit`、`raw`、`bm25`、`llm` 等过滤模式
- Structured Extraction
  - 支持通过 schema/LLM 从页面中抽取结构化数据
  - 可先用 `/html` 获取预处理 HTML，再设计抽取 schema
- Advanced Browser Control
  - 基于 Playwright/Chromium 渲染动态页面
  - 支持 `BrowserConfig` 和 `CrawlerRunConfig`
  - 支持等待图片、截图、PDF、JS 执行等能力
- API Server
  - Docker 版默认监听 `11235`
  - 内置 Redis 任务队列
  - 支持同步 `/crawl`、流式 `/crawl/stream`、异步 `/crawl/job`
- Web UI
  - `/playground` Playground
  - `/dashboard` 监控面板
  - `/docs` FastAPI Swagger UI
  - `/redoc` ReDoc

## Security

- 0.9.x 之后 Docker API 默认更重视安全边界。
- 对外监听时应配置 `CRAWL4AI_API_TOKEN`。
- 除 `/health` 和 `/token` 外，API、UI、静态资源、Dashboard 都会经过 Bearer Auth。
- 浏览器直接打开 `/playground` 无法自动带 `Authorization` Header，通常需要：
  - 浏览器 Header 插件；或
  - 由反代做 Basic Auth，并在 upstream 注入 Bearer Token。
- 不建议公网裸奔，因为它本质上是一个可消耗 CPU/内存/带宽的远程浏览器和 URL 抓取服务。
- 高风险能力默认关闭：
  - `CRAWL4AI_EXECUTE_JS_ENABLED=false`
  - `CRAWL4AI_HOOKS_ENABLED=false`
  - `CRAWL4AI_ALLOW_INTERNAL_URLS=false`

## Docker

```bash
# API: http://127.0.0.1:11235/
# Playground: http://127.0.0.1:11235/playground
# Health: http://127.0.0.1:11235/health
export CRAWL4AI_API_TOKEN=$(openssl rand -hex 32)

docker run --rm -it \
  -p 11235:11235 \
  -e CRAWL4AI_API_TOKEN="$CRAWL4AI_API_TOKEN" \
  --name crawl4ai \
  unclecode/crawl4ai:0.9.0
```

```bash
curl -fsS http://127.0.0.1:11235/health
```

```bash
curl -fsS \
  -H "Authorization: Bearer $CRAWL4AI_API_TOKEN" \
  http://127.0.0.1:11235/schema
```

## Env

| env                            | 说明                                           |
| ------------------------------ | ---------------------------------------------- |
| `CRAWL4AI_API_TOKEN`           | 静态 API Token；对外暴露时必须配置             |
| `SECRET_KEY`                   | JWT 签名密钥；使用 `/token` 发 JWT 时需要      |
| `REDIS_PASSWORD`               | 内置 Redis 密码；Docker entrypoint 可生成/注入 |
| `LLM_PROVIDER`                 | 默认 LLM Provider，例如 `openai/gpt-4o-mini`   |
| `LLM_API_KEY`                  | 通用 LLM API Key fallback                      |
| `OPENAI_API_KEY`               | OpenAI API Key                                 |
| `DEEPSEEK_API_KEY`             | DeepSeek API Key                               |
| `ANTHROPIC_API_KEY`            | Anthropic API Key                              |
| `GROQ_API_KEY`                 | Groq API Key                                   |
| `TOGETHER_API_KEY`             | Together API Key                               |
| `MISTRAL_API_KEY`              | Mistral API Key                                |
| `GEMINI_API_TOKEN`             | Gemini API Token                               |
| `CRAWL4AI_EXECUTE_JS_ENABLED`  | 是否启用 `/execute_js`；默认关闭               |
| `CRAWL4AI_HOOKS_ENABLED`       | 是否启用 hooks；默认关闭                       |
| `CRAWL4AI_ALLOW_INTERNAL_URLS` | 是否允许抓取内网地址；默认关闭                 |

## REST API

通用请求头：

```http
Authorization: Bearer <CRAWL4AI_API_TOKEN or JWT>
Content-Type: application/json
```

### 基础与 UI

| Method | Path            | 说明                                                 | 认证 |
| ------ | --------------- | ---------------------------------------------------- | ---- |
| `GET`  | `/health`       | 健康检查，返回版本与时间戳                           | 否   |
| `GET`  | `/`             | 重定向到 `/playground`                               | 是   |
| `GET`  | `/playground`   | Web Playground                                       | 是   |
| `GET`  | `/dashboard`    | 监控面板                                             | 是   |
| `GET`  | `/docs`         | Swagger UI                                           | 是   |
| `GET`  | `/redoc`        | ReDoc                                                | 是   |
| `GET`  | `/openapi.json` | OpenAPI schema                                       | 是   |
| `GET`  | `/metrics`      | Prometheus metrics                                   | 是   |
| `GET`  | `/schema`       | 返回默认 `BrowserConfig` / `CrawlerRunConfig` schema | 是   |
| `POST` | `/token`        | 用静态 `api_token` 换 JWT                            | 特殊 |

### Crawl

#### `POST /crawl`

同步抓取一个或多个 URL，返回 JSON 结果。

```bash
curl -fsS \
  -H "Authorization: Bearer $CRAWL4AI_API_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "urls": ["https://example.com"],
    "browser_config": {"headless": true},
    "crawler_config": {"stream": false}
  }' \
  http://127.0.0.1:11235/crawl | jq
```

请求体：

| 字段              | 类型       | 说明                                               |
| ----------------- | ---------- | -------------------------------------------------- |
| `urls`            | `string[]` | 必填，1-100 个 URL                                 |
| `browser_config`  | `object`   | 可选，传给 `BrowserConfig`                         |
| `crawler_config`  | `object`   | 可选，传给 `CrawlerRunConfig`                      |
| `crawler_configs` | `object[]` | 可选，按 URL 匹配的多配置，优先于 `crawler_config` |
| `hooks`           | `object`   | 可选 declarative hooks；默认服务端禁用             |

常见响应字段：

| 字段                      | 说明                           |
| ------------------------- | ------------------------------ |
| `success`                 | 请求整体是否成功               |
| `results`                 | 每个 URL 的抓取结果            |
| `results[].url`           | 原始 URL                       |
| `results[].success`       | 单 URL 是否成功                |
| `results[].status_code`   | HTTP 状态码                    |
| `results[].html`          | 原始 HTML                      |
| `results[].cleaned_html`  | 清洗后的 HTML                  |
| `results[].markdown`      | Markdown 结果                  |
| `results[].links`         | 页面链接                       |
| `results[].media`         | 图片、视频等媒体信息           |
| `results[].metadata`      | title、description 等 metadata |
| `results[].error_message` | 失败原因                       |

#### `POST /crawl/stream`

流式抓取，返回 `application/x-ndjson`。

- 适合 URL 数量较多、希望边抓边消费结果的场景。
- 请求体与 `/crawl` 基本一致。

#### `POST /crawl/job`

提交异步抓取任务，返回 `202` 和 `task_id`。

```bash
curl -fsS \
  -H "Authorization: Bearer $CRAWL4AI_API_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"urls":["https://example.com"],"crawler_config":{}}' \
  http://127.0.0.1:11235/crawl/job | jq
```

#### `GET /crawl/job/{task_id}`

查询异步抓取任务状态和结果。

### Markdown

#### `POST /md`

将页面转为 Markdown。

```bash
curl -fsS \
  -H "Authorization: Bearer $CRAWL4AI_API_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com","f":"fit"}' \
  http://127.0.0.1:11235/md | jq -r .markdown
```

请求体：

| 字段          | 类型                  | 说明                                              |
| ------------- | --------------------- | ------------------------------------------------- |
| `url`         | `string`              | URL，支持 `http://`、`https://`、`raw:`、`raw://` |
| `f`           | `fit\|raw\|bm25\|llm` | 过滤模式；默认 `fit`                              |
| `q`           | `string`              | BM25/LLM 查询语句                                 |
| `c`           | `string`              | cache-bust / revision counter                     |
| `provider`    | `string`              | LLM provider override                             |
| `temperature` | `number`              | LLM temperature                                   |

过滤模式：

| 模式   | 说明                                              |
| ------ | ------------------------------------------------- |
| `fit`  | 默认，Readability 风格正文抽取，输出干净 Markdown |
| `raw`  | 直接 DOM/HTML 转 Markdown                         |
| `bm25` | 根据 `q` 做相关性过滤                             |
| `llm`  | 使用 LLM 生成摘要/答案式 Markdown                 |

### HTML

#### `POST /html`

抓取并返回预处理 HTML，适合用于 schema extraction 前的结构观察。

```bash
curl -fsS \
  -H "Authorization: Bearer $CRAWL4AI_API_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com"}' \
  http://127.0.0.1:11235/html | jq -r .html
```

### Screenshot / PDF / Artifacts

#### `POST /screenshot`

生成页面截图，返回 base64 PNG，并写入 artifact store。

```json
{
  "url": "https://example.com",
  "screenshot_wait_for": 2,
  "wait_for_images": false
}
```

响应包含：

| 字段          | 说明                       |
| ------------- | -------------------------- |
| `screenshot`  | base64 PNG                 |
| `artifact_id` | artifact ID                |
| `url`         | `/artifacts/{artifact_id}` |
| `mime`        | MIME type                  |
| `size`        | artifact 大小              |

#### `POST /pdf`

生成页面 PDF，返回 base64 PDF，并写入 artifact store。

```json
{ "url": "https://example.com" }
```

#### `GET /artifacts/{artifact_id}`

读取 `/screenshot` 或 `/pdf` 生成的 artifact。

### LLM

#### `GET /llm/{url:path}`

对页面做 LLM 问答。

```bash
curl -fsS \
  -H "Authorization: Bearer $CRAWL4AI_API_TOKEN" \
  'http://127.0.0.1:11235/llm/example.com?q=Summarize%20this%20page' | jq
```

Query 参数：

| 参数          | 说明                        |
| ------------- | --------------------------- |
| `q`           | 必填，问题                  |
| `provider`    | 可选，LLM provider override |
| `temperature` | 可选，温度                  |

#### `POST /llm/job`

提交异步 LLM extraction/QA 任务。

```json
{
  "url": "https://example.com",
  "q": "Extract title and summary",
  "schema": null,
  "cache": false,
  "provider": "openai/gpt-4o-mini"
}
```

#### `GET /llm/job/{task_id}`

查询异步 LLM 任务结果。

### JS / Hooks

#### `POST /execute_js`

在页面上下文执行 JS，并返回完整 CrawlResult。

- 默认禁用，需要 `CRAWL4AI_EXECUTE_JS_ENABLED=true`。
- 有明显安全风险，公网服务不建议开启。

```json
{
  "url": "https://example.com",
  "scripts": ["() => document.title"]
}
```

#### `GET /hooks/info`

列出可用 declarative hook actions。

- hooks 默认禁用，需要 `CRAWL4AI_HOOKS_ENABLED=true`。
- 新版本不接受任意 Python hook code，只接受服务端注册过的 action。

### Config / Context

#### `POST /config/dump`

将 JSON 配置解析/转换为服务器可用配置，用于调试 `BrowserConfig` / `CrawlerRunConfig`。

#### `GET /ask`

返回 Crawl4AI 代码/文档上下文，方便给 AI assistant 作为检索上下文。

Query 参数：

| 参数           | 默认  | 说明                 |
| -------------- | ----- | -------------------- |
| `context_type` | `all` | `code`、`doc`、`all` |
| `query`        | 空    | BM25 过滤查询        |
| `score_ratio`  | `0.5` | 最低分数比例         |
| `max_results`  | `20`  | 最大返回 chunk 数    |

### Monitor API

监控 API 一般服务于 `/dashboard`：

| Method | Path                               | 说明               |
| ------ | ---------------------------------- | ------------------ |
| `GET`  | `/monitor/health`                  | 监控健康状态       |
| `GET`  | `/monitor/requests`                | 请求记录           |
| `GET`  | `/monitor/browsers`                | 浏览器池状态       |
| `GET`  | `/monitor/endpoints/stats`         | endpoint 统计      |
| `GET`  | `/monitor/timeline`                | 时间线             |
| `GET`  | `/monitor/logs/janitor`            | janitor 日志       |
| `GET`  | `/monitor/logs/errors`             | 错误日志           |
| `POST` | `/monitor/actions/cleanup`         | 清理资源，admin    |
| `POST` | `/monitor/actions/kill_browser`    | kill 浏览器，admin |
| `POST` | `/monitor/actions/restart_browser` | 重启浏览器，admin  |
| `POST` | `/monitor/stats/reset`             | 重置统计，admin    |

## Python SDK

```py
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://crawl4ai.com")
        print(result.markdown)

asyncio.run(main())
```

带配置：

```py
import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

async def main():
    browser_config = BrowserConfig(
        headless=True,
        text_mode=True,
    )
    crawler_config = CrawlerRunConfig(
        cache_mode=CacheMode.ENABLED,
        screenshot=False,
        pdf=False,
    )

    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(
            url="https://example.com",
            config=crawler_config,
        )
        print(result.success, result.status_code)
        print(result.markdown)

asyncio.run(main())
```

## Caching

- 讨论：https://github.com/unclecode/crawl4ai/discussions/784
- API 侧常见控制点：
  - `/md` 的 `c` 字段可作为 cache-bust / revision counter。
  - `/crawl` 通过 `crawler_config.cache_mode` 控制缓存行为。
- Python SDK 常用 `CacheMode`：
  - `CacheMode.ENABLED`
  - `CacheMode.DISABLED`
  - `CacheMode.BYPASS`

## Wener Deploy

- Host: `wen-svr-4`
- Public URL: `https://crawl4ai.wener.run`
- Compose service: `crawl4ai`
- Image: `unclecode/crawl4ai:0.9.0`
- API Secret:
  - repo root `.env.local`: `WEN4_CRAWL4AI_API_TOKEN`
  - `deploy/wen-svr-4/opt/.env.crawl4ai.local`: `CRAWL4AI_API_TOKEN`
- LLM:
  - provider: `openai/deepseek-v3.2`
  - base URL: `https://wna.wener.run/v1`
  - repo root `.env.local`: `WEN4_CRAWL4AI_OPENAI_API_KEY`
  - `deploy/wen-svr-4/opt/.env.crawl4ai.local`: `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `LLM_BASE_URL`
- Caddy reverse proxy:
  - `crawl4ai.wener.run` -> `crawl4ai:11235`
  - Caddy 使用 `CRAWL4AI_UPSTREAM_API_TOKEN` 向 upstream 注入 `Authorization: Bearer ...`。
  - LAN 客户端可直接打开 `/playground/`、`/dashboard/`、`/docs`，不需要浏览器手动设置 Bearer header。
  - 直接访问 Docker upstream 仍需要 Crawl4AI Bearer token。
- Persistent data:
  - `deploy/wen-svr-4/opt/crawl4ai/data` -> `/home/appuser/.crawl4ai`
  - `deploy/wen-svr-4/opt/crawl4ai/outputs` -> `/var/lib/crawl4ai/outputs`
  - `crawl4ai/data/**` 与 `crawl4ai/outputs/**` runtime 内容不提交 git，只保留 `.gitkeep`。
  - Redis 仍为 tmpfs，异步任务队列状态暂不持久化。
- Current capability flags:
  - `CRAWL4AI_EXECUTE_JS_ENABLED=true`
  - `CRAWL4AI_HOOKS_ENABLED=true`
  - 仅面向 Bearer Auth 认证后的 operator 使用，不开放无认证访问。
- 当前验证：
  - `/health` 公开可访问
  - 经 Caddy 访问 `/schema` 可由 Caddy 自动注入 upstream auth
  - 直接访问 upstream `/schema` 未认证返回 `401`
  - 带 Bearer token 的 `/crawl` 可成功抓取 `https://example.com`
  - 带 Bearer token 的 `/execute_js` 可执行最小页面 JS。
  - `/hooks/info` 可列出 declarative hook actions。
- 注意：
  - `unclecode/crawl4ai:0.9.0` 启用 read-only rootfs 会遇到运行时写入和 Chromium crashpad 问题。
  - 不要把整个 `/home/appuser/.cache` 挂 tmpfs，否则会覆盖镜像内预装的 Playwright Chromium。
  - 当前部署保留非 root、cap drop、no-new-privileges、pids limit、无 host port、Caddy TLS 和 Bearer Auth。
