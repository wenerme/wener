---
title: Diffusion
---

# Diffusion

Diffusion 模型是一种生成模型，它通过逐步添加噪声到数据中，再通过逆向去噪过程，从纯噪声生成高质量的图像。这个过程类似于将一个清晰的图像逐步变模糊，然后再一步步恢复成清晰图像的过程。

- Forward Diffusion Process - 前向扩散过程
  - 从数据开始逐步添加噪声，将数据转换为纯噪声
  - 每一步添加少量噪声，直到数据变得不可辨认
  - 该过程通常通过一系列预定义的噪声调度（noise schedule）来实现
- Reverse Diffusion Process - 逆向扩散过程
  - 学习如何从纯噪声逐步去噪，恢复原始数据
  - 通过训练模型，使其能够逐步逆转噪声过程，生成逼真的图像
- 应用
  - 图像生成
  - 图像修复
  - 图像超分辨率
- 优势
  - 高质量生成
  - 稳定训练
    - 比 GAN 更稳定，不容易出现模式崩溃的问题。

| abbr.  | for                                    | cn             |
| ------ | -------------------------------------- | -------------- |
| SD     | Stable Diffusion                       | 稳定扩散       |
| EMA    | Exponential Moving Average             | 指数移动平均   |
| VAE    | Variational Autoencoder                | 变分自动编码器 |
| MSE    | Mean Squared Error                     | 均方误差       |
| ft-EMA | Fine-Tuning Exponential Moving Average | EMA微调        |
