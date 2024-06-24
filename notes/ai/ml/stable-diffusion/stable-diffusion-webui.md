---
title: stable-diffusion-webui
---

# stable-diffusion-webui

- [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
  - [Mikubill/sd-webui-controlnet](https://github.com/Mikubill/sd-webui-controlnet)
  - [sontungdo/sd-image-editor](https://github.com/sontungdo/sd-image-editor)
    - 图片编辑，截取一部分来做生成
  - [modelscope/facechain](https://github.com/modelscope/facechain)
  - [picobyte/stable-diffusion-webui-wd14-tagger](https://github.com/picobyte/stable-diffusion-webui-wd14-tagger)
  - [NVIDIA/Stable-Diffusion-WebUI-TensorRT](https://github.com/NVIDIA/Stable-Diffusion-WebUI-TensorRT)
  - [camenduru/stable-diffusion-webui-huggingface](https://github.com/camenduru/stable-diffusion-webui-huggingface)
  - [civitai/sd_civitai_extension](https://github.com/civitai/sd_civitai_extension)
  - https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features
- [AbdBarho/stable-diffusion-webui-docker](https://github.com/AbdBarho/stable-diffusion-webui-docker)


```bash
git clone https://github.com/AbdBarho/stable-diffusion-webui-docker
cd stable-diffusion-webui-docker

# 构建后 Image 约 10GB
docker compose --profile download up --build

# http://localhost:7860/
# auto for https://github.com/AUTOMATIC1111/stable-diffusion-webui
# invoke for https://github.com/invoke-ai/InvokeAI
# comfy for https://github.com/comfyanonymous/ComfyUI
# 会映射当前目录下的 data, output 目录 到 /data, /output
docker compose --profile auto up --build


docker exec -it webui-docker-auto-1 bash
# /stable-diffusion-webui/extensions -> /data/config/auto/extensions
```

- 没有卸载功能，只能到 /stable-diffusion-webui/extensions 删除目录
- 如果有依赖问题，则尝试删除 venv 然后重建

```
models/
  Stable-diffusion/
extensions/
embeddings/
webui.sh
```

## models

- https://huggingface.co/runwayml/stable-diffusion-inpainting/blob/main/sd-v1-5-inpainting.ckpt
- [v1-5-pruned-emaonly](https://huggingface.co/runwayml/stable-diffusion-v1-5/blob/main/v1-5-pruned-emaonly.safetensors)

---

- Overall Model: SDXL
- Realistic:
  - Realistic Vision
  - EpiCRealism
    - cinematic look, 更好的光影
  - CyberRealistic
  - AbsoluteReality
- Fantasy:
  - DreamShaper
- Anime:
  - Anything v5
  - ReV Animated - fantasy, semi-realistic, anime styles.
  - ToonYou
- SDXL:
  - Juggernaut XL
- ChilloutMix
- GhostMix
- EpiCPhotoGasm
- MajicMIX Realistic

## img2img

- Interrgate CLIP
- Interrgate DeepBooru

**Sampling method**

- DPM++ 变种 - DPM++ 2M, DPM++ SDE, DPM++ 2M SDE, DPM++ 2S a, DPM++ 3M SDE
  - 基于 DPM++ 模型的不同变体或配置，使用随机微分方程（SDE）模拟数据生成过程。
- Numerical Methods - Euler, Heun, LMS
  - 数值求解随机微分方程的方法，用于逐步重建数据
  - Euler 是基本的积分方法
  - Heun 提供更准确的结果
  - LMS (Linear Multistep) 提供稳定和精确的积分。
- DPM - DPM2, DPM2 a, DPM fast, DPM adaptive
  - ，"a" 为自适应，"fast" 强调速度优化
- 其他 - Restart, DDIM, PLMS, UniPC, LCM
  - 重启采样（Restart），使用隐式步骤的扩散模型（DDIM），以及可能代表特定优化策略的 PLMS, UniPC, 和 LCM。 |

**Schedule type**

- Automatic
- Uniform
- Karras
- Exponential
- Polyexponential
- SGM Uniform

---

- Resize mode。当上传图片尺寸和要生成的图的尺寸不同时，需要选择调整大小方案。
  - Just resize：调整图片为生图设置的宽高。若上传图片的宽高与生成设置的宽高不一致，则该图片会被压扁。这个我非常不推荐使用，会让图片非常奇怪。
  - Crop and resize：裁切图片以符合生图的宽高，我最推荐的方式。
  - Resize and fill：裁切并调整图片宽高，若上传图片的宽高与生成设置的宽高不一致，则多出来的区域会自动填满。
  - Just resize (latent upscale)：调整图片大小为生图设置的宽高，并使用潜在空间放大。
- Sampling Method 用于去噪，平衡生成图的速度和质量。内置多种算法可供选择。目前看起来 DPM++ 2M Karras 用的比较多。
- Sampling Steps 是去噪过程的采样步骤数。越多越好，但需要更长的时间。一般在 20-28 之间。
- 宽度和高度 (Width/Height)，输出图像的大小。按需调整即可。
- Batch Count 批次数量，我更愿意用下面的 Batch size 调整生产图的总数。
- Batch size，每一批次要生成的图像数量。可以在测试提示时多生成一些，因为每个生成的图像都会有所不同。生成的图像总数等于 Batch Count 乘以 Batch size。
- CFG (Classifier Free Guidance) scale，提示词相关性， 用于控制模型应在多大程度上遵从您的提示。他有几个只可选: 1 (大多忽略你的提示)，3 (更有创意)，7 (遵循提示和自由之间的良好平衡)，15 (更加遵守提示)，30 (严格按照提示操作)，常用的是 7，做个平衡。测试时可以换这个值体验区别。
- Denoising strength。降噪强度，常翻译成「重绘幅度」，取值范围是 0-1，描述新生成的图片与原图的相似程度，数值越小，采样越少，相似度越高，算的越快 (采样数 = Denoising strength* Sampling Steps)
- Seed，生成的每个图像都有自己的种子值，修改这个值可以控制图像的内容。
- Script。用户可以编写脚本代码，以实现一些特殊定制的功能。这个未来可以具体说，目前还没有遇到。

---

- https://www.dongwm.com/post/stable-diffusion-img2img/
