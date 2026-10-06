---
tags:
  - Billing
---

# Billing


- Billing / Invoice / Payment
- Usage + Metering + Rating + Pricing
- Metering
  - 原始 -> 聚合 + 拆分

```
Product / SKU
      │
      ├──── Price / Contract / Price Version
      │
      ▼
Raw Usage Event
      │
      ▼
Normalization
      │
      ▼
Metering
      │
      ▼
Billable Quantity
      │
      ▼
Rating  ← Price
      │
      ▼
Charge
      │
      ▼
Billing
      │
      ▼
Invoice
      │
      ▼
Payment
```

- 客户
- 供应商

```
UsageEvent {
  id

  // identity
  accountId
  requestId

  // what was consumed
  productId
  skuId

  // when
  eventTime
  receivedAt

  // measurements
  quantities: {
    requests: 1,
    input_tokens: 10000,
    cached_input_tokens: 8000,
    output_tokens: 2000
  }

  // dimensions
  dimensions: {
    model: "claude-sonnet-4.5",
    service_tier: "...",
    region: "...",
  }

  source
  sourceEventId
}
```


```
input_tokens
output_tokens
cache_read_tokens
cache_write_tokens
cache_write_5m_tokens
cache_write_30m_tokens
cache_write_1h_tokens

reasoning_tokens

-- 可生成或计算的 Token
uncached_input_tokens
total_tokens

image_tokens
audio_tokens
video_tokens

finish_reason

usage_type: openai,anthropic,grok

catalog_cost
est_cost
```
