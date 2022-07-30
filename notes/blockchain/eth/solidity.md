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
  - [cyrusadkisson/solidity-baby-steps](https://github.com/cyrusadkisson/solidity-baby-steps)
  - https://www.stateofthedapps.com/
- 智能合约 - 投票、众筹、拍卖、货币、NTF、DAO

```bash
# NPM
npm install -g solc

# solc by docker
docker run --rm -it ethereum/solc:stable solc --version
docker run --rm -it -v $PWD:/src ethereum/solc:stable -o /src/output --abi --bin /src/Contract.sol

# brew
brew install ethereum/ethereum/solidity
```

- solc
  - `npm install -g solc`
  - `docker run ethereum/solc:stable`
  - https://binaries.soliditylang.org/
    - [ethereum/solc-bin](https://github.com/ethereum/solc-bin)
- remix online
  - https://github.com/ethereum/remix-live
  - https://remix.ethereum.org/

## Syntax

| unit  | value |
| ----- | ----- |
| wei   | 1     |
| gwei  | 1e9   |
| ether | 1e18  |

- 时间单位 seconds, minutes, hours, days, weeks
- `block`
  - basefee, chainid, coinbase, difficulty, gaslimit, number, timestamp
- `gasleft() returns (uint256)`
- `blockhash(uint blockNumber) returns (bytes32)`
- `msg`
  - data, sender, sig, value
- `tx`
  - gasprice, origin
- `abi`
  - decode, encode, encodePacked, encodeWithSelector, encodeWithSignature, encodeCall
- error
  - assert, require, revert
- math
  - addmod, mulmod, keccak256, sha256, ripemd160, ecrecover
- `this` - 当前合约地址
- `selfdestruct(address payable recipient)` - 销毁合约
- `type(xyz)`
  - name, creationCode, runtimeCode, interfaceId, min, max

---

- pragma
- import
- contract
- library
- interface
- 类型
  - bool - `!,&&,||,==,!=`
  - uint,int - `<=,<,==,!=,>=,>`, `&,|,^,~`, `<<,>>`, `+,-.*./,%,**`
    - `type(int).{min,max}` 类型最大最小值
    - 8,16,24,32,64,128,160,256
    - 8-256, step 8
    - uint,int -> uint256, int256
  - fixed, ufixed - MxN - `M.N` - 8 < M < 256, 0 < N < 80
  - address, address payable
    - bytes20, uint160
    - `<address>`
      - balance, code, codehash, call, delegatecall, staticcall
    - `<address payable>`
      - transfer
      - send
  - bytesN - 1 < N < 32
  - bytes - 动态数组
  - string - 数组
  - enum
  - valute type - `type UFixed256x18 is uint256`
  - modifier
    - pure,view,payable,immutable,anonymous,indexed,virtual,override
  - event
    - anonymous - 不存储事件签名作为 topic
    - indexed - 存储参数作为 topic
  - function
    - pure - 不能访问 state
    - view - 不能修改 state
    - payable - 可接受 ether
    - virtual - 可修改
    - override
    - 可见性
      - public, private, external, internal
    - `<function>`
      - address
      - selector
  - contract - 类似 class
  - 引用
    - `memory`, `storage`, `calldata`
  - mapping - 类似 map
    - key 使用 `keccak256` 计算 - 不存储 key 值
    - 没有长度，不能遍历
  - struct
  - `delete xyz` - 设置为初始值，可 删除数组/mapping 元素
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
- https://docs.soliditylang.org/en/latest/types.html
- https://docs.soliditylang.org/en/latest/units-and-global-variables.html

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
