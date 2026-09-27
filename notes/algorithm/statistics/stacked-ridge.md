---
title: Stacked Ridge
tags:
  - Statistics
  - Regression
  - Ensemble Learning
---

# Stacked Ridge（堆叠 Ridge）

- [Statistics](./README.md)

Stacked Ridge 是 Stacking（堆叠泛化）的一种实现：先由多个基础模型产生预测结果，再以这些预测结果作为特征训练 Ridge Regression 元模型，输出最终预测。

- “Staged Ridge”不是常见的标准名称；本页使用 Stacked Ridge 指以 Ridge 作为 stacking 元学习器的模式。
- 它不是另一种单独的 Ridge 正则化公式，也不等同于因果推断或联立方程中的 Two-stage Ridge Regression。

```text
训练集 (X, y)
  -> 基础模型 A、B、C 的 OOF 预测 (p_A, p_B, p_C)
  -> 元特征 Z = [p_A, p_B, p_C]
  -> Ridge 元模型
  -> 最终预测 y_hat
```

设第 $j$ 个基础模型的预测为 $p_j(x)$，Ridge 元模型可写为：

$$
\hat{y} = \beta_0 + \sum_{j=1}^{m}\beta_j p_j(x)
$$

其训练目标为：

$$
\min_{\beta}\sum_{i=1}^{n}\left(y_i - \beta_0 - \sum_{j=1}^{m}\beta_j p_j(x_i)\right)^2 + \alpha\sum_{j=1}^{m}\beta_j^2
$$

## 训练要点

- **基础模型**：可以是线性模型、树模型、Boosting 模型或神经网络；它们应有互补的误差模式。
- **元特征**：通常是各基础模型对同一样本的预测值；也可选择拼接原始特征 `X`。
- **Ridge 元模型**：使用 L2 正则化学习基础模型的组合权重，适合基础模型预测高度相关的情况。
- **OOF（Out-of-Fold）预测**：训练元模型时，每一条预测必须来自未见过该样本标签的基础模型。例如 5 折交叉验证中，每折基础模型用其余 4 折训练，再预测当前折。
- **避免数据泄漏**：若直接用基础模型在其训练样本上的预测训练元模型，预测会过于乐观，元模型会学习到训练集噪声，离线指标和线上泛化效果都会失真。

训练完成后，通常把每个基础模型在完整训练集上重新拟合；预测新样本时，先生成各基础模型预测，再交给 Ridge 元模型组合。

## 参考

- https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.StackingRegressor.html
- https://scikit-learn.org/stable/auto_examples/ensemble/plot_stack_predictors.html
