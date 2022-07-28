---
title: uniswap
---

# uniswap

- [Uniswap Contract Deployments](https://docs.uniswap.org/protocol/reference/deployments)
  - 已经部署的 Uniswap 地址
  - Ethereum mainnet, Optimism, Arbitrum, Polygon 的 Testnet 地址相同
- [info.uniswap.org](https://info.uniswap.org)
  - 流动池信息
- API
  - https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v2
    - [Uniswap/uniswap-v2-subgraph](https://github.com/Uniswap/uniswap-v2-subgraph)
  - https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3
  - https://thegraph.com/hosted-service/subgraph/ianlapham/uniswap-v3-rinkeby
- `sqrtPriceX96 = sqrt(price) * 2 ** 96`
  - Q64.96 - 64 int bits, 96 fraction bits
    - [Q (number format)](<https://en.wikipedia.org/wiki/Q_(number_format)>)
- 参考
  - https://uniswap.org/
  - [Glossary](https://docs.uniswap.org/protocol/concepts/V3-overview/glossary)
    - AMM - Automated Market Making - 自动化做市
    - Asset - ERC-20, ERC-721
    - Concentrated Liquidity - 集中流动性
    - pro-rata - 按比例
    - Pool - 流动池
      - 在引入 多费用 选项之前叫 Pair
    - Position
      - 流动性 - upper tick, lower tick, amount
    - LP - liquidity provider
    - Protocol Fees - 协议抽成
    - Slippage - 实际交易数额 - 滑点数
    - Spot Price - 现货价格
    - Swap Fees - LP 抽成

## Contracts

- [Uniswap/v3-core](https://github.com/Uniswap/v3-core)
  - UniswapV3Factory is IUniswapV3Factory, UniswapV3PoolDeployer, NoDelegateCall
    - 默认 feeAmountTickSpacing - 500,10; 3000,60; 10000,200
    - createPool - UniswapV3PoolDeployer.deploy
    - enableFeeAmount
  - UniswapV3PoolDeployer
    - function deploy(address factory, address token0, address token1, uint24 fee, int24 tickSpacing ) internal returns (address pool)
  - UniswapV3Pool
    - swap

```solidity
/// Uniswap V3 工厂协议
/// 创建流动池，控制费用
interface IUniswapV3Factory {
  /// @notice Emitted when the owner of the factory is changed
  /// @param oldOwner The owner before the owner was changed
  /// @param newOwner The owner after the owner was changed
  event OwnerChanged(address indexed oldOwner, address indexed newOwner);

  /// @notice Emitted when a pool is created
  /// @param token0 The first token of the pool by address sort order
  /// @param token1 The second token of the pool by address sort order
  /// @param fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
  /// @param tickSpacing The minimum number of ticks between initialized ticks
  /// @param pool The address of the created pool
  event PoolCreated(
    address indexed token0,
    address indexed token1,
    uint24 indexed fee,
    int24 tickSpacing,
    address pool
  );

  /// @notice Emitted when a new fee amount is enabled for pool creation via the factory
  /// @param fee The enabled fee, denominated in hundredths of a bip
  /// @param tickSpacing The minimum number of ticks between initialized ticks for pools created with the given fee
  event FeeAmountEnabled(uint24 indexed fee, int24 indexed tickSpacing);

  /// @notice Returns the current owner of the factory
  /// @dev Can be changed by the current owner via setOwner
  /// @return The address of the factory owner
  function owner() external view returns (address);

  /// @notice Returns the tick spacing for a given fee amount, if enabled, or 0 if not enabled
  /// @dev A fee amount can never be removed, so this value should be hard coded or cached in the calling context
  /// @param fee The enabled fee, denominated in hundredths of a bip. Returns 0 in case of unenabled fee
  /// @return The tick spacing
  function feeAmountTickSpacing(uint24 fee) external view returns (int24);

  /// @notice Returns the pool address for a given pair of tokens and a fee, or address 0 if it does not exist
  /// @dev tokenA and tokenB may be passed in either token0/token1 or token1/token0 order
  /// @param tokenA The contract address of either token0 or token1
  /// @param tokenB The contract address of the other token
  /// @param fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
  /// @return pool The pool address
  function getPool(
    address tokenA,
    address tokenB,
    uint24 fee
  ) external view returns (address pool);

  /// @notice Creates a pool for the given two tokens and fee
  /// @param tokenA One of the two tokens in the desired pool
  /// @param tokenB The other of the two tokens in the desired pool
  /// @param fee The desired fee for the pool
  /// @dev tokenA and tokenB may be passed in either order: token0/token1 or token1/token0. tickSpacing is retrieved
  /// from the fee. The call will revert if the pool already exists, the fee is invalid, or the token arguments
  /// are invalid.
  /// @return pool The address of the newly created pool
  function createPool(
    address tokenA,
    address tokenB,
    uint24 fee
  ) external returns (address pool);

  /// @notice Updates the owner of the factory
  /// @dev Must be called by the current owner
  /// @param _owner The new owner of the factory
  function setOwner(address _owner) external;

  /// @notice Enables a fee amount with the given tickSpacing
  /// @dev Fee amounts may never be removed once enabled
  /// @param fee The fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6)
  /// @param tickSpacing The spacing between ticks to be enforced for all pools created with the given fee amount
  function enableFeeAmount(uint24 fee, int24 tickSpacing) external;
}

```

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

# FAQ

## Uniswap V1 vs V2 vs V3

- Uniswap V1 - Ethereum Mainnet - 2018-11-02
  - 在这之前只有 EtherDelta - DEX 传统的 order-book model - 没有 liquidity 和 poor
  - 只支持 ETH-ERC20 - ETH 桥为缺点 - 成本高昂
    - 例如: DAI->USDC 实际为 DAI->ETH->USDC
  - Liquidity Providers/LP token 大约 0.3% 报酬
- Uniswap V2 - 2020-05
  - 支持 ERC20-ERC20
  - 核心使用 wrapped ETH
  - 不用 Flash Swap 则先付费 Buyer - ETH 0.3% -> DAI/ETH -> DAI
  - Flash Swap 后付费
    - Buyer -> DAI/ETH -> DAI -> 使用 -> 返回 -> ETH/DAI 0.3%
  - protocol fee - 0.05% of 0.3%
- Uniswap V3 - 2021-05-05
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
