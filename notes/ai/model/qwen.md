---
tags:
  - Model
---

# QwenLM

- [QwenLM](https://github.com/QwenLM)
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
- QvQ
  - visual reasoning
- Qwen
  - 大模型
  - Omni
    - text, audio, image, video, natural speech interaction
- Qwen VL
  - 有很多基于 Qwen VL finetune 的模型
  - https://huggingface.co/reducto/RolmOCR

## Qwen 2.5 VL

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

- 每个 28x28 像素对应一个 token
- 图像至少需要 4个 token
  - 最小像素 `4 * 28 * 28`
  - 最小正方形 `2 * 28 -> 56 * 56` 像素
- 图像最大 16384 个 token
  - 图像最大像素 `16384 * 28 * 28`
  - 最大正方形 `128 * 28` -> `3584 * 3584` 像素
- MAX_RATIO
  - 图像宽高比最大 200
- ⚠️ 实际使用下来，A4 300DPI 的识别很容易出现 重复内容问题，72DPI 的识别效果更好。
  - 例如: 办公室 识别结果为 办公办公室
  - 参考
    - https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct/discussions/35
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
  - visual grounding poor performance after fine-tuning  [QwenLM/Qwen2.5-VL#584](https://github.com/QwenLM/Qwen2.5-VL/issues/584)
  - https://github.com/OpenGVLab/InternVL/blob/main/internvl_chat/eval/refcoco/evaluate_grounding.py
  - [daniel3303/StoryReasoning](https://github.com/daniel3303/StoryReasoning)
    - 跨图片跟踪识别
    - hf [daniel3303/QwenStoryteller](https://huggingface.co/daniel3303/QwenStoryteller)
    - https://arxiv.org/abs/2505.10292
    - https://www.reddit.com/r/LocalLLaMA/comments/1kw310h

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
