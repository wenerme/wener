---
tags:
  - Model
---

# FLUX

- FLUX.1-Krea-dev
  - 2025-07-31
  - Black Forest Labs (BFL) + Krea AI
  - T2I
  - 生成手指有问题
  - vs FLUX.1-dev
    - anatomy
    - Faces and skin looks a lot more natural
  - https://huggingface.co/black-forest-labs/FLUX.1-Krea-dev
- FLUX.1-dev
  - 生成下巴有问题 - flux chin
  - https://huggingface.co/spaces/jasperai/Flux.1-dev-Controlnet-Upscaler
  - https://huggingface.co/showlab/OmniConsistency
- FLUX.2-schnell
  - Apache-2.0
  - https://huggingface.co/lodestones/Chroma
    - 训练过程 https://training.lodestone-rock.com/
      - large 1024x1024
      - fast 512x512
- 使用 Transformer 而不是 传统 CNN UNet
- 参考
  - https://comfyui-wiki.com/en/tutorial/advanced/flux1-comfyui-guide-workflow-and-examples
  - https://huggingface.co/models?other=base_model:adapter:black-forest-labs/FLUX.1-dev

```bash
# 同时下载了 flux1-dev.safetensors 和 transformers - 有点重复，有点大
huggingface-cli download black-forest-labs/FLUX.1-dev \
  --local-dir . --local-dir-use-symlinks False
```

| model                        | size    | notes                      |
| ---------------------------- | ------- | -------------------------- |
| flux1-schnell.safetensors    | 23.8GB  | VRAM 16GB+                 |
| flux1-dev.safetensors        | 23.8GB  |
| Flux.1 Dev FP8               | 17.2GB  | VRAM 8GB+                  |
| clip_l.safetensors           | 246 MB  |
| t5xxl_fp8_e4m3fn.safetensors | 4.89 GB | lower memory usage, 8-12GB |
| t5xxl_fp16.safetensors       | 9.79 GB | better results, 32GB+      |
| ae.safetensors               | 335 MB  |

```
https://huggingface.co/lodestones/Chroma/resolve/main/ae.safetensors
https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/t5xxl_fp8_e4m3fn.safetensors
https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/t5xxl_fp16.safetensors

https://huggingface.co/Comfy-Org/flux1-dev/blob/main/flux1-dev-fp8.safetensors
```

## Kontext

- Lora
  - https://huggingface.co/drbaph/GlassPrism-kontext-LoRA
  - https://huggingface.co/svjack/Kontext_OmniConsistency_lora
  - https://huggingface.co/Owen777/Kontext-Style-Loras
- Promopts
  - https://zhuanlan.zhihu.com/p/1922042108895797435
  - https://www.reddit.com/r/comfyui/comments/1lk94cg/i_spend_a_lot_of_time_attempting_to_create/
  - https://www.reddit.com/r/comfyui/comments/1lnejq6/kontextdev_promptify/
- 参考
  - https://fluxkontextlab.com/
    - https://news.ycombinator.com/item?id=44516288
