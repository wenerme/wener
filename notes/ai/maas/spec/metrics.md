---
title: MaaS Metrics
---

# MaaS Metrics

MaaS Metrics 用于观测模型 API 的请求量、延迟、错误、用量、成本、缓存、流式和工具调用行为。指标设计应避免高基数 label，同时保留足够维度支持排障、SLO 和账单核对。

## 指标分类

| 类别 | 关注点 |
| --- | --- |
| Traffic | 请求量、RPM、并发、流式连接数 |
| Latency | 首 token 延迟、总耗时、上游耗时、排队耗时 |
| Error | HTTP status、Provider error、timeout、abort |
| Usage | input/output/reasoning/cache token |
| Cost | 估算成本、账单成本、按模型/租户聚合 |
| Cache | cache hit、cache read/write token、命中率 |
| Tool | tool call 次数、失败率、server tool use |
| Streaming | chunk 数、TTFT、stream duration、abort rate |
| Routing | provider/model 路由、fallback、retry |

## 推荐指标

### Request

| metric | type | 说明 |
| --- | --- | --- |
| `requests_total` | counter | 请求总数 |
| `request_duration_seconds` | histogram | 请求总耗时 |
| `inflight_requests` | gauge | 当前进行中的请求数 |
| `retries_total` | counter | retry 次数 |
| `fallbacks_total` | counter | fallback 次数 |
| `aborts_total` | counter | 客户端中断 / cancel / 499 次数 |

### Streaming

| metric | type | 说明 |
| --- | --- | --- |
| `streams_total` | counter | 流式请求数 |
| `stream_duration_seconds` | histogram | stream 持续时间 |
| `stream_chunks_total` | counter | stream chunk 数 |
| `time_to_first_token_seconds` | histogram | TTFT，首 token 延迟 |
| `stream_aborts_total` | counter | stream 中断数 |
| `stream_missing_usage_total` | counter | stream 完成但 usage 缺失次数 |

### Usage

| metric | type | 说明 |
| --- | --- | --- |
| `input_tokens_total` | counter | 输入 token |
| `output_tokens_total` | counter | 输出 token |
| `total_tokens_total` | counter | 总 token |
| `reasoning_tokens_total` | counter | reasoning / thinking token |
| `cached_tokens_total` | counter | cache token 总量 |
| `cache_read_tokens_total` | counter | cache read token |
| `cache_write_tokens_total` | counter | cache write token |
| `estimated_tokens_total` | counter | 估算 token，用于 usage 缺失或中断场景 |
| `missing_usage_total` | counter | usage 缺失次数 |

### Cost

| metric | type | 说明 |
| --- | --- | --- |
| `cost_estimated_total` | counter | 估算成本 |
| `cost_billed_total` | counter | 账单确认成本，如果系统有账单回填 |
| `unit_price` | gauge | 当前单价，需谨慎控制 label 基数 |

### Error

| metric | type | 说明 |
| --- | --- | --- |
| `errors_total` | counter | 错误总数 |
| `provider_errors_total` | counter | Provider 返回错误 |
| `timeouts_total` | counter | 超时次数 |
| `rate_limited_total` | counter | 429 / rate limit 次数 |
| `context_exceeded_total` | counter | context length exceeded 次数 |
| `content_filtered_total` | counter | safety / moderation / content filter 次数 |

### Tool

| metric | type | 说明 |
| --- | --- | --- |
| `tool_calls_total` | counter | tool call 次数 |
| `tool_call_duration_seconds` | histogram | tool call 耗时 |
| `tool_call_errors_total` | counter | tool call 失败次数 |
| `server_tool_requests_total` | counter | server-side tool use，例如 web search |

## 推荐 label

| label | 说明 | 注意 |
| --- | --- | --- |
| `provider` | OpenAI、Anthropic、Google、xAI 等 | 低基数 |
| `model` | 模型名 | 中等基数，建议规范化 |
| `endpoint` | API 类型，例如 `chat.completions`、`responses`、`messages`、`generateContent` | 低基数 |
| `stream` | 是否流式 | `true` / `false` |
| `status` | HTTP status 或归一化状态 | 低基数 |
| `error_type` | 归一化错误类型 | 避免直接放原始错误文本 |
| `finish_reason` | 完成原因 | 低基数 |
| `cache_status` | `hit`、`miss`、`write`、`none` | 低基数 |
| `estimated` | usage 是否估算 | `true` / `false` |
| `retry` | 是否 retry 后请求 | 可选 |
| `fallback` | 是否 fallback 后请求 | 可选 |
| `tenant_tier` | 客户等级 / 套餐等级 | 避免直接使用 tenant_id |
| `region` | 服务区域 | 低基数 |

不建议作为 metric label：

- `user_id`
- `request_id`
- `trace_id`
- `session_id`
- `conversation_id`
- 原始 prompt、错误文本、URL query
- 原始 tool arguments

这些字段适合放在 log / trace 中，通过 exemplars 或 trace/log correlation 关联。

## Dashboard

### Overview

- RPM / request count
- Error rate
- P50 / P95 / P99 latency
- TTFT P50 / P95 / P99
- input/output/total TPM
- estimated usage rate
- missing usage rate
- abort rate

### Provider / Model

- 按 provider / model 拆分请求量
- 按 provider / model 拆分错误率
- 按 provider / model 拆分延迟
- 按 provider / model 拆分 token 消耗
- fallback / retry 次数

### Usage / Cost

- input tokens / output tokens / reasoning tokens
- cache read/write tokens
- cache hit token ratio
- cost per provider / model / endpoint
- tokens per request 分布
- reasoning tokens per request 分布

### Streaming

- TTFT
- stream duration
- chunks per stream
- stream abort rate
- stream missing usage rate

### Tool Use

- tool calls per request
- tool call error rate
- server tool use count
- tool latency

## 告警建议

| 告警 | 条件示例 |
| --- | --- |
| 错误率升高 | `error_rate > 5% for 5m` |
| 延迟升高 | `p95_latency > baseline * 2 for 10m` |
| TTFT 升高 | `p95_ttft > threshold for 10m` |
| 429 增加 | `rate_limited_rate > threshold for 5m` |
| usage 缺失升高 | `missing_usage_rate > 1% for 10m` |
| 中断率升高 | `abort_rate > baseline * 2 for 10m` |
| token 异常增长 | `total_tpm > baseline + 3sigma` |
| cache 命中下降 | `cache_hit_ratio drop > 30% for 30m` |
| fallback 激增 | `fallback_rate > threshold for 5m` |

## PromQL 示例

```promql
# RPM
sum(rate(requests_total[1m])) * 60

# Error rate
sum(rate(errors_total[5m])) / sum(rate(requests_total[5m]))

# P95 latency
histogram_quantile(0.95, sum by (le) (rate(request_duration_seconds_bucket[5m])))

# P95 TTFT
histogram_quantile(0.95, sum by (le) (rate(time_to_first_token_seconds_bucket[5m])))

# total TPM
sum(rate(total_tokens_total[1m])) * 60

# cache hit token ratio
sum(rate(cache_read_tokens_total[5m])) / sum(rate(input_tokens_total[5m]))

# missing usage rate
sum(rate(missing_usage_total[5m])) / sum(rate(requests_total[5m]))
```

## 设计建议

- Counter 用于请求、token、错误、成本累计；Histogram 用于耗时和 token per request 分布。
- 成本类指标要明确币种、单价版本和是否估算。
- Provider 原始 usage 应进入 log / trace / event，不建议完整放入 metric label。
- Metric label 只保留低基数维度，高基数排障使用 trace/log。
- Usage 精确值和估算值必须可区分，避免账单和统计混用。
- 对 streaming 请求单独观测 TTFT、duration、abort、missing usage。

## 相关

- [usage](./usage.md)
- [sse](./sse.md)
- [cache](./cache.md)
