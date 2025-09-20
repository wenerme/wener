---
tags:
  - Glossary
---

# AI Glossary

| abbr.     | for                                             | cn                   |
| --------- | ----------------------------------------------- | -------------------- |
| AED       | Automatic Emotion Detection                     | 自动情感检测         |
| AI        | Artificial Intelligence                         | 人工智能             |
| ASR       | Automatic Speech Recognition                    | 自动语音识别         |
| CE        | Cross Entropy                                   | 交叉熵               |
| CLIP      | Contrastive Language-Image Pretraining          | 对比语言-图像预训练  |
| ERP       | erotic role playing                             | 情色角色扮演         |
| FLCE      | Fused Linear Cross Entropy                      | 融合线性交叉熵       |
| FSDP      | Fully Sharded Data Parallel                     | 完全分片数据并行     |
| GeGLU     | Gated Linear Unit                               | 门控线性单元         |
| GELAN     | Generalized Efficient Layer Aggregation Network | 通用高效层聚合网络   |
| GME       | Generalized Multimodal Encoder                  | 通用多模态编码器     |
| GPT       | Generative Pre-trained Transformer              | 生成型预训练变换模型 |
| GTE       | Generalized Text Encoder                        | 通用文本编码器       |
| ITN       | Inverse Text Normalization                      | 逆文本规范化         |
| LayerNorm | Layer Normalization                             | 层归一化             |
| LID       | Language Identification                         | 语言识别             |
| LLaMa     | Large Language Model for Machine Translation    | 机器翻译的大语言模型 |
| LLM       | Large Language Model                            | 大语言模型           |
| LoRA      | Language of Rules and Actions                   | 语言规则与行动语言   |
| LRM       | Large Reasoning Models                          | 大型推理模型         |
| MLP       | Multi-Layer Perceptron                          | 多层感知机           |
| MRoPE     | Multimodal Rotary Position Embedding            | 多模态旋转位置嵌入   |
| PGI       | Programmable Gradient Information               | 可编程梯度信息       |
| QLoRA     | Quantized Low-Rank Adaptation                   | 量化低秩适配         |
| RLHF      | Reinforcement Learning from Human Feedback      | 人类反馈强化学习     |
| RM        | Reward / preference modeling                    | 奖励/偏好建模        |
| RMSNorm   | Root Mean Square Normalization                  | 均方根归一化         |
| RoPE      | Rotary Position Embedding                       | 旋转位置嵌入         |
| RTF       | Real-Time Factor                                | 实时因子             |
| SDXL      | Stable Diffusion XL                             | 稳定扩散 XL          |
| SER       | Speech Emotion Recognition                      | 语音情感识别         |
| SFT       | Supervised Fine-tuning                          | 监督微调             |
| SOTA      | State of the Art                                | 最新技术             |
| STT       | Speech to Text                                  | 语音转文本           |
| SwiGLU    | Swish-Gated Linear Unit                         | Swish 门控线性单元   |
| TTS       | Text to Speech                                  | 文本转语音           |
| VAD       | Voice Activity Detection                        | 语音活动检测         |
| ViT       | Vision Transformer                              | 视觉变换器           |
| WFST      | Weighted Finite-State Transducer                | 加权有限状态转换器   |
| YaRN      | Yet another RoPE extensioN method               | 另一种 RoPE 扩展方法 |
| YOLO      | You Only Look Once                              |                      |
| MaaS      | Model as a Service                              | 模型即服务           |

- ITN
  - 口语 -> 书面语 - 符合 自然书写习惯
- RTF - Real-Time Factor - 实时因子
  - 语音识别中的速度指标，表示每秒识别的时间长度，RTF 越小越好，1 表示实时识别，0.5 表示 2 倍速识别
- Embodied AI - 具身人工智能
  - 智能系统需要一个“身体”（物理实体）来与世界进行直接的交互
  - 通过这种交互来感知、行动、学习和理解世界
  - 不仅仅是处理抽象数据，而是将AI算法植入到能够感知和行动的物理系统中
  - 这个“身体”可以是机器人，也可以是自动驾驶汽车，甚至是智能建筑中的传感器和执行器网络。
- Embodied Robotics - 具身机器人学/具身机器人
- Embodied
  - Embodiment - 物理实体
  - Perception and Action - 感知与行动
  - Interaction with Environment - 环境交互
  - Situated Learning - 情境学习
- open-vocabulary detection
  - 开放词汇检测
  - 识别和处理未在训练数据中出现过的词汇或短语的能力
- CAM (Class Activation Mapping)（Heatmap）
  - 类激活映射
  - 用于可视化卷积神经网络（CNN）在图像分类任务中关注的区域
  - 通过将特定类别的预测与输入图像的特征图进行关联，生成热力图，显示模型在做出决策时关注的图像区域
  - 模型可解释性
- diffusion
  - 一种技术范式，广义概念
  - 扩散过程
  - 加噪-去噪
  - High Concentration -> Low Concentration
  - 物理上: Passive, Concentration Gradient, Temperature, Surface Area
  - 通常在像素空间 (Pixel Space) 直接操作
- Stable Diffusion
  - 一种特定的扩散模型/应用，专注于图像生成任务
  - 在潜空间 (Latent Space) 中操作
    - e.g. 512x512 pixels -> 64x64 latent
  - 引入 VAE
  - 引入 文本引导（Text-Conditioning） - CLIP
- VAE - Variational Autoencoder - 变分自编码器
- ControlNet
  - [lllyasviel/ControlNet](https://github.com/lllyasviel/ControlNet)

| en               | cn       |
| ---------------- | -------- |
| Stable Diffusion | 稳定扩散 |
| Speech Synthesis | 语音合成 |
| Voice Synthesis  | 语音合成 |

## LLM 参数

- temperature - 温度
  - 可以控制词元选择的随机性。较低的温度适合希望获得真实或正确回复的提示，而较高的温度可能会引发更加多样化或意想不到的结果。
  - 温度为 0 表示回复是确定的：系统始终会选择概率最高的词元。对于大多数应用场景，不妨先试着将温度设为 0.2。
- top-k - 顶部 k
  - 可更改模型选择输出词元的方式。
  - 如果 Top-k 设为 1，表示所选词元是模型词汇表的所有词元中概率最高的词元（也称为贪心解码）。
  - 如果 Top-k 设为 3，则表示系统将从 3 个概率最高的词元（通过温度确定）中选择下一个词元。
- top-p - 顶部 p
  - 可更改模型选择输出词元的方式。系统会按照概率从最高到最低的顺序选择词元，直到所选词元的概率总和等于 Top-p 的值。
  - 例如，如果词元 A、B 和 C 的概率分别是 0.3、0.2 和 0.1，并且 Top-p 的值为 0.5，则模型将选择 A 或 B 作为下一个词元（通过温度确定）。Top-p 的默认值为 0.8。
- repetition_penalty - 重复惩罚
- presence_penalty - 出现惩罚
- frequency_penalty - 频率惩罚
- logit_bias - 对数偏差
- max_tokens / max_completion_tokens - 最大 token 数量
  - 限制最大 token 数量，1 token 大约 4 字母，0.5 个汉字
- stop - 停止序列
- n - 生成 n 个结果

## MaaS vs Aggregator

| spec     | MaaS                               | AI Gateway / Aggregator                          |
| :------- | :--------------------------------- | :----------------------------------------------- |
| 角色     | 模型生产者、直供方 (Producer)      | 模型路由器、中间商、聚合平台 (Router/Aggregator) |
| 提供     | 自家或独家托管的 AI 模型 API       | 访问**多家**模型提供商的**统一 API**             |
| 托管模型 | **是**，自己运行和维护模型         | **否**，它只是请求的转发者 (Proxy/Forwarder)     |
| API 密钥 | 每个厂商都需要一个独立的 Key       | 只需要一个网关/聚合器的 Key                      |
| 计费方式 | 直接向模型厂商付费                 | 通过网关/聚合器统一结算                          |
| 主要价值 | 提供强大的、独特的模型**核心能力** | 提供**便利性、选择多样性、成本优化、可靠性**     |
| 比喻     | 航空公司                           | 机票聚合平台                                     |

- MaaS
  - e.g. OpenAI, Anthropic, Google, Mistral AI
- Aggregator
  - e.g. OpenRouter, LiteLLM, Portkey.ai, Martian
