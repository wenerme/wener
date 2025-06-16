---
title: ComfyUI
---

# ComfyUI

- [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)
  - Apache-2.0, Python
  - modular diffusion model GUI, api and backend with a graph/nodes interface
- 确保 Base Model 尽量一致
- 有些模型对 Base Model 有要求
- Control Net
  - SD 1.5
- Juggernaut
- 参考
  - https://github.com/Comfy-Org/ComfyUI-Manager
- 生产部署
  - ComfyDeploy
  - 另存 (API 格式)
  - 调用 /prompt

```bash
git clone --depth 1 https://github.com/comfyanonymous/ComfyUI ComfyUI
uv venv --python 3.12
uv pip install -r requirements.txt

# 启动
# http://127.0.0.1:8188
uv run ./main.py

# macOS 可能需要 nightly 版本 - 不过现在的版本一般都支持 pytorch 了
# https://developer.apple.com/metal/pytorch/
uv pip install --pre torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/nightly/cpu

# cuda
uv pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu121
#uv pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu128
uv pip install -r requirements.txt
```

```bash title="mps.py"
# 应该输出 tensor([1.], device='mps:0')

import torch
if torch.backends.mps.is_available():
    mps_device = torch.device("mps")
    x = torch.ones(1, device=mps_device)
    print (x)
else:
    print ("MPS device not found.")
```

- 模型下载
  - https://huggingface.co/Comfy-Org
    - https://huggingface.co/Comfy-Org/stable-diffusion-v1-5-archive

## ComfyUI Manager

```bash
git clone https://github.com/ltdrdata/ComfyUI-Manager custom_nodes/comfyui-manager
uv pip install -r custom_nodes/comfyui-manager/requirements.txt
uv pip install pip # 会使用 pip 安装依赖

# 代理访问
GITHUB_ENDPOINT=https://mirror.ghproxy.com \
  HF_ENDPOINT=https://hf-mirror.com \
  uv run ./main.py
```

- https://raw.githubusercontent.com/ltdrdata/ComfyUI-Manager/main/extension-node-map.json

```
No module named pip
```

使用 uv 的时候会出现

## Notes

**AI Art**

- Text2Img
- Img2Img
- Inpaint
- Text2Video
- Img2Video
- Prompt
- Negative Prompt
- Upscale
- Depth2Img
  - 用于将深度图转换为图像
- ControlNet
  - 用于控制生成图像的结构和内容
  - 支持多种类型的输入图像，如边缘检测、深度图等
  - LineArt Depth OpenPose SoftEdge
- ADetailer
  - 用于细化生成图像的细节
- DeForm
  - 用于对生成图像进行形状变形
- ESERGAN
  - 用于超分辨率图像生成
- AnimateDiff
  - 用于生成动画效果
- LoRA
  - Low-Rank Adaptation
  - 用于微调模型
  - 通过 LoRA 来控制生成图像的风格和特征
  - 物体
  - 任务
  - 风格
- CFG - Classifier Free Guidance
  - 通过 Classifier Free Guidance 来控制生成图像的多样性和质量
- Textural Inversion / Embeddings
  - 类似 Lora
  - 捕捉一些 concept 的特征 - 例如 手指、眼睛
- VAE - Variational Autoencoder
  - 用于图像的编码和解码
- 模型
  - SD 1.5
  - LAION 5B
  - SDXL
- KSampler
  - 用于采样生成图像
  - sampler
    - DDIM
    - PLMS
    - DPM2 a
    - DPM2
    - DPM++ 2S
    - DPM++ 2M
    - DPM++ SDE
    - LMS
    - Heun
  - scheduler
    - Karras
- 3:4
  - 384x512
  - 432x576
  - 576x768
  - 768x1024
  - 864x1152
  - 912x1216
  - 1008x1344
- 9:16

## 参考 {#reference}

- https://dreamlook.ai/
  - Finetune Stable Diffusion
- https://www.rundiffusion.com/
- openari.io
- youml.com
- https://comfyworkflows.com/
- https://weirdwonderfulai.art/
- SDXL Tubo model – https://civitai.com/models/215418?modelVersionId=273102
- SDXL Studio Ghibli LoRA – https://civitai.com/models/137562/studioghibliredmond-studio-ghibli-lora-for-sd-xl
- SDXL ControlNet LoRA – https://huggingface.co/stabilityai/control-lora/resolve/main/control-LoRAs-rank256/control-lora-canny-rank256.safetensors
- 保持面部一致
  - [lldacing/ComfyUI_PuLID_Flux_ll](https://github.com/lldacing/ComfyUI_PuLID_Flux_ll)
  - https://huggingface.co/guozinan/PuLID/
  - https://www.runcomfy.com/comfyui-workflows/create-consistent-characters-in-comfyui-with-ipadapter-faceid-plus
- ADetailer 修复脸手
  - https://github.com/Bing-su/adetailer
    - AGPLv3
    - Auto detecting, masking and inpainting with detection model.
    - inpaint, scribble, lineart, openpose, tile, depth
    - detection model - https://huggingface.co/Bingsu/adetailer
      - face_yolo
      - person_yolo
      - mediapipe_face
  - https://stable-diffusion-art.com/adetailer/
- FaceDetailer
- Hires
  - https://www.runcomfy.com/comfyui-nodes/ComfyUI-Easy-Use/easy-hiresFix
  - https://comfyanonymous.github.io/ComfyUI_examples/2_pass_txt2img/
  - https://www.reddit.com/r/comfyui/comments/1d42dim/comfyui_sdxl_upscaler_hires_fix/
- [ltdrdata/ComfyUI-Impact-Pack](https://github.com/ltdrdata/ComfyUI-Impact-Pack)

<!--
https://civitai.com/models/133005?modelVersionId=1759168
Res: 832*1216 (For Portrait, but any SDXL Res will work fine)

Sampler: DPM++ 2M SDE

Steps: 30-40

CFG: 3-6 (less is a bit more realistic)

Negative: Start with no negative, and add afterwards the Stuff you don´t wanna see in that image.

VAE is already Baked In

HiRes: 4xNMKD-Siax_200k with 15 Steps and 0.3 Denoise + 1.5 Upscale



---
+
closeup portrait of a sci-fi warrior bunny robot, rusty metal, mech, cinematic, red eyes, dark interior background, movie scene, sharp, rim light, epic, golden hour
-
ugly, watermark, text


---

Ghibli style, anime film still,
beautifully painted backgrounds,
lush and vibrant nature,
intricate details, highly detailed,
soft volumetric lighting / beautiful lighting,
magical atmosphere,
whimsical,
nostalgic,
masterpiece, best quality,
-->

# FAQ

```bash
nvcc --version
```

```
RuntimeError: CUDA error: no kernel image is available for execution on the device
CUDA kernel errors might be asynchronously reported at some other API call, so the stacktrace below might be incorrect.
For debugging consider passing CUDA_LAUNCH_BLOCKING=1
Compile with `TORCH_USE_CUDA_DSA` to enable device-side assertions.
```
