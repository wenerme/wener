---
title: Billing FAQ
tags:
  - FAQ
---

# Billing FAQ

- [Billing](./README.md)
- [Glossary](./billing-glossary.md)

## Pricing 与 Rating 有什么区别

- Usage + Metering + Rating + Pricing
- Price 是“规则定义”，Rating 是“规则执行”。
  - Rating = Usage + Pricing Policy → Charge

## Charge 如何进入账单和收款流程

```text
Charge
   ↓
Credits
Commitment
Prepaid Balance
Discount
Adjustment
Minimum Spend
   ↓
Bill
   ↓
Invoice
   ↓
Accounts Receivable
   ↓
Payment
```

## Customer Rating 与 Provider Rating 有什么区别

```text
               Request
                  │
                  ▼
              Raw Usage
                  │
      ┌───────────┴───────────┐
      ▼                       ▼
Customer Rating         Provider Rating
      │                       │
      ▼                       ▼
 Sell Price               Buy Price
      │                       │
      ▼                       ▼
   Revenue                   Cost
     $10                      $7
      │                       │
      └───────────┬───────────┘
                  ▼
              Margin $3
```

## Usage 如何关联 Product、SKU 和 Price

```text
Product
   │
  SKU
   │
Price / Offer
   │
Price Component
   │
   ▼
Usage Event ────── Meter
│              │
└──────────────┘
│
Metering
│
Metered Quantity
│
Rating
│
Charge
```

```text
Usage
  ↓
Meter
  ↓
Price Components
  ↓
Rating
```

## SKU

```text
GPT-5.6
└── SKU: api-standard
    │
    ├── Input Price
    │   meter = input_tokens
    │   $1.25 / 1M
    │
    ├── Cached Input Price
    │   meter = cached_input_tokens
    │   $0.125 / 1M
    │
    └── Output Price
        meter = output_tokens
        $10 / 1M
```

## Price

```text
currency

unit
unit_size

pricing_model
  flat
  unit
  graduated
  volume
  package
  matrix

effective_from
effective_to

minimum
maximum

tiers

dimensions
```

## Rollup

- Meter 决定 Rollup Dimensions

```text
tenant/customer
provider
model
sku
service_tier
region
usage_type
time_bucket
```

```text
usage_rollup_hourly

customer_id
model_id
price_dimension
bucket_start

quantity
request_count
```

```text
Meter Definition
├─ metric
├─ aggregation
├─ filters
└─ group_by
```

- Late-arriving usage

```text
11:00 bucket

open
↓
provisional
↓
closed
↓
finalized
```
