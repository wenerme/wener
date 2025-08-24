---
title: ML Glossary
tags:
  - Glossary
---

# ML Glossary

| abbr.    | stand for                                               | cn                      |
| -------- | ------------------------------------------------------- | ----------------------- |
| DCGAN    | Deep Convolutional Generative Adversarial Networks      | 深度卷积生成对抗网络    |
| GAN      | Generative Adversarial Networks                         | 生成对抗网络            |
| NLG      | Natural Language Generation                             | 自然语言生成            |
| NLP      | Natural Language Processing                             | 自然语言处理            |
| NLU      | Natural Language Understanding                          | 自然语言理解            |
| SOTA     | State of the Art                                        | 当前最先进技术          |
| DiT      | Diffusion Transformer                                   | 扩散变压器              |
| CISC     | Complex Instruction Set Computer                        | 复杂指令集计算机        |
| RISC     | Reduced Instruction Set Computer                        | 精简指令集计算机        |
| XLA      | Accelerated Linear Algebra                              | 加速线性代数            |
| HSA      | Heterogeneous System Architecture                       | 异构系统架构            |
| CUDA     | Compute Unified Device Architecture                     | 统一计算设备架构        |
| GPGPU    | General-purpose computing on graphics processing units  | 通用图形处理单元计算    |
| FLOPs    | Floating Point Operations per Second                    | 每秒浮点运算次数        |
| TOPS     | Tera Operations per Second                              | 每秒万亿次运算          |
| TFLOPs   | Tera Floating Point Operations per Second               | 每秒万亿次浮点运算      |
| NPU      | Neural Processing Unit                                  | 神经处理单元            |
| mAP      | Mean Average Precision                                  | 平均精度                |
| FMA      | Fused Multiply-Add                                      | 融合乘加                |
| MAD      | Multiply-Add                                            | 乘加                    |
| MIL      | Multiple Instance Learning                              | 多实例学习              |
| UAV      | Unmanned Aerial Vehicle                                 | 无人机, 无人驾驶飞行器  |
| LoRA     | Low-Rank Adaptation                                     | 低秩适应                |
| FSDP     | Fully Sharded Data Parallel                             | 完全分片数据并行        |
| TRL      | Transformer Reinforcement Learning                      |
| PEFT     | Performance Energy Footprint Trade-off                  | 性能能耗权衡            |
| DINO     | self-DIstillation with No Labels                        | 无标签自我蒸馏          |
| XCiT     | Cross-Covariance Image Transformer                      | 交叉协方差图像变压器    |
| ViT      | Vision Transformer                                      | 视觉变压器              |
| DISC     | Discriminator                                           | 判别器                  |
| PIL      | Python Imaging Library                                  | Python 图像处理库       |
| BERT     | Bidirectional Encoder Representations from Transformers | 双向编码器表示转换器    |
| MPC      | Multi-Party Computation                                 | 多方计算                |
| FBPCS    | Facebook Private Computation Service                    | Facebook 私有计算服务   |
| FID      | Fréchet Inception Distance                              | 弗雷歇特 Inception 距离 |
| LCM      | Latent Consistency Model                                | 潜在一致性模型          |
| LaMDA    | Language Model for Dialogue Applications                | 对话应用的语言模型      |
| TensorRT |
| OpenVINO |
| MNN      |
| TNN      |
| NCNN     |
| CRNN     | Convolutional Recurrent Neural Network                  | 卷积循环神经网络        |
| DTRB     | Deep Transformer Reinforcement Learning                 | 深度变压器强化学习      |

**Voice**

| abbr. | stand for                              | cn                       |
| ----- | -------------------------------------- | ------------------------ |
| ASR   | Automatic Speech Recognition           | 自动语音识别             |
| TTS   | Text-to-speech                         | 文本转语音               |
| SE    | Speech enhancement/separation          | 语音增强/分离            |
| ST    | Speech Translation                     | 语音翻译                 |
| MT    | Machine Translation                    | 机器翻译                 |
| VC    | Voice conversion                       | 语音转换                 |
| HWC   | Height Width Channel                   | 高度 宽度 通道           |
| CHW   | Channel Height Width                   | 通道 高度 宽度           |
| DB    | Differentiable Binarization            | 可微分二值化             |
| EAST  | Efficient Accurate Scene Text Detector | 高效准确的场景文本检测器 |
| SAST  | Segmentation-based Scene Text Detector | 基于分割的场景文本检测器 |
| NMS   | Non-Maximum Suppression                | 非极大值抑制             |
| IoU   | Intersection over Union                | 交并比                   |
| mAP   | Mean Average Precision                 | 平均精度                 |
| SRN   | Semantic Reasoning Network             | 语义推理网络             |
| STR   | scene text recognition                 | 场景文本识别             |
| SER   | Structured Entity Recognition          | 结构化实体识别           |
| RE    | Relation Extraction                    | 关系抽取                 |
| KIE   | Key Information Extraction             | 关键信息提取             |
| PSE   |

- 文本检测算法
  - DB, EAST, SAST, PSE, DB++, FCE
- 文本识别算法
  - CRNN, SRN, RARE, NETR, SAR, ViTSTR, ABINet, VisionLAN, SPIN, RobustScanner, SVTR, SVTR_LCNet
- 端到端文本检测算法
  - PGNet

**Visual**

| abbr. | stand for                               | cn                 |
| ----- | --------------------------------------- | ------------------ |
| MIM   | Masked Image Modeling                   | 掩码图像建模       |
| CLIP  | Contrastive Language-Image Pre-training | 对比语言图像预训练 |
| OOB   | Oriented Object Detection               | 有向物体检测       |
| COCO  | Common Objects in Context               | 上下文中的通用对象 |
| OKS   | Object Keypoint Similarity              | 对象关键点相似度   |

| en                   | cn       |
| -------------------- | -------- |
| Contrastive Learning | 对比学习 |
| Inpainting           | 局部重绘 |
| Outpainting          | 扩展绘制 |

- CLIP - 具有良好的通用性和可扩展性 - modular, reusable, scalable
- MIM - 适合具体的视觉任务 - 如分类、检测、分割

---

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
- CFG - Classifier Free Guidance - 无分类器引导
  - 用于控制生成图像的多样性和质量
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
- Accelerator
- 参考
  - https://www.cvat.ai/post/yolo
  - https://github.com/dair-ai/ml-visuals

## 层归一化 {#layer-norm}

- Layer Normalization - 层归一化
- 目的是在训练过程中稳定和加速神经网络的收敛。
- mean of 0 - 0 均值
  - 表示中心为 0
  - 计算逻辑： 先计算出所有数据的平均值，然后让每个数据点都减去这个平均值。
  - 数值基于平均水平来描述
  - 例如: 两个人 20 岁和 30 岁，平均年龄是 25 岁，标准化后分别为 -5 和 5，描述年龄为 相较于平均 高 5 岁 和 低 5 岁
- variance of 1 - 1 方差
  - 表示尺度标准化为 1
  - 标准差
  - 在数据变成0均值之后，再让每个数据点都除以这组数据的“标准差”。（方差是标准差的平方，所以1方差等同于1标准差）。
  - 例如: 上面标准化后分别为 -5 和 5，处理后为 -1.0 和 1.0，抛弃了 岁 的概念
- 统一特征的强度
- 含义：对每个样本沿特征维度做标准化，使该层的输入“居中并等尺度”。“0 均值”表示中心为 0；“1 方差”表示尺度标准化为 1。
- 作用：稳定数值范围与梯度，减小内部协变量偏移，加速收敛；不依赖 batch 统计，适合小批量、RNN/Transformer。
- 场景
  - Nomalization Activation - Post-LN
  - Pre-LN

$$
\mu=\frac{1}{H}\sum_{i=1}^H x_i,\quad
\sigma^2=\frac{1}{H}\sum_{i=1}^H (x_i-\mu)^2,\quad
\hat{x}_i=\frac{x_i-\mu}{\sqrt{\sigma^2+\varepsilon}},\quad
y_i=\gamma\hat{x}_i+\beta
$$

其中 γ、β 为可学习参数，ε 为数值稳定项。

## Variational Autoencoder {#vae}

- VAE - Variational Autoencoder - 变分自编码器
- Encoder - 像素空间 → 潜空间 - 图像 → 潜空间数据
  - 输入: pixels
  - 输出: latent
  - 用于 KSampler, U-Net
  - 例如: Image-to-Image
- Decoder
  - 从潜在空间的分布中采样，并解码为输出数据
  - 输入: latent
  - 输出: pixels
  - 例如: Text-to-Image

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

## ascending similarity score

## Automatic Mixed Precision

- AMP - Automatic Mixed Precision - 自动混合精度

## Fréchet Inception Distance {#fid}

- FID -> Fréchet Inception Distance
- FID score
  - 越低越好
  - 0 表示生成图像和真实图像完全相同
  - 优秀的模型 - 1-10 - 几乎无法区分，图像质量非常高
  - 一般的模型 - 10-30 - 有一定的差异，但仍能生成较高质量的图像。
  - 30-50 - 生成图像质量一般，与真实图像有明显的差异。
  - 差的模型 > 30 - 生成图像质量较差，与真实图像的分布有较大的差距。
- 评估分数
- pip:cleanfid
- 用于评估生成模型（如生成对抗网络，GAN）生成图像质量的指标。
- 计算生成图像和真实图像在特征空间中的距离，衡量生成图像与真实图像的相似性。

$$
\text{FID} = \|\mu_r - \mu_g\|^2 + \text{Tr}(\Sigma_r + \Sigma_g - 2(\Sigma_r \Sigma_g)^{1/2})
$$

- $\mu_r$ 和 $\Sigma_r$ 是真实图像的均值和协方差矩阵
- $\mu_g$ 和 $\Sigma_g$ 是生成图像的均值和协方差矩阵
- $\text{Tr}$ 表示矩阵的迹（trace）

## ViT Register

- Vision Transformers Need Registers https://arxiv.org/abs/2309.16588
  - 2023-09-28

## Differentiable Binarization

- DB - Differentiable Binarization - 可微分二值化
- 一种 基于深度学习的文本检测算法
- 它通过学习预测文本区域的概率图，并对该概率图应用二值化（binarization）操作来生成文本框。
- 主要解决了传统二值化方法（如 Otsu）在复杂场景下效果不佳的问题。
- 特点：
  - 使用 Unclip 算法扩展文本区域，以生成更精确的文本框。
  - 速度快，适合实时应用。
  - 能处理多种字体和密集文本场景。

## Efficient and Accurate Scene Text Detector

- EAST - Efficient and Accurate Scene Text Detector - 高效准确的场景文本检测器
- 一种 快速准确的场景文本检测算法
- 直接回归文本框的几何形状，而不是依赖复杂的候选区域生成过程。
- 特点：
  - 支持两种文本框输出：水平矩形框和旋转框。
  - 使用全卷积网络（FCN）和分离的特征图进行几何信息预测。
  - 没有使用传统的候选区域生成过程，简化了检测流程。

## Segmentation-based Scene Text Detector

- SAST - Segmentation-based Scene Text Detector - 基于分割的场景文本检测器
- 一种基于分割的场景文本检测算法
- 通过像素级别的分割来生成文本区域，并在后处理时进行边框提取。
- 特点：
  - 能处理复杂的场景文本（如不规则形状、弯曲文本）。
  - 提供多边形框（polygon）的输出以适应不同形状的文本。
- 优点：
  - 对于复杂场景（如街景、广告牌上的文字）表现优异。
  - 支持检测多边形边界，更灵活。

## Non-Maximum Suppression

- NMS - Non-Maximum Suppression - 非极大值抑制
- 一种后处理方法，常用于目标检测任务中，用于去除重叠过多的检测框。
- 通过保留置信度最高的检测框，并抑制其他与之重叠的检测框来优化结果。
- 工作原理：
  1.  根据预测分数（如置信度）对检测框排序。
  2.  选出置信度最高的框，将与它有较大重叠的其他框抑制（删除）。
  3.  重复上述过程直到没有检测框剩余。
- 参数：
  - IoU（Intersection over Union）阈值：决定是否将两个框视为重叠。
  - 置信度分数：用于排序。
- 应用场景：
  - 常用于目标检测（如文本检测、物体检测）以减少重复检测。
  - 例如，在检测场景文本时，NMS 可以去除检测框的冗余重叠。

## score vs confidence

- score
  - 原始分值
  - 值范围取决于模型设计
  - 用于 排序、对比
- confidence
  - 置信度
  - 通常是经过归一化的分值
  - 例如 softmax 或 sigmoid 后的值
  - 为 0 到 1 的值
  - 且所有类别的 confidence 和为 1
  - 用于 判断可信度、决策阈值
