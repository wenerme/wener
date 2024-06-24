---
title: dino
tags:
  - Unsupervised
---

# dino

- [facebookresearch/dinov2](https://github.com/facebookresearch/dinov2)
  - Apache-2.0, PyTorch
  - 2023-04-14
  - Depth Estimation
  - Semantic Segmentation
  - Instance Retrieval
  - Dense Matching - Consistently map all parts of an image without supervision.
  - Sparse Matching - Compare DINOv2 patch features across two images to match their most similar parts.
  - DINOv2: Learning Robust Visual Features without Supervision
  - 用于特征提取，无监督
  - 参考
    - https://dinov2.metademolab.com/demos
    - https://huggingface.co/docs/transformers/en/model_doc/dinov2

```python
import torch
import dinov2.eval.segmentation.models

dinov2_vits14_reg = torch.hub.load('facebookresearch/dinov2', 'dinov2_vits14_reg')
```
