---
tags:
  - Model
---

# FLUX

- FLUX.1-dev
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
