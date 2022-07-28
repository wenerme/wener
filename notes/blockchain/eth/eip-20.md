---
title: ERC-20
---

# ERC-20

- 必须接口 - totalSupply, balanceOf, transfer, transferFrom, approve, allowance
- 事件 - Transfer, Approval
- 可选接口
  - 元数据 - name, symbol, decimals
- 扩展
  - Burnable - burn, burnFrom
  - Capped - cap - 限定总量
  - FlashMint - maxFlashLoan, flashFee, flashLoan
- 参考
  - [eip-20](https://eips.ethereum.org/EIPS/eip-20)
    - 定义了 Token 合约标准
    - 2015-11-19
  - Wikipedia [ERC-20](https://en.wikipedia.org/wiki/Ethereum#ERC-20_tokens)
  - OpenZeppelin [ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/07b1b472c0ac3e50963c8d52cd2dac6e7e05260c/contracts/token/ERC20/ERC20.sol)
  - ConsenSys [EIP20.sol](https://github.com/ConsenSys/Tokens/blob/bbfa5b3544f19b2464efb05fa3179db4543816f1/contracts/eip20/EIP20.sol)

```solidity
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
  function name() public view returns (string);

  function symbol() public view returns (string);

  function decimals() public view returns (uint8);

  /**
   * @dev Emitted when `value` tokens are moved from one account (`from`) to
   * another (`to`).
   *
   * Note that `value` may be zero.
   */
  event Transfer(address indexed from, address indexed to, uint256 value);

  /**
   * @dev Emitted when the allowance of a `spender` for an `owner` is set by
   * a call to {approve}. `value` is the new allowance.
   */
  event Approval(address indexed owner, address indexed spender, uint256 value);

  /**
   * @dev Returns the amount of tokens in existence.
   */
  function totalSupply() external view returns (uint256);

  /**
   * @dev Returns the amount of tokens owned by `account`.
   */
  function balanceOf(address account) external view returns (uint256);

  /**
   * @dev Moves `amount` tokens from the caller's account to `to`.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transfer(address to, uint256 amount) external returns (bool);

  /**
   * @dev Returns the remaining number of tokens that `spender` will be
   * allowed to spend on behalf of `owner` through {transferFrom}. This is
   * zero by default.
   *
   * This value changes when {approve} or {transferFrom} are called.
   */
  function allowance(address owner, address spender) external view returns (uint256);

  /**
   * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * IMPORTANT: Beware that changing an allowance with this method brings the risk
   * that someone may use both the old and the new allowance by unfortunate
   * transaction ordering. One possible solution to mitigate this race
   * condition is to first reduce the spender's allowance to 0 and set the
   * desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   *
   * Emits an {Approval} event.
   */
  function approve(address spender, uint256 amount) external returns (bool);

  /**
   * @dev Moves `amount` tokens from `from` to `to` using the
   * allowance mechanism. `amount` is then deducted from the caller's
   * allowance.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) external returns (bool);
}

```
