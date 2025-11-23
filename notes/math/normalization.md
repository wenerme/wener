---
title: Normalization
---

# 归一化 {#normalization}

- Normalization
- Feature Scaling
- 归一化 / 标准化 / 缩放
- 将数据缩放到一个特定的范围，通常是 [0, 1] 或 [-1, 1]。

## Sum Norm

- Sum Norm / L1 Norm / Proportional Norm / Ratio Norm
- 适合场景
  - 按比例分配、保持比例
- 线性关系

$$
\text{Sum Norm} = \frac{value}{\sum_{i=1}^{n} values_i}
$$

## Min Max Norm

- 如果只有两个不同值，那么结果为 0 和 1
- 适合场景
  - 选择最优、放大差异

$$
\text{Min Max Norm} = \frac{value - \min(values)}{\max(values) - \min(values)}
$$

## Z-Score Norm

- 适合场景
  - 数据分布接近高斯分布（正态分布）时。
  - 当存在异常值时，Z-Score 可以保留其信息，而不是压缩到特定范围。

$$
\text{Z-Score Norm} = \frac{\text{value} - \operatorname{mean}(\text{values})}{\operatorname{std}(\text{values})}
$$

## Mean Normalization

- 适合场景
  - 当希望数据中心化在 0 附近时。

$$
\text{Mean Normalization} = \text{value} - \operatorname{mean}(\text{values})
$$

## Max Abs Norm

- 适合场景
  - 用于稀疏数据，因为它不会破坏数据的稀疏性（不会移动 0 值）。
  - 当希望将数据缩放到 [-1, 1] 范围且不进行中心化时。

$$
\text{Max Abs Norm} = \frac{\text{value}}{\max(|\text{values}|)}
$$

## Softmax

- 适合场景
  - 多分类问题的输出层，将输出转换为概率分布。
  - 强化学习中的策略函数。
- 会放大差异
- 配合温度防止 “赢家通吃”
- Safe Softmax
  - 以最大值平移，防止指数爆炸
- Logits 无界实数

$$
\text{Softmax} = \frac{\exp(\text{value})}{\sum\limits_{i=1}^{n} \exp(\text{values}_i)}
$$

$$
\text{Safe Softmax} = \frac{\exp(\text{value} - \max(\text{values}))}{\sum\limits_{i=1}^{n} \exp(\text{values}_i - \max(\text{values}))}
$$

## Log Norm

- 适合场景
  - 当数据分布呈现长尾（right-skewed）时，可以压缩大值的范围，使分布更对称。
  - 处理增长率或比例数据。

$$
\text{Log Norm} = \log(\text{value} + 1)
$$

## Tanh Norm

- 适合场景
  - 在神经网络中作为激活函数，将输出缩放到 [-1, 1]。
  - 当数据中有负值且希望保留其方向性时。

$$
\text{Tanh Norm} = \frac{\text{value} - \min(\text{values})}{\max(\text{values}) - \min(\text{values})}
$$

## Sigmoid

- 适合场景
  - 在神经网络中作为激活函数，特别是在二分类问题的输出层，将输出转换为 (0, 1) 之间的概率。
  - 作为门控单元（如在 LSTM 中）。

$$
\text{Sigmoid} = \frac{1}{1 + e^{-x}}
$$

## ReLU

- 适合场景
  - 在深度神经网络中作为隐藏层的激活函数，可以有效缓解梯度消失问题。
  - 计算效率高，收敛速度快。

$$
\text{ReLU} = \max(0, x)
$$
