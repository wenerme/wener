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
| LoRA   | Low-Rank Adaptation                                    | 低秩适应               |
| FSDP   | Fully Sharded Data Parallel                            | 完全分片数据并行       |
| TRL    | Transformer Reinforcement Learning                     |
| PEFT   | Performance Energy Footprint Trade-off                 | 性能能耗权衡           |

| abbr. | stand for                     | cn            |
| ----- | ----------------------------- | ------------- |
| ASR   | Automatic Speech Recognition  | 自动语音识别  |
| TTS   | Text-to-speech                | 文本转语音    |
| SE    | Speech enhancement/separation | 语音增强/分离 |
| ST    | Speech Translation            | 语音翻译      |
| MT    | Machine Translation           | 机器翻译      |
| VC    | Voice conversion              | 语音转换      |

- ClassicML
  - Regression
  - Classification
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
  - Cascade R-CNN
  - Hybrid Task Cascade (HTC)
- VAE - Variational Autoencoder
- PixelCNN
- 2 steps to detect objects
  - Detect the object regions
  - Classify the objects in those regions
- YOLO - by Joseph Redmond et al in 2015
  - 单步骤、不需要 regions
- panoptic segmentation
- Densepose
- Cascade R-CNN
- rotated bounding boxes
- PointRend
- DeepLab
- ViTDet - Vision Transformer Detector
- MViTv2 - Mobile Video Transformer v2
- f-BRS - Feature backpropagating refinement scheme
- SAM - Segment Anything Model
- DEXTR - Deep extreme cut
- HRNet - High Resolution Net
- [foolwood/SiamMask](https://github.com/foolwood/SiamMask)
  - Fast Online Object Tracking and Segmentation: A Unifying Approach
  - CVPR2019
- Conv2d - 2D Convolution Layer - 2D 卷积层
- LeakyReLU - Leaky Rectified Linear Unit - 泄漏整流线性单元
- BatchNorm2d - 2D Batch Normalization - 2D 批量归一化
- Sigmoid - Sigmoid Activation Function - Sigmoid 激活函数
- ReLU - Rectified Linear Unit - 线性整流单元
- ConvTranspose2d - 2D Transposed Convolution Layer - 2D 转置卷积层
- 参考
  - https://www.cvat.ai/post/yolo
  - https://github.com/dair-ai/ml-visuals

## Types of AI Agents

- Simple Reflex Agent
- Model-based reflex agent
- Goal-based agents
- Utility-based agent
- Learning agent

## 损失函数 {#loss-function}

- loss function - 损失函数
- 评估模型性能
- 衡量模型预测的输出与真实值之间的差异。通过 \*\*最小化损失函数的值，模型的性能得到优化。
- 常见
  - MSE - Mean Squared Error - 均方误差
    - 回归问题
  - Cross Entropy Loss - 交叉熵损失
    - 分类问题
  - BCE Loss - Binary Cross-Entropy Loss - 二元交叉熵损失
    - GAN

---

**均方误差（Mean Squared Error, MSE）**

主要用于回归问题，计算预测值与真实值之间差的平方和的平均值。

$$
\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

其中，$y_i$ 是真实值，$\hat{y}_i$ 是预测值。

**交叉熵损失（Cross Entropy Loss）**

主要用于分类问题，衡量两个概率分布之间的差异。

$$
\text{Cross Entropy} = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]
$$

其中，$y_i$ 是真实标签，$\hat{y}_i$ 是预测概率。

## 优化器 {#optimizer}

- 调整模型参数（例如神经网络中的权重和偏置），来最小化（或最大化）损失函数，从而提高模型的性能。
- 优化算法
  - Gradient Descent - 梯度下降
- 常见的优化器
  - SDG - Stochastic Gradient Descent - 随机梯度下降
  - SGD with Momentum - 带动量的随机梯度下降
  - RMSprop - Root Mean Square Propagation - 均方根传播
  - Adam - Adaptive Moment Estimation - 自适应矩估计
    - 目前最流行的优化器之一，它结合了动量法和RMSprop的优点，具有较快的收敛速度和较好的性能
