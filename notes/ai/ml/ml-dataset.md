---
title: Dataset
---

# Dataset

- https://roboflow.com/formats
- https://github.com/ultralytics/yolov5/blob/master/data/coco128.yaml
- COCO - Common Objects in Context
  - by 微软研究院（Microsoft Research） at 2014
- coco128
  - YOLOv5 Tutorial Dataset
  - https://www.kaggle.com/datasets/ultralytics/coco128
  - https://github.com/ultralytics/yolov5/blob/master/data/coco128.yaml
    - https://ultralytics.com/assets/coco128.zip
- [ultralytics/JSON2YOLO](https://github.com/ultralytics/JSON2YOLO)
  - Convert JSON annotations into YOLO format
- openlibrary
- 百度数据集 https://aistudio.baidu.com/datasetoverview
  - 增值税发票数据集-适配PaddleOCR https://aistudio.baidu.com/datasetdetail/165561
- [huggingface/datasets](https://huggingface.co/docs/datasets/index)
- [ConardLi/easy-dataset](https://github.com/ConardLi/easy-dataset)
  - creating fine-tuning datasets for LLM
  - 不支持 图片数据集
- [open-sciencelab/GraphGen](https://github.com/open-sciencelab/GraphGen)
  - Enhancing Supervised Fine-Tuning for LLMs with Knowledge-Driven Synthetic Data Generation

```bash
git clone https://github.com/ConardLi/easy-dataset.git
cd easy-dataset
pnpm i
pnpm run build
pnpm run start
```

- 数据集格式
  - coco
  - yolo
  - alpaca
  - sharegpt
- 文件类型
  - json
  - jsonl
  - csv
  - parquet
  - arrow
