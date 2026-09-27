---
title: Statistics
tags:
  - Statistics
---

# Statistics

- 统计、回归模型和预测评估指标。
- [Glossary](./glossary.md)：统计与回归常用术语、缩写和符号。

## 评估指标

- [R-squared ($R^2$, 决定系数)](./r-squared.md)
  - 模型相对均值基线解释目标变量波动的程度。
- [RMSE ($\mathrm{RMSE}$, 均方根误差)](./rmse.md)
  - 预测误差的典型规模，对较大误差更敏感。

## 模型与方法

- Ordinary Least Squares (OLS) - 普通最小二乘法。
- Weighted Linear Regression (WLR) - 加权线性回归。
  - 处理异方差性、降低异常值影响，或反映数据聚合时的权重。
  - $$ \text{Cost} = \sum_{i=1}^{n} w_i \cdot (y_i - \hat{y}_i)^2 $$
- [Stacked Ridge（堆叠 Ridge）](./stacked-ridge.md)
  - 以多个基础模型的 OOF 预测为特征，用 Ridge 元模型组合最终预测。

## 工具

- [IBM SPSS Statistics](https://www.ibm.com/analytics/spss-statistics-software)
- [Comparison of statistical packages (Wikipedia)](https://en.wikipedia.org/wiki/Comparison_of_statistical_packages)
- [Best Free and Open Source Software for Statistical Analysis](https://blog.cometdocs.com/the-best-free-and-open-source-software-for-statistical-analysis)
