---
title: BiRefNet 图像分割与抠图
description: BiRefNet 的前景分割用途、通用与 matting 权重选择，以及图像掩码、Alpha 蒙版和模型资源需求的区别。
tags:
  - Image Segmentation
---

# BiRefNet

- [ZhengPeng7/BiRefNet](https://github.com/ZhengPeng7/BiRefNet)
  - MIT, Python, PyTorch
  - Bilateral Reference for High-Resolution Dichotomous Image Segmentation
  - Bilateral Reference Network (双边参考网络)
  - 二分图像分割 (Dichotomous Image Segmentation, DIS)
  - 显著性物体检测 (Salient Object Detection, SOD)
  - 伪装物体检测 (Camouflaged Object Detection, COD)
  - 双边参考模块 (Bilateral Reference Module, BRM)

## 选择权重

BiRefNet 有多个面向不同任务的 checkpoint。先按目标输出选择权重，再决定输入分辨率和部署方式；不能把所有 BiRefNet 权重当作同一模型。

| 目标 | 官方模型入口 | 关注点 |
| ---- | ------------ | ------ |
| 通用前景分割 | [BiRefNet](https://huggingface.co/ZhengPeng7/BiRefNet) | 前景与背景分离，按模型卡的预处理和推理流程运行 |
| 动态输入分辨率 | [BiRefNet_dynamic](https://huggingface.co/ZhengPeng7/BiRefNet_dynamic) | 这是单独训练的权重；查看模型卡的输入范围 |
| 图像抠图 | [BiRefNet-matting](https://huggingface.co/ZhengPeng7/BiRefNet-matting)、[BiRefNet_HR-matting](https://huggingface.co/ZhengPeng7/BiRefNet_HR-matting) | 选择针对 matting 训练的权重，关注边缘和透明度输出 |

权重文件大小和推理显存是两项指标。下载文件的 MB 数不能直接作为显存预算；比较资源消耗时记录具体 checkpoint/revision、输入分辨率、精度和设备。官方 [Model Zoo](https://github.com/ZhengPeng7/BiRefNet#model-zoo) 提供权重与示例入口。

## 分割与抠图

- Image Segmentation：图像分割，预测像素的类别或前景掩码；二值化后的结果是硬蒙版（Hard Mask）。
- Image Matting：图像抠图，估计连续的 Alpha 蒙版（Alpha Matte），用于表达前景边缘及部分透明区域。
- 将分割掩码写入图片 Alpha 通道，不代表使用了 matting 权重；按任务、具体权重和输出处理判断。

## 参考

- [官方推理与训练示例](https://github.com/ZhengPeng7/BiRefNet/tree/main/tutorials)
- [Hugging Face 模型卡](https://huggingface.co/ZhengPeng7/BiRefNet)
