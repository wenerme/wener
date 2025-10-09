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
  - `price = sqrtRatioX96 ** 2 / 2 ** 192`
  - sqrtPriceX96=sqrtRatioX96
  - Q64.96 - 64 int bits, 96 fraction bits
    - uint160 = 64+96
    - [Q (number format)](<https://en.wikipedia.org/wiki/Q_(number_format)>)
- 参考
  - https://uniswap.org/whitepaper-v3.pdf
  - https://uniswap.org/
  - https://docs.uniswap.org/sdk/guides/fetching-prices
  - [Glossary](https://docs.uniswap.org/protocol/concepts/V3-overview/glossary)
    - AMM - Automated Market Making - 自动化做市
    - Asset - ERC-20, ERC-721
    - Concentrated Liquidity - 集中流动性
      - liquidity bounded within some price range
        - finite range a position
      - 以前 `𝑥 · 𝑦 = 𝑘` - k 固定
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
    - tickSpacing
    - CFMMs - Constant function market makers
    - fungible liquidity tokens
    - Non-Fungible Liquidity
    - Non-Compounding Fees
      - v1 & v2 的 fee 会进入流动池
    - Native Liquidity Tokens
    - TWAP - time-weighted average price
      - Uniswap v2
    - ticks
      - To implement custom liquidity provision, the space of possible prices is demarcated by discrete ticks.

## Uniswap v3 Contracts

- [Uniswap/v3-core](https://github.com/Uniswap/v3-core)
  - UniswapV3Factory is IUniswapV3Factory, UniswapV3PoolDeployer, NoDelegateCall
    - createPool - UniswapV3PoolDeployer.deploy
      - `tokenA+tokenB+fee` 唯一
      - fee - 500,3000,1000 -> tick spacing 10,60,200 - 0.05%, 0.30%, 1%
        - 小于 100_0000, 单位是 0.0001%
        - `1/N` - 4 <= N <= 10
    - enableFeeAmount - 启用新的费率
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

## Uniswap V1

- CPMMM - Constant Product Market Maker Model - 恒定乘积做市商模型

$x \times y = k$

- token0 x
- token1 y

k 恒定，即 k 值不变，为 constant，因此用 $\Delta x$ 买入 $\Delta y$ 为

$$
x \times y = ( x+ \Delta x) \times (y - \Delta y)
$$

价格恒定

$$
\frac x y = \frac {\Delta x} {\Delta y}
$$

交易后 reserve 的变化

$$
x' = x+\Delta x = (1+\alpha)x = \frac 1 {1-\beta} x
$$

$$
y' = y-\Delta y = (1+\alpha)y = \frac 1 {1-\beta} y
$$

$$
\alpha = \frac {\Delta x} x
$$

$$
\beta = \frac {\Delta y} y
$$

$$
\Delta x = \frac \beta {1-\beta} x
$$

$$
\Delta y = \frac \alpha {1+\alpha} y
$$

**考虑 Fee 的场景**

- fee $\rho$
- $\gamma = 1 - \rho$

$$
\Delta x = \frac \beta {1 - \beta} \cdot \frac 1 \gamma \cdot x
$$

$$
\Delta y = \frac {\alpha \gamma} {1+ \alpha \gamma} \cdot y
$$

---

- addLiquidity - mint
  - deposit ether+token -> liquidity
  - ether 和 token 泛化为 token0 和 token1
  - $x:y:l$ = $x':y':l'$
  - $k=x \times y$ 增加
  - $l$ -> liquidity
- removeLiquidity - burn
- getInputPrice
  - $\Delta y = \frac {\alpha \gamma} {1+\alpha \gamma} y$
  - $\alpha = \frac {\delta x} x$
  - $\Delta x$ trade for $\Delta y$
  - $\rho=0.003$ 0.03%
    - $997 * \Delta x * y / (1000 * x + 997 * \Delta x)$
- getOutputPrice
  - $\rho=0.003$ 0.03%
    - $1000 *  x * \Delta y / (997 * (y - \Delta y)) + 1$

---

- 固定为 ether <-> token
- 2018-11
- [Uniswap/v1-contracts](https://github.com/Uniswap/v1-contracts)
- https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf
- https://docs.uniswap.org/protocol/V1/introduction

## Uniswap V2

- 核心逻辑同 V1
- 支持 ERC-20 pairs 而不是 ether <-> token
- Flash Swap
- Protocol fee
- [Uniswap/v2-core](https://github.com/Uniswap/v2-core)
- https://uniswap.org/whitepaper.pdf
- https://docs.uniswap.org/protocol/V2/introduction
- 0.30% fee
  - 0.25% lp
  - 0.05% protocol - 1/6th
    - 变化 liquidity 时才回 collect

---

**合约**

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
  // 保留的最小流动性，Pool 不为空，不会除0
  uint public constant MINIMUM_LIQUIDITY = 10**3;

  address public factory;
  address public token0;
  address public token1;

  // 三个变量使用一个 storage - 112+112+32 = 256
  uint112 private reserve0;
  uint112 private reserve1;
  uint32 private blockTimestampLast; // 上次 swap 时间，跟踪交易变化

  uint256 public price0CumulativeLast; // used to calculate the average exchange rate over a period of time
  uint256 public price1CumulativeLast;
  uint256 public kLast; // 上次的 k 值, reserve0*reserve1 - 在 liquidity 变化时变化

  function _update(
    uint256 balance0,
    uint256 balance1,
    uint112 _reserve0,
    uint112 _reserve1
  ) private {
    uint32 blockTimestamp = uint32(block.timestamp % 2**32);
    uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
    // 不是第一次
    if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
      // * never overflows, and + overflow is desired
      price0CumulativeLast += uint256(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
      price1CumulativeLast += uint256(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
    }
    reserve0 = uint112(balance0);
    reserve1 = uint112(balance1);
    blockTimestampLast = blockTimestamp;
    emit Sync(reserve0, reserve1);
  }
}

```

- Pool 的价值需要 LP 维护
  - 错误的提供 流动性会导致丢失价值
  - _mintFee 维护价值
- 考虑到 fee
  - token0 -> token1, 扣除 token0 fee, 换到的 token1 比预期小
  - 导致 token1/token0 会越来越大
  - kLast 也会慢慢变大 - 因为 fee 进入流动
- [UNISWAP-V2 CONTRACT WALK-THROUGH](https://ethereum.org/sw/developers/tutorials/uniswap-v2-annotated-code/)

## Uniswap V3

**全局状态**

| type    | var                  | notion    | eq                                                  |
| ------- | -------------------- | --------- | --------------------------------------------------- |
| uint128 | liquity              | $L$       | $L = \sqrt{xy}$                                     |
| uint160 | sqrtPriceX96         | $\sqrt P$ | $\sqrt P = \sqrt{\frac yx}$                         |
| int24   | tick                 | $i_c$     | $i_c = \lfloor log_{\sqrt 1.0001}{\sqrt P} \rfloor$ |
| uint256 | feeGrowthGlobal0X128 | $f_{g,0}$ |
| uint256 | feeGrowthGlobal1X128 | $f_{g,1}$ |
| uint128 | protocolFees.token0  | $f_{p,0}$ |
| uint128 | protocolFees.token1  | $f_{p,1}$ |

- x,y - virtual reserves
- $L$ 可认为是 virtual liquidity token
- fee - 𝛾 - 0.0001%
- protocol fee - 𝜙
  - 允许值 0, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9, 1/10
- feeGrowthGlobal - total amount of fees that have been earned per unit of virtual liquidity
- protocolFees - total accumulated uncollected protocol fee in each token
  - 调用 collectProtocol 收集

$$
x=\frac{L}{\sqrt{P}}
$$

$$
y=L \cdot \sqrt{P}
$$

$$
L=\frac{\Delta y}{\Delta \sqrt P}
$$

- liquidity can be thought of as the amount that token1 reserves (either actual or virtual) changes for a given change in √𝑃

**单 Tick 内 Swap 的计算公式**

$$
\Delta{f_{g,1}}=y_{in} \cdot \gamma \cdot (1- \phi)
$$

$$
\Delta{f_{p,1}}=y_{in} \cdot \gamma \cdot \phi
$$

$$
\Delta y = y_{in} \cdot (1 - \gamma)
$$

- swap 时 feeGrowthGlobal1 和 protocolFees1 的变化
- $y_{in}$ swap 的量

$$
x_{end} = \frac{x \cdot y}{y + \Delta y}
$$

$$
\Delta \sqrt P  = \frac{\Delta y}{L}
$$

$$
\Delta y = \Delta \sqrt P \cdot L
$$

$$
\Delta \frac 1 {\sqrt P} = \frac{\Delta x} L
$$

$$
\Delta x = \Delta \frac 1 {\sqrt P} \cdot L
$$

**Tick 索引状态**

| type    | var                            | notion     |
| ------- | ------------------------------ | ---------- |
| int128  | liquidityNet                   | $\Delta L$ |
| uint128 | liquidityGross                 | $L_g$      |
| uint256 | feeGrowthOutside0X128          | $f_{o,0}$  |
| uint256 | feeGrowthOutside1X128          | $f_{o,1}$  |
| uint256 | secondsOutside                 | $s_o$      |
| uint256 | tickCumulativeOutside          | $i_o$      |
| uint256 | secondsPerLiquidityOutsideX128 | $s_lo$     |

- tick 主要跟踪 $\Delta L$
- feeGrowthOutside - how many fees were accumulated within a given range

- fee above tick $f_a$
- fee below tick $f_b$

$$
f_a(i)=
\begin{cases}
f_g - f_o(i) & i_c \geq i \\
f_o(i) & i_c < i
\end{cases}
$$

$$
f_b(i)=
\begin{cases}
f_o(i) & i_c \geq i \\
f_g - f_o(i) & i_c < i
\end{cases}
$$

- total amount of cumulative fees per share $f_r$
- upper, lower tick $i_l$, $i_u$

$$
f_r = f_g - f_b(i_l) - f_a(i_u)
$$

$$
f_o := f_g - f_o(i)
$$

$$
f_o :=
\begin{cases}
f_g & i_c \geq i
0 & i_c < i
\end{cases}
$$

**Position-Indexed State**

| type                             | var           | notion |
| -------------------------------- | ------------- | ------ |
| uint128 liquidity                | $l$           |
| uint256 feeGrowthInside0LastX128 | $f_{r,0}(t0)$ |
| uint256 feeGrowthInside1LastX128 | $f_{r,1}(t0)$ |

- https://uniswap.org/whitepaper-v3.pdf

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

- stablecoin-based AMM
  - Pool 实现 ERC20 - Native Liquidity Token
  - Uniswap v1 & v2
- [Uniswap V1 vs V2 vs V3](https://www.blockscribers.com/article/uniswap-v1-vs-v2-vs-v3/10/)

## ds-math-sub-underflow

- https://ethereum.stackexchange.com/q/97032/105916
