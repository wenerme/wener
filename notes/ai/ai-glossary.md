---
tags:
  - Glossary
---

# AI Glossary

| abbr. | for                                             | cn                   |
| ----- | ----------------------------------------------- | -------------------- |
| AI    | Artificial Intelligence                         | 人工智能             |
| ERP   | erotic role playing                             | 情色角色扮演         |
| GELAN | Generalized Efficient Layer Aggregation Network | 通用高效层聚合网络   |
| GPT   | Generative Pre-trained Transformer              | 生成型预训练变换模型 |
| LLaMa | Large Language Model for Machine Translation    | 机器翻译的大语言模型 |
| LLM   | Large Language Model                            | 大语言模型           |
| LoRA  | Language of Rules and Actions                   | 语言规则与行动语言   |
| PGI   | Programmable Gradient Information               | 可编程梯度信息       |
| RLHF  | Reinforcement Learning from Human Feedback      | 人类反馈强化学习     |
| RM    | Reward / preference modeling                    | 奖励/偏好建模        |
| SDXL  | Stable Diffusion XL                             | 稳定扩散 XL          |
| SFT   | Supervised Fine-tuning                          | 监督微调             |
| SOTA  | State of the Art                                | 最新技术             |
| YOLO  | You Only Look Once                              |                      |
| ASR   | Automatic Speech Recognition                    | 自动语音识别         |
| TTS   | Text to Speech                                  | 文本转语音           |
| STT   | Speech to Text                                  | 语音转文本           |
| VAD   | Voice Activity Detection                        | 语音活动检测         |
| WFST  | Weighted Finite-State Transducer                | 加权有限状态转换器   |
| LID   | Language Identification                         | 语言识别             |
| SER   | Speech Emotion Recognition                      | 语音情感识别         |
| AED   | Automatic Emotion Detection                     | 自动情感检测         |
| RTF   | Real-Time Factor                                | 实时因子             |
| ITN   | Inverse Text Normalization                      | 逆文本规范化         |

- ITN
  - 口语 -> 书面语 - 符合 自然书写习惯
- RTF - Real-Time Factor - 实时因子
  - 语音识别中的速度指标，表示每秒识别的时间长度，RTF 越小越好，1 表示实时识别，0.5 表示 2 倍速识别

| en               | cn       |
| ---------------- | -------- |
| Stable Diffusion | 稳定扩散 |
| Speech Synthesis | 语音合成 |
| Voice Synthesis  | 语音合成 |

## 精度 {#precision}

| type | byte |        dynamic | 训练中常见用途                         | GPU支持性        |
| ---- | ---- | -------------: | -------------------------------------- | ---------------- |
| FP64 | 8    | 极高（~10³⁰⁸） | 科学计算、极端精度需求，极少用于DL训练 | 较弱，性能低     |
| FP32 | 4    |    高（~10³⁸） | 中小型模型训练，混合精度中的关键操作   | 广泛支持         |
| FP16 | 2    |     低（~10⁴） | 大模型训练（需损失缩放），推理优化     | Tensor Core 加速 |
| BF16 | 2    |    高（~10³⁸） | 大模型训练主流，数值稳定               | A100/H100 优化   |

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

## LLM 参数

- temperature
  - 可以控制词元选择的随机性。较低的温度适合希望获得真实或正确回复的提示，而较高的温度可能会引发更加多样化或意想不到的结果。
  - 温度为 0 表示回复是确定的：系统始终会选择概率最高的词元。对于大多数应用场景，不妨先试着将温度设为 0.2。
- top-k
  - 可更改模型选择输出词元的方式。
  - 如果 Top-k 设为 1，表示所选词元是模型词汇表的所有词元中概率最高的词元（也称为贪心解码）。
  - 如果 Top-k 设为 3，则表示系统将从 3 个概率最高的词元（通过温度确定）中选择下一个词元。
- top-p
  - 可更改模型选择输出词元的方式。系统会按照概率从最高到最低的顺序选择词元，直到所选词元的概率总和等于 Top-p 的值。
  - 例如，如果词元 A、B 和 C 的概率分别是 0.3、0.2 和 0.1，并且 Top-p 的值为 0.5，则模型将选择 A 或 B 作为下一个词元（通过温度确定）。Top-p 的默认值为 0.8。
- presence_penalty
- frequency_penalty
- logit_bias
- max_tokens
  - 限制最大 token 数量，1 token 大约 4 字母，0.5 个汉字
- stop
  - 停止序列
- n
  - 生成 n 个结果
