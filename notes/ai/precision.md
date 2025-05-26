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

$$
\text{FP} = (-1)^s \times 2^{e-\text{Bias}} \times (1 + m)
$$

- 1 + m
  - 更明确地分开隐含位（1）和存储的小数部分（m）

$$
\text{FP32} = (-1)^s \times 2^{e - 127} \times (1 + m)
$$

## 量化 {#quantization}

- 量化 - Quantization
  - 降低精度
  - 减少内存占用和计算需求
  - 例如 FP32,FP16 -> INT8 [-128, 127], INT4 [-8, 7], BIT1.5, FP16, BF16
- 量化的负面效果
  - 可能导致模型准确性下降
  - 限制某些特定任务的表现
  - 需要额外的调优以恢复性能
  - 例如: 推理模型进入无限循环
- 参照指标
  - MMMU_VAL (Accuracy)
  - DocVQA_VAL (Accuracy)
  - MMBench_DEV_EN (Accuracy)
  - MathVista_MINI (Accuracy)

| q      | bits | B->G |
| ------ | ---- | ---- |
| q4_K_M | 4    | 1x   |
| q8_0   | 8    | 2x   |
| fp16   | 16   | 4x   |

- K-quantizations
  - S, M, L
- PTQ - Post Training Quantization - 训练后量化
- QAT - Quantization Aware Training - 量化感知训练
- AWQ - Adaptive Weight Quantization
  - 保护少数显著权重，通过激活值统计确定缩放因子
  - [casper-hansen/AutoAWQ](https://github.com/casper-hansen/AutoAWQ)
- GPTQ - Generalized Post-Training Quantization - 通用后训练量化
  - 逐层重构输出，最小化量化误差 (基于二阶信息)
- GPTQ - Generalized Post-Training Quantization - 通用后训练量化
- CLAQ - Column-Level Adaptive weight Quantization - 列级自适应权重量化
