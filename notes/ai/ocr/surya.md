---
title: surya
---

# surya

- [VikParuchuri/surya](https://github.com/VikParuchuri/surya)
  - GPLv3, Python
  - document OCR
- 参考
  - https://huggingface.co/spaces/artificialguybr/Surya-OCR
  - https://github.com/VikParuchuri/surya/blob/master/surya/languages.py
  - Qwen2.5 VL
- 宽度不要超过 2048

```bash
python3 -m venv venv
source venv/bin/activate

pip install surya-ocr

# 最基础的检测 输出 box
# results/surya/test/{result.json,test_0_bbox.png}
surya_detect --images ./test.png

surya_ocr --langs zh ./test.png
# 强制使用 CPU
# mps 出现异常 Placeholder shape mismatches (expected 1 vs got tensorData with 1344) at dimIdx = 0
TORCH_DEVICE=cpu surya_ocr --langs zh ./test.png

# GUI
pip install streamlit
surya_gui

# surya_table 只会输出 box
# tabled 可以输出为 markdown table
pip install tabled-pdf
TORCH_DEVICE=cpu tabled --format markdown --save_json --save_debug_images --detect_cell_boxes ./table.jpg ./out
```

```ts
interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

type Polygon = [number, number][];

interface LineDetection {
  bbox: BoundingBox; // 文本行的轴对齐矩形（包围盒）
  polygon: Polygon; // 文本行的多边形，按顺时针方向排列 from top left
  confidence: number; // 置信度（0-1 之间的值）

  // surya_order - 0 开始
  position: number;
  // surya_layout
  label: string; // Caption, Footnote, Formula, List-item, Page-footer, Page-header, Picture, Figure, Section-header, Table, Text, Title
}

interface VerticalLineDetection {
  bbox: BoundingBox; // 垂直线的轴对齐矩形（包围盒）
}

interface PageResult {
  page: number; // 文件中的页码
  bboxes: LineDetection[]; // 文本行的检测结果列表，包含包围盒和置信度等
  vertical_lines: VerticalLineDetection[]; // 检测到的垂直线列表
  image_bbox: BoundingBox; // 图像的包围盒，所有文本行的包围盒都包含在该范围内
}

interface DetectResult {
  [filename: string]: PageResult[]; // 键为文件名（无扩展名），值为页面检测结果的数组
}
```
