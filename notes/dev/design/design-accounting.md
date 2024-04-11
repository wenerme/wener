---
title: Accounting
---

# Accounting

| abbr. | en                      | zh           |
| ----- | ----------------------- | ------------ |
| DEA   | Double Entry Accounting | 复式记账     |
| RFS   | Record Filing System    | 档案管理系统 |
| SEA   | Single Entry Accounting | 单式记账     |
| COGS  | Cost of Goods Sold      | 销售成本     |

|                             en | zh             |
| -----------------------------: | -------------- |
|                         Ledger | 总账           |
|                   Account Book | 账簿           |
|                     sub-ledger | 明细账         |
|                 General Ledger | 总账           |
|                  Journal Entry | 分录           |
|                account balance | 账户余额       |
|         stored account balance | 存储账户余额   |
|        Derived account balance | 衍生账户余额   |
|                    Legislature | 立法机关       |
|              Account Statement | 账户报表       |
|                Closing Balance | 结余           |
|                Current Balance | 当前余额       |
|                   Closing Date | 结算日期       |
|                         Credit | 贷方           |
|                          Debit | 借方           |
|                OTO Transaction | 一对一交易     |
| Accounts Receivable Sub-ledger | 应收账款明细账 |
|    Accounts Payable Sub-ledger | 应付账款明细账 |
|           Inventory Sub-ledger | 存货明细账     |
|                         Refund | 退款           |
|           reversal transaction | 冲正交易       |
|              Accounting Period | 会计期间, 账期 |
|                     net amount | 净额           |
|                   gross amount | 毛额           |
|                     fee amount | 手续费         |
|                   Gross Assets | 总资产         |
|                  Gross Revenue | 总收入         |
|                   Gross Profit | 毛利润         |
|                   Gross Margin | 毛利率         |
|                     Net Assets | 净资产         |
|                    Net Revenue | 净收入         |
|                   Net Earnings | 净利润         |
|                     Net Income | 净收入         |
|                     Net Margin | 净利率         |
|                    pre balance | 前余额         |
|                   post balance | 后余额         |

- Derived account balance
  - 通过汇总账户的所有交易记录（如存款和取款）来计算得出的余额
- Stored account balance
  - 直接在数据库中存储的当前余额数值
- 交易对方
  - counterpart_transaction_id
  - reverse_transaction_id
  - mirror_transaction_id
  - inverse_transaction_id
- gross vs net
  - https://corporatefinanceinstitute.com/resources/accounting/gross-vs-net/

```
pre_balance + amount = post_balance
```

```
net = gross - fee
```

```
net + fee = gross
```

## Single Entry Accounting vs Double Entry Accounting

## 参考

- [Derived account balance vs stored account balance](https://stackoverflow.com/a/29713230/1870054)
- https://stackoverflow.com/a/68528638/1870054
- [Double-entry bookkeeping](https://en.wikipedia.org/wiki/Double-entry_bookkeeping)
- [Single-entry bookkeeping](https://en.wikipedia.org/wiki/Single-entry_bookkeeping)
- https://www.accountingtools.com/articles/accounting-system-design
