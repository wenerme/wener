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
- Conditional WGAN
- SRGAN - Super Resolution GAN
- BiGAN - Bidirectional GAN
- CycleGAN
  - 2017
  - 无需成对的训练数据
  - 引入 Cycle-Consistency Loss
  - CycleGAN > CUT > FastCUT
- DiscoGAN
  - 和 CycleGAN 非常相似
- CUT - Contrastive Unpaired Translation
  - 2020
  - fast and memory-efficient training
  - [taesungp/contrastive-unpaired-translation](https://github.com/taesungp/contrastive-unpaired-translation)
- img2img-turbo - CycleGAN-Turbo, pix2pix-Turbo
  - 2024
- FastCUT
- CycleDiffusion
- pixelRNN
- DDIB - Dual Diffusion Implicit Bridges
- InfoGAN
- BigGAN
- SinGAN
- Contextual Attention GAN (CA-GAN)
- DeepFill v2
- Attention-based Image Inpainting
- [NVlabs/stylegan](https://github.com/NVlabs/stylegan)
  - 能够独立地控制图像的不同层次特征
  - Mapping network
  - Synthesis network
  - PG-GAN （progressive growing GAN）
  - [NVlabs/stylegan2](https://github.com/NVlabs/stylegan2)
  - -> [NVlabs/stylegan2-ada](https://github.com/NVlabs/stylegan2-ada)
  - -> [NVlabs/stylegan2-ada-pytorch](https://github.com/NVlabs/stylegan2-ada-pytorch)
  - Gen
    - 新的结构 - 样式网络
    - style mixing - 混合样式
    - AdaIN - adaptive instance normalization - 自适应实例归一化
    - 更好地控制生成图像的不同层次特征，从而实现更高的图像质量和更细致的控制。
  - Dis
    - progressive growing - 渐进式生长
- ACGAN - Auxiliary Classifier GAN - 辅助分类器生成对抗网络
- UNet Generator GAN
  - https://github.com/boschresearch/unetgan
- PatchGAN discriminator
  - pix2pix
  - https://paperswithcode.com/method/patchgan
- Pix2Pix
  - 需要成对的训练数据
- ResNet - Residual Networks - 残差网络
- [orpatashnik/StyleCLIP](https://github.com/orpatashnik/StyleCLIP)
  - Text-Driven Manipulation of StyleGAN Imagery

## StyleGAN

- [EvgenyKashin/stylegan2-distillation](https://github.com/EvgenyKashin/stylegan2-distillation)

## 参考 {#reference}

- FFHQ - 高清人脸数据集
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
- [hindupuravinash/the-gan-zoo](https://github.com/hindupuravinash/the-gan-zoo)
  - A list of all named GANs!
