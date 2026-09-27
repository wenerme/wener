---
title: RMSE
tags:
  - Statistics
  - Regression
---

# RMSE ($\mathrm{RMSE}$, 均方根误差)

- [Statistics](./README.md)

RMSE（Root Mean Square Error）用于衡量回归模型的预测值与真实值之间的误差大小。它先对误差求平方、取平均，再开平方，因此最终单位与目标变量相同。

$$
\mathrm{RMSE} = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}
$$

- $y_i$：第 $i$ 个样本的真实值。
- $\hat{y}_i$：第 $i$ 个样本的预测值。
- $n$：样本数量。
- **RMSE = 0**：预测值与真实值完全一致。
- RMSE 越小，通常表示模型预测越准确。
- 误差会先平方，因此 RMSE 对异常值和较大的预测误差更敏感。

## 示例

真实值为 `[10, 20]`，预测值为 `[8, 23]` 时：

$$
\mathrm{RMSE} = \sqrt{\frac{(10 - 8)^2 + (20 - 23)^2}{2}} = \sqrt{6.5} \approx 2.55
$$

这表示预测误差的典型规模约为 `2.55` 个目标变量单位。预测房价时单位为货币，预测温度时单位为温度。

## 与其他指标的区别

- **RMSE**：表示预测误差的规模，越小越好；对大误差敏感。
- **MAE（Mean Absolute Error，平均绝对误差）**：直接对误差取绝对值后取平均，对异常值相对不敏感。
- **$R^2$**：表示模型相对于均值基线解释目标变量波动的程度，通常越接近 `1` 越好；不直接表示误差的原始大小。
- RMSE 依赖目标变量的量纲，因此只适合比较预测同一目标、使用相同单位的模型。

## 参考

- https://scikit-learn.org/stable/modules/generated/sklearn.metrics.root_mean_squared_error.html
