---
tags:
  - Awesome
---

# Blockchain Awesome

- Wallet
  - MetaMask
  - WalletConnect
  - Coinbase
  - ImToken
  - TrustWallet
- https://coinmetrics.io/
- https://coinmarketcap.com/
- https://dune.com/

## Dev

- dev env
  - Hardhat
  - Ganache
  - Truffle
  - Foundry
- explorer
  - [blockscout/blockscout](https://github.com/blockscout/blockscout)
  - [wmitsuda/otterscan](https://github.com/wmitsuda/otterscan)
  - [tryethernal/ethernal](https://github.com/tryethernal/ethernal)
  - [bitquery/explorer](https://github.com/bitquery/explorer)
    - MIT, Ruby
- js client
  - [ethers.js](https://docs.ethers.io/v5/)
    - 针对 provider 有默认 apikey - https://docs.ethers.io/v5/api-keys/
  - [ChainSafe/web3.js](https://github.com/ChainSafe/web3.js)
  - @ethereumjs
  - @ethersproject
  - @nomiclabs
  - fortmatic
  - [web3react](https://github.com/NoahZinsmeister/web3-react)
  - window.ethereum
    - web3-compatible browsers - MetaMask
  - https://eips.ethereum.org/EIPS/eip-1474#error-codes
  - [WalletConnect/walletconnect-monorepo](https://github.com/WalletConnect/walletconnect-monorepo)
  - window.web3 - 废弃
- [dethcrypto/TypeChain](https://github.com/dethcrypto/TypeChain)
  - TypeScript bindings for Ethereum smart contracts
- connect
  - [onboard.js](https://github.com/blocknative/web3-onboard)
  - [Web3Modal/web3modal](https://github.com/Web3Modal/web3modal)
  - [safe-global/safe-apps-sdk](https://github.com/safe-global/safe-apps-sdk)
    - multi-signature contract wallet
    - https://dev.gnosis-safe.io/
    - https://docs.gnosis-safe.io/introduction/statistics-and-usage
    - safe-apps-web3modal
- React
  - [TrueFiEng/useDApp](https://github.com/TrueFiEng/useDApp)
  - [NoahZinsmeister/web3-react](https://github.com/NoahZinsmeister/web3-react)
- API
  - [graphprotocol/graph-node](https://github.com/graphprotocol/graph-node)
  - https://eth.wiki/json-rpc/API
  - https://stripe.com/zh-cn-hk/use-cases/crypto
  - https://api.coingecko.com/api/v3/simple/price
  - https://api.etherscan.io/api
  - https://sentinel.matic.network/api/v2/validators/metadata/totalStake
- Misc
  - [makerdao/multicall](https://github.com/makerdao/multicall)
  - [makerdao/awesome-makerdao](https://github.com/makerdao/awesome-makerdao)
- icon/logo
  - [tylim88/Crypto-Symbol](https://github.com/tylim88/Crypto-Symbol)
    - Name <-> Symbol
  - [coinwink/cryptocurrency-logos](https://github.com/coinwink/cryptocurrency-logos)
  - [spothq/cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons)
    - https://cryptoicons.co/
  - [ConsenSysMesh/rimble-icons](https://github.com/ConsenSysMesh/rimble-icons)
  - https://cryptologos.cc/

```ts
import {MetaMaskInpageProvider} from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
```

### web3js vs ethersjs

- [ethersjs](https://github.com/ethers-io/ethers.js/)
  - MIT
  - modules - Provider, Contract, utils, Wallet
- [web3js](https://github.com/ChainSafe/web3.js)
  - LGPL
  - window.web3 - metamask 已经不在注入 web3 [^](https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3)
    - 使用 window.ethereum
  - modules - eth, bzz, shh, utils, `*.net`

## 汇率

```bash
curl 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR'
curl 'https://api.coinbase.com/v2/exchange-rates?currency=ETH'

curl 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken'
```

---

- https://www.coingecko.com/api/docs/v3#/simple/get_simple_price
- https://coinmarketcap.com/api/documentation/v1/#operation/getV1ToolsPriceconversion
- https://www.cryptocompare.com/api/
- https://developers.coinbase.com/api/v2#exchange-rates
- https://api3.org/apis/ExchangeRate-API/Currency+Conversion+API
- https://www.app.unic.ly/#/discover

## Testnets

> [ChainList](./eth/chainlist.md)

| Hex  | Decimal | Symbol | Network | Proof               | RPC                                              | Explorer                      |
| ---- | ------- | ------ | ------- | ------------------- | ------------------------------------------------ | ----------------------------- |
| 0x3  | 3       | ROP    | Ropsten | PoW/ethash          | `https://ropsten.infura.io/v3/${INFURA_API_KEY}` |
| 0x4  | 4       | RIN    | Rinkeby | PoA/Clique          |                                                  | https://www.rinkeby.io/       |
| 0x5  | 5       | GOR    | Goerli  | PoA/Clique          |
| 0x2a | 42      | KOV    | Kovan   | PoA/authority round |
|      | 43113   | AVAX   | FUJI    |                     | https://api.avax-test.network/ext/bc/C/rpc       | https://testnet.snowtrace.io/ |

[faucet.metamask.io]: https://faucet.metamask.io

- rETH - rinkeby ETH
- Faucet
  - Ropsten - [faucet.metamask.io]
- Avalanche C-Chain

:::tip

- 可以在 https://app.compound.finance 换取其他币，方便测试多种币。
- etherscan.io 支持 ropsten, rinkeby, kovan, goerli

:::

**Ropsten**

- Ropsten 接近 mainnet
- ETH - https://faucet.metamask.io/
- LINK - https://ropsten.chain.link/
- Exploere
  - https://blockexplorer.one/ethereum/ropsten
  - https://ropsten.etherscan.io/

**Rinkeby**

- [ethereum/EIPs#225](https://github.com/ethereum/EIPs/issues/225)
- https://www.rinkeby.io/
- https://rinkebyfaucet.com/ - 0.1 ETH/24h/IP
- https://faucet.rinkeby.io/ - 需要社交验证

**Goerli**

- https://stats.goerli.net/
- [goerli/testnet](https://github.com/goerli/testnet)

---

- https://ethereum.stackexchange.com/a/30072

## 网络

> [ChainList](./chainlist.md)

| Hex  | Decimal | Symbol | Network                         | RPC                               | Explorer                 |
| ---- | ------- | ------ | ------------------------------- | --------------------------------- | ------------------------ |
| 0x1  | 1       | ETH    | Ethereum Main Network (Mainnet) |
| 0x38 | 56      | BNB    | Smart Chain                     | https://bsc-dataseed.binance.org/ | https://bscscan.com      |
|      | 137     | MATIC  | [Polygon]                       | https://polygon-rpc.com           | https://polygonscan.com/ |

- https://app.compound.finance/ - 换币
- palm mainnet, testnet
- aurora mainnet, testnet
- near mainnet, testnet
- polygon mainnet, mumbai
  - https://polygon.technology/
- arbitrum mainnet, rinkeby
- optimisim mainnet, kovan
  - Layer 2 Optimistic Rollup network
  - Fraud proof
- Zero Knowlogy
  - Validity proof
- https://ethereum.org/en/developers/docs/networks/
- Polygon
  - https://polygon-rpc.com
  - https://rpc-mainnet.maticvigil.com
  - https://rpc-mainnet.matic.network
  - https://rpc-mainnet.matic.quiknode.pro
- DAO
  - [blockchainsllc/DAO](https://github.com/blockchainsllc/DAO)
    - [oraclize.sol](https://github.com/blockchainsllc/DAO/blob/develop/libs/oraclize.sol)
  - Platform
    - https://otherside.xyz/explore
    - https://daohaus.club/
    - https://www.metacat.world/
    - https://enterdao.xyz/
- opensea
  - https://docs.opensea.io/docs/developer-tutorials
  - https://testnets.opensea.io/
    - Rinkeby
    - `https://testnets.opensea.io/assets/<asset_contract_address>/<token_id>`
    - `https://testnets-api.opensea.io/api/v1/asset/<your_contract_address>/<token_id>/?force_update=true`
  - Project Wyvern Exchange [0x7be8076f4ea4a4ad08075c2508e481d6c946d12b](https://etherscan.io/address/0x7be8076f4ea4a4ad08075c2508e481d6c946d12b)
- NFT
  - [trader-xyz/nft-swap-sdk](https://github.com/trader-xyz/nft-swap-sdk)
  - https://nft.storage/
  - https://www.pinata.cloud/
  - https://www.arweave.org/
  - Content Addressable aRchives https://ipld.io/specs/transport/car/carv1/
  - https://shapeshift.com/
  - https://fractional.art/
- liquidity
  - https://www.0x.org/docs/api
  - https://matcha.xyz/
- https://defisaver.com/
- https://rari.capital/
- https://prysm.xyz/
- https://zapper.fi/
- https://www.pokt.network/

[terra]: https://www.terra.money/
[centre]: https://www.centre.io/
[polygon]: https://polygon.technology/
[binance]: https://www.binance.com/

**rpc**

- https://cloudflare-ipfs.com/
  - https://developers.cloudflare.com/web3/ipfs-gateway/
- https://cloudflare-eth.com
  - https://developers.cloudflare.com/web3/ethereum-gateway/
- [ethereum/execution-apis](https://github.com/ethereum/execution-apis)

**explorer**

- https://etherscan.io/
- https://blockexplorer.one/
- https://blockscan.com/
- https://bloxy.info/

**apis**

- https://blocknative.com

**testnets**

- https://infura.io/
- https://www.alchemyapi.io/

## rpc

- net_version -> chainId
- net_listening:boolean
- 参考
  - http://cw.hubwiz.com/card/c/ethereum-json-rpc-api/
  - metamask [api-playground](https://metamask.github.io/api-playground/api-documentation/)

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```

## contract

- [ethereum/solidity](https://github.com/ethereum/solidity)
- [ConsenSys/smart-contract-best-practices](https://github.com/ConsenSys/smart-contract-best-practices)
  - 固化 vs 可升级
  - 一体化 vs 模块化
  - 重复 vs 可重用
- [ConsenSys/ethereum-developer-tools-list](https://github.com/ConsenSys/ethereum-developer-tools-list)

## Token

> [TokenList](./eth/tokenlist.md)

**主要 ECR-20 币**

| Token | Name              | Primary Network                    |
| ----- | ----------------- | ---------------------------------- |
| ETH   | 以太坊            |
| MATIC |                   | ERC20, Polygon                     |
| USDC  | USD Coin          | [Centre]                           |
| USDT  | 泰达币,Tether     | TRC20, ERC20, OKC, Polygon, Solana |
| DOGE  | 狗狗币            |
| ZRX   | 0x Protocol Token |
| DAI   | Dai Stablecoin    |

- BSC
- 稳定币 - USDT, USDC, DAI, Diem
- 参考
  - https://tokenlists.org/ - Ethereum token list
    - [Uniswap/token-lists](https://github.com/Uniswap/token-lists)
    - https://uniswap.org/tokenlist.schema.json
  - [Cryptocurrency](https://en.wikipedia.org/wiki/Cryptocurrency)

| Token  | Name       | Network |
| ------ | ---------- | ------- |
| ADA    |
| ATOM   |
| AVAX   |
| AXS    |
| BCH    | 比特币现金 |
| BTC    | 比特币     |
| CRV    |
| DOME   |
| DOT    |
| EOS    | 柚子币     |
| FIL    |
| FTM    |
| GALA   |
| ICP    |
| LINK   | Chialink   |
| LOOKS  |
| LTC    | 莱特币     |
| LUNA   |            | [Terra] |
| MANA   |
| NFT    |
| OKB    | Okx        |
| PEOPLE |
| SAND   |
| SHIB   | Shiba Inu  |
| SLP    |
| SOL    |
| SOS    |
| TRX    | 波场币     |
| UNI    |
| USDK   |
| XRP    | 瑞波币     |

## Trade

- https://cbridge.celer.network/
- https://www.okx.com/

## Miner

- [xmrig/xmrig](https://github.com/xmrig/xmrig)

## 参考

- NFT
  - https://opensea.io/
- DAO
  - https://app.daohaus.club/

## 服务

- [33cn/chain33](https://github.com/33cn/chain33)
  - 高度模块化, 遵循 KISS 原则的区块链开发框架
- [blkchain/pg_blkchain](https://github.com/blkchain/pg_blkchain)
  - PostgreSQL Blockchain Extension

## Read

- [The Complete Guide to Full Stack Ethereum Development](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)
- [元宇宙的运行之“DAO”](https://new.qq.com/omn/20211202/20211202A03EV000.html)
- [Web3 Tutorial: write upgradeable smart contract (proxy) using OpenZeppelin](https://dev.to/yakult/1916)
- [defi-vs-goliath](https://polygontech.medium.com/defi-vs-goliath-74bdf1bf9728)
- [Condition-Orientated Programming](https://gavofyork.medium.com/condition-orientated-programming-969f6ba0161a)
- [From “What is Blockchain?” to building a blockchain in less than an hour](https://medium.freecodecamp.org/4e738efc819d)
- [Building Blockchain in Go. Part 1: Basic Prototype](https://jeiwan.cc/posts/building-blockchain-in-go-part-1/)
- [How to build a blockchain from scratch with Go](https://blog.logrocket.com/how-to-build-blockchain-from-scratch-go/)

## Web3

| Web2    | Web3          |
| ------- | ------------- |
| AWS S3  | Filecoin      |
| Github  | Radicle       |
| Paypal  | Wallets       |
| Zoom    | Huddle        |
| Spotify | Audius        |
| Upwork  | Braintrust    |
| Twitter | Lens Protocol |
| MongoDB | Ceramic       |

## Service

- https://www.hyperledger.org/
- https://github.com/corda/corda
  - Corda is an open source blockchain project, designed for business from the start. Only Corda allows you to build interoperable blockchain networks that transact in strict privacy. Corda's smart contract technology allows businesses to transact directly, with value. https://www.corda.net
- Apache Milagro
  - Core security infrastructure for decentralized networks and distributed systems
  - https://milagro.apache.org/users.html
- https://101blockchains.com/blockchain-open-source/

## Math

- Constant Product AMM Math https://youtu.be/QNPyFs8Wybk
