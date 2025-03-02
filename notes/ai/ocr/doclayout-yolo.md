---
tags:
  - YOLO
---

# DocLayout-YOLO

- [opendatalab/DocLayout-YOLO](https://github.com/opendatalab/DocLayout-YOLO)
  - AGPLv3, Python, YOLOv10
  - https://huggingface.co/spaces/opendatalab/DocLayout-YOLO
- classes
  - title
  - plain text
  - abandon
  - figure
  - figure_caption
  - table
  - table_caption
  - table_footnote
  - isolate_formula
  - formula_caption

```python
#%%
from doclayout_yolo import YOLOv10
from huggingface_hub import hf_hub_download

# model = YOLOv10.from_pretrained("juliozhao/DocLayout-YOLO-DocStructBench")
filepath = hf_hub_download(repo_id="juliozhao/DocLayout-YOLO-DocStructBench",
                           filename="doclayout_yolo_docstructbench_imgsz1024.pt")
model = YOLOv10(filepath)
#%%
import torch

device = torch.device((
  "cuda"
  if torch.cuda.is_available()
  else "mps"
  if torch.backends.mps.is_available()
  else "cpu"
))
det_res = model.predict("input/2003-D30-000-0013.jpg", imgsz=1024, device=device)

#%%
import cv2

annotated_frame = det_res[0].plot(pil=True, line_width=5, font_size=20)
cv2.imwrite("result.jpg", annotated_frame)
#%%
result = det_res[0]
table_class_id = None
for id, name in det_res[0].names.items():
  if name == "table":
    table_class_id = id
    break
table_class_id
#%%
table_boxes = []
for i, cls in enumerate(result.boxes.cls):
  if int(cls.item()) == table_class_id:
    # 获取表格边界框 [x1, y1, x2, y2]
    box = result.boxes.xyxy[i].cpu().numpy()
    # 获取置信度
    conf = result.boxes.conf[i].item()
    table_boxes.append({
      "xywh": box.tolist(),
      "confidence": conf
    })
table_boxes
```


```tsx


```
