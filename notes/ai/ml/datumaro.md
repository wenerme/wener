---
title: datumaro
---

# datumaro

- [openvinotoolkit/datumaro](https://github.com/openvinotoolkit/datumaro)
  - MIT, Python
- 注意⚠️ 依赖的 [openvino](./openvino.md) 可能对 Python 版本有要求，安装不上会导致安装 0.5.0 的 datumaro

```bash
# https://pypi.org/project/datumaro/
pip3 install datumaro                   # 核心库
pip3 install 'datumaro[default]==1.7.0' # 默认依赖，作为 CLI 使用

datum --version
pip install --upgrade datumaro # 如果是旧版本，则尝试升级

mkdir ds
cd ds
# 会创建 .datumaro .dvc .dvcignore
datum project create

datum project export -e '/item/annotation' --filter-mode 'i+a' -f --save-images < your_target_format > --

# CVAT annotations.xml
datum project import --format cvat -n cvat1 annotations.xml
datum project import --format video_frames -n vid1 video.mp4
```

# FAQ

## error: can't find Rust compiler

```bash
brew install rust
```

## disable telemetry

```bash
# %localappdata%\Intel Corporation\isip
rm -rf $HOME/intel/isip
```
