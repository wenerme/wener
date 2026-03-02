---
tags:
  - Model
---

# QwenLM

- [QwenLM](https://github.com/QwenLM)
- [Qwen 3 Embeding](#qwen-3-embedding)
- [Qwen 3](#qwen-3)
- [Qwen2.5-Omni](https://github.com/QwenLM/Qwen2.5-Omni)
  - 3b, 7b
  - 32k(30k input + 2k output)
  - text, audio, image, video, natural speech interaction
  - audio
    - 1s/25token
    - 输入 3分钟
    - 输出 普通话/英语
    - 音色 Ethan, Chelsie
    - 商业版额外支持 Cherry, Serena
  - image 28x28/token, 最少 4token, 最大 1280 token
  - hf [Qwen2.5-Omni](https://huggingface.co/collections/Qwen/qwen25-omni-67de1e5f0f9464dc6314b36e)
  - https://help.aliyun.com/zh/model-studio/qwen-omni
- [Qwen 2.5 VL](#qwen-25-vl)
- QvQ - QWen visual reasoning
- QwQ - QWen question answering
- Qwen - 大模型
- [QwenLM/Qwen-VL](https://github.com/QwenLM/Qwen-VL)
  - 有很多基于 Qwen VL finetune 的模型
  - https://huggingface.co/reducto/RolmOCR
- [Tongyi-Zhiwen](https://github.com/Tongyi-Zhiwen)
- [Tongyi-Zhiwen/QwenLong-L1](https://github.com/Tongyi-Zhiwen/QwenLong-L1)
  - Reasoning, 长上下文推理, DocQA
  - base R1-Distill-Qwen-14B, R1-Distill-Qwen-32B
  - SFT, RL
  - 渐进式上下文扩展（progressive context scaling）
  - 数据集 [DocQA-RL-1.6K](https://huggingface.co/datasets/Tongyi-Zhiwen/DocQA-RL-1.6K)

## Qwen 3.5

发布于 2026 年初（2 月中旬开始陆续释放），主打 **MoE (Mixture-of-Experts) 稀疏混合专家架构**与强大的多模态早期融合训练，旨在直接对标国际前沿模型（如 GPT-5, Claude 4.5 Opus）。

**核心版本：**

| 模型版本              | 定位 / 特点                                |
| --------------------- | ------------------------------------------ |
| **Qwen3.5-397B-A17B** | 旗舰开源模型，兼顾极致性能与推理效率       |
| **Qwen3.5-122B-A10B** | 中大体量模型，平衡性能与资源开销           |
| **Qwen3.5-35B-A3B**   | 极具性价比的轻量模型，适合边缘或轻量级部署 |
| **Qwen3.5-27B**       | 基础稠密模型，保持卓越的通用基础能力       |

**采样参数建议：**

| 模式                  | Temperature | TopP | TopK | MinP | Presence Penalty | Repetition Penalty |
| :-------------------- | :---------- | :--- | :--- | :--- | :--------------- | :----------------- |
| Thinking mode general | 1.0         | 0.95 | 20   | 0.0  | 1.5              | 1.0                |
| Thinking mode coding  | 0.6         | 0.95 | 20   | 0.0  | 0.0              | 1.0                |
| Instruct general      | 0.7         | 0.8  | 20   | 0.0  | 1.5              | 1.0                |
| Instruct reasoning    | 1.0         | 0.95 | 20   | 0.0  | 1.5              | 1.0                |

- https://huggingface.co/collections/Qwen/qwen35

**架构与特性进化：**

- Self-Speculative Decoding (自参考推测解码)
- **原生超长上下文**：开源模型原生支持 262K (262,144) 词元的上下文窗口，而商业版（Qwen3.5-Plus 等）可扩展至 1M+ (超百万) 词元。
- **高效混合架构**：结合了门控线性注意力机制（Gated Delta Networks）与 MoE，使得模型在保持深度（60层）的同时拥有 512 个专家网络（每次动态路由至其中约 10 个）。
- **统一视觉-语言基础**：不再是分别训练后组合，而是从零开始即支持文本、图像与视频的多模态联合训练（Early Fusion）。
- **面向 Agent 时代**：特别强化了编程推理、多智能体交互协同以及在仿真环境下的强化学习训练。集成支持约 201 种全球语言和方言。
- 许可协议：除特殊说明外，保持对开发者友好的 Apache 2.0 开源协议。

## Qwen3 VL

- https://github.com/QwenLM/Qwen3-VL
- 用回了绝对坐标
  - https://github.com/QwenLM/Qwen3-VL/issues/1623

## Qwen 3 Embedding

- [QwenLM/Qwen3-Embedding](https://github.com/QwenLM/Qwen3-Embedding)

## Qwen 3

- Dense & MoE: 0.6B, 2B, 4B, 8B, 30B, 30B-A3B, 235B-A22B
- 100+ 语言和方言
- Reasoning
- 30b-a3b
  - MoE, 单个 token 计算只使用 3B 参数
  - 速度快
  - UD-Q4_K_XL
- [QwenLM/Qwen3](https://github.com/QwenLM/Qwen3)
- Qwen3 Technical Report
  - https://arxiv.org/abs/2505.09388
- Instrut
  - Temperature=0.7, TopP=0.8, TopK=20, MinP=0
- Thinking
  - Temperature=0.6, TopP=0.95, TopK=20, MinP=0

## Qwen 2.5 VL

- [QwenLM/Qwen2.5-VL](https://github.com/QwenLM/Qwen2.5-VL)
- https://arxiv.org/abs/2502.13923
- Language
  - 1D RoPE -> Multimodal Rotary Position Embedding Aligned to Absolute Time
- Vision
  - 2D-RoPE, window attention
  - ViT 28
  - 14×14 patch size
- MLP-based Vision-Language Merger
  - MLP - multi-layer perceptron - 多层感知机
- Collection [Qwen2.5-VL](https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5)
  - 3B, 7B, 32B, 72B
- [Alibaba-NLP/VRAG](https://github.com/Alibaba-NLP/VRAG)
  - hf [autumncc/Qwen2.5-VL-7B-VRAG](https://huggingface.co/autumncc/Qwen2.5-VL-7B-VRAG)
  - https://arxiv.org/pdf/2505.22019
- [reducto/RolmOCR](https://huggingface.co/reducto/RolmOCR)
  - based on Qwen2.5-VL-7B
  - finetune on https://huggingface.co/datasets/allenai/olmOCR-mix-0225
  - 主要是 文档 OCR
- [Fancy-MLLM/R1-Onevision-7B](https://huggingface.co/Fancy-MLLM/R1-Onevision-7B)
  - 包含 3B, 7B, 32B
  - 图像是 518 px
  - 数据集 [Fancy-MLLM/R1-Onevision](https://huggingface.co/datasets/Fancy-MLLM/R1-Onevision)
  - CoT

| Configuration                  | Qwen2.5-VL-3B   | Qwen2.5-VL-7B   | Qwen2.5-VL-72B  |
| :----------------------------- | :-------------- | :-------------- | :-------------- |
| **Vision Transformer (ViT)**   |                 |                 |                 |
| Hidden Size                    | 1280            | 1280            | 1280            |
| # Layers                       | 32              | 32              | 32              |
| # Num Heads                    | 16              | 16              | 16              |
| Intermediate Size              | 3456            | 3456            | 3456            |
| Patch Size                     | 14              | 14              | 14              |
| Window Size                    | 112             | 112             | 112             |
| Full Attention Block Indexes   | {7, 15, 23, 31} | {7, 15, 23, 31} | {7, 15, 23, 31} |
| **Vision-Language Merger**     |                 |                 |                 |
| In Channel                     | 1280            | 1280            | 1280            |
| Out Channel                    | 2048            | 3584            | 8192            |
| **Large Language Model (LLM)** |                 |                 |                 |
| Hidden Size                    | 2048            | 3584            | 8192            |
| # Layers                       | 36              | 28              | 80              |
| # KV Heads                     | 2               | 4               | 8               |
| Head Size                      | 128             | 128             | 128             |
| Intermediate Size              | 4864            | 18944           | 29568           |
| Embedding Tying                | ✓               | ✗               | ✗               |
| Vocabulary Size                | 151646          | 151646          | 151646          |
| # Trained Tokens               | 4.1T            | 4.1T            | 4.1T            |

:::caution

- 输出重复问题
  - https://github.com/QwenLM/Qwen2.5-VL/issues/575
- 实际使用下来，A4 300DPI 的识别很容易出现 重复内容问题，72DPI 的识别效果更好。
  - 例如: 办公室 识别结果为 办公办公室
  - 参考
    - https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct/discussions/35

:::

- 每个 28x28 像素对应一个 token
- 图像至少需要 4个 token
  - 最小像素 `4 * 28 * 28`
  - 最小正方形 `2 * 28 -> 56 * 56` 像素
- 图像最大 16384 个 token
  - 图像最大像素 `16384 * 28 * 28`
  - 最大正方形 `128 * 28` -> `3584 * 3584` 像素
- MAX_RATIO
  - 图像宽高比最大 200
- temperature=0.6, top_p = 1.0, top_k = 50
- OCR 推荐参数： 控制准确度和一致性
  - temperature=0, top_p=1.0, top_k=0
  - temperature=0.001, top_p=0.9, top_k=5

```py
# 可以参考 smart_resize
# https://github.com/QwenLM/Qwen2.5-VL/blob/main/qwen-vl-utils/src/qwen_vl_utils/vision_process.py
IMAGE_FACTOR = 28
MIN_PIXELS = 4 * 28 * 28
MAX_PIXELS = 16384 * 28 * 28
MAX_RATIO = 200

VIDEO_MIN_PIXELS = 128 * 28 * 28
VIDEO_MAX_PIXELS = 768 * 28 * 28
FRAME_FACTOR = 2
FPS = 2.0
FPS_MIN_FRAMES = 4
FPS_MAX_FRAMES = 768

# Set the maximum number of video token inputs.
# Here, 128K represents the maximum number of input tokens for the VLLM model.
# Remember to adjust it according to your own configuration.
VIDEO_TOTAL_PIXELS = int(float(os.environ.get('VIDEO_MAX_PIXELS', 128000 * 28 * 28 * 0.9)))
```

```bash
# 300DPI -> 72DPI
convert a.jpg -resize 25% -resize 'x28<' a.output.jpg
```

- `<box></box>`
- <|box_start|>
- <|box_end|>
- `<|object_ref_start|><|object_ref_end|>`
- min_pixels = 256*28*28
- max_pixels = 1280*28*28
- FineTune
  - https://huggingface.co/Alibaba-NLP/gme-Qwen2-VL-2B-Instruct
  - https://huggingface.co/prithivMLmods/Qwen2-VL-OCR-2B-Instruct
  - https://github.com/2U1/Qwen2-VL-Finetune
  - https://huggingface.co/learn/cookbook/en/fine_tuning_vlm_trl
  - Grounding Bias After Fine-Tuning [QwenLM/Qwen2.5-VL#721](https://github.com/QwenLM/Qwen2.5-VL/issues/721)
  - visual grounding poor performance after fine-tuning [QwenLM/Qwen2.5-VL#584](https://github.com/QwenLM/Qwen2.5-VL/issues/584)
  - https://github.com/OpenGVLab/InternVL/blob/main/internvl_chat/eval/refcoco/evaluate_grounding.py
  - [daniel3303/StoryReasoning](https://github.com/daniel3303/StoryReasoning)
    - 跨图片跟踪识别
    - hf [daniel3303/QwenStoryteller](https://huggingface.co/daniel3303/QwenStoryteller)
    - https://arxiv.org/abs/2505.10292
    - https://www.reddit.com/r/LocalLLaMA/comments/1kw310h

## Qwen 2.5

- Qwen2.5 Technical Report
  - https://arxiv.org/abs/2412.15115
- [QwenLM/Qwen2.5-Omni](https://github.com/QwenLM/Qwen2.5-Omni)
  - Qwen2.5-Omni Technical Report https://arxiv.org/abs/2503.20215
- vs Qwen 2
  - 引入 90B MoE
  - 上下文 64K -> 256K
- vs Qwen 2 VL
  - 动态分辨率 Vision Tower
  - mRoPE

## Qwen 2 VL

## Qwen 2

- Qwen2 Technical Report
  - https://arxiv.org/abs/2407.10671
- 0.5B, 1.5B, 4B, 7B, 14B, 57B (MoE), 72B
- vs Qwen 1.5
  - 训练数据 3T -> 7T
  - 57B MoE
  - Tokenizer 扩展

## Qwen 1.5

## Qwen

- 2023.8.3 Qwen-7B, Qwen-7B-Chat
- https://github.com/QwenLM/Qwen
- https://arxiv.org/abs/2309.16609

## FAQ

### macOS Dimension out of range

```py
model_path = "Qwen/Qwen2.5-VL-3B-Instruct"
model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    model_path,
    torch_dtype=torch.bfloat16,
    attn_implementation="eager", # 修改这个
    device_map="mps"
)

min_pixels = 256*28*28
max_pixels = 1280*28*28
processor = AutoProcessor.from_pretrained("Qwen/Qwen2.5-VL-3B-Instruct", min_pixels=min_pixels, max_pixels=max_pixels)
```

- https://github.com/QwenLM/Qwen2.5-VL/issues/760
