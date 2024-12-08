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

# Docker
# 百度镜像 registry.baidubce.com/paddlepaddle/paddle:3.0.0b1
docker run --rm -it -v $PWD:/host --entrypoint /host --name paddle paddlepaddle/paddle /bin/bash
```

