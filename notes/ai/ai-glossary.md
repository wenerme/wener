---
tags:
  - Glossary
---

# AI Glossary

| abbr. | for                                          | cn                   |
| ----- | -------------------------------------------- | -------------------- |
| LLM   | Large Language Model                         | 大语言模型           |
| LoRA  | Language of Rules and Actions                | 语言规则与行动语言   |
| LLaMa | Large Language Model for Machine Translation | 机器翻译的大语言模型 |
| RLHF  | Reinforcement Learning from Human Feedback   | 人类反馈强化学习     |
| SFT   | Supervised Fine-tuning                       | 监督微调             |
| RM    | Reward / preference modeling                 | 奖励/偏好建模        |

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
