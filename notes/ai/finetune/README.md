---
tags:
  - Topic
  - Training
---

# 微调

- 为什么要微调大语言模型 (LLM)？
  - 解决特定问题：针对具体、可衡量的问题优化模型表现。
  - 提升任务质量：提高模型在特定任务上的准确性和效果。
  - 降低成本与提升速度：使用微调后的小模型可能比通用大模型更经济、更快速。
  - 优化工具调用能力：增强模型理解和执行特定工具或 API 调用的能力。
  - 增强逻辑与规则遵循：使模型更好地理解和遵循复杂的指令、逻辑和特定规则。
  - 模型蒸馏：将大型、复杂模型的知识和能力迁移到更小、更高效的模型中。
  - 改进思考与推理链：提升模型进行复杂思考、推理和形成连贯思维链条的能力。
  - 对齐人类价值观与安全要求：使模型的输出更符合人类的价值观、道德标准和安全规范。
- 如何开始微调 LLM？
  - 明确目标 (Pick a goal)：清晰定义你希望通过微调解决的具体问题或达成的性能指标。
  - 准备训练数据 (Generate training data)：收集或生成高质量的训练数据。文章提到，合成数据（Synthetic data）在微调中效果良好。
  - 训练候选模型 (Train a few candidates)：选择合适的基模型，并尝试训练几个不同的微调版本。
  - 评估关键指标 (Measure what matters)：根据你设定的目标，对微调后的模型进行严格的评估，衡量其在关键指标上的表现。

---

- toolkit
  - [InternLM/xtuner](https://github.com/InternLM/xtuner)
    - Apache-2.0, Python
  - [hiyouga/LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)
    - Apache-2.0, Python
    - Unified Efficient Fine-Tuning of 100+ LLMs & VLMs
  - [2U1/Qwen2-VL-Finetune](https://github.com/2U1/Qwen2-VL-Finetune)
    - Apache-2.0, Python
    - Liger-Kernel
  - [axolotl-ai-cloud/axolotl](https://github.com/axolotl-ai-cloud/axolotl)
    - Apache-2.0, Python
  - [unslothai/unsloth](https://github.com/unslothai/unsloth)
    - Apache-2.0, Python
  - [pytorch/torchtune](https://github.com/pytorch/torchtune)
    - Apache-2.0, Python
  - [kiln-ai/kiln](https://github.com/kiln-ai/kiln)
    - Rapid AI Prototyping and Dataset Collaboration Tool
- Eval
  - [open-compass/VLMEvalKit](https://github.com/open-compass/VLMEvalKit)
    - Apache-2.0, Python
    - evaluation toolkit of large multi-modality models (LMMs), support 220+ LMMs, 80+ benchmarks
- Example/LoRA
  - [daniel3303/StoryReasoning](https://github.com/daniel3303/StoryReasoning)
    - 多image，连续故事推理，人物识别
    - 数据集 [daniel3303/StoryReasoning](https://huggingface.co/datasets/daniel3303/StoryReasoning)
- Article/文章/参考
  - [Training a WAN or HunYuan LoRA the right way.](https://civitai.com/articles/11942)

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
| DoRA     | Weight-Decomposed Low-Rank Adaptation      | 动态秩适配       |
| RSLORA   | Rank-Stabilized LoRA                       | 稳定秩低秩适配   |
| LoftQ    | LoRA-Fine-Tuning-Aware Quantization        | 低秩微调感知量化 |
| SFT      | Supervised Fine-Tuning                     | 监督微调         |

| en                | cn       |
| ----------------- | -------- |
| Fine-Tuning       | 微调     |
| Transfer Learning | 迁移学习 |
| Post-Training     | 后训练   |

- Full Training
  - Optimizer - 8bit
  - Gradient - 16bit
  - Weight - 16bit
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

## 2U1/Qwen2-VL-Finetune

- [2U1/Qwen2-VL-Finetune](https://github.com/2U1/Qwen2-VL-Finetune)
  - Apache-2.0, Python, Liger-Kernel, DeepSpeed
  - ⚠️ Liger-kernel 不支持 QLoRA
- dataset
  - --data_path data.json
  - --image_folder

```json
[
  {
    "id": "000000033471",
    "image": ["000000033471.jpg", "000000033472.jpg"],
    "conversations": [
      {
        "from": "human",
        "value": "<image>\n<image>\nIs the perspective of the camera differnt?"
      },
      {
        "from": "gpt",
        "value": "Yes, It the perspective of the camera is different."
      }
    ]
  }
]
```

```bash
git clone https://github.com/2U1/Qwen2-VL-Finetune
cd Qwen2-VL-Finetune
uv venv --python 3.11
uv pip install -r requirements.txt -f https://download.pytorch.org/whl/cu124
uv pip install qwen-vl-utils
uv pip install flash-attn --no-build-isolation

# 复制脚本 自行修改后使用
# 修改 data-path, image-folder, MODEL_NAME
cp scripts/finetune.sh ft.sh

# 参考脚本
# Full Finetuning
bash scripts/finetune.sh
# LoRA Finetuning
bash scripts/finetune_lora.sh
# LoRA Finetuning language model & vision model
bash scripts/finetune_lora_vision.sh

# for Video
bash scripts/finetune_video.sh

bash scripts/merge_lora.sh
```

- https://github.com/2U1/Qwen2-VL-Finetune
