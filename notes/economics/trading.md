---
title: 交易
tags:
  - 经济
  - 投资
  - 交易
---

# 交易

## 关键概念

### 成本价计算

**平均成本价**

指买入现货的平均成本价。

$$
\text{平均成本价} = \frac{(\text{最近一次买入前的平均成本价} \times \text{数量} + \text{最近一次买入价格} \times \text{数量})}{\text{净买入数量}}
$$

**累计成本价**
指买入和卖出现货的累计成本价

$$
\text{累计成本价} = \frac{\text{累计买入价值} - \text{累计卖出价值}}{\text{净买入数量}}
$$

### 常见指标

**ROI (Return On Investment)**

$$
\text{ROI} = \frac{\text{当前价值} - \text{投资成本}}{\text{投资成本}} \times 100\%
$$

**波动率 (Volatility)**

衡量价格变动幅度，通常用标准差表示：

$$
\text{波动率} = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(r_i-\bar{r})^2}
$$

其中 $r_i$ 是每日收益率，$\bar{r}$ 是平均收益率。

**夏普比率 (Sharpe Ratio)**

评估风险调整后的收益：

$$
\text{夏普比率} = \frac{R_p - R_f}{\sigma_p}
$$

其中 $R_p$ 是投资组合收益率，$R_f$ 是无风险收益率，$\sigma_p$ 是投资组合标准差。

## 交易策略

### 价格行为交易 (Price Action)

基于价格图表的走势进行交易，不依赖技术指标。常见形态包括：

- 支撑位与阻力位
- 趋势线
- K线形态（锤子线、吞没线等）

### 趋势跟踪

顺应市场趋势方向进行交易：

- 移动平均线交叉策略
- 突破交易
- 通道交易

### 均值回归

当价格偏离平均水平时，预期其将回归均值：

- 超买超卖指标（RSI、随机指标）
- 布林带交易
- 统计套利

### 投资组合管理

- **资产配置**：在不同资产类别间分散投资
- **风险平价**：基于风险贡献分配资金
- **再平衡**：定期调整持仓回到目标权重

## 风险管理

### 仓位管理

- **固定比率**：每笔交易使用固定比例的资金
- **凯利公式**：根据胜率和赔率确定最优仓位

## 多空比

## 合约

## 现货

## 交割

## 期权

## 永续

### 止损策略

- **固定止损**：设定固定点位或百分比
- **跟踪止损**：随着价格上涨调整止损点位
- **时间止损**：在预设时间未达目标时退场

## 交易心理学

- **认知偏差**：过度自信、损失厌恶、确认偏差
- **情绪控制**：贪婪、恐惧、后悔
- **交易纪律**：遵循交易计划，避免冲动交易

# FAQ

## 累计成本价 vs. 平均成本价

- **累计成本价**：考虑了所有买入和卖出交易，反映投资者实际剩余资金对应的成本。适用于评估长期投资表现。
- **平均成本价**：只考虑买入交易，不考虑卖出的影响，更适合短期持仓评估。

## 何时使用市价单vs限价单？

- **市价单**：当交易执行速度优先于价格时使用，适合高流动性市场或紧急情况。
- **限价单**：当价格执行更重要时使用，适合低流动性市场或对执行价格敏感的交易。

## 如何确定合适的止损位？

- **技术分析法**：基于支撑位、阻力位或关键价位
- **波动率法**：基于资产的平均波动范围（如ATR）
- **资金管理法**：基于账户风险承受能力（如最大损失不超过账户的1-2%）

## 什么是做市商vs自营交易？

- **做市商**：提供流动性，通过买卖差价获利，不预测市场方向
- **自营交易**：基于市场预测进行单向交易，通过价格变动获利
