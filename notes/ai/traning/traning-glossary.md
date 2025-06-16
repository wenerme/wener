---
tags:
  - Glossary
---

# Training Glossary

| abbr.    | stand for                                  | meaning          |
| -------- | ------------------------------------------ | ---------------- |
| CPO      | Contextual Policy Optimization             | 上下文策略优化   |
| DoRA     | Weight-Decomposed Low-Rank Adaptation      | 动态秩适配       |
| DPO      | Direct Preference Optimization             | 直接偏好优化     |
| FSDP     | Fully Sharded Data Parallelism             | 完全分片数据并行 |
| GaLore   | Gated Low-Rank Adaptation                  | 门控低秩适配     |
| GRPO     | Group Relative Policy Optimization         | 组相对策略优化   |
| KTO      | Knowledge Transfer Optimization            | 知识迁移优化     |
| LoftQ    | LoRA-Fine-Tuning-Aware Quantization        | 低秩微调感知量化 |
| LoRA     | Low-Rank Adaptation                        | 低秩适配         |
| ORPO     | Online Relative Policy Optimization        | 在线相对策略优化 |
| P-Tuning | Prompt Tuning                              | 提示微调         |
| PEFT     | Parameter-Efficient Fine-Tuning            | 仅微调部分参数   |
| PPO      | Proximal Policy Optimization               | 近端策略优化     |
| QLoRA    | Quantized LoRA                             | 量化低秩适配     |
| ReFT     | Recurrent Fine-Tuning                      | 递归微调         |
| RLHF     | Reinforcement Learning from Human Feedback | 人类反馈强化学习 |
| RS-LoRA  | Rank-Stabilized LoRA                       | 稳定秩低秩适配   |
| RSLORA   | Rank-Stabilized LoRA                       | 稳定秩低秩适配   |
| SFT      | Supervised Fine-Tuning                     | 监督微调         |
| SimPO    | Similarity Policy Optimization             | 相似性策略优化   |

| en                                 | cn           |
| ---------------------------------- | ------------ |
| Alignment Fine-tuning              | 对齐微调     |
| Classification Model Training      | 分类模型训练 |
| Embedding Model Training           | 嵌入模型训练 |
| Fine-Tuning                        | 微调         |
| Instruction Fine-tuning            | 指令微调     |
| Instruction Supervised Fine-tuning | 指令监督微调 |
| Model Compression                  | 模型压缩     |
| Model Distillation                 | 模型蒸馏     |
| Model Optimization                 | 模型优化     |
| Model Pruning                      | 模型剪枝     |
| Post-Training                      | 后训练       |
| Pre-Training                       | 预训练       |
| Reward Model Training              | 反馈模型训练 |
| Task-Specific Fine-tuning          | 任务特定微调 |
| Transfer Learning                  | 迁移学习     |

- Full Training
  - Optimizer - 8bit
  - Gradient - 16bit
  - Weight - 16bit
- Model Pruning - 模型剪枝
  - 通过去除模型中不重要的参数或连接来减少模型的大小和计算需求。
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
