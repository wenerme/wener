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
