---
title: Swap
---

# Swap

- Swap - 货币互换
- Deposit - 货币质押 - 增加流动性
- Liquite - 流动性
  - A 币+B 币
- Borrow - 借
- Loan - 贷
- Flash Loan
- Payback - 偿还
- Stake - 持有货币，增加稳定性
- 跨链互换
- Native <-> ERC20 互换 - 早期的 Native Currency 不是 ERC20 不方便交易
- Reward fee
- Sliperage
- liquidation - 清算
- 滑点
  - 预设成交价位与真实成交价位的偏差
  - 交易额越大，滑点越大，交易者的损失就越大
- 无常损失
- CPMMM - Constant Product Market Maker Model - 恒定乘积做市商模型
- CFMMs - Constant function market makers
- Marginal exchange rate - 边际汇率
- DEX
- AMM
- MM - Market Maker - 做市商
- TWAPs - time-weighted average prices
- EMAs
- SMAs
- arbitrage - 套利

---

- LP/Liquidity Provider -Deposit-> Pool
  - +token0, +token1 -> share
  - reserve0, reserve1
  - liquidity shares
- Trader -Swap-> Pool
  - token0/token1 + fee -> token1/token0

---

- dx -> dy

$$
\begin{cases}
xy=k \\
(x+dx)(y-dy)=k
\end{cases}
$$

$$
dy = \frac {y \cdot dx} {x+dx}
$$

$$
dx/dy = \frac {x+dx} y
$$

$$
Slippage_{yPrice} = dx/dy - x/y = \frac {dx} y
$$

- dx 滑点就越大，偏离实际价位就越大
- 池中的资金储备越多、交易深度越大，则能尽量减少滑点的溢价，使用户的交易损耗降低
- Uniswap/sdk-core [computePriceImpact](https://github.com/Uniswap/sdk-core/blob/main/src/utils/computePriceImpact.ts)

$$
PriceImpact = \frac {midPrice \cdot dx - dy} {midPrice \cdot dx}
$$

- midPrice - x->y = y/x

$$
PriceImpact = \frac {dx} {x + dx}
$$

- http://k.sina.com.cn/article_6487081523_182a9023302000wdhg.html

## Dev

- TradeType
  - EXACT_INPUT
  - EXACT_OUTPUT
- [@uniswap/widgets](https://github.com/Uniswap/widgets)
  - GPLv3
- [@uniswap/sdk-core](https://github.com/Uniswap/sdk-core)
  - 定义了基本数学对象和 Token 模型
  - Price, Percent, Fraction, Token, CurrencyAmount, NativeCurrency
  - big.js
  - decimal.js-light
  - jsbi
  - [toformat](https://www.npmjs.com/package/toformat)
    - toFormat for big.js, decimal.js
  - 118kB/36kB - self 11.6kB
    - bn.js+jsbi+decimal.js-light+@ethersproject/bignumber+js-sha3
    - @ethersproject/bytes
    - ...
- [@uniswap/v2-sdk](https://github.com/Uniswap/v2-sdk)
  - Pair
  - Trade
  - Router
  - https://docs.uniswap.org/sdk/2.0.0/guides/quick-start
  - 移除了 Fetcher
    - @uniswap/sdk 还有
- mid price
  - https://docs.uniswap.org/sdk/2.0.0/guides/pricing
- execution price

```solidity
bytes memory bytecode = type(UniswapV2Pair).creationCode;
bytes32 salt = keccak256(abi.encodePacked(token0, token1));
assembly {
    pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
}
```

- `keccak256(0xff ++ address ++ salt ++ keccak256(init_code))[12:]`
  - 合约创建者的地址（address)
  - 作为参数的混淆值（salt）
  - 合约创建代码 (init_code)
- https://docs.openzeppelin.com/cli/2.8/deploying-with-create2
- https://ctf-wiki.org/blockchain/ethereum/attacks/create2/

## 参考

- [Uniswap-自动化代币做市协议](https://mirror.xyz/0xB96A958A82eCAbab9e7cF14ae538c38996f2C7B6/T_uMRq4awv37E7lRQKXQd6-pW4_y0JbkibNixgkqu_Y)
  - https://mirror.xyz/0xB96A958A82eCAbab9e7cF14ae538c38996f2C7B6
- https://ctf-wiki.org/blockchain/introduction/
