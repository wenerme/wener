---
title: OpenVINO
---

# OpenVINO

- [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino)
  - Apache-2.0, C++, Python
  - VINO -> Visual Inferencing and Neural Network Optimization
  - 模型优化、推理
- openvino==2023.2
  - Python **3.8-3.11**
- 尽量使用 LTS 版本
- https://pypi.org/project/openvino/

```bash
brew install openvino # by Homebrew
pip3 install openvino # by pip

# by conda
conda create --name py310 python=3.10
conda activate py310
conda update --all
conda install -c conda-forge openvino=2023.3.0
```

# FAQ

## No matching distribution found for openvino

- 注意 Python 版本
