---
title: solidity
---

# solidity

- [ethereum/solidity](https://github.com/ethereum/solidity)
- .sol
- 参考
  - https://binaries.soliditylang.org/
  - wikipedia [Solidity](https://en.wikipedia.org/wiki/Solidity)
  - 开发: ganache, hardhat, solcjs
  - [niftymints/contract-interface](https://github.com/niftymints/contract-interface)
  - [Solidity by Example](https://docs.soliditylang.org/en/develop/solidity-by-example.html)
- 智能合约 - 投票、众筹、拍卖、货币、NTF

```bash
# NPM
npm install -g solc

#
docker run --rm -it ethereum/solc:stable solc --version
docker run --rm -it -v $PWD:/src ethereum/solc:stable -o /src/output --abi --bin /src/Contract.sol

# brew
brew tap ethereum/ethereum
brew install solidity
```

## Syntax

- pragma
- import
- contract
- library
- interface
- 类型
  - bool, int, uint, fixed, ufixed, address, address payable, enum
  - mapping - 类似 map
  - struct
- 变量
  - 状态变量 - 位于 storage
  - 本地变量
  - 全局变量
- 函数 - private, public, external, internal, view, pure
  - 默认 public
  - external 不能自己调用，只能给外部调用
    - 推荐使用
  - internal - 类似 protected
  - view - 只读
  - pure - 不读也不写状态变量
  - 支持自定义 modifier - 支持接受参数
    - `_;` 表示原始代码

## Interfaces

- Ownable, CloneFactory, ECR20

```solidity
// EIP-1167
interface CloneFactory {
  function createClone(address target) internal returns (address result);

  function isClone(address target, address query) internal view returns (bool result);
}

```

# FAQ

## \_;

```solidity
modifier onlyOwner {
    if (msg.sender != owner) throw;
    _; // 原本的代码
}
```

例如

```solidity
function setValue(uint256 _val) onlyOwner {
  value = _val;
}

```

变成

```solidity
function setValue(uint256 _val) {
  if (msg.sender != owner) throw;
  value = _val;
}

```

- [Condition-Orientated Programming](https://gavofyork.medium.com/condition-orientated-programming-969f6ba0161a)

## Stack too deep when compiling inline assembly

EVM 只有 16 slots, 尝试将 storage 移到 memory

或者设置 optimizer

```ts
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        runs: 200,
        enabled: true,
      },
    },
  },
};
export default config;
```

## Type struct Moloch.Proposal is only valid in storage because it contains a (nested) mapping

struct 包含 mapping，不能使用 memory，使用 storage
