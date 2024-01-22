---
title: superfluid
---

# superfluid

- https://www.superfluid.finance/
- Super Token
  - ERC20 扩展
  - 三种类型
    - 包装器（Wrapper）代币，包装现有的 ERC20 代币；
    - 纯净（Pure）代币，仅作为 Super Tokens 存在；
    - 原生（Native）代币，包装像 Polygon 链上的 MATIC 这样的原生资产。
- Money Streaming/Constant Flow Agreement/CFA/资金流动/恒定流动协议
  - 用户可以设置一个恒定的资金流动速率，实现从发送方账户到接收方账户的秒级资金转移。
  - 这个过程是自动的，可以持续进行，直到发送方取消协议或他们的 Super Token 余额变为零。
  - CFA 适用于需要持续支付或订阅模式的场景，如薪资支付、租金或者连续性服务费用。
- Distributions/Instant Distribution Agreement /IDA
  - 一对多的方式快速、高效地分发代币。
  - 适用于需要大规模资金分配的场景，如分红、奖金分发等。
- @superfluid-finance/sdk-core

# FAQ

## Framework Initialization Error: You must input your own resolver address if you use an unsupported network.

- https://docs.superfluid.finance/superfluid/developers/sdk-core/sdk-core-initialization
