---
title: Statistics Glossary
tags:
  - Statistics
  - Glossary
---

# Statistics Glossary

- [Statistics](./README.md)

## 缩写速查

| abbr. | stand for                    | cn             |
| ----- | ---------------------------- | -------------- |
| OLS   | Ordinary Least Squares       | 普通最小二乘法 |
| WLR   | Weighted Linear Regression   | 加权线性回归   |
| MSE   | Mean Squared Error           | 均方误差       |
| RMSE  | Root Mean Square Error       | 均方根误差     |
| MAE   | Mean Absolute Error          | 平均绝对误差   |
| $R^2$ | Coefficient of Determination | 决定系数       |
| RSS   | Residual Sum of Squares      | 残差平方和     |
| TSS   | Total Sum of Squares         | 总平方和       |
| CV    | Cross-Validation             | 交叉验证       |
| OOF   | Out-of-Fold                  | 折外预测       |

## 基础概念

clipped-zero

```text
  模型原始预测 < 0
  → 输出值裁剪为 0
```

Regression（回归）
: 通过一个或多个输入变量预测连续目标变量的监督学习方法。线性回归和 Ridge Regression 都属于回归方法。

Sample（样本）
: 数据集中的一条观测记录。第 $i$ 个样本通常使用 $x_i$ 表示输入，使用 $y_i$ 表示对应的真实目标值。

Feature（特征）
: 用于预测目标变量的输入变量。例如房价预测中的面积、地段和房龄都可以是特征。

Target variable（目标变量）
: 模型需要预测的变量，回归中通常使用 $y$ 表示。

Baseline（基线模型）
: 用于比较的简单参考模型。回归中的均值基线始终预测训练集目标值的平均值，$R^2$ 就是相对于这个基线定义的。

Residual（残差）
: 真实值与预测值之差，通常写作 $e_i = y_i - \hat{y}_i$。残差越小，表示该样本的预测值越接近真实值。

Hat notation（帽符号）
: 写在变量上方的 `ˆ` 表示估计值或预测值。例如 $\hat{y}$ 是模型预测的 $y$，$\hat{\beta}$ 是根据样本估计出的回归系数；`y hat` 读作“y hat”。

Fitted value（拟合值）
: 模型在已有样本上的预测值，通常写作 $\hat{y}_i$。在训练集上计算的拟合值不能直接代表模型对新数据的泛化能力。

## 评估指标

Coefficient of Determination（决定系数）
: 即 $R^2$，衡量模型相对于均值基线解释目标变量波动的程度。$R^2 = 1$ 表示完美预测，$R^2 = 0$ 表示不优于均值基线，$R^2 < 0$ 表示劣于均值基线。详见 [R-squared](./r-squared.md)。

Mean Squared Error（均方误差）
: 预测误差平方的平均值：$\mathrm{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$。它保留误差平方的量纲，因此比 RMSE 更难直接与目标变量的原始单位对应。

Root Mean Square Error（均方根误差）
: MSE 的平方根，单位与目标变量相同，并且对较大的误差更敏感。详见 [RMSE](./rmse.md)。

Mean Absolute Error（平均绝对误差）
: 绝对误差的平均值：$\mathrm{MAE} = \frac{1}{n}\sum_{i=1}^{n}|y_i - \hat{y}_i|$。相较于 RMSE，它对异常值和大误差的敏感程度通常较低。

Adjusted $R^2$（调整后决定系数）
: 在 $R^2$ 的基础上考虑样本数量和特征数量，对加入但没有实际解释力的特征进行惩罚，适合比较特征数量不同的回归模型。

## 回归方法

Ordinary Least Squares（普通最小二乘法）
: 通过最小化残差平方和估计回归参数的方法。其目标可以写为 $\min_{\beta}\sum_i(y_i - \hat{y}_i)^2$。

Weighted Linear Regression（加权线性回归）
: 为不同样本的误差赋予不同权重的线性回归。常见目标函数为 $\sum_i w_i(y_i - \hat{y}_i)^2$，可用于处理异方差、数据聚合权重或不同观测可靠性。

Ridge Regression（Ridge 回归）
: 在线性回归的残差平方和目标中加入系数的 L2 惩罚，以限制系数大小并缓解特征共线性。典型目标为：

$$
\min_{\beta}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2 + \alpha\sum_{j=1}^{p}\beta_j^2
$$

其中 $\alpha$ 控制正则化强度；截距通常不纳入惩罚。

Stacking（堆叠泛化）
: 先使用多个基础模型生成预测，再把这些预测作为元特征，训练一个元模型进行组合。元模型可以是线性回归、Ridge 或其他回归器。

Stacked Ridge（堆叠 Ridge）
: 以 Ridge Regression 作为 stacking 元模型的组合方法。它使用基础模型的预测作为输入，适合基础模型之间存在互补误差或预测结果相关的场景。详见 [Stacked Ridge](./stacked-ridge.md)。

## 训练与验证

Cross-Validation（交叉验证）
: 将数据划分为多个折，轮流使用部分折训练、剩余折验证，以估计模型在未见数据上的表现。交叉验证中的训练和验证划分必须遵守时间顺序或分组关系等数据约束。

Out-of-Fold Prediction（折外预测）
: 对每个样本，使用没有包含该样本的折训练出的模型进行预测。OOF 预测常用于训练 stacking 的元模型，以避免直接使用基础模型在训练样本上的过于乐观的预测。

Data Leakage（数据泄漏）
: 训练过程意外使用了验证集、测试集或未来时刻的信息，使评估结果过于乐观。Stacking 中用基础模型对自身训练样本的预测训练元模型，就是一种常见风险。

Generalization（泛化）
: 模型在未参与训练的新数据上的预测能力。训练集拟合度高不一定表示泛化能力强，通常需要测试集或交叉验证结果进行评估。

## 折 {#fold}

“5 折”指的是把训练数据分成 5 组，然后轮流拿其中 1 组做暂时留出，其余 4 组用于训练。

```text
所有成功请求日期
    ↓
按 UTC 日期分成 5 组
    ↓
第 1 轮：第 2–5 组训练，第 1 组预测
第 2 轮：第 1、3–5 组训练，第 2 组预测
第 3 轮：第 1、2、4、5 组训练，第 3 组预测
第 4 轮：第 1–3、5 组训练，第 4 组预测
第 5 轮：第 1–4 组训练，第 5 组预测
    ↓
每一行都得到一个没有使用自身训练标签生成的 input_hat/output_hat
    ↓
用这些 OOF 估算值训练 cache read/write Ridge
```

OOF，out-of-fold prediction，折外预测。它的作用是避免下面这种问题：

- 先用某一行的真实 input_val 拟合 input 模型
- 再用这个模型预测同一行 input_hat
- 再用这个几乎看过答案的 input_hat 训练 output 模型

## 参考

- [R-squared](./r-squared.md)
- [RMSE](./rmse.md)
- [Stacked Ridge](./stacked-ridge.md)
- https://scikit-learn.org/stable/modules/model_evaluation.html
