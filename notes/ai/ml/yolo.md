---
title: Yolo
---

# Yolo

- [YOLO](https://arxiv.org/abs/1506.02640)
- YOLOv3
- YOLOv4
  - [AlexeyAB/darknet](https://github.com/AlexeyAB/darknet)
- YOLOv5
  - by Ultralytics
  - [ultralytics/yolov5](https://github.com/ultralytics/yolov5)
- YOLOv6
  - by 美团, 2022
  - BiC - Bi-directional Concatenation
  - ATTA - anchor-aided training
  - [meituan/YOLOv6](https://github.com/meituan/YOLOv6)
    - GPLv3
- [WongKinYiu/yolov7](https://github.com/WongKinYiu/yolov7)
  - GPLv3
  - speed & accuracy
- [YOLOv8](./yolov8.md)
  - backbone & neck architectures
  - anchor-free split
  - 支持 detection, segmentation, pose estimation, tracking, and classification
  - https://docs.ultralytics.com/
  - [ultralytics/ultralytics](https://github.com/ult
    ralytics/ultralytics)
    - AGPLv3
- YOLOv9
  - based on YOLOv5
  - PGI - Programmable Gradient Information
  - GELAN - Generalized Efficient Layer Aggregation Network
- [YOLOv10](./yolov10.md)
  - by 清华大学, 2024
  - [THU-MIG/yolov10](https://github.com/THU-MIG/yolov10)
    - AGPLv3
  - [YOLOv10: Real-Time End-to-End Object Detection](https://arxiv.org/abs/2405.14458)

| model   | file                      | for              |                                Size |
| ------- | ------------------------- | ---------------- | ----------------------------------: |
| YOLOv8  | `yolov8{n,s,m,l,x}.pt`    | Detection        |               6, 22, 50, 83, 131 MB |
| YOLOv9  | `yolov9{c,e}.pt`          | Object Detection |                          49, 112 MB |
| YOLOv10 | `yolov10{n,s,m,b,l,x}.pt` |                  | 2.3, 7.2, 15.4, 19.1, 24.4, 29.5 MP |

| suffix | for                          | notes |
| -----: | ---------------------------- | ----- |
|      n | nano                         |
|      s | small                        |
|      m | medium                       |
|      l | large                        |
|      x | extra large                  |
|      b | base                         |
|    oob | Oriented Bounding Box        |
|   pose | Pose Estimation              |
|    seg | Segmentation                 |
|  world | World Detection              |
|    cls | Classification               |
|    oiv | Object Instance Verification |
|  human | Human Detection              |
|    nas | Neural Architecture Search   |

- https://docs.ultralytics.com/models/yolov8/
- https://github.com/ultralytics/assets/releases
  - 模型下载
- Open-Vocabulary Detection - 开放词汇检测
  - 具有识别新对象的能力
  - 结合语言模型
  - 多模态学习
- Closed-Vocabulary Detection - 封闭词汇检测
  - 固定 label
- CLIP - Contrastive Language-Image Pretraining
- Contrastive Learning - 对比学习
- NAS - Neural Architecture Search - 神经网络架构搜索
  - 是一种自动化方法，用于设计和优化深度神经网络的架构。
  - 通过搜索空间找到最佳的神经网络结构，以实现特定任务的性能最大化，同时减少人类专家在设计网络架构时所需的时间和精力。
  - Search Space
    - 层类型（如卷积层、全连接层、池化层等）、层的配置（如过滤器数量、内核大小、步幅等）以及层之间的连接方式
  - Search Strategy
    - 随机搜索、进化算法、强化学习和梯度方法等
  - Performance Estimation
    - 准确性、推理速度、参数数量和计算复杂度等
- MPS - Metal Performance Shaders
  - PyTorch 加速
- FLOPs - Floating Point Operations per Second - 每秒浮点运算次数
  - 代表模型在一次前向传播过程中需要执行的浮点运算的总次数
- TOPS - Tera Operations per Second - 每秒万亿次运算
- TTA - Test Time Augmentation - 测试时数据增强
- imgsz
  - 32 的倍数 https://stackoverflow.com/a/75270907/1870054
  - 会 scale 图像到这个大小
  - 会保持 ratio - 填充灰色
  - train 时为整数
  - predict 和 export 可以为 tuple 例如 `w,h`
- epochs
  - Small Dataset < 1000
    - epochs 50 - 100
  - Medium Dataset < 10000
    - epochs 100 - 300
  - Large Dataset > 10000
    - epochs 300 - 1000
- 模型选择 - size, speed, accuracy

## train

**results.csv**

- **epoch**：当前的训练轮数（epoch），每个 epoch 表示模型在整个训练数据集上进行了一次完整的训练。
- **train/box_loss**：训练过程中边界框回归损失（Box Loss），衡量预测的边界框与真实边界框之间的差距。
  - 准确地定位目标对象
  - IoU, GIoU
  - 初始值 0.2 - 2
  - 收敛期望值 0.1 - 0.5
- **train/cls_loss**：训练过程中分类损失（Class Loss），衡量预测的类别与真实类别之间的差距。
  - 正确分类检测到的目标
  - 交叉熵损失（Cross-Entropy Loss）或 Focal Loss
  - 初始值 1-5
  - 收敛期望值 0.01 - 0.5
- **train/dfl_loss**：训练过程中分配函数损失（Distribution Focal Loss），用于提高边界框的预测准确性。
  - 优化边界框的预测，使预测框更精确地拟合目标。
  - 初始值 0.5 - 1
  - 收敛期望值 0.05 - 0.3
  - YOLO v5, v7+
- **metrics/precision(B)**：验证集上的精度（Precision），表示在所有预测为正类的样本中，实际为正类的比例。
- **metrics/recall(B)**：验证集上的召回率（Recall），表示在所有实际为正类的样本中，被正确预测为正类的比例。
- **metrics/mAP50(B)**：在 IoU 阈值为 0.5 时的平均精度（Mean Average Precision）。
- **metrics/mAP50-95(B)**：在不同 IoU 阈值（0.5 到 0.95）下的平均精度。
- **val/box_loss**：验证集上的边界框回归损失。
- **val/cls_loss**：验证集上的分类损失。
- **val/dfl_loss**：验证集上的分配函数损失。
- **lr/pg0**、**lr/pg1**、**lr/pg2**：不同参数组的学习率（Learning Rate）。

---

- 训练损失（train/box_loss、train/cls_loss、train/dfl_loss）
  - 逐渐减小 ⬇️
  - 衡量模型在训练集上的拟合程度。较低的训练损失表示模型在训练集上的表现良好。
- 验证损失（val/box_loss、val/cls_loss、val/dfl_loss）
  - 评估模型在验证集上的泛化能力。较低的验证损失表示模型在未见过的数据上的表现良好。
- 精度和召回率（metrics/precision(B)、metrics/recall(B)）
  - 高精度表示误报少，高召回率表示漏报少。
- 平均精度（metrics/mAP50(B)、metrics/mAP50-95(B)）
  - 衡量目标检测模型的整体性能
  - 逐步上升 ⬆️
- 学习率（lr/pg0、lr/pg1、lr/pg2）
- 精度 期望值
  - 一般应用 - 70%+
  - 高风险应用 - 90%+
    - 自动驾驶、医疗诊断等高风险应用

```
精度（Precision） = 真阳性（TP） / （真阳性（TP） + 假阳性（FP））
召回率（Recall） = 真阳性（TP） / （真阳性（TP） + 假阴性（FN））
```

- IoU - Intersection over Union - 交并比
  - 衡量模型预测的边界框与真实边界框之间的重叠程度
  - IoU = Intersection Area / Union Area
    - Intersection Area：预测边界框与真实边界框的重叠区域面积
    - Union Area：预测边界框与真实边界框的联合区域面积，即两者面积之和减去重叠区域的面积。
  - IoU 越高，模型的检测效果越好
- mAP - Mean Average Precision
## Notes

- FPN - Feature Pyramid Network - 特征金字塔网络
  - 旨在通过在不同尺度上检测目标来提高目标检测的性能。它从深度卷积神经网络（如 ResNet）的不同层提取特征，并通过上采样和横向连接（lateral connections）将这些特征融合在一起。这样可以有效地检测不同大小的目标。
- P2 - 最浅的一层特征图，分辨率最高，捕捉到的细节最多。适合检测小目标。
  - < 8px
- P5 - 中间层特征图，分辨率适中，适合检测中等大小的目标。

# FAQ

## YOLOv5 vs YOLOv8

- YOLOv5
  - 易用
- YOLOv8
  - 更快、更准
