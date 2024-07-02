---
title: img2img
---

# img2img

- img2img
  - changing a given image in a specific or controlled way
- [Pix2Pix](https://github.com/phillipi/pix2pix)
  - 成对训练数据
  - 训练快
  - 数据集
    - 需要一定程度的准确性
- [Pix2PixHD](https://github.com/NVIDIA/pix2pixHD) - 2017
  - 2048x1024
  - photorealistic image-to-image
  - semantic label maps -> photo-realistic images
  - synthesizing portraits from face label maps
  - conditional GANs
- [Vid2Vid](https://github.com/NVIDIA/vid2vid) - 2018
  - 引入时序判别器来保持时间一致性
  - https://arxiv.org/abs/1808.06601
  - [NVlabs/few-shot-vid2vid](https://github.com/NVlabs/few-shot-vid2vid) - 2019
    - https://arxiv.org/abs/1910.12713
    - -> [NVlabs/imaginaire](https://github.com/NVlabs/imaginaire)
- SPADE (Spatially-Adaptive Normalization) - 2019
- Pix2PixSC (Style-Consistent) (2020)
- TransGAN (2021)
- Pix2Pix-Zero (2023)
- CycleGAN
  - 无需成对训练数据
  - 训练慢
- Pix2Pix with Temporal Consistency
- RecycleGAN - CycleGAN
- FOMM (First Order Motion Model)
- StyleGAN2 with temporal consistency
- Transformer-based Video Inpainting
- few-shot learning
- perceptual loss 感知损失
  - 改善生成质量
- total variation loss 总变差损失
  - 保持图像平滑
  - 处理模糊和噪声
- Style Loss 风格损失
  - 风格迁移
- Adversarial Loss 对抗损失
  - 生成器和判别器
- U-Net


---

- [img2img-turbo](./img2img-turbo.md)
  - One-step image-to-image with Stable Diffusion turbo
- [junyanz/pytorch-CycleGAN-and-pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix)
  - Image-to-Image Translation in PyTorch
- [taesungp/contrastive-unpaired-translation](https://github.com/taesungp/contrastive-unpaired-translation)
  - 2020
  - https://arxiv.org/abs/2007.15651
- https://machinelearningmastery.com/a-gentle-introduction-to-pix2pix-generative-adversarial-network/

