---
tags:
  - FAQ
---

# ML FAQ

## Hardware

- Macbook Pro 2023 16-inch - Apple M2 Max 64G 8+4 CPU 38 GPU 15.8 TOPS
- Apple M2 Max
  - 8P+4E CPU
  - 38 GPU 13.6 TFLOPs
- Nvdia RTX 3090
- Nvdia RTX 4906
  - Tensor Cores 1321 AI TOPS
- Nvdia Tesla M40
  - 7 TFLOPs
- Nvdia V100 Tensor Core
  - https://www.nvidia.com/en-us/data-center/v100/
- Nvdia H100
  - https://www.nvidia.com/en-us/data-center/h100/
- NVIDIA RTX 6000
  - Tensor 1457 TFLOPS
  - https://www.nvidia.com/en-us/design-visualization/rtx-6000/
- Cloud TPU v5p $4.2/小时
  - 459 TFLOP
  - HBM2e 95GB、2765 GBps
- Cloud TPU v5e $1.2/小时
  - bf16 197 TFLOP
  - int8 393 TFLOP
  - HBM2 16 GB、819 GBps
- 阿里云 ecs.gn6v-c8g1.2xlarge - 16G V100 8 vCPU 32 GiB - ¥26/小时
- 阿里云 ecs.gn6e-c12g1.3xlarge - 32G V100 12 vCPU 92 GiB - ¥20/小时
- Linode 32 GB + RTX6000 GPUx1 - $1000/月, $1.50/小时
- HBM - High Bandwidth Memory
- DLSS - Deep Learning Super Sampling
- 参考
  - https://www.amd.com/en/products/specifications/graphics.html
  - https://www.linode.com/docs/products/compute/compute-instances/plans/choosing-a-plan/#gpu-instances
  - [Apple M2 Max 38-Core GPU vs NVIDIA GeForce RTX 4090 Laptop GPU](https://www.notebookcheck.net/M2-Max-38-Core-GPU-vs-NVIDIA-GeForce-RTX-4090-Laptop-GPU-vs-M2-Pro-16-Core-GPU_11574_11437_11570.247598.0.html)
  - https://cloud.google.com/tpu/docs/system-architecture-tpu-vm

## TensorFlow vs PyTorch

> 推荐 PyTorch

- TensorFlow
  - 大型应用
- PyTorch
  - 易用
  - 快速原型
- 参考
  - https://opencv.org/blog/pytorch-vs-tensorflow/

## VAE vs GAN

- GAN
  - generator + discriminator
  - adversarial training
  - 生成高质量、真实的图片、数据
  - 图片生成、图像到图像的转换、超分辨率
  - 弱点: 训练不稳定、模式崩溃、模式坍塌；需要小心的调参
- VAE
  - encoder + decoder, probabilistic framework
  - input data -> latent space - 潜在空间/隐空间 - 压缩后的数据/PCA表示
  - 训练:
    - 优化一个损失函数来进行训练，这个损失函数包含重构损失（确保输出与输入相似）和正则化项（确保潜在空间具有一定的结构，通常为高斯分布）。
    - 这个正则化项促使潜在空间连续且平滑，从而使得从中采样新的数据点变得容易。
    - KL-divergence
  - 优点: 生成的数据更加平滑、连续；更容易训练；更容易生成新数据
  - 缺点: 生成的数据质量不如 GAN
  -  reconstruction loss, regularization term

---

- https://www.baeldung.com/cs/vae-vs-gan-image-generation
- [Understanding Variational Autoencoders](https://towardsdatascience.com/understanding-variational-autoencoders-vaes-f70510919f73)
