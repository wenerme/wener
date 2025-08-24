---
title: DINO
---

# DINO

- Self-Supervised Vision Transformers with DINO
  - 2021-04
  - https://arxiv.org/abs/2104.14294
  - [facebookresearch/dino](https://github.com/facebookresearch/dino)
- DINOv2: Learning Robust Visual Features without Supervision
  - 2023-04
  - [DINO v2](./dinov2.md)
  - DINOv2: Learning Robust Visual Features without Supervision https://arxiv.org/abs/2304.07193
  - Vision Transformers Need Registers https://arxiv.org/abs/2309.16588
- DINO v3
  - 2025-08
  - [facebookresearch/dinov3](https://github.com/facebookresearch/dinov3)
  - https://arxiv.org/abs/2508.10104
  - 在 web 数据上预训练（LVD-1689M 数据集）：10 个模型
    - 1 个 ViT-7B（从头训练）
    - 5 个 ViT-S/S+/B/L/H+（蒸馏自 ViT-7B）
    - 4 个 ConvNeXt-{T/S/B/L}（蒸馏自 ViT-7B）
  - 在卫星数据上预训练（SAT-493M 数据集）：2 个模型
    - 1 个 ViT-7B（从头训练）
    - 1 个 ViT-L（蒸馏自 ViT-7B）
  - https://huggingface.co/facebook/dinov3-vit7b16-pretrain-lvd1689m
