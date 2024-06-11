---
title: GAN
---

# GAN

- GAN - Generative Adversarial Networks - 生成对抗网络
- Usecase/使用案例
  - 生成图像
  - 图像生成图像
  - 为其他模型生成训练数据
  - 补全缺失的信息 - 把图像变高清
  - 根据 2D 数据生成 3D 模型
- Generator - 生成器
  - 负责生成看起来像真实数据的样本
- Discriminator - 判别器
  - 负责区分真实数据和生成数据

## 实现 {#implement}

- Vanilla GAN
- DCGAN - Deep Convolutional GAN
- WGAN - Wasserstein GAN
  - 生成器和判别器的损失函数是 Wasserstein 距离
- CGAN - Conditional GAN
  - 生成器和判别器都接收额外信息
  - 有针对性地生成数据
  - 需要额外信息，通常是类标签或其他形式的调整数据。
  - 生成满足特定条件的数据
- SRGAN - Super Resolution GAN
- BiGAN - Bidirectional GAN
- CycleGAN
- InfoGAN
- BigGAN
- SinGAN
- StyleGAN
  - 能够独立地控制图像的不同层次特征
  - Gen
    - 新的结构 - 样式网络
    - style mixing - 混合样式
    - AdaIN -  adaptive instance normalization - 自适应实例归一化
    - 更好地控制生成图像的不同层次特征，从而实现更高的图像质量和更细致的控制。
  - Dis
    - progressive growing  - 渐进式生长
- ACGAN - Auxiliary Classifier GAN - 辅助分类器生成对抗网络
- UNet Generator GAN
  - https://github.com/boschresearch/unetgan
- PatchGAN discriminator
  - pix2pix
  - https://paperswithcode.com/method/patchgan

## StyleGAN

- [EvgenyKashin/stylegan2-distillation](https://github.com/EvgenyKashin/stylegan2-distillation)

## 参考 {#reference}

- wikipedia [Generative Adversarial Networks](https://en.wikipedia.org/wiki/Generative_adversarial_network)
- [eriklindernoren/PyTorch-GAN](https://github.com/eriklindernoren/PyTorch-GAN)
- [eriklindernoren/Keras-GAN](https://github.com/eriklindernoren/Keras-GAN)
- [nightrome/really-awesome-gan](https://github.com/nightrome/really-awesome-gan)
- https://videogigagan.github.io/
  - [HN](https://news.ycombinator.com/item?id=40130803)
- https://pfnet-research.github.io/tgan/
- [From Scratch - GAN](https://ym2132.github.io/GenerativeAdversarialNetworks_Goodfellow)
  - https://github.com/YM2132/YMPaperImplementations/blob/main/paper_implementations/python_implemenations/GAN_Goodfellow.py
- https://poloclub.github.io/ganlab/
- [junyanz/pytorch-CycleGAN-and-pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix)
  - Image-to-Image Translation in PyTorch
