---
title: Stable Diffusion
---

# Stable Diffusion

- [stabilityai/stable-diffusion-3-medium](https://huggingface.co/spaces/stabilityai/stable-diffusion-3-medium)
- [Stability-AI/generative-models](https://github.com/Stability-AI/generative-models)
  - MIT
  - Generative Models by Stability AI
- [stabilityai/stable-diffusion-2-1](https://huggingface.co/stabilityai/stable-diffusion-2-1)
- [Stability-AI/stablediffusion](https://github.com/Stability-AI/stablediffusion)
- SD Turbo
- [stabilityai/stable-video-diffusion-img2vid-xt](https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt)
  - Image-to-Video
- [vladmandic/automatic](https://github.com/vladmandic/automatic)
  - AGPLv3, Python
  - SD.Next: Advanced Implementation of Stable Diffusion and other Diffusion-based generative image models
- [ChenWu98/cycle-diffusion](https://github.com/ChenWu98/cycle-diffusion)
- studio/webui
  - ComfyUI
  - AUTOMATIC1111/stable-diffusion-webui
  - [modelscope/DiffSynth-Studio](https://github.com/modelscope/DiffSynth-Studio)
  - [mcmonkeyprojects/SwarmUI](https://github.com/mcmonkeyprojects/SwarmUI)
- models
  - https://huggingface.co/cagliostrolab/animagine-xl-3.1
- 参考
  - https://stable-diffusion-art.com/

---

- [stabilityai/sv3d](https://huggingface.co/stabilityai/sv3d)
  - 2024-03-18
  - Stable Video 3D
- [stabilityai/sd-turbo](https://huggingface.co/stabilityai/sd-turbo)
  - 2023-11-30
  - Stable Diffusion 2.1 的蒸馏模型
- [stabilityai/sdxl-turbo](https://huggingface.co/stabilityai/sdxl-turbo)
  - 2023-11-28
  - 非商业
- [stabilityai/stable-diffusion-xl-base-1.0](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)
  - 2023-07-26
- [stabilityai/stable-diffusion-xl-refiner-1.0](https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0)
  - 2023-07-26


## img2img

图生图模式

# FAQ

## Negative Prompt

1. 过滤不希望的内容：如果你不想让某些元素出现在生成的图像中，可以使用 negative prompt 来明确指出这些元素，如“无广告牌”、“无动物”等。
1. 提高生成质量：通过指定不希望出现的风格或元素，可以帮助模型更准确地理解并遵循正面提示的要求，从而提高生成图像的相关性和质量。
1. 避免敏感或不适内容：在处理可能生成不适当内容的情况下，negative prompt 可以作为一种安全措施，防止不希望或不适宜的内容被生成。
