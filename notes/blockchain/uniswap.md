---
title: uniswap
---

# uniswap

- [Uniswap Contract Deployments](https://docs.uniswap.org/protocol/reference/deployments)
- Automated Market Making (AMM) protocol
- [info.uniswap.org](https://info.uniswap.org)
- API
  - https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v2
    - [Uniswap/uniswap-v2-subgraph](https://github.com/Uniswap/uniswap-v2-subgraph)
  - https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3
  - https://thegraph.com/hosted-service/subgraph/ianlapham/uniswap-v3-rinkeby
- `sqrtPriceX96 = sqrt(price) * 2 ** 96`
- Q64.96 - 64 int bits, 96 fraction bits
  - [Q (number format)](<https://en.wikipedia.org/wiki/Q_(number_format)>)
- [Uniswap/v3-core](https://github.com/Uniswap/v3-core)
  - UniswapV3Factory is IUniswapV3Factory, UniswapV3PoolDeployer, NoDelegateCall
    - 默认 feeAmountTickSpacing - 500,10; 3000,60; 10000,200
    - createPool - UniswapV3PoolDeployer.deploy
    - enableFeeAmount
  - UniswapV3PoolDeployer
    - function deploy(address factory, address token0, address token1, uint24 fee, int24 tickSpacing ) internal returns (address pool)
  - UniswapV3Pool
    - swap
- [Uniswap/v3-staker](https://github.com/Uniswap/v3-staker)
  - UniswapV3Staker
    - stakes(uint256 tokenId, bytes32 incentiveId)
    - createIncentive(IncentiveKey memory key, uint256 reward)
    - endIncentive(IncentiveKey memory key) external override returns (uint256 refund)
    - transferDeposit(uint256 tokenId, address to)
    - withdrawToken
    - stakeToken
    - unstakeToken
    - claimReward
    - getRewardInfo
    - onERC721Received
- [Uniswap/v3-periphery](https://github.com/Uniswap/v3-periphery)
  - 高阶合约
  - SwapRouter
    - exactInputSingle
    - exactInput
    - exactOutputSingle
    - exactOutput
  - NonfungiblePositionManager
    - positions(uint256 tokenId)
    - mint(MintParams calldata params)

:::info

- [Deploy Uniswap V3 to Polygon PoS Chain](https://gov.uniswap.org/t/deploy-uniswap-v3-to-polygon-pos-chain/15058)

:::

```solidity
// details about the uniswap position
struct Position {
    // the nonce for permits
    uint96 nonce;
    // the address that is approved for spending this token
    address operator;
    // the ID of the pool with which this token is connected
    uint80 poolId;
    // the tick range of the position
    int24 tickLower;
    int24 tickUpper;
    // the liquidity of the position
    uint128 liquidity;
    // the fee growth of the aggregate position as of the last action on the individual position
    uint256 feeGrowthInside0LastX128;
    uint256 feeGrowthInside1LastX128;
    // how many uncollected tokens are owed to the position, as of the last computation
    uint128 tokensOwed0;
    uint128 tokensOwed1;
}
```

## Uniswap V1 vs V2 vs V3

- Uniswap V1 - Ethereum Mainnet - Nov 2, 2018
  - 在这之前只有 EtherDelta - DEX 传统的 order-book model - 没有 liquidity 和 poor
  - 只支持 ETH-ERC20 - ETH 桥为缺点 - 成本高昂
    - 例如: DAI->USDC 实际为 DAI->ETH->USDC
  - Liquidity Providers/LP token 大约 0.3% 报酬
- Uniswap V2 - May 2020
  - 支持 ERC20-ERC20
  - 核心使用 wrapped ETH
  - 不用 Flash Swap 则先付费 Buyer - ETH 0.3% -> DAI/ETH -> DAI
  - Flash Swap 后付费
    - Buyer -> DAI/ETH -> DAI -> 使用 -> 返回 -> ETH/DAI 0.3%
  - protocol fee - 0.05% of 0.3%
- Uniswap V3 - May 5, 2021
  - 替代 stablecoin-based AMM
  - Liquidity is active
  - Flexible fee
    - Uniswap v1 0.3% -> LP
    - Uniswap v2 0.05% of 0.3% -> Uniswap
    - Uniswap v3
      - Stablecoins 0.05%
      - non-correlated pools like ETH/DAI incurs a fee of 0.3%
      - 1.00% for the non-correlated pairs

---

- [Uniswap V1 vs V2 vs V3](https://www.blockscribers.com/article/uniswap-v1-vs-v2-vs-v3/10/)
