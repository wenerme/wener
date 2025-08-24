---
title: krita
tags:
  - Image Editor
  - Digital Painting
---

# krita

- 修改语言
  - Settings -> Switch Application Language

## krita-ai-diffusion

- 操作
  1. 下载 zip
  2. 工具 -> 脚本 -> 从文件安装脚本
  3. 设置 -> 面板列表 -> AI Image Generation
  4. Configuration -> 自定义服务
     - ComfyUI URL: http://localhost:8188
     - ComfyUI API Key: 你的 ComfyUI API Key
     - ComfyUI 需要的 nodes https://docs.interstice.cloud/comfyui-setup
       - ControlNet preprocessors https://github.com/Fannovel16/comfyui_controlnet_aux
         - comfyui_controlnet_aux
       - IP-Adapter https://github.com/cubiq/ComfyUI_IPAdapter_plus
         - ComfyUI_IPAdapter_plus
       - External Tooling Nodes https://github.com/Acly/comfyui-tooling-nodes
         - comfyui-tooling-nodes
       - Inpaint Nodes https://github.com/Acly/comfyui-inpaint-nodes
         - comfyui-inpaint-nodes
- [Acly/krita-ai-diffusion](https://github.com/Acly/krita-ai-diffusion)

---

- https://docs.interstice.cloud/models/

Common models (required):
OmniSR Superscale (OmniSR_X2_DIV2K.safetensors, OmniSR_X3_DIV2K.safetensors, OmniSR_X4_DIV2K.safetensors)
NMKD Superscale (4x_NMKD-Superscale-SP_178000_G.pth)
OmniSR Superscale (OmniSR_X2_DIV2K.safetensors, OmniSR_X3_DIV2K.safetensors, OmniSR_X4_DIV2K.safetensors)
CLIP Vision (clip-vision_vit-h.safetensors)
MAT Inpaint (MAT_Places512_G_fp16.safetensors)
OmniSR Superscale (OmniSR_X2_DIV2K.safetensors, OmniSR_X3_DIV2K.safetensors, OmniSR_X4_DIV2K.safetensors)

Detected base models:
SD 1.5: missing ControlNet Unblur, Hyper-SD LoRA (SD1.5), ControlNet Inpaint, IP-Adapter (SD1.5)
SD XL: missing Hyper-SD LoRA (SDXL), Fooocus Inpaint, IP-Adapter (SDXL), Fooocus Inpaint
SD 3: missing clip_g, Diffusion model checkpoint
Flux: missing Diffusion model checkpoint
Flux Kontext: missing Diffusion model checkpoint
Illustrious: models found
Chroma: missing Diffusion model checkpoint

```bash
# curl -LO https://github.com/Acly/krita-ai-diffusion/raw/refs/heads/main/scripts/download_models.py
# uv run ./download_models.py --all ./

# Minimal
curl --create-dirs -L -o models/clip_vision/clip-vision_vit-h.safetensors https://huggingface.co/h94/IP-Adapter/resolve/main/models/image_encoder/model.safetensors

curl --create-dirs -L -o models/upscale_models/4x_NMKD-Superscale-SP_178000_G.pth https://huggingface.co/gemasai/4x_NMKD-Superscale-SP_178000_G/resolve/main/4x_NMKD-Superscale-SP_178000_G.pth
curl --create-dirs -L -o models/upscale_models/OmniSR_X2_DIV2K.safetensors https://huggingface.co/Acly/Omni-SR/resolve/main/OmniSR_X2_DIV2K.safetensors
curl --create-dirs -L -o models/upscale_models/OmniSR_X3_DIV2K.safetensors https://huggingface.co/Acly/Omni-SR/resolve/main/OmniSR_X3_DIV2K.safetensors
curl --create-dirs -L -o models/upscale_models/OmniSR_X4_DIV2K.safetensors https://huggingface.co/Acly/Omni-SR/resolve/main/OmniSR_X4_DIV2K.safetensors

curl --create-dirs -L -o models/inpaint/MAT_Places512_G_fp16.safetensors https://huggingface.co/Acly/MAT/resolve/main/MAT_Places512_G_fp16.safetensors

# Optional
curl --create-dirs -L -o models/upscale_models/HAT_SRx4_ImageNet-pretrain.pth https://huggingface.co/Acly/hat/resolve/main/HAT_SRx4_ImageNet-pretrain.pth
curl --create-dirs -L -o models/upscale_models/Real_HAT_GAN_sharper.pth https://huggingface.co/Acly/hat/resolve/main/Real_HAT_GAN_sharper.pth

# SDXL
# RealVis (SDXL - Photography)
curl --create-dirs --remote-name-all -L \
  -C- -o models/checkpoints/RealVisXL_V5.0_fp16.safetensors https://huggingface.co/SG161222/RealVisXL_V5.0/resolve/main/RealVisXL_V5.0_fp16.safetensors \
  -C- -o models/ipadapter/ip-adapter_sdxl_vit-h.safetensors https://huggingface.co/h94/IP-Adapter/resolve/main/sdxl_models/ip-adapter_sdxl_vit-h.safetensors \
  -C- -o models/loras/Hyper-SDXL-8steps-CFG-lora.safetensors https://huggingface.co/ByteDance/Hyper-SD/resolve/main/Hyper-SDXL-8steps-CFG-lora.safetensors \
  -C- -o models/inpaint/fooocus_inpaint_head.pth https://huggingface.co/lllyasviel/fooocus_inpaint/resolve/main/fooocus_inpaint_head.pth \
  -C- -o models/inpaint/inpaint_v26.fooocus.patch https://huggingface.co/lllyasviel/fooocus_inpaint/resolve/main/inpaint_v26.fooocus.patch

# ZavyChroma (SDXL - Artwork)
curl --create-dirs --remote-name-all -L \
  -C- -o models/checkpoints/zavychromaxl_v80.safetensors https://huggingface.co/misri/zavychromaxl_v80/resolve/main/zavychromaxl_v80.safetensors

# Flux dev kontext
# https://github.com/Acly/krita-ai-diffusion/discussions/1176
# https://github.com/Acly/krita-ai-diffusion/releases/tag/v1.36.0
# -C- -o models/vae/ae.safetensors  https://huggingface.co/Comfy-Org/Lumina_Image_2.0_Repackaged/blob/main/split_files/vae/ae.safetensors
curl -L \
  -C- -o models/diffusion_models/flux1-dev-kontext_fp8_scaled.safetensors https://huggingface.co/Comfy-Org/flux1-kontext-dev_ComfyUI/resolve/main/split_files/diffusion_models/flux1-dev-kontext_fp8_scaled.safetensors \
  -C- -o models/text_encoders/clip_l.safetensors https://huggingface.co/comfyanonymous/flux_text_encoders/blob/main/clip_l.safetensors \
  -C- -o models/text_encoders/t5xxl_fp8_e4m3fn_scaled.safetensors https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/t5xxl_fp8_e4m3fn_scaled.safetensors
```

---

- t5xxl_fp8_e4m3fn.safetensors
- t5xxl_fp8_e4m3fn_scaled.safetensors
- scaled
  - 精度更高
  - 兼容性更弱
  - 更慢

---

- Stable Diffusion 1.5
  - 2022-10
  - 512x512
  - work well for x768
  - 更少 VRAM、更小、社区内容多、control 模型多
- Stable Diffusion XL
  - 2023-07
  - 1024x1024
  - 质量更高
  - prompt 理解更好
- Illustrious/NoobAI
  - 基于 SDXL
  - anime-focused

### Error: Internal assertion failed [Edit models do not support upscaling]

- 修改下 refine 模型
