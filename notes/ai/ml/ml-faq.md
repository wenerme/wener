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
- flash_attn
  - 不支持 macOS/Apple Silicon
    - https://github.com/Dao-AILab/flash-attention/issues/977
  - 需要 CUDA 7.5+
  - FlashAttention-2
    - Ampere, Ada, Hopper
  - FlashAttention 1
    - Turing
  - flash-attn-triton
    - https://github.com/vllm-project/vllm/blob/main/vllm/attention/ops/triton_flash_attention.py
  - [flashinfer-ai/flashinfer](https://github.com/flashinfer-ai/flashinfer)
    - sm75+
    - 不会支持 Volta
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
- 平台
  - Google
    - Spot GPU
      - Nvidia T4 US$0.12/hr
      - Nvidia L4 24 GB US$0.31/hr
  - https://www.runpod.io/

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

## transforms.Normalize

```py
# 基于 ImageNet 的均值和标准差
transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
```

- https://stackoverflow.com/a/58151903/1870054

## TqdmWarning: IProgress not found. Please update jupyter and ipywidgets.

- https://github.com/CosmiQ/solaris/issues/392

## ImportError: Using `low_cpu_mem_usage=True` or a `device_map` requires Accelerate: `pip install accelerate`

安装了 accelerate 需要重启 notebook kernel

## You current version of `autoawq` does not support module quantization skipping

```bash
pip install autoawq
```

- https://github.com/casper-hansen/AutoAWQ

## 开发框架 vs 推理框架 {#dev-framework-vs-inference-framework}

- 定义
  - 开发框架（训练/研究）：PyTorch、TensorFlow、JAX。强调易用性、调试体验、自动求导、分布式训练与算子生态。
  - 推理框架（部署/服务）：TensorRT、ONNX Runtime、OpenVINO、TFLite、Core ML、TVM、Torch-TensorRT、vLLM/FasterTransformer（LLM 方向）。强调低延迟、高吞吐、低内存与跨平台部署。
- 计算图与编译
  - 开发：动态图为主（eager），也支持图与编译（TorchScript、torch.compile/Inductor、TF Graph）。
  - 推理：静态图/AOT 编译为主；算子融合、常量折叠、布局/精度变换、kernel auto-tuning、batching。
- 精度与量化
  - 开发：以 FP32/FP16/BF16 训练为主，支持 QAT。
  - 推理：PTQ/QAT 常见；INT8/FP8/INT4（硬件相关）；需校准/误差评估以平衡精度与性能。
- 硬件/后端
  - 开发：CPU、CUDA、ROCm、MPS、TPU（TF/JAX）。
  - 推理：TensorRT/cuDNN（NVIDIA）、ONNX Runtime + CUDA/DirectML/XNNPACK、OpenVINO（CPU/iGPU/VPU）、TFLite（移动/边缘）、Core ML（Apple）、TVM（多后端）。
- 模型兼容与导出
  - PyTorch -> ONNX -> ONNX Runtime/TensorRT
  - PyTorch -> torch.compile/Inductor 或 TorchScript -> LibTorch/TorchServe
  - TensorFlow/Keras -> SavedModel -> TF-TRT/TFLite/TF Serving
  - JAX -> XLA/StableHLO -> TPU/CPU/GPU 后端
  - LLM 方向：PyTorch -> TensorRT-LLM / FasterTransformer / vLLM（KV cache、分页注意力、动态批处理）
- 常见工作流
  - 训练：开发框架建模/训练/验证；保存 checkpoint（.pt/.pth/.ckpt/safetensors）。
  - 导出：冻结与转换（torch.onnx.export、torch_tensorrt、tf.saved_model、tflite_converter）。
  - 优化：剪枝、蒸馏、量化、形状固定、operator 替换、图优化；LLM 使用 KV cache、speculative decoding。
  - 部署：推理引擎加载与服务编排（Triton Inference Server、TF Serving、FastAPI、vLLM），结合动态/静态批处理与并发。
- 优缺点速览
  - 开发框架：灵活易迭代、生态丰富；但推理性能/内存占用通常不如专用引擎。
  - 推理框架：低延迟/高吞吐/低内存；但导出/算子覆盖/自定义算子成本与调试难度更高。
- 实践要点
  - 约束模型以便导出（避免非确定性/动态控制流/不支持的自定义算子）。
  - 做数值对齐测试（前后端同输入对比误差），再逐步应用量化与融合。
  - 针对场景选择后端：数据中心（TensorRT/ONNX Runtime）、CPU/边缘（OpenVINO/TFLite/XNNPACK）、Apple 端侧（Core ML）、多硬件（TVM）。
- 参考
  - ONNX Runtime: https://onnxruntime.ai/
  - TensorRT: https://developer.nvidia.com/tensorrt
  - OpenVINO: https://docs.openvino.ai/
  - TFLite: https://www.tensorflow.org/lite
  - Core ML: https://developer.apple.com/machine-learning/core-ml/
  - PyTorch 2.x/torch.compile: https://pytorch.org/get-started/pytorch-2.0/
  - TVM: https://tvm.apache.org/
  - vLLM: https://github.com/vllm-project/vllm
