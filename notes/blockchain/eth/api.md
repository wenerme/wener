---
title: API
---

# API

## OKX

- https://www.okx.com/docs-v5/en/
- https://www.okx.com/
- 产品类型
  - MARGIN：币币杠杆
  - SWAP：永续合约
  - FUTURES：交割合约
  - OPTION：期权

**单个产品行情信息**

- 20/2s

```http
GET https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT-SWAP
```

**获取指数行情**

- 20/2s

```http
GET https://www.okx.com/api/v5/market/index-tickers?instId=BTC-USDT
```

**法币汇率**

```http
GET https://www.okx.com/api/v5/market/exchange-rate
```

- usd -> cny

## Binance

- https://binance-docs.github.io/apidocs/spot/en/
  - https://www.binance.com/en/binance-api
- https://api.binance.com
  - https://api1.binance.com
  - https://api2.binance.com
  - https://api3.binance.com

```http
### 全部价格
GET https://api.binance.com/api/v3/ticker/price
### 单个 Symbol 价格
GET https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDC
### 多个 Symbols 价格
GET https://api.binance.com/api/v3/ticker/price?symbols=["ETHUSDC","ETHUSDT"]
```
