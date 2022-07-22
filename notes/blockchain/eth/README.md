---
title: Ethereum
---

# Ethereum

# EIP

| EIP        | Name                                                                      | Status | Notes                                                 |
| ---------- | ------------------------------------------------------------------------- | ------ | ----------------------------------------------------- |
| [EIP-20]   | Token Standard                                                            | Final  | ERC-20 - Fungible Token/同质货币                      |
| [EIP-137]  | Ethereum Domain Name Service                                              | Final  |
| [EIP-155]  | Simple replay attack protection                                           | Final  | fork block 2,675,000 - hash(transaction) 包含 chainId |
| [EIP-191]  | Signed Data Standard                                                      | Final  |
| [EIP-165]  | Standard Interface Detection                                              | Final  |
| [EIP-712]  | Ethereum typed structured data hashing and signing                        | Review | eth_signTypedData                                     |
| [EIP-721]  | Non-Fungible Token Standard                                               | Final  | &EIP-165                                              |
| [EIP-777]  | Token Standard                                                            | Final  | ERC-20+ - Hooks,Decimals                              |
| [EIP-1066] | Status Codes                                                              |        |
| [EIP-1102] | Opt-in Account Exposure                                                   |        |
| [EIP-1155] | Multi Token Standard                                                      | Final  | 合约支持多种货币 - $BNB, $BAT                         |
| [EIP-1167] | Minimal Proxy Contract                                                    | Final  | 实现代理合约                                          |
| [EIP-1193] | Ethereum Provider JavaScript API                                          |        | window.ethereum                                       |
| [EIP-1363] | Payable Token                                                             | Final  |
| [EIP-1400] |                                                                           |        |
| [EIP-1474] | Remote Procedure Call Specification                                       |        |
| [EIP-1559] | Fee market change for ETH 1.0 chain                                       | Final  |
| [EIP-1767] | GraphQL Interface to Ethereum Node Data                                   |        |
| [EIP-1820] | Pseudo-introspection Registry Contract                                    |        | ERC-165+                                              |
| [EIP-2718] | Typed Transaction Envelope                                                | Final  |
| [EIP-2255] | Wallet Permissions                                                        |        |
| [EIP-2612] | permit                                                                    | Review | ERC-20+ERC-712                                        |
| [EIP-2981] | NFT Royalty Standard                                                      | Final  |
| [EIP-3722] | Poster: A ridiculously simple general purpose social media smart contract |
| [EIP-4626] | Tokenized Vault Standard                                                  | Final  |
| EIP-4675   | Multi-Fractional Non-Fungible Token Standard                              |

- Token 标准
  - [EIP-20], [EIP-721], [EIP-777], [EIP-1155]
- [EIP-721] - NFT
- [EIP-1155] - 多 Token
- ERC-20
  - 定义 Token 标准 - 其他的 Token 都会参照实现这些合约
  - OpenZeppelin [ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/07b1b472c0ac3e50963c8d52cd2dac6e7e05260c/contracts/token/ERC20/ERC20.sol)
  - ConsenSys [EIP20.sol](https://github.com/ConsenSys/Tokens/blob/bbfa5b3544f19b2464efb05fa3179db4543816f1/contracts/eip20/EIP20.sol)
- EIP-1193
  - [MetaMask/providers](https://github.com/MetaMask/providers)
- Status of [ERC](https://eips.ethereum.org/erc)
- [ethereum/EIPs](https://github.com/ethereum/EIPs)

[eip-1193]: https://eips.ethereum.org/EIPS/eip-1193

:::tip EIP <-> ERC

- EIP = ERC
- EIP - Ethereum Improvement Proposals
- ERC - Ethereum Request for Comments

:::

:::tip Fungible Token/同质货币

- 可交换 / transfer

:::

| Interface           | ERC-165 ID |
| ------------------- | ---------- |
| ERC165              | 0x01ffc9a7 |
| ERC721              | 0x80ac58cd |
| ERC721TokenReceiver | 0x150b7a02 |
| ERC721Metadata      | 0x5b5e139f |
| ERC721Enumerable    | 0x780e9d63 |

## RPC

```ts
interface RPC {
  // EIP-2255
  wallet_requestPermissions(request: { eth_accounts: object }): Promise<object>;
  wallet_getPermissions(
    request: Record<string, { requiredMethods: string[] }>,
  ): Promise<Array<{ invoker: string; parentCapability: string; caveats: Array<{ type: string; value: string }> }>>;
  // EIP-747
  wallet_watchAsset(request: {
    type: 'ERC:20';
    options: { address: string; image?: string; decimals?: number; symbol?: string };
  }): Promise<boolean>;
}
```

- https://metamask.github.io/api-playground/api-documentation/

## EIP-20

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

## EIP-155

[eip-155]: #eip-155

- 增加 chainId
- `(nonce, gasprice, startgas, to, value, data)` -> `(nonce, gasprice, startgas, to, value, data, chainid, 0, 0)`
- https://chainid.network/
- [ethereum-lists/chains](https://github.com/ethereum-lists/chains)

## EIP-165

[eip-165]: #eip-165

- 检测合约是否实现 接口
- interfaceID - `bytes4(keccak256('supportsInterface(bytes4)'))`=0x01ffc9a7
- < 30,000 gas
- 多个接口为 xor

```solidity
interface ERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}
```

## EIP-191

| version | eip       | title                        |
| ------- | --------- | ---------------------------- |
| 0x00    | [EIP-191] | Data with intended validator |
| 0x01    | [EIP-712] | Structured data              |
| 0x45    | [EIP-191] | personal_sign messages       |

[eip-191]: #eip-191

- signed_data - `0x19 <1 byte version> <version specific data> <data to sign>.`

## EIP-712

[eip-712]: #eip-712

结构化签名数据

- eth_signTypedData(address,typedData) - 增强 eth_sendTransaction 和 eth_sign 的签名能力
  - `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`
- domainSeparator = hashStruct(eip712Domain)

```solidity
struct EIP712Domain {
  string name;
  string version;
  uint256 chainId;//  EIP-155
  address verifyingContract;
  bytes32 salt;
}
```

```json title="TypedData"
{
  "type": "object",
  "properties": {
    "types": {
      "type": "object",
      "properties": {
        "EIP712Domain": { "type": "array" }
      },
      "additionalProperties": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "type": { "type": "string" }
          },
          "required": ["name", "type"]
        }
      },
      "required": ["EIP712Domain"]
    },
    "primaryType": { "type": "string" },
    "domain": { "type": "object" },
    "message": { "type": "object" }
  },
  "required": ["types", "primaryType", "domain", "message"]
}
```

## EIP-721

- NFT 标准
- 相关 EIP
  - [EIP-2981]: NFT Royalty Standard
- https://erc721.org/

```solidity
/// ERC-165 0x80ac58cd.
interface ERC721 /* is ERC165 */ {
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    /// owner 有多少个 NFT
    function balanceOf(address _owner) external view returns (uint256);

    /// NTF 的 owner
    function ownerOf(uint256 _tokenId) external view returns (address);

    /// 转让 NTF 所有权
    /// 会确认 _to 实现 IERC721Receiver - onERC721Received(address,address,uint256,bytes)
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;

    /// 同带 data 的 safeTransferFrom - data 默认为 空
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;

    /// 转让 NTF 所有权
    /// msg.sender 为 owner 或 批准地址
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;

    /// 批准 _approved 进行操作
    /// 事件: Approval
    function approve(address _approved, uint256 _tokenId) external payable;

    /// 批准 _operator 操作所有 NTF
    /// 事件: ApprovalForAll
    function setApprovalForAll(address _operator, bool _approved) external;

    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}

/// ERC-165 0x150b7a02.
interface ERC721TokenReceiver {
    /// transfer 到合约的回调
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) external returns(bytes4);
}

/// 可选元数据扩展接口
/// ERC-165 0x5b5e139f
interface ERC721Metadata /* is ERC721 */ {
    /// @notice A descriptive name for a collection of NFTs in this contract
    function name() external view returns (string _name);

    /// @notice An abbreviated name for NFTs in this contract
    function symbol() external view returns (string _symbol);

    /// @notice A distinct Uniform Resource Identifier (URI) for a given asset.
    /// @dev Throws if `_tokenId` is not a valid NFT. URIs are defined in RFC
    ///  3986. The URI may point to a JSON file that conforms to the "ERC721
    ///  Metadata JSON Schema".
    function tokenURI(uint256 _tokenId) external view returns (string);
}

/// @title ERC-721 Non-Fungible Token Standard, optional enumeration extension
/// @dev See https://eips.ethereum.org/EIPS/eip-721
///  Note: the ERC-165 identifier for this interface is 0x780e9d63.
interface ERC721Enumerable /* is ERC721 */ {
    /// @notice Count NFTs tracked by this contract
    /// @return A count of valid NFTs tracked by this contract, where each one of
    ///  them has an assigned and queryable owner not equal to the zero address
    function totalSupply() external view returns (uint256);

    /// @notice Enumerate valid NFTs
    /// @dev Throws if `_index` >= `totalSupply()`.
    /// @param _index A counter less than `totalSupply()`
    /// @return The token identifier for the `_index`th NFT,
    ///  (sort order not specified)
    function tokenByIndex(uint256 _index) external view returns (uint256);

    /// @notice Enumerate NFTs assigned to an owner
    /// @dev Throws if `_index` >= `balanceOf(_owner)` or if
    ///  `_owner` is the zero address, representing invalid NFTs.
    /// @param _owner An address where we are interested in NFTs owned by them
    /// @param _index A counter less than `balanceOf(_owner)`
    /// @return The token identifier for the `_index`th NFT assigned to `_owner`,
    ///   (sort order not specified)
    function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);
}
```

## EIP-777

```solidity
interface ERC777Token {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function balanceOf(address holder) external view returns (uint256);
    function granularity() external view returns (uint256);

    function defaultOperators() external view returns (address[] memory);
    function isOperatorFor(
        address operator,
        address holder
    ) external view returns (bool);
    function authorizeOperator(address operator) external;
    function revokeOperator(address operator) external;

    function send(address to, uint256 amount, bytes calldata data) external;
    function operatorSend(
        address from,
        address to,
        uint256 amount,
        bytes calldata data,
        bytes calldata operatorData
    ) external;

    function burn(uint256 amount, bytes calldata data) external;
    function operatorBurn(
        address from,
        uint256 amount,
        bytes calldata data,
        bytes calldata operatorData
    ) external;

    event Sent(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 amount,
        bytes data,
        bytes operatorData
    );
    event Minted(
        address indexed operator,
        address indexed to,
        uint256 amount,
        bytes data,
        bytes operatorData
    );
    event Burned(
        address indexed operator,
        address indexed from,
        uint256 amount,
        bytes data,
        bytes operatorData
    );
    event AuthorizedOperator(
        address indexed operator,
        address indexed holder
    );
    event RevokedOperator(address indexed operator, address indexed holder);
}
```

## ERC-1155

```solidity
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);

function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);

function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);

```

## EIP-1167

[eip-1167]: #eip-1167

```solidity
contract ThingFactory is Ownable, CloneFactory {

  address public libraryAddress;

  event ThingCreated(address newThingAddress);

  function ThingFactory(address _libraryAddress) public {
    libraryAddress = _libraryAddress;
  }

  function setLibraryAddress(address _libraryAddress) public onlyOwner {
    libraryAddress = _libraryAddress;
  }

  function createThing(string _name, uint _value) public onlyOwner {
    // 创建副本你
    address clone = createClone(libraryAddress);
    Thing(clone).init(_name, _value);
    ThingCreated(clone);
  }
}
```

- [optionality/clone-factory](https://github.com/optionality/clone-factory)

## EIP-1363

- payable
- ERC-20

```solidity
interface ERC1363 /* is ERC20, ERC165 */ {
  /**
   * @notice Transfer tokens from `msg.sender` to another address and then call `onTransferReceived` on receiver
   * @param to address The address which you want to transfer to
   * @param value uint256 The amount of tokens to be transferred
   * @return true unless throwing
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @notice Transfer tokens from `msg.sender` to another address and then call `onTransferReceived` on receiver
   * @param to address The address which you want to transfer to
   * @param value uint256 The amount of tokens to be transferred
   * @param data bytes Additional data with no specified format, sent in call to `to`
   * @return true unless throwing
   */
  function transferAndCall(address to, uint256 value, bytes memory data) external returns (bool);

  /**
   * @notice Transfer tokens from one address to another and then call `onTransferReceived` on receiver
   * @param from address The address which you want to send tokens from
   * @param to address The address which you want to transfer to
   * @param value uint256 The amount of tokens to be transferred
   * @return true unless throwing
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);


  /**
   * @notice Transfer tokens from one address to another and then call `onTransferReceived` on receiver
   * @param from address The address which you want to send tokens from
   * @param to address The address which you want to transfer to
   * @param value uint256 The amount of tokens to be transferred
   * @param data bytes Additional data with no specified format, sent in call to `to`
   * @return true unless throwing
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes memory data) external returns (bool);

  /**
   * @notice Approve the passed address to spend the specified amount of tokens on behalf of msg.sender
   * and then call `onApprovalReceived` on spender.
   * @param spender address The address which will spend the funds
   * @param value uint256 The amount of tokens to be spent
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @notice Approve the passed address to spend the specified amount of tokens on behalf of msg.sender
   * and then call `onApprovalReceived` on spender.
   * @param spender address The address which will spend the funds
   * @param value uint256 The amount of tokens to be spent
   * @param data bytes Additional data with no specified format, sent in call to `spender`
   */
  function approveAndCall(address spender, uint256 value, bytes memory data) external returns (bool);
}

interface ERC20 {
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint256);
  function approve(address spender, uint256 amount) external returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}


/**
 * @title ERC1363Receiver interface
 * @dev Interface for any contract that wants to support `transferAndCall` or `transferFromAndCall`
 *  from ERC1363 token contracts.
 */
interface ERC1363Receiver {
  /*
   * Note: the ERC-165 identifier for this interface is 0x88a7ca5c.
   * 0x88a7ca5c === bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))
   */

  /**
   * @notice Handle the receipt of ERC1363 tokens
   * @dev Any ERC1363 smart contract calls this function on the recipient
   * after a `transfer` or a `transferFrom`. This function MAY throw to revert and reject the
   * transfer. Return of other than the magic value MUST result in the
   * transaction being reverted.
   * Note: the token contract address is always the message sender.
   * @param operator address The address which called `transferAndCall` or `transferFromAndCall` function
   * @param from address The address which are token transferred from
   * @param value uint256 The amount of tokens transferred
   * @param data bytes Additional data with no specified format
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   *  unless throwing
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes memory data) external returns (bytes4);
}

/**
 * @title ERC1363Spender interface
 * @dev Interface for any contract that wants to support `approveAndCall`
 *  from ERC1363 token contracts.
 */
interface ERC1363Spender {
  /*
   * Note: the ERC-165 identifier for this interface is 0x7b04a2d0.
   * 0x7b04a2d0 === bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))
   */

  /**
   * @notice Handle the approval of ERC1363 tokens
   * @dev Any ERC1363 smart contract calls this function on the recipient
   * after an `approve`. This function MAY throw to revert and reject the
   * approval. Return of other than the magic value MUST result in the
   * transaction being reverted.
   * Note: the token contract address is always the message sender.
   * @param owner address The address which called `approveAndCall` function
   * @param value uint256 The amount of tokens to be spent
   * @param data bytes Additional data with no specified format
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   *  unless throwing
   */
  function onApprovalReceived(address owner, uint256 value, bytes memory data) external returns (bytes4);
}
```

## EIP-1820

[eip-1820]: #eip-1820

- ERC1820Registry
- [0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24](https://etherscan.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24)
- interfaceHash
- 实现 - 返回 ERC1820_ACCEPT_MAGIC=`keccak256(abi.encodePacked("ERC1820_ACCEPT_MAGIC"))`
- ERC###XXXXX
  - `###` 为编号
  - XXXXX 为接口名字

```
keccak256("ERC20Token")
keccak256("ERC777Token")
keccak256("ERC777TokensSender")
keccak256("ERC777TokensRecipient")
```

**实现需要实现的接口**

```solidity
interface _implementer {
    function canImplementInterfaceForAddress(bytes32 interfaceHash, address addr) external view returns(bytes32);
}
```

**注册中心**

- setInterfaceImplementer - 为地址设置实现
  - `_addr` 与 `_implementer` 不同时 则 `_implementer` 必须实现 ERC1820ImplementerInterface

```solidity
interface ERC1820Registry{
  event InterfaceImplementerSet(address indexed addr, bytes32 indexed interfaceHash, address indexed implementer);
  event ManagerChanged(address indexed addr, address indexed newManager);

  function getInterfaceImplementer(address _addr, bytes32 _interfaceHash) external view returns (address);
  function setInterfaceImplementer(address _addr, bytes32 _interfaceHash, address _implementer) external;
  function setManager(address _addr, address _newManager) external;
  function getManager(address _addr) public view returns(address);
  function interfaceHash(string calldata _interfaceName) external pure returns(bytes32);
}
```

## EIP-2612

transaction-less token approvals

[eip-2612]: #eip-2612

```solidity
function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external
function nonces(address owner) external view returns (uint)
function DOMAIN_SEPARATOR() external view returns (bytes32)
```

## EIP-2981

[eip-2981]: #eip-2981

- 获取 NFT 版税信息
  - receiver 接受人
  - royaltyAmount 售价版税
- IERC165 0x2a55205a

```solidity
interface IERC2981 is IERC165 {
    function royaltyInfo(
        uint256 _tokenId,
        uint256 _salePrice
    ) external view returns (
        address receiver,
        uint256 royaltyAmount
    );
}
```

## EIP-3722

[eip-3722]: #eip-3722

- https://github.com/onPoster

## EIP-4626

- ropsten [0xba12222222228d8ba445958a75a0704d566bf2c8#code=](https://ropsten.etherscan.io/address/0xba12222222228d8ba445958a75a0704d566bf2c8#code=)

# FAQ

## ERC-20 vs ERC-777

- ERC-20
  - 基础可用
  - tranfer 地址错误可能丢失
- ERC-777
  - made aware - 验证接收者

## ERC-721 vs ERC-1155

- ERC-721 - NFT 标准 - non-fungible
  - 专用于 NFT - 信息完善
- ERC-1155 - 多 Token 标准 - 可实现 NFT - semi-fungible
  - 一个合约支持多种 Token - 不仅限于 NFT
  - semi-fungible - 支持 Token-NFT 互换
  - 批量操作
  - 比 ERC-721 少存储一些信息
  - low gas fee
