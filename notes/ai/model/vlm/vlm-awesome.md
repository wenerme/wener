---
title: VLM Awesome
tags:
  - Model
  - VLM
  - MLLM
  - Vision
  - Awesome
---

# VLM / MLLM / Vision Awesome

视觉语言模型、多模态大语言模型和视觉任务资源索引。

## VLM / MLLM

- VLM - Vision Language Model。
- MLLM - Multimodal Large Language Model。
- 常见结构：视觉编码器 + Projector / Vision-Language Adapter + Language Model。
- Projector 用于将视觉特征映射到语言模型表示空间，常见组件包括 Cross-Attention Module。
- Bounding box 坐标格式必须按模型确认：
  - Qwen：`(xmin, ymin, xmax, ymax)`，通常为 0-1 浮点数。
  - Gemini：`(ymin, xmin, ymax, xmax)`，通常为 0-1000 整数。

## 视觉任务

- Document OCR / Handwriting OCR。
- Visual QA / Image QA。
- Visual Reasoning。
- Image Classification。
- Document Understanding。
- Video Understanding。
- Object Detection / Object Counting。
- Object Grounding：返回目标 Bounding Box 坐标。
- Computer Agent：屏幕理解与交互操作。

## Models 与资源

- Qwen2-VL / Qwen3-VL。
- SmolVLM 256M
  - 512px 图像约使用 64 image tokens。
  - [浏览器实时 Demo](https://huggingface.co/spaces/webml-community/smolvlm-realtime-webgpu)
- [Google VideoPrism](https://huggingface.co/google/videoprism)
  - Video Understanding。
- [OpenGVLab/InternVL](https://github.com/OpenGVLab/InternVL)
- [haotian-liu/LLaVA](https://github.com/haotian-liu/LLaVA)
  - Vicuna + CLIP 的视觉语言助手。
- [google-deepmind/gemma](https://github.com/google-deepmind/gemma)
  - Gemma 3 的 4B、12B、27B 版本支持 Vision + Text。
- [microsoft/OmniParser](https://github.com/microsoft/OmniParser)
  - UI 元素识别和屏幕分析，用于视觉 GUI Agent。
- [microsoft/Magma](https://github.com/microsoft/Magma)
  - 视觉规划、机器人操作、环境交互和视觉导航。
- [OpenGVLab/VisualPRM-8B-v1_1](https://huggingface.co/OpenGVLab/VisualPRM-8B-v1_1)
  - Process Reward Model。

## 参考

- [Roboflow: Multimodal Vision Models](https://blog.roboflow.com/multimodal-vision-models/)
- [Gemini bounding boxes 讨论](https://simedw.com/2025/07/10/gemini-bounding-boxes/)
