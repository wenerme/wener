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
- 生产部署
  - ComfyDeploy
  - 另存 (API 格式)
  - 调用 /prompt
- 参考
  - [BennyKok/comfyui-deploy](https://github.com/BennyKok/comfyui-deploy)
  - [Comfy-Org/ComfyUI-Manager](https://github.com/Comfy-Org/ComfyUI-Manager)
  - https://docs.comfy.org/tutorials/
  - Transform Your Videos with Professional Quality: WAN-VACE V2V Complete Workflow for ComfyUI https://civitai.com/articles/16401

:::caution

- 只能单一显卡
  - https://github.com/comfyanonymous/ComfyUI/discussions/4139

:::

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

# Nvidia APEX normalization not installed, using PyTorch LayerNorm
uv pip install xformers
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

好的，遵照您的要求，这里是精简后的版本，仅包含**目录**和**主要用途说明**两列。

### ComfyUI Models 目录结构详解

| dir                | for                                                                                                                                                       |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkpoints`      | 核心基础模型，也叫“大模型”。这是文生图的起点，决定了图像生成的基础风格和能力。例如 Stable Diffusion v1.5, SDXL, 以及社区训练的各种整合模型。              |
| `loras`            | LoRA 模型。这些是小型微调文件，用于向基础模型添加特定的角色、画风、概念或服装，灵活性极高。                                         |
| `vae`              | VAE  模型。用于图像的编码和解码。独立的 VAE 文件可以修正图像的色彩（如改善灰蒙蒙的问题）或修复手部等细节问题。SDXL 模型通常不需要额外 VAE。 |
| `controlnet`       | ControlNet 模型。用于精确控制图像的生成，例如通过姿势骨架、深度图、线稿、二维码等来引导构图和内容。                                                       |
| `upscale_models`   | 图像放大模型。用于“图像放大 (模型)”节点，提升图片分辨率并优化细节。例如 ESRGAN, SwinIR, 4x-UltraSharp 等。                                                |
| `embeddings`       | 文本反演 (Textual Inversion) 嵌入，也叫 Embedding。这些是极小的文件，通过一个关键词触发特定的概念、角色或画风。常用于负面提示词（如 `bad-hands-5`）。     |
| `clip`             | CLIP 文本编码器模型。通常 ComfyUI 会自动从大模型中加载，但你也可以把独立的 CLIP 模型放在这里，供高级工作流使用。                                          |
| `clip_vision`      | CLIP Vision 模型。用于分析图像内容，是 IPAdapter、PhotoMaker 等“图像提示”功能的核心组件。                                                                 |
| `style_models`     | 风格模型。主要用于 T2I-Adapter，功能与 ControlNet 类似，但更侧重于风格的迁移。                                                                            |
| `hypernetworks`    | Hypernetwork 模型。一种比 LoRA 更早出现的微调技术，现在已不常用，但 ComfyUI 仍然支持加载。                                                                |
| `unet`             | U-Net 模型。U-Net 是 Stable Diffusion 模型的核心降噪网络。普通用户几乎不会用到这个目录，主要用于模型开发和研究，将 U-Net 单独分离出来加载。               |
| `text_encoders`    | 文本编码器模型。与 `unet` 类似，用于模型研究，允许单独加载和替换文本编码器部分。                                                                          |
| `photomaker`       | PhotoMaker 模型。一种专门用于根据输入人脸照片生成统一角色的模型。                                                                                         |
| `sams`             | SAM (Segment Anything Model) 模型。由 Meta 开发的图像分割模型，在 ComfyUI 中用于精确地创建和分离遮罩 (Mask)。                                             |
| `gligen`           | GLIGEN 模型。用于“限定区域生成”，允许你通过画框来指定某个物体在图像中的特定位置和大小。                                                                   |
| `diffusers`        | 用于存放 Hugging Face 的 Diffusers 格式模型。这种格式是一个包含多个子目录和文件的文件夹，而不是单个文件。ComfyUI 可以直接加载这种格式。                   |
| `configs`          | 配置文件。存放一些旧的 `.ckpt` 模型所需要的 `.yaml` 配置文件，以帮助 ComfyUI 识别其模型架构（如 v1 或 v2）。现在的 `.safetensors` 模型通常不需要。        |
| `vae_approx`       | VAE 近似解码器模型。这些是极小的、速度极快的模型，用于在 KSampler 采样过程中生成快速预览图，而不是每次都调用完整的 VAE。                                  |
| `onnx`             | ONNX 模型。用于存放已转换为 ONNX (Open Neural Network Exchange) 格式的模型，通常用于在非 NVIDIA 硬件（如 AMD 显卡）上通过 DirectML 或 Olive 进行推理。    |
| `diffusion_models` | 扩散模型组件。一个更通用的目录，类似于 `unet`，用于存放扩散模型的某些部分。主要供模型开发者使用。                                                         |

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
- Upscaler
  - ESRGAN
  - SwinIR
  - 4x-UltraSharp
  - OmniSR
  - MoSR
  - DRCT
  - ADT
  - DAT
  - RealPLKSR
  - SPAN
  - RGT
  - HAT
  - SRFormer
  - SwiftESRGAN
  - SPSR
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
  - 512x896
  - 576x1024
  - 768x1366
  - 1024x1820

输出可以包含日期

```
%date:yyyy-MM-dd%/ComfyUI
```

## API

```bash

```

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

## ImportError: cannot import name 'guidedFilter' from 'cv2.ximgproc'

```bash
uv pip uninstall opencv-python opencv-python-headless opencv-contrib-python-headless opencv-contrib-python
uv pip install opencv-python opencv-python-headless opencv-contrib-python-headless
uv pip install opencv-contrib-python
```

- https://github.com/chflame163/ComfyUI_LayerStyle/issues/5
