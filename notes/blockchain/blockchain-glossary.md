---
tags:

- Glossary

---

# Blockchain Glossary

| abbr. | stand for                             | mean                        |
| ----- | ------------------------------------- | --------------------------- |
| [DAO] | Decentralized Autonomous Organization | 去中心化自治组织            |
| DAC   | Decentralized Autonomous Corporation  | DAO                         |
| DeFi  | Decentralized finance                 | 去中心化金融                |
| MVS   | Metaverse                             | 元宇宙                      |
| EVM   | Ethereum virtual machine              |
| NFT   | Non-fungible tokens                   | 非同质化代币                |
| ICO   | initial coin offering                 | 首次代币发行                |
| IPO   | Initial Public Offering               | 证券 首次公开募股           |
| PoW   | Proof of Work                         |
| PoS   | Proof of Stake                        | 持有量证明,权益证明         |
| DPoS  | Delegated Proof of Stake              | 代理持有量证明,代理权益证明 |
| APR   | Annual Reward %                       |
| EOA   | externally owned account              |
| PFP   | Profile Picture                       | NFT Avatar                  |
| FOMO  | The Fear of Missing Out               |
| IYKYK | If you know, you know                 |
| DYOR  | Do Your Own Research                  |
| NFA   | Not Financial Advice                  |

| en                 | stand for                             |
| ------------------ | ------------------------------------- |
| Swap               | 不同货币互换                          |
| Stablecoin         | 稳定币                                |
| Mixer              | 混币器 - 掩饰资金流向                 |
| Slippage tolerance | 滑点容许范围 - 货币转换的手续费百分比 |
| Wrapped Token      |
| Floor Price        | 最低价                                |
| 10k Project        | 10,000 不同 NFT                       |
| Mint               | 铸造                                  |
| Burn               | 销毁                                  |
| Airdrop            |
| Liquidity          | 流动性                                |
| Derivatives        | 衍生物                                |

| Unit   | Decimals | Value                    |
| ------ | -------- | ------------------------ |
| wei    | 1        | 1                        |
| kwei   | 3        | 1000                     |
| mwei   | 6        | 1000,000                 |
| gwei   | 9        | 1000,000,000             |
| szabo  | 12       | 1000,000,000,000         |
| finney | 15       | 1000,000,000,000,000     |
| ether  | 18       | 1000,000,000,000,000,000 |

[dao]: https://en.wikipedia.org/wiki/Decentralized_autonomous_organization

- 原币 vs. 法币 - Token vs. 法定货币
- Non-fungible - 非同质 - 不可互换
- off-chain protocols
- sidechains - https://blockstream.com/sidechains.pdf
- rollups - https://github.com/barryWhiteHat/roll_up

---

- https://blog.infura.io/offchain-protocols-sidechains-and-rollups/

## Wrapped Token

- 质押 原币/资产/法币 ，产生新币 - Stablecoin 也算是 Wrapped Token
  - 质押后产生流动性
  - proof of reserves
- 使用 新 币就行交易
- Bridge 用于互换 原币 和 新币
- wBTC - 2019 - 把 BTC 带入 Ethereum
  - order-book 模式
  - https://wbtc.network/dashboard/order-book
- Ethereum 不是 ECR-20 币，WETH 是

## Stablecoin

:::tip

是一种 Wrapped Token - 被质押的是 法币

:::

- 中心化资产抵押发行的代币,与被抵押资产价值直接连动
- 价值与法币挂钩
- 风险低 - 与法币 1:1
  - 作为中间货币
- 手续费高 - 主要盈利途径
- 例如: USDT, USDC, DAI, Diem

## Proof

- Proof of Work
  - Pools -> Nodesn
  - 中心化、耗费能源
  - 节点之间竞争 - 谁最先找到
- Proof of Stake - ETH2
  - Validator - 随机选择
  - 成为 Validator 需要质押 Token - 质押越多，概率越高

| PoW                      | PoS              |
| ------------------------ | ---------------- |
| Minner                   | Validator        |
| 所有节点                 | 选中节点         |
| Minning                  | Minting, Forging |
| 51% Hashing Power Attack | 51% Stack Attack |

## 交易/经济学/Economics

- 交割合约
  - 交割日期 - 当周、次周、当季、次季
  - 到了时间无论盈亏都会交易
- 永续合约
  - 不到期
  - 一直持有
  - 自己平仓
- 买入做多
- 上升交易
- 卖出做空
- 下跌交易
- 稳定金保证合约 - 例如: 转换为 USDT
- 币本位保证合约 - 收益为标的币种
- 开仓、平仓
- 金本位
  - 贵金属货币制度
  - 每单位的货币价值等同于若干含重量的黄金
  - Gold Parity - 金平价 - 国家之间的汇率由它们各自货币的含金量之比值
