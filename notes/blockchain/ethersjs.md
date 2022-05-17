---
title: ethersjs
---

# ethersjs

- BN.js
- [ethers.js: Human-Readable Contract ABIs](https://blog.ricmoo.com/human-readable-contract-abis-in-ethers-js-141902f4d917)

```ts
// MetaMask
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Web3Provider({request,sendAsync,send})
// WebSocketProvider
// StaticJsonRpcProvider - 避免 chainId 修改的影响
// EtherscanProvider - homestead, ropsten, rinkeby, goerli, kovan
// InfuraProvider
// AlchemyProvider
// CloudflareProvider - homestead
// PocketProvider
// AnkrProvider - homestead, matic, arbitrum
// FallbackProvider - 支持多个 Provider
// IpcProvider
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545', { chainId: '1337', name: 'dev' });
```

```ts
let ecr20 = [
  `function name() view returns (string)`,
  `function symbol() view returns (string)`,
  `function decimals() view returns (uint8)`,
  `function totalSupply() view returns (uint256)`,
  'function balanceOf(address owner) view returns (uint)',
  'function transfer(address to, uint256 value) returns (bool success)',
  'function transferFrom(address from, address to, uint256 value) returns (bool success)',
  'function approve(address spender, uint256 value) returns (bool success)',
  'function allowance(address owner, address spender)  view returns (uint256 remaining)',

  'event Transfer(address indexed from, address indexed to, uint256 _value)',
  'event Approval(address indexed owner, address indexed spender, uint256 _value)',
];
let ecr165 = ['function supportsInterface(interfaceId bytes4) view returns (bool)'];
let ecr1820registry = [
  'function getInterfaceImplementer(address addr, bytes32 interfaceHash) view returns (address)',
  'function setInterfaceImplementer(address addr, bytes32 interfaceHash, address implementer)',
  'function setManager(address addr, address newManager)',
  'function getManager(address addr) view returns(address)',
  'function interfaceHash(string calldata interfaceName) pure returns(bytes32)',
];
let ecr1820implementer = [
  'function canImplementInterfaceForAddress(bytes32 interfaceHash, address addr) view returns(bytes32)',
];

// ropsten usdc
let contract = new ethers.Contract('0x07865c6E87B9F70255377e024ace6630C1Eaa37F', [...ecr20, ...ecr165], signer);

// 0x01ffc9a7
let interfaceId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('supportsInterface(bytes4)')).substring(0, 10);
let interfaceId = ethers.utils.id('supportsInterface(bytes4)')
contract.supportsInterface(interfaceId);

new ethers.utils.Interface(ecr165).format(ethers.utils.FormatTypes.minimal);
// balanceOf
ethers.utils.formatUnits(await contract.balanceOf(await signer.getAddress()), await contract.decimals());
```

```js
// abi - json,human readable
let iface =  new ethers.utils.Interface(abi);
iface.format(ethers.utils.FormatTypes.full);
iface.format(ethers.utils.FormatTypes.minimal);
iface.format(ethers.utils.FormatTypes.json);

ethers.utils.formatEther(value)
// 默认 ether
ethers.utils.formatUnits(value, "ether").
```

```ts
interface ECR20 {
  name(): Promise<string>;

  symbol(): Promise<string>;

  decimals(): Promise<number>;

  balanceOf(address: string): Promise<ethers.BigNumber>;
}

interface ECR165 {
  supportsInterface(interfaceId: any);
}
```

| Name   | Decimals |
| ------ | -------- |
| wei    | 0        |
| kwei   | 3        |
| mwei   | 6        |
| gwei   | 9        |
| szabo  | 12       |
| finney | 15       |
| ether  | 18       |
