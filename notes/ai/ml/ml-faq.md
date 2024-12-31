---
tags:
  - FAQ
---

# ML FAQ

- .pt, .pth, .pwf, .pkl, .ckpt
  - checkpointing models in pickle format
  - 同样的内容
  - 不推荐使用 .pth, 因为和 Python path (.pth) 配置文件冲突
  - 可以考虑 .pth.tar 或 .pt
- .ptc
  - checkpointing models in pytorch compiled (for JIT)
- pickle
  - https://docs.python.org/2/library/pickle.html
- flash_attn 不支持 macOS/Apple Silicon
  - https://github.com/Dao-AILab/flash-attention/issues/977
- SafeTensor
  - 存储和传输神经网络权重、数据和其他张量数据的格式

## Thoughts

- ML 最重要的是数据
- CVAT 目前用下来是标注 图片/视频 最好的用具
  - 一定要注意 Tracker 插帧的问题
  - 尽量使用快捷键

## Hardware

| Device                  | Arch         | RAM          |   CUDA | Tensor |  RT |          FP64 |        FP32 |        FP16 |     INT8 |     INT4 |       Tensor |  TF32 Tensor |  FP16 Tensor |
| ----------------------- | ------------ | ------------ | -----: | -----: | --: | ------------: | ----------: | ----------: | -------: | -------: | -----------: | -----------: | -----------: |
| NVIDIA L4               | Ada Lovelace | 24GB         |        |        |     |               | 30.3 TFLOPS |             |          |          |              |   120 TFLOPS |   242 TFLOPS |
| NVIDIA Tesla T4         | Turing       | 16GB         |  2,560 |    320 |     | Mix 65 TFLOPS |  8.1 TFLOPS |             | 130 TOPS | 260 TOPS |
| NVIDIA GeForce RTX 4090 | Ada Lovelace | 24GB         | 16,384 |  1,321 |     |               |
| NVIDIA Quadro RTX 6000  | Turing       | 24GB         |  4,608 |    576 |  72 |               | 16.3 TFLOPS |             |          |          | 130.5 TFLOPS |
| NVIDIA Tesla V100       | Volta        | 32/16G HBM2  |        |        |     |      7 TFLOPS |   14 TFLOPS |             |  62 TOPS |
| NVIDIA A100 PCIe        |              | 40/80G HBM2e |        |        |     |    9.7 TFLOPS | 19.5 TFLOPS |             |          |          |              |  156 TFPLOPS |   312 TFLOPS |
| NVIDIA H100 PCIe        |              | 80G          |        |        |     |     26 TFLOPS |   51 TFLOPS |             |          |          |              | 756.5 TFLOPS | 1,513 TFLOPS |
| NVIDIA Tesla P100 PCIe  | Pascal       |              |   3584 |        |     |    4.7 TFLOPS |  9.3 TFLOPS | 18.7 TFLOPS |
| NVIDIA Tesla P100 SXM   | Pascal       |              |   3584 |        |     |    5.3 TFLOPS | 10.6 TFLOPS | 21.2 TFLOPS |

- A800 为 A100 基于合规做的调整版本，限制 GPU 互联带宽, 600GB/s -> 400GB/s
- H800 vs H100 - 900GB/s -> 400GB/s, FP64 34 -> 1 TFLOPS, FP64 Tensor Flow 67 -> 1 TFLOPS
- H200 vs H100 - H200 主要提升显存和带宽，HMB3e, 面向推理场景
- NVIDIA L4 Tensor Core GPU
- CUDA - Compute Unified Device Architecture - 统一计算设备架构
  - 软件层面
- 主要指标
  - CUDA Core - 执行通用的并行计算, FP32
  - Tensor Core - NVIDIA Volta+
    - TF32, Bfloat16, FP64
    - 性能可直接根据精度变化
    - 例如 TF32 356 TFLOPS -> FP16 712 TFLOPS -> FP8 3,026 TFLOPS
    - FP8 = INT8
    - FP16 = BFfloat16
  - RT Core - Ray Tracing Core - 光线追踪
  - Shader Cores
  - GPU 内存（VRAM）大小
  - 内存带宽
  - FP16 性能和支持
  - GPU 架构（最新架构优先）
  - 驱动和 CUDA 兼容性
  - 多 GPU 扩展性（如需）
  - FP64 - Double-Precision Performance
  - FP32 - Single-Precision Performance
  - FP16 - Half-Precision Performance
  - INT8 - Integer Performance
  - FP16 & FP32 - Mixed-Precision - 提高计算效率, 减少内存占用, 保持模型精度
    - 2019
    - Loss Scaling
    - [NVIDIA/apex](https://github.com/NVIDIA/apex)
      - apex - A PyTorch Extension
  - Tensor Performance - 矩阵乘法累加运算（Matrix Multiply-Accumulate, MMA）数量
- [NVIDIA Tensor Cores](https://developer.nvidia.com/tensor-cores)
- https://resources.nvidia.com/l/en-us-gpu
- [List of Nvidia graphics processing units](https://en.wikipedia.org/wiki/List_of_Nvidia_graphics_processing_units)
- SM - Streaming Multiprocessor - 流多处理器
  - 功能：并行计算、共享内存和缓存、寄存器文件、Tensor 核心、Warp 调度
  - 架构和组件： CUDA 核心、Tensor 核心
- DGX - Deep Learning Supercomputer
- https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-PCIe-datasheet.pdf
- https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-datasheet.pdf
- https://images.nvidia.com/content/volta-architecture/pdf/volta-architecture-whitepaper.pdf

---

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
  - Nvdia H100 80G
- NVIDIA Quadro RTX 6000
  - Tensor 1457 TFLOPS
  - https://www.nvidia.com/en-us/design-visualization/rtx-6000/
  - Linode - $1000/月, $1.50/小时
- NVIDIA Tesla T4
  - https://www.nvidia.com/en-us/data-center/tesla-t4/
  - GCP - US$255.50/月
- NVIDIA Tesla L4
  - GCP - US$408.83/月
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
  - https://www.nvidia.cn/studio/compare-gpus/

## Nvidia Arch

> microarchitecture

Pascal (2016) > Volta (2017) > Turing (2018) > Ampere (2020) > Hopper (2022) >= Ada Lovelace (2022)

- Pascal - 2016
- Volta - 2017, professional
  - 核心 80SM, 32 FP64+ 63 Int32 + 64 FP32 + 8 Tensor Cores/SM
  - 特点 NVLink 2.0, 第一代 Tensor Cores
  - 制程 12nm, 21.1B 亿个晶体管
  - 产品 V1000TiTan V
- Turning - 2018, consumer
  - 核心 102核心,92SM, 64 FP32 + 64 INT32 + 8 Tensor Cores/SM
  - 特点 Tensor Core 2.0, 第一代 RT Core
  - 制程 12nm, 18.6B 亿个晶体管
  - 产品 T4, 2080Ti, RTX 5000
- Ampere - 2020
  - 核心 108 SM, 64 FP32 + 64 INT32 + 4 Tensor Cores/SM
  - 特点 Tensor Core 3.0, RT Core 2.0, NVLink 3.0, MIG 1.0
  - 制程 7nm, 28.3B 亿个晶体管
  - 产品
    - A100, A800, A30
    - 桌面 GeForce RTX 30 series
    - 专业级/工作站 RTX A series
    - 服务器/数据中心 A100
- Hopper - 2022, datacenter
  - 核心 132 SM, 128 FP32 + 64 INT32 + 64 FP64 + 4 Tensor Cores/SM
  - 特点 Tensor Core 4.0, NVLink 4.0, MIG 2.0
  - 制程 4nm, 80B 亿个晶体管
  - 产品
    - Tesla H 系列
    - H100, H800
- Ada Lovelace - 2022, consumer, professional
  - 产品
    - 桌面 GeForce RTX 40 系列
    - 工作站/专业级 RTX Ada Generation
    - 服务器/数据中心 Tesla Ada (L4x)
- Blackwell - 2024
- Rubin - 2026

## Nvidia Product Series

- consumer - 消费级
  - Desktop - 桌面 - GeForce RTX 30
  - Professional/workstation - 专业级/工作站 - RTX A/Ada
  - Server/datacenter - 服务器/数据中心 - A100
- datacenter - 数据中心 - Tesla H

---

- 更专业的设备支持更多的精度
  - CUDA - FP16 FP32 FP64 INT1 INT4 INT8 TF32 BF16
  - Tensor - FP16 FP32 FP64 INT1 INT4 INT8 TF32 BF16
  - FP32 - Tensor 都没有，CUDA 都有

## SXM vs PCIe

- SXM - Server eXternal Module
  - 专有接口、更高带宽、更高功率限制、高效散热设计
  - 应用场景 - 数据中心、高性能计算、AI 训练
  - 如 NVIDIA Tesla V100, A100
- PCIe - Peripheral Component Interconnect Express
  - 通用接口、更广泛的应用、更多的设备支持
  - 应用场景 - 工作站、服务器、桌面
  - 如 NVIDIA GeForce, Quadro, Tesla

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
  - reconstruction loss, regularization term

---

- https://www.baeldung.com/cs/vae-vs-gan-image-generation
- [Understanding Variational Autoencoders](https://towardsdatascience.com/understanding-variational-autoencoders-vaes-f70510919f73)

## frames

```bash
# -q:v 1-31 - 16 为中等，1 为最好，31 为最差
ffmpeg -i video.mp4 -start_number 0 -b:v 10000k -vsync 0 -an -y -q:v 16 images/%d.jpg

# 推荐 - 增加视频名称前缀，多个视频可合并，质量调高一点
ffmpeg -i v2.mp4 -start_number 0 -b:v 10000k -vsync 0 -an -y -q:v 4 v2/v2-frame_%06d.jpg
```

- 10分钟, 24fps, 约 14400 张
- 5位数字, 99999, 24fps, 大约 70 分钟
- 推荐 6 位数字, 999999, 24fps, 大约 700 分钟, 12 小时
- https://github.com/cvat-ai/cvat/issues/818

## ImportError: cannot import name 'packaging' from 'pkg_resources' (/usr/local/lib/python3.10/dist-packages/pkg_resources/**init**.py)

- setuptools 70 的问题

```bash
python -m pip install setuptools==69.5.1
```

```
ModuleNotFoundError: No module named 'setuptools'
```

```toml title='pyproject.toml'
[tool.poetry.dependencies]
setuptools = { version = "<70" }
```

- https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/15863#issuecomment-2125026282

## ModuleNotFoundError: No module named 'packaging'

```bash
pip install wheel
```



## cannot import name 'is_flash_attn_greater_or_equal_2_10' from 'transformers.utils'

## Could not load library libcudnn_cnn_train.so.8

- /opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/libcudnn_cnn_train.so.8
- /opt/conda/lib/python3.10/site-packages/torch/lib
- /usr/local/cuda/lib64

```
Could not load library libcudnn_cnn_train.so.8. Error: /usr/local/cuda/lib64/libcudnn_cnn_train.so.8: undefined symbol: _ZN5cudnn3cnn5infer22queryClusterPropertiesERPhS3_, version libcudnn_cnn_infer.so.8
```

```bash
ldd /opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/libcudnn_cnn_train.so.8
ldd /usr/local/cuda/lib64/libcudnn_cnn_train.so.8

# 修改后就可以了
LD_LIBRARY_PATH=/opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/:$LD_LIBRARY_PATH yolo

#LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/conda/lib/python3.10/site-packages/torch/lib
```

- https://github.com/pytorch/pytorch/issues/104591

## Placeholder shape mismatches (expected 1 vs got tensorData with 2240) at dimIdx = 0
