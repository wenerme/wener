---
title: 精度
---

# 精度

- 精度 Precision

| type | byte |        dynamic | 训练中常见用途                         | GPU支持性        |
| ---- | ---- | -------------: | -------------------------------------- | ---------------- |
| FP64 | 8    | 极高（~10³⁰⁸） | 科学计算、极端精度需求，极少用于DL训练 | 较弱，性能低     |
| FP32 | 4    |    高（~10³⁸） | 中小型模型训练，混合精度中的关键操作   | 广泛支持         |
| FP16 | 2    |     低（~10⁴） | 大模型训练（需损失缩放），推理优化     | Tensor Core 加速 |
| BF16 | 2    |    高（~10³⁸） | 大模型训练主流，数值稳定               | A100/H100 优化   |
| INT8 | 1    |    低（~10²⁵） | 量化推理，极小模型训练                 | 较弱，性能低     |
| INT4 | 0.5  |    低（~10¹²） | 量化推理，极小模型训练                 | 较弱，性能低     |

- FP64 - Double Precision 双精度
- FP32 - Single Precision 单精度
- FP16 - Half Precision 半精度
- BF16 / Bfloat16
  - Brain Floating Point 16-bit
  - by Google Brain
  - 保留了 FP32 的指数范围（8位指数），减少尾数（7位）
- Float
  - s 符号位（Sign bit）
  - e 指数（Exponent）
  - m 尾数（Mantissa，或称为有效数/分数）
- nf4 - Normal Float 4-bit
  - 4位浮点数表示，通常用于极低精度的量化推理

$$
\text{FP} = (-1)^s \times 2^{e-\text{Bias}} \times (1 + m)
$$

- 1 + m
  - 更明确地分开隐含位（1）和存储的小数部分（m）

$$
\text{FP32} = (-1)^s \times 2^{e - 127} \times (1 + m)
$$
