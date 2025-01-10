---
title: 交易
---

# Transaction

- 交易模型

| field          | formula                                     | desc                       |
| -------------- | ------------------------------------------- | -------------------------- |
| net_amount     | abs(amount) - fee_amount                    | 减去手续费后的净额         |
| gross_amount   | abs(amount)                                 | 原始交易金额               |
| income_amount  | case when amount > 0 then amount else 0 end | 当 amount > 0 时的入账金额 |
| expense_amount | case when amount < 0 then amount else 0 end | 当 amount < 0 时的支出金额 |
| post_balance   | pre_balance + amount                        | 交易后余额                 |

```ts
interface Transaction {
  /**
   * @title ID
   */
  id: string;

  /**
   * @title 交易时间
   */
  transactionTime: Date;

  /**
   * @title 交易描述
   */
  description: string;

  /**
   * @title 标签
   */
  tags?: string[];
  notes?: string;

  /**
   * @title 金额
   */
  amount: number;

  /**
   * @title 交易前金额
   */
  preBalance: number;

  /**
   * @title 手续费率
   */
  feeRate: number;

  /**
   * @title 手续费类型
   */
  feeType: 'Fixed' | 'Rate' | 'None';

  /**
   * @title 货币
   */
  currency?: string;

  /**
   * @title 对方账户 ID
   */
  accountId?: string;

  /**
   * @title 对方账户类型
   */
  accountType?: string;

  /**
   * @title 对方账户 ID
   */
  counterpartyId?: string;

  /**
   * @title 对方账户类型
   */
  counterpartyType?: string;

  /**
   * @title 对方交易 ID
   */
  counterpartyTransactionId?: string;

  /**
   * @title 上一笔交易 ID
   */
  prevTransactionId?: string;

  /**
   * @title 下一笔交易 ID
   */
  nextTransactionId?: string;

  //region 辅助生成字段 - 只读

  /**
   * @title 交易日期
   * - 用于汇总统计
   */
  transactionDate: string;

  /**
   * @title 净额
   */
  netAmount: number;

  /**
   * @title 毛额
   */
  grossAmount: number;

  /**
   * @title 手续费
   */
  feeAmount: number;

  /**
   * @title 收入
   */
  income: boolean;

  /**
   * @title 收入金额
   */
  incomeAmount: number;

  /**
   * @title 支出
   */
  expense: boolean;

  /**
   * @title 支出金额
   */
  expenseAmount: number;

  /**
   * @title 交易后金额
   */
  postBalance: number;

  //endregion

  /**
   * @title 记录时间
   */
  recordTime: Date;

  paymentTime?: Date;

  /**
   * @title 操作员 ID
   */
  operatorId?: string;

  invoiceUrl?: string;
  receiptUrl?: string;
}
```
