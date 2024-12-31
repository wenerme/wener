---
tags:
  - Framework
---

# Paddle

- [PaddlePaddle/Paddle](https://github.com/PaddlePaddle/Paddle)
  - Apache-2.0
  - by Baidu
  - 飞桨 - PADDLE -> PArallel Distributed Deep LEarning
- 参考
  - https://www.paddlepaddle.org.cn/
  - [PaddlePaddle/PaddleHub](https://github.com/PaddlePaddle/PaddleHub)
- ⚠️ 目前项目状态不太乐观
  - https://www.zhihu.com/question/360157891/answer/3365551393

:::caution

- 通用框架，但 Paddle 主要中文 OCR, NLP 做得好
- 知识学习存在一定迁移成本和损耗

:::

```bash
# CPU
pip install paddlepaddle
# GPU
pip install paddlepaddle-gpu

# Check
python -c "import paddle; print(paddle.__version__)"

# Docker
# 百度镜像 registry.baidubce.com/paddlepaddle/paddle:3.0.0b1
docker run --rm -it -v $PWD:/host --entrypoint /host --name paddle paddlepaddle/paddle /bin/bash
```

# Awsome

| abbr. | stand for                          | meaning          |
| ----- | ---------------------------------- | ---------------- |
| OCR   | Optical Character Recognition      | 光学字符识别     |
| KIE   | Key Information Extraction         | 关键信息提取     |
| SER   | Structured Entity Recognition      | 结构化实体识别   |
| RE    | Relation Extraction                | 关系抽取         |
| FGD   | Fine-grained Document              | 细粒度文档       |
| CDLA  | Common Document Layout Annotations | 通用文档布局注释 |

- PP-OCRv4
- PP-OCRv3
- [PaddlePaddle/PaddleNLP](https://github.com/PaddlePaddle/PaddleNLP)
  - Apache-2.0, Python
- [PaddlePaddle/PaddleX](https://github.com/PaddlePaddle/PaddleX)
  - 低代码开发工具
- [PaddlePaddle/PaddleClas](https://github.com/PaddlePaddle/PaddleClas)
  - 图像识别和图像分类
  - pip:paddleclas
    - image_orientation 需要
    - image_orientation_predictor
    - use_angle_cls
    - 支持旋转 90, 180, 270
- [PaddlePaddle/Paddle2ONNX](https://github.com/PaddlePaddle/Paddle2ONNX)
- ~~[PaddlePaddle/Paddle.js](https://github.com/PaddlePaddle/Paddle.js)~~
- Models
  - [PaddlePaddle/models](https://github.com/PaddlePaddle/models)
  - https://paddlepaddle.github.io/PaddleOCR/latest/ppstructure/models_list.html
  - https://paddlepaddle.github.io/PaddleOCR/latest/ppocr/model_list.html
  - https://github.com/PaddlePaddle/PaddleX/blob/release/3.0-beta2/docs/module_usage/tutorials/ocr_modules/table_structure_recognition.md
- dygraph to Static Graph

## Layout

```txt title="layout_publaynet_dict.txt"
text
title
list
table
figure
```

```txt title="layout_cdla_dict.txt"
text
title
figure
figure_caption
table
table_caption
header
footer
reference
equation
```

- PubLayNet
  - https://dax-cdn.cdn.appdomain.cloud/dax-publaynet/1.0.0/publaynet.tar.gz
- CDLA - Common Document Layout Annotations 数据集

| dataset                                                         | 简介                                                                                                                                                                           |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [cTDaR2019_cTDaR](https://cndplab-founder.github.io/cTDaR2019/) | 用于表格检测(TRACKA)和表格识别(TRACKB)。图片类型包含历史数据集(以cTDaR_t0开头，如cTDaR_t00872.jpg)和现代数据集(以cTDaR_t1开头，cTDaR_t10482.jpg)。                             |
| [IIIT-AR-13K](http://cvit.iiit.ac.in/usodi/iiitar13k.php)       | 手动注释公开的年度报告中的图形或页面而构建的数据集，包含5类：table, figure, natural image, logo, and signature                                                                 |
| [CDLA](https://github.com/buptlihang/CDLA)                      | 中文文档版面分析数据集，面向中文文献类（论文）场景，包含10类：Text、Title、Figure、Figure caption、Table、Table caption、Header、Footer、Reference、Equation                   |
| [TableBank](https://github.com/doc-analysis/TableBank)          | 用于表格检测和识别大型数据集，包含Word和Latex2种文档格式                                                                                                                       |
| [DocBank](https://github.com/doc-analysis/DocBank)              | 使用弱监督方法构建的大规模数据集(500K文档页面)，用于文档布局分析，包含12类：Author、Caption、Date、Equation、Figure、Footer、List、Paragraph、Reference、Section、Table、Title |

## PaddleX

```bash
docker run --rm -it \
  -v $PWD:/paddle --shm-size=8G \
  --network=host \
  --name paddlex ccr-2vdh3abv-pub.cnc.bj.baidubce.com/paddlepaddle/paddle:3.0.0b2 /bin/bash
```

## Paddle2ONNX

- https://github.com/PaddlePaddle/PaddleOCR/blob/main/deploy/paddle2onnx/readme_ch.md
