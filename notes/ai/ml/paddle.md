---
tags:
  - Framework
---

# Paddle

- [PaddlePaddle/Paddle](https://github.com/PaddlePaddle/Paddle)
  - Apache-2.0
  - by Baidu
  - 飞桨 - PADDLE -> PArallel Distributed Deep LEarning
  - 通用框架，但 Paddle 主要中文 OCR, NLP 做得好
- 参考
  - https://www.paddlepaddle.org.cn/
  - [PaddlePaddle/PaddleHub](https://github.com/PaddlePaddle/PaddleHub)
- ⚠️ 目前项目状态不太乐观
  - https://www.zhihu.com/question/360157891/answer/3365551393

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

- PP-OCRv4
- PP-OCRv3
- [PaddlePaddle/PaddleNLP](https://github.com/PaddlePaddle/PaddleNLP)
  - Apache-2.0, Python
- [PaddlePaddle/PaddleX](https://github.com/PaddlePaddle/PaddleX)
  - 低代码开发工具
- [PaddlePaddle/PaddleClas](https://github.com/PaddlePaddle/PaddleClas)
  - 图像识别和图像分类
- ~~[PaddlePaddle/Paddle.js](https://github.com/PaddlePaddle/Paddle.js)~~


## PaddleX

```bash
docker run --rm -it \
  -v $PWD:/paddle --shm-size=8G \
  --network=host \
  --name paddlex ccr-2vdh3abv-pub.cnc.bj.baidubce.com/paddlepaddle/paddle:3.0.0b2 /bin/bash
```
