---
title: Normalization
---

# 归一化 {#normalization}

- Normalization
- Feature Scaling
- 归一化 / 标准化 / 缩放
- 将数据缩放到一个特定的范围，通常是 [0, 1] 或 [-1, 1]。

---

- Sum Norm / L1 Norm / Proportional Norm / Ratio Norm

$$
\text{Sum Norm} = \frac{value}{\sum_{i=1}^{n} values_i}
$$

- Min Max Norm

$$
\text{Min Max Norm} = \frac{value - \min(values)}{\max(values) - \min(values)}
$$

- Z-Score Norm

$$
\text{Z-Score Norm} = \frac{\text{value} - \operatorname{mean}(\text{values})}{\operatorname{std}(\text{values})}
$$

- Mean Normalization

$$
\text{Mean Normalization} = \text{value} - \operatorname{mean}(\text{values})
$$

- Max Abs Norm

$$
\text{Max Abs Norm} = \frac{\text{value}}{\max(|\text{values}|)}
$$

- Softmax Norm

$$
\text{Softmax Norm} = \frac{\exp(\text{value})}{\sum\limits_{i=1}^{n} \exp(\text{values}_i)}
$$

- Log Norm

$$
\text{Log Norm} = \log(\text{value} + 1)
$$

- Tanh Norm

$$
\text{Tanh Norm} = \frac{\text{value} - \min(\text{values})}{\max(\text{values}) - \min(\text{values})}
$$
