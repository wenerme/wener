---
title: YOLOv8
---

# YOLOv8

- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)
  - AGPLv3
  - YOLOv8
  - 支持 detection, segmentation, pose estimation, tracking, and classification
  - https://docs.ultralytics.com/

```bash
pip3 install ultralytics
```

```bash
# yolo [TASK] MODE [ARGS]

# 结果在 runs/detect/predict
yolo detect predict model=yolov8n.pt source='https://ultralytics.com/images/bus.jpg'

# default.yaml
```

- TASK - detect, segment, classify
  - detech - 检测 - 识别和定位图像或视频中的对象或感兴趣区域
  - segment - 分割 - 图像或视频 划分 为对应不同对象或类别的 区域或像素的过程
  - classify - 分类任务是预测输入图像的类别标签
  - post - 姿态检测的目标是识别图像中的对象并估计它们的关键点
    - 这通常涉及到识别人体的部位（如手臂、腿、脸等）并标记其关键点（如关节位置）。姿态估计在运动分析、增强现实等领域特别有用。
  - OBB
    - 更精确地捕捉图像中物体的方向，特别是在物体倾斜或旋转时。
    - OBB是标准边界框的扩展，它允许边界框有任意的旋转角度，而不仅仅是水平或垂直对齐。这在卫星图像、医学成像等领域中非常有用，可以更准确地定位和描述对象的形状和方向。
- MODE - train, val, predict, export, track
- ARGS
  - https://docs.ultralytics.com/usage/cfg/

```py
from ultralytics import YOLO

# Create a new YOLO model from scratch
model = YOLO('yolov8n.yaml')

# Load a pretrained YOLO model (recommended for training)
model = YOLO('yolov8n.pt')

# Train the model using the 'coco8.yaml' dataset for 3 epochs
results = model.train(data='coco8.yaml', epochs=3)

# Evaluate the model's performance on the validation set
results = model.val()

# Perform object detection on an image using the model
results = model('https://ultralytics.com/images/bus.jpg')

# Export the model to ONNX format
success = model.export(format='onnx')
```

## train

```bash
# demo
# src/datasets/coco8
yolo train data=coco8.yaml model=yolov8n.pt epochs=10 lr0=0.01
```

- lr0 - 初始学习率
  - 常用 lr0=0.01
  - 较大模型考虑 lr0=0.001
- imgsz - 图像尺寸
  - 默认 640
  - 一般 320 - 640
- batch - 批次大小
  - batch=-1 - AutoBatch - 基于内存自动检测
- https://docs.ultralytics.com/usage/cfg/

```yaml
train: train
val: val

nc: 80
names: ['person', 'bicycle', 'car']
```

```bash
yolo train data=dataset.yaml model=yolov8n.pt epochs=100 imgsz=640
```

```
<class_index> <x_center> <y_center> <width> <height>
```

- YOLOv5 & YOLOv8 YAML

```
Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
1/10         0G       1.65      4.301      1.229         45       1280:  22%|██▏       | 41/189 [01:28<04:10,  1.70s/it]
Class     Images  Instances      Box(P          R      mAP50  mAP50-95):   0%|          | 0/95 [00:00<?, ?it/s]
```

- Epoch - 当前轮次
- box_loss - box regression loss - 边界框回归损失
- cls_loss - class prediction loss - 分类损失
- dfl_loss - distribution focal loss - 分布焦点损失
- Instances - 批次
- 41/189
  - 41 - 当前批次
  - 189 - 总批次
- 01:28<04:10
  - 01:28 - 当前批次耗时
  - 04:10 - 预计剩余时间
- 1.70s/it - 每批次平均耗时

## explorer

```bash
pip3 install streamlit streamlit-select lancedb duckdb
yolo explorer

# for ask AI
# yolo settings openai_api_key="..."
```

## Settings

```bash
yolo settings
```

```py
from ultralytics import settings
print(settings)
```

- https://docs.ultralytics.com/quickstart/#understanding-settings

## Video

- https://github.com/ultralytics/ultralytics/issues/3357
- https://github.com/HumanSignal/label-studio/issues/3405

```bash
python $(git rev-parse --show-toplevel)/labelstudio_to_yolo.py -n labels.txt -i export.json -o v1-000
find v1-000 -type f -size +0c | sort
python $(git rev-parse --show-toplevel)/video_to_images.py -i src/v1-000.mp4 -o v1-000 -fr 25

# 输出的帧率可能不一样
ffmpeg -i src/v1-000.mp4 -vf fps=25 -q:v 2 v1-000/frame_%05d.jpg

# 实际 frame count
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames src/v1-000.mp4

ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 input.mp4

# 即便重新编码，也还是 frame count 不一致
ffmpeg -i src/v1-000.mp4 -filter:v fps=fps=25 -r 25 v1-000/frame_%05d.jpg
ffprobe -v 0 -select_streams v -show_entries stream=duration_ts,time_base,nb_frames tmp.mp4
```

```
nb_frames / (duration_ts / time_base)
```

$$
FrameCount = Duration × FrameRate
$$

# FAQ

## Apple Silicon Acceleration

- MPS - Metal Performance Shaders

```py
import torch
print(torch.backends.mps.is_available())
```

```py
from ultralytics import YOLO

# Load a model
model = YOLO('yolov8n.pt')  # load a pretrained model (recommended for training)

# Train the model with 2 GPUs
results = model.train(data='coco8.yaml', epochs=100, imgsz=640, device='mps')
```

## WARNING ⚠️ NMS time limit 3.600s exceeded

- NMS - Non-Maximum Suppression - 非极大值抑制
- 表明模型在处理高分辨率图像或大量检测结果时效率较低

## 1 duplicate labels removed
