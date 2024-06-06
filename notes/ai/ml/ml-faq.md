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
