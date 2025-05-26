---
tags:
  - Topic
---

# 微调

# Awesome

- [hiyouga/LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)
  - Apache-2.0, Python
  - Unified Efficient Fine-Tuning of 100+ LLMs & VLMs
- [2U1/Qwen2-VL-Finetune](https://github.com/2U1/Qwen2-VL-Finetune)
  - Apache-2.0, Python
  - Liger-Kernel

# Glossary

| abbr.    | stand for                                  | meaning          |
| -------- | ------------------------------------------ | ---------------- |
| PEFT     | Parameter-Efficient Fine-Tuning            | 仅微调部分参数   |
| LoRA     | Low-Rank Adaptation                        | 低秩适配         |
| QLoRA    | Quantized LoRA                             | 量化低秩适配     |
| P-Tuning | Prompt Tuning                              | 提示微调         |
| DPO      | Direct Preference Optimization             | 直接偏好优化     |
| GRPO     | Group Relative Policy Optimization         | 组相对策略优化   |
| RLHF     | Reinforcement Learning from Human Feedback | 人类反馈强化学习 |

| en                | cn       |
| ----------------- | -------- |
| Fine-Tuning       | 微调     |
| Transfer Learning | 迁移学习 |
| Post-Training     | 后训练   |

- LoRA (Low-Rank Adaptation) - 低秩适配
  - 通过在预训练模型的基础上，添加低秩矩阵来实现微调。
  - PEFT 技术
  - 不直接修改模型原有的巨大权重矩阵，而是在模型的特定层（通常是Transformer的注意力层）旁边注入两个较小的、可训练的“低秩”矩阵 (A和B)。
  - 优点：
    - 大幅减少可训练参数：使得在有限资源下微调大模型成为可能。
    - 更小的存储需求：微调后只需要保存很小的LoRA权重文件，而不是整个模型的副本。
    - 快速切换任务：可以为不同任务训练不同的LoRA适配器，加载不同的适配器即可切换模型行为。
    - 减少灾难性遗忘：由于不改动原始权重，模型在预训练任务上的表现通常能得到较好保留。
- QLoRA (Quantized LoRA) - 量化低秩适配
  - 在LoRA的基础上，进一步对低秩矩阵进行量化，以减少模型的内存占用和计算开销。
- DPO (Direct Preference Optimization) - 直接偏好优化
  - RLHF 技术
  - 利用 👍👎 反馈来优化模型输出。
  - 优点
    - 实现简单
    - 训练稳定
    - 效果有竞争力
- GRPO (Group Relative Policy Optimization) - 组相对策略优化
  - 基于偏好对齐的策略优化方法
  - 在 DPO 的基础上，进一步引入了组偏好信息。
- DeepSpeed ZeRO - Zero Redundancy Optimizer
  - 显存优化,训练远超单个GPU显存容量的巨大模型
  - stage
    - 对优化器状态进行切分（例如Adam优化器的momentum和variance）
    - 对梯度也进行切分
    - 将模型参数本身也进行切分。每个GPU只保留当前计算层所需的参数，其他参数在使用时动态聚合。
  - ZeRO-Offload
    - 将部分或全部被切分的状态（参数、梯度、优化器状态）进一步卸载到CPU内存中，进一步降低GPU显存需求。
