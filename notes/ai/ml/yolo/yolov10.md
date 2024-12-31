---
title: YOLOv10
---

# YOLOv10

- [THU-MIG/yolov10](https://github.com/THU-MIG/yolov10)
  - AGPLv3
  - by 清华大学, 2024
- [YOLOv10: Real-Time End-to-End Object Detection](https://arxiv.org/abs/2405.14458)


```bash
git clone https://github.com/THU-MIG/yolov10
conda create -n yolov10 python=3.9
conda activate yolov10
# 移除 onnxruntime-gpu==1.18.0
pip install -r requirements.txt
pip install -e .

curl -LO https://github.com/THU-MIG/yolov10/releases/download/v1.1/yolov10s.pt
# http://127.0.0.1:7860
python app.py
```
