---
title: datumaro
---

# datumaro

- [openvinotoolkit/datumaro](https://github.com/openvinotoolkit/datumaro)
  - MIT, Python
- 注意⚠️ 依赖的 [openvino](./openvino.md) 可能对 Python 版本有要求，安装不上会导致安装 0.5.0 的 datumaro
  - openvino==2023.2
    - 要求 Python **3.8-3.11**

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

# -t TRANSFORM [-o DST_DIR] [--overwrite] [-p PROJECT_DIR] [--stage STAGE] [--apply APPLY] [target]
datum transform -t random_split ds:yolo -- --subset train:.67 --subset test:.33 # 随机分割数据集
```

## Reference

```bash
# near-duplicated images
datum prune -m ndr -p </path/to/project/>

datum transform -t ndr -- \
  --working_subset train
  --algorithm gradient
  --num_cut 100
  --over_sample random
  --under_sample uniform
```

- ndr
  - https://openvinotoolkit.github.io/datumaro/latest/docs/command-reference/context_free/transform.html#ndr
- https://openvinotoolkit.github.io/datumaro/latest/docs/command-reference/context_free/index.html

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

## schema

```ts
export interface Root {
  info: Info;
  categories: Categories;
  items: Item[];
}

export interface Info {}

export interface Categories {
  label: Label;
  points: Points;
}

export interface Label {
  labels: Label2[];
  attributes: string[];
}

export interface Label2 {
  name: string;
  parent: string;
  attributes: any[];
}

export interface Points {
  items: any[];
}

export interface Item {
  id: string; // frame_000000
  annotations: Annotation[];
  attr: Attr;
  point_cloud: { path: '' };
  image: Image;
}

export interface Annotation {
  id: number;
  type: string;
  attributes: Attributes;
  group: number;
  label_id: number;
  z_order: number;
  bbox: number[];
}

export interface Attributes {
  occluded: boolean;
  rotation: number;
  track_id: number;
  keyframe: boolean;
}

export interface Attr {
  frame: number;
}

export interface Image {
  path: string;
  size: number[];
}
```

- https://openvinotoolkit.github.io/datumaro/latest/docs/data-formats/formats/datumaro.html
