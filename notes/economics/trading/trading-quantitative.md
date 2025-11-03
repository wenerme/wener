---
tags:
  - AIOps
---

# 量化交易

**最常用的指标**

- Traded Indicator - 趋势指标 - 判断市场当前的主要运动方向（上涨、下跌或盘整）。
  - MA / Moving Average - 移动平均线
    - SMA / Simple Moving Average - 简单移动平均线
      - 特定时间周期内收盘价的算术平均值。
    - EMA / Exponential Moving Average - 指数移动平均线
      - 对最近的价格给予更高的权重。
    - 信号：短期均线上穿长期均线（“金叉”）通常被视为买入信号；反之（“死叉”）为卖出信号。
  - MACD / Moving Average Convergence Divergence - 移动平均收敛发散指标
    - 构成：由快线(DIF)、慢线(DEA)和柱状图(MACD Histogram)组成。它本质上是两条EMA的差值及其平滑。
    - 信号：快线上穿慢线、柱状图由负转正等，通常被视为上涨动能增强。
- Momentum Indicators / 动量指标 - 衡量价格变化的速度和力度，用于判断趋势的超买（Overbought）或超卖（Oversold）状态。
  - RSI / Relative Strength Index - 相对强弱指数
    - 构成：一个介于0到100之间的振荡器，计算一定时期内上涨日和下跌日的价格变动强度。
    - 信号：RSI > 70 通常被视为超买区域，可能预示回调；RSI < 30 被视为超卖区域，可能预示反弹。价格与RSI的背离也是重要的交易信号。
  - Stochastic Oscillator / 随机指标
    - 构成：比较某周期内的收盘价与该周期内的最高/最低价范围，以判断价格的相对位置。
    - 信号：与RSI类似，通常用80和20作为超买和超卖的阈值。
- Volatility Indicators / 波动性指标 - 这类指标衡量市场价格波动的剧烈程度，对于风险管理和期权交易至关重要。
  - BB / Bollinger Bands - 布林带
    - 构成：由一条中轨（通常是SMA）和上下两条标准差带组成。通道的宽度会根据市场波动率动态调整。
    - 信号：价格触及上轨或下轨可能预示趋势的反转或延续；通道收窄（“挤压”）可能预示着即将到来的剧烈波动。
  - ATR / Average True Range - 平均真实波动范围
    - 构成：衡量特定时期内价格的平均波动范围，纯粹反映波动性，不指示方向。
    - 应用：常用于设置止损位（Stop-Loss）和目标位（Take-Profit）。
- Volume Indicators / 成交量指标 - 通过分析成交量来确认趋势的强度或预测趋势的反转。
  - OBV / On-Balance Volume - 平衡交易量
    - 构成：将上涨日的成交量加总，下跌日的成交量减总，通过成交量的变化来推测市场动能。
    - 信号：OBV与价格同向运动确认趋势；OBV与价格背离则可能预示趋势反转。
  - VWAP / Volume-Weighted Average Price - 成交量加权平均价格
    - 构成：当天开盘至今的成交量加权平均价格。
    - 应用：常被机构交易者用作交易基准，判断当前价格是高于还是低于市场平均成本。

---

- RSI / Relative Strength Index - 相对强弱指数
- BB / Bollinger Bands - 布林带
- ATR / Average True Range - 平均真实波动范围
- OBV / On-Balance Volume - 平衡交易量
- VWAP / Volume Weighted Average Price - 成交量加权平均价格
- TWAP / Time Weighted Average Price - 时间加权平均价格
- WMA / Weighted Moving Average - 加权移动平均线
