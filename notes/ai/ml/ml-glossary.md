---
title: ML Glossary
tags:
  - Glossary
---

# ML Glossary

| abbr.  | stand for                                              | cn                     |
| ------ | ------------------------------------------------------ | ---------------------- |
| DCGAN  | Deep Convolutional Generative Adversarial Networks     | 深度卷积生成对抗网络   |
| GAN    | Generative Adversarial Networks                        | 生成对抗网络           |
| NLG    | Natural Language Generation                            | 自然语言生成           |
| NLP    | Natural Language Processing                            | 自然语言处理           |
| NLU    | Natural Language Understanding                         | 自然语言理解           |
| SOTA   | State of the Art                                       | 当前最先进技术         |
| DiT    | Diffusion Transformer                                  | 扩散变压器             |
| CISC   | Complex Instruction Set Computer                       | 复杂指令集计算机       |
| RISC   | Reduced Instruction Set Computer                       | 精简指令集计算机       |
| XLA    | Accelerated Linear Algebra                             | 加速线性代数           |
| HSA    | Heterogeneous System Architecture                      | 异构系统架构           |
| CUDA   | Compute Unified Device Architecture                    | 统一计算设备架构       |
| GPGPU  | General-purpose computing on graphics processing units | 通用图形处理单元计算   |
| FLOPs  | Floating Point Operations per Second                   | 每秒浮点运算次数       |
| TOPS   | Tera Operations per Second                             | 每秒万亿次运算         |
| TFLOPs | Tera Floating Point Operations per Second              | 每秒万亿次浮点运算     |
| NPU    | Neural Processing Unit                                 | 神经处理单元           |
| mAP    | Mean Average Precision                                 | 平均精度               |
| FMA    | Fused Multiply-Add                                     | 融合乘加               |
| MAD    | Multiply-Add                                           | 乘加                   |
| MIL    | Multiple Instance Learning                             | 多实例学习             |
| UAV    | Unmanned Aerial Vehicle                                | 无人机, 无人驾驶飞行器 |

- FLOPs - 浮点数运算次数
  - 衡量模型的计算复杂度和硬件的浮点运算性能
- TOPS - 所有类型的运算次数
  - 全面地反映硬件的整体计算能力
- MAD - Multiply-Add - 乘加运算
  - 先乘后加，用于加速向量和矩阵计算。
- FMA - Fused Multiply-Add - 融合乘加运算
  - 单指令完成乘加，提供更高的效率和精度。
  - Intel Haswell+, AVX2
- Half precision Tensor Core FP32 Accumulate
- Single precision (MAD or FMA)
- Double precision (FMA)
- Average Precision (mAP)
- TrackerMIL
  - MIL - Multiple Instance Learning
  - Bag
  - OpenCV [TrackerMIL](https://docs.opencv.org/4.x/d0/d26/classcv_1_1TrackerMIL.html)
- CNN - Convolutional Neural Network - 卷积神经网络
- region-based algorithms
  - R-CNN - 2014
    - selective search to cluster similar pixels into regions and generate a set of region proposals
    - -> CNN
  - Fast R-CNN
    - ROI pooling to extract the region proposals
    - -> several fully connected layers for classification and bounding box regression
  - Faster R-CNN
    - ~~selective search~~
    - Region Proposal Network
  - RFCN
  - Mask R-CNN
- 2 steps to detect objects
  - Detect the object regions
  - Classify the objects in those regions
- YOLO - by Joseph Redmond et al in 2015
  - 单步骤、不需要 regions
- https://www.cvat.ai/post/yolo

## Types of AI Agents

- Simple Reflex Agent
- Model-based reflex agent
- Goal-based agents
- Utility-based agent
- Learning agent

## Region-CNN R-CNN
