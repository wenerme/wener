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

## VL

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
