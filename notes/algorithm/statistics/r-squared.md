---
title: R-squared
tags:
  - Statistics
  - Regression
---

# R-squared ($R^2$, 决定系数)

- [Statistics](./README.md)

$R^2$ 是评估回归模型拟合优度（Goodness of Fit）的指标，衡量模型相对于“始终预测目标均值”的基线，解释目标变量波动的程度。

$$
R^2 = 1 - \frac{SS_{res}}{SS_{tot}}
$$

- $SS_{res}$（Residual Sum of Squares，残差平方和）：预测值与真实值之差的平方和。
- $SS_{tot}$（Total Sum of Squares，总平方和）：真实值与其均值之差的平方和。
- **$R^2 = 1$**：预测值与真实值完全一致。
- **$R^2 = 0$**：模型不优于始终预测真实值均值的基线。
- **$R^2 < 0$**：模型表现比均值基线更差。

例如，若房价模型在同一评估数据集上得到 $R^2 = 0.8$，可理解为该模型相对于均值基线解释了约 80% 的观测波动。它不表示特征对房价具有 80% 的因果决定作用。

- pooled R²

## 线性模型与二次模型

- 线性模型：$y = \beta_0 + \beta_1 x$。
- 二次模型：$y = \beta_0 + \beta_1 x + \beta_2 x^2$。
- 两种模型都使用同一 $R^2$ 定义；区别在于模型如何生成预测值，而不是 $R^2$ 的计算方法。
- 二次模型对 $x$ 是非线性的，但对参数 $\beta_0$、$\beta_1$、$\beta_2$ 仍是线性的，因此可视为多项式线性回归。
- 当二次模型包含线性模型的全部项时，训练集上的普通 $R^2$ 不会低于线性模型；额外的 $x^2$ 项也可能只是拟合噪声。

比较线性与二次模型时，应在同一测试集或交叉验证中同时观察 [RMSE](./rmse.md)、调整后 $R^2$（Adjusted $R^2$）和业务可解释性，而不是只选训练集 $R^2$ 更高的模型。

## 参考

- https://scikit-learn.org/stable/modules/generated/sklearn.metrics.r2_score.html
