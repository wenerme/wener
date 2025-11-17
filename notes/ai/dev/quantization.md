---
title: Quantization
---

# Quantization

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
- IQ - Importance-aware Quantization
  - NL - No Limit
  - XS - eXtra Small
- PTQ - Post Training Quantization - 训练后量化
- QAT - Quantization Aware Training - 量化感知训练
- AWQ - Adaptive Weight Quantization
  - 保护少数显著权重，通过激活值统计确定缩放因子
  - [casper-hansen/AutoAWQ](https://github.com/casper-hansen/AutoAWQ)
- GPTQ - Generalized Post-Training Quantization - 通用后训练量化
  - 逐层重构输出，最小化量化误差 (基于二阶信息)
- GPTQ - Generalized Post-Training Quantization - 通用后训练量化
- CLAQ - Column-Level Adaptive weight Quantization - 列级自适应权重量化
- vllm
  - aqlm,awq,deepspeedfp,tpu_int8,fp8,ptpc_fp8,fbgemm_fp8,modelopt,nvfp4,marlin,bitblas,gguf,gptq_marlin_24,gptq_marlin,gptq_bitblas,awq_marlin,gptq,compressed-tensors,bitsandbytes,qqq,hqq,experts_int8,neuron_quant,ipex,quark,moe_wna16,torchao

| method             | bits       | notes                                                                                                                      |
| :----------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------- |
| aqlm               | 2, 3, 4    | 加法量化，据称在低位数下表现良好。                                                                                         |
| awq                | 4          | Activation-aware Weight Quantization，一种流行的 4 位量化方法。                                                            |
| deepspeedfp        | 8/16       | DeepSpeed 提供的浮点量化支持，可能包括 FP8, FP16 等。                                                                      |
| tpu_int8           | 8          | 针对 Google TPU 优化的 INT8 量化。                                                                                         |
| fp8                | 8          | 8 位浮点数表示，有不同的格式 (如 E4M3, E5M2)。                                                                             |
| ptpc_fp8           | 8          | Post-Training Per-Channel FP8 量化。                                                                                       |
| fbgemm_fp8         | 8          | 使用 FBGEMM (Facebook General Matrix Multiply) 库的 FP8 量化。                                                             |
| modelopt           | 多种       | NVIDIA Model Optimizer，支持包括 INT4, INT8, FP8 在内的多种量化方案。                                                      |
| nvfp4              | 4          | NVIDIA 提出的 FP4 格式，用于超低精度推理。                                                                                 |
| marlin             | 4          | 针对 NVIDIA GPU 的 GPTQ 优化内核，通常用于 4 位量化。                                                                      |
| bitblas            | 1-8        | 高度优化的位级 GEMM 操作库，支持多种位宽。                                                                                 |
| gguf               | 2-8+       | Georgi Gerganov Universal Format，常用于 llama.cpp，支持多种量化级别 (如 q2_K, q3_K_S, q4_0, q4_K_M, q5_K_M, q6_K, q8_0)。 |
| gptq_marlin_24     | 4          | 结合了 GPTQ 和 Marlin 的优化，针对特定配置 (如24个样本的校准)。                                                            |
| gptq_marlin        | 4          | GPTQ 算法与 Marlin 内核的结合，用于高效的 4 位推理。                                                                       |
| gptq_bitblas       | 4          | GPTQ 算法与 BitBLAS 内核的结合。                                                                                           |
| awq_marlin         | 4          | AWQ 算法与 Marlin 内核的结合。                                                                                             |
| gptq               | 2, 3, 4, 8 | Post-Training Quantization 方法，常用于 3 位或 4 位量化。                                                                  |
| compressed-tensors | 多种       | 通用术语，指用于减小模型大小的压缩张量技术，可能包含多种量化方法。                                                         |
| bitsandbytes       | 8, 4 (NF4) | 流行的量化库，支持 8 位量化和 4 位 NormalFloat (NF4) 等。                                                                  |
| qqq                | 2, 3, 4    | 可能是指特定的量化库或算法，位数需要具体确认。                                                                             |
| hqq                | 2, 3, 4    | Half-Quadratic Quantization，一种较新的量化方法，旨在平衡精度和压缩率。                                                    |
| experts_int8       | 8          | 针对 MoE (Mixture of Experts) 模型中的 Experts 部分进行 INT8 量化。                                                        |
| neuron_quant       | 8, 16      | 针对 AWS Inferentia/Trainium (Neuron) 芯片的量化。                                                                         |
| ipex               | 8          | Intel Extension for PyTorch，支持 INT8 量化等针对 Intel CPU 和 GPU 的优化。                                                |
| quark              | 2, 4       | 一种据称能保持较高准确率的低位量化方法。                                                                                   |
| moe_wna16          | 16         | 针对 MoE 模型的权重和激活使用 16 位量化 (可能是 FP16 或 BF16)。                                                            |
| torchao            | 多种       | PyTorch Applied Overlap，一个用于模型优化的库，支持包括量化在内的多种技术。具体位数取决于所使用的量化算法。                |

- bnb - bitsandbytes
  - 加载 4bit, VRAM, 反量化为 16bit
- Dynamic 2.0 Quants
  - CUDA 内核, 即时反量化
- otfq - Optimized Tensor Float Quantization
  - 8-bit, 4-bit, 2-bit
