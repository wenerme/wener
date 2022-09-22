---
title: PartySwap
---

# PartySwap

- https://app.partyswap.io/
- 使用 PARTY Token 作为奖励
- fee 0.03
- Uniswap V2 合约
- 参考
  - [PartySwapDEX/party-swap-core](https://github.com/PartySwapDEX/party-swap-core)
  - [PartySwapDEX/party-swap-periphery](https://github.com/PartySwapDEX/party-swap-periphery)
  - https://partyswap.gitbook.io/partyswap/
  - [Meet $PARTY: Our new token name!](https://partyswap.io/news/meet-party-our-new-token-name)

**Token**

```yaml
Contract Address: 0x25afD99fcB474D7C336A2971F26966da652a92bc
TotalSupply: 110,000,000
Decimal: 18
Name: PARTY V2
Symbol: PARTY
```

**Contracts**

```yaml
$PARTY Token: 0x69A61f38Df59CBB51962E69C54D39184E21C27Ec
Factory: 0x58A08bc28f3E8dab8Fb2773D8f243bC740398b09
Periphery: 0xff164Ede3E7C375E8764E9e3a22D3E35F780EEBC
Piñatas Treasury Vester: 0xe193DeEC5FcA8D8cF4f9208599C569EaE4e57243
Piñatas Liquidity Manager: 0x5a04d600B6a5B2D89946e839A9Af2f8BE11A1955
```

**Testnet Contracts**

- Factory [0x79d0b125cea315aab0bb1bc2322287d3ebb88e47](https://testnet.snowtrace.io/address/0x79d0b125cea315aab0bb1bc2322287d3ebb88e47)
- Periphery [0x3705aBF712ccD4fc56Ee76f0BD3009FD4013ad75](https://testnet.snowtrace.io/address/0x3705aBF712ccD4fc56Ee76f0BD3009FD4013ad75)

```solidity
interface IPartyFactory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint) external view returns (address pair);
    function allPairsLength() external view returns (uint);

    function createPair(address tokenA, address tokenB) external returns (address pair);

    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}
```

- createPair
  - PairCreated - token0, token1, pair, allPairs.length

## Liquidity
