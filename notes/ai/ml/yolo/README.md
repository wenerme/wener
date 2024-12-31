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
- [YOLOv8](./yolov8.md) - Detection, Instance Segmentation, Pose/Keypoints, Oriented Detection, Classification
  - backbone & neck architectures
  - anchor-free split
  - https://docs.ultralytics.com/
  - [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)
    - **AGPLv3**
    - ~/.config/Ultralytics/settings.json
- YOLOv9
  - based on YOLOv5
  - [WongKinYiu/yolov9](https://github.com/WongKinYiu/yolov9)
  - PGI - Programmable Gradient Information
  - GELAN - Generalized Efficient Layer Aggregation Network
- [YOLOv10](./yolov10.md)
  - by 清华大学, 2024
  - Key Features: NMS-Free Training, Holistic Model Design, Enhanced Model Capabilities
  - [THU-MIG/yolov10](https://github.com/THU-MIG/yolov10)
    - AGPLv3
    - 暂无 segmentation [THU-MIG/yolov10#98](https://github.com/THU-MIG/yolov10/issues/98)
  - [YOLOv10: Real-Time End-to-End Object Detection](https://arxiv.org/abs/2405.14458)
- Yolo World - Object Detection
  - based one YOLOv8
  - [AILab-CVC/YOLO-World](https://github.com/AILab-CVC/YOLO-World)
    - by 腾讯
  - > MDETR, GLIP
  - Open-Vocabulary detection

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
- AMP - Automatic Mixed Precision - 自动混合精度
  - 混合精度训练
  - 减少内存占用
  - 加速训练
- NMS - Non-Maximum Suppression - 非极大值抑制
  - 用于去除重叠的边界框
    - half conf=0.05
  - https://github.com/THU-MIG/yolov10/issues/136
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

- https://docs.ultralytics.com/modes/train/

```yaml title="data.yaml"
# path: # root dir
train: src/dataset/train # 训练集图像路径
val: src/dataset/val # 验证集图像路径
# test:

nc: 3 # 类别数量
names: ['cat', 'dog', 'bird'] # 类别名称列表

# download:
```

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
  - 检测框与真实框有 50% 或以上的重叠就算作正确检测。
  - 比较宽松的标准。
- **metrics/mAP50-95(B)**：在不同 IoU 阈值（0.5 到 0.95）下的平均精度。
  - 从 0.5 到 0.95，步长为 0.05，计算平均精度
  - 更全面地反映模型在各种匹配严格程度下的检测能力。
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

## YoloV8 Model Size

| Model   | Size (MB) | Inference Time (ms) | mAP COCO |
| ------- | --------- | ------------------- | -------- |
| YOLOv8n | 6.5 MB    | 0.99 ms (A100)      | 37.3     |
| YOLOv8s | 22.6 MB   | 1.2 ms (A100)       | 44.9     |
| YOLOv8m | 52.1 MB   | 1.83 ms (A100)      | 50.2     |
| YOLOv8l | 87.8 MB   | 2.39 ms (A100)      | 52.9     |
| YOLOv8x | 136.9 MB  | 3.53 ms (A100)      | 53.9     |

```yaml
scales: # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'
  # [depth, width, max_channels]
  n: [0.33, 0.25, 1024] # YOLOv8n summary: 225 layers,  3157200 parameters,  3157184 gradients,   8.9 GFLOPs
  s: [0.33, 0.50, 1024] # YOLOv8s summary: 225 layers, 11166560 parameters, 11166544 gradients,  28.8 GFLOPs
  m: [0.67, 0.75, 768] # YOLOv8m summary: 295 layers, 25902640 parameters, 25902624 gradients,  79.3 GFLOPs
  l: [1.00, 1.00, 512] # YOLOv8l summary: 365 layers, 43691520 parameters, 43691504 gradients, 165.7 GFLOPs
  x: [1.00, 1.25, 512] # YOLOv8x summary: 365 layers, 68229648 parameters, 68229632 gradients, 258.5 GFLOPs
```

- n/s - 几百张图片
- s/m - 几千张图片
- l/x - 几万张图片
- x - > 10万张图片

---

- depth - 模型深度
  - 深度缩放因子，控制模型中每个模块的重复次数，影响模型的总层数。
- width - 模型宽度
  - 宽度缩放因子，控制模型中每个层的通道数，影响模型的参数数量。
- N/S, L/X 只改了缩放系数
- S/M/L 通道数不一样
- https://github.com/ultralytics/ultralytics/issues/1155#issuecomment-1735325530
  - 怎么选择
- https://github.com/ultralytics/ultralytics/blob/main/ultralytics/cfg/models/v8/yolov8.yaml
- https://www.researchgate.net/figure/YOLOv5-different-model-sizes-where-FP16-stands-for-the-half-floating-point-precision_fig3_354846944
- https://zhuanlan.zhihu.com/p/598566644

## Cascade

- Hierarchical, Cascade
- Cascade RCNN
  - 适合小对象, 精细化
  - two-stage detector
  - RPN region proposal network
- Yolo
  - single-stage detector
  - YOLOv8 optimized for **speed** and **simplicity**
- YOLO + RCNN
  - Faster R-CNN
- 参考
  - Comparing YOLOv8x vs Cascade RCNN on human detection [ultralytics#3248](https://github.com/ultralytics/ultralytics/issues/3248)
  - Hierarchical Classification in Yolo v8 [ultralytics#4353](https://github.com/ultralytics/ultralytics/issues/4353)
  - Open-Vocabulary One-Stage Detection with Hierarchical Visual-Language Knowledge Distillation

## SyntaxError: 'v5loader' is not a valid YOLO argument

- 可能没之前的数据，取消 resume 参数


