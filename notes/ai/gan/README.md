---
title: GANs
---

# GANs

- GANs - Generative Adversarial Networks - 生成对抗网络
  - 2014 Goodfellow
  - 生成器（Generator）和判别器（Discriminator）
    - 生成器生成与真实数据相似的假数据，让判别器尽可能地区分真假数据。
    - 最终使得生成器生成的假数据越来越接近真实数据，而判别器也越来越难以区分真假数据。
  - 图像生成、视频生成、文本生成
- Diffusion Models - 扩散模型
  - 生成图像、音频、视频等数据的概率生成模型
  - 2012 Tieleman
  - 对初始数据加入不断递增的噪声，生成越来越接近真实数据的样本。
    - 扩散（diffusion）过程
