---
title: Image Prompt Awesome
tags:
  - Model
  - Prompt
  - Image Generation
  - Awesome
---

# Image Prompt Awesome

图像生成 Prompt 组织方式、提示词生成器和常用控制词索引。

## Prompt 结构

```text
[人物描述] [场景构建] [摄影参数] [氛围强化] [细节补充]
```

- 人物描述：主体、年龄、服装、身份和动作。
- 场景构建：地点、背景、构图、天气、时间和物件。
- 摄影参数：相机、镜头、焦段、光圈、景深和画面比例。
- 氛围强化：色彩、光线、材质、情绪和风格。
- 细节补充：手部、面部、纹理、文字和局部修改。

## Prompt 工具与模型

- [FLUX Prompt Generator](https://huggingface.co/spaces/gokaygokay/FLUX-Prompt-Generator)
- [dagthomas/comfyui_dagthomas](https://github.com/dagthomas/comfyui_dagthomas)
- [Microsoft Promptist](https://huggingface.co/microsoft/Promptist)
  - 面向 Stable Diffusion v1.4 Prompt 优化。
- [Gustavosta/MagicPrompt-Stable-Diffusion](https://huggingface.co/Gustavosta/MagicPrompt-Stable-Diffusion)
- [daspartho/prompt-extend](https://huggingface.co/daspartho/prompt-extend)
- [Stable Diffusion Prompts Dataset](https://huggingface.co/datasets/daspartho/stable-diffusion-prompts)
- [Text2Image Prompt Generator](https://huggingface.co/succinctly/text2image-prompt-generator)

## 常用控制词

### Resolution

- 1:1：`512x512`、`768x768`、`1024x1024`。
- 4:3。
- 16:9：`1216x704`。
- 9:16：`704x1216`。
- Portrait：`832x1216`。
- Landscape：`1216x832`。

### Quality

```text
(shot on Sony A7 IV, 50mm f/1.8 lens)
photorealistic
ultra detailed
natural skin texture
soft film grain
8k uhd
```

### Atmosphere

```text
serene, tranquil, intimate, modern elegance
Warm neutrals with pops of soft pastels in window light
Subtle light reflection, gentle light diffusion
```

### Negative

```text
lowres, text, error, cropped, worst quality, low quality,
jpeg artifacts, ugly, duplicate, deformed, blurry, bad anatomy,
bad proportions, extra limbs, poorly drawn hands, extra fingers,
watermark, signature, username
```

## 评估和排错

- 关注手指、眼睛、头发、下巴和皮肤纹理。
- 先固定模型、采样器、分辨率和 seed，再调整 Prompt。
- 负面词、权重、CFG 和 LoRA 可能互相影响，应分组验证。
- 图像编辑 Prompt 要明确说明保留主体、位置、尺度、姿态、镜头和透视，只改变目标区域。
