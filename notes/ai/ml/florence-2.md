---
title: Florence-2
---

# Florence-2

- [microsoft/Florence-2-large](https://huggingface.co/microsoft/Florence-2-large)

```

```

| prompt                                | for                           |
| ------------------------------------- | ----------------------------- |
| `<CAPTION>`                           | 图片生成标题                  |
| `<DETAILED_CAPTION>`                  | 图片生成详细标题              |
| `<CAPTION_TO_PHRASE_GROUNDING>`       | 图片生成标题到短语的grounding |
| `<MORE_DETAILED_CAPTION>`             | 图片生成更详细标题            |
| `<OD>`                                | 目标检测                      |
| `<DENSE_REGION_CAPTION>`              |
| `<REGION_PROPOSAL>`                   |
| `<OCR>`                               |
| `<OCR_WITH_REGION>`                   |
| `<OPEN_VOCABULARY_DETECTION>`         |
| `<REGION_TO_CATEGORY>`                |
| `<REGION_TO_DESCRIPTION>`             |
| `<REGION_TO_SEGMENTATION>`            |
| `<REFERRING_EXPRESSION_SEGMENTATION>` |

- 支持额外 prompt
  - CAPTION_TO_PHRASE_GROUNDING, REFERRING_EXPRESSION_SEGMENTATION, REGION_TO_SEGMENTATION, OPEN_VOCABULARY_DETECTION, REGION_TO_CATEGORY, REGION_TO_DESCRIPTION

```ts
interface DetectionResult {
  bboxes: Array<[x1: number, y1: number, x2: number, y2: number]>;
  labels: string[];
}

interface Result {
  CAPTION: string;
  DETAILED_CAPTION: string;
  MORE_DETAILED_CAPTION: string;
  CAPTION_TO_PHRASE_GROUNDING: DetectionResult;
  OD: DetectionResult;
  DENSE_REGION_CAPTION: DetectionResult;
  REGION_PROPOSAL: DetectionResult;
  OCR: string;
  OCR_WITH_REGION: {
    quad_boxes: Array<[x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number]>;
    labels: string[];
  };
  REGION_TO_SEGMENTATION: {
    polygons: number[][][];
    labels: string[];
  };
}
```
