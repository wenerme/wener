---
tags:
  - Model
---

# QwenLM

- [QwenLM](https://github.com/QwenLM)
- [QwenLM/Qwen2.5-VL](https://github.com/QwenLM/Qwen2.5-VL)
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

## VL

- 每个 28x28 像素对应一个 token
- 图像至少需要 4个 token

```py
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
logger.info(f"set VIDEO_TOTAL_PIXELS: {VIDEO_TOTAL_PIXELS}")
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
