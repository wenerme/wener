---
title:
  - Model
---

# Table Transformer

- [microsoft/table-transformer](https://github.com/microsoft/table-transformer)
  - TATR - Table Transformer
- labels
  - table
  - table column
  - table row
  - table column header
  - table projected row header
  - table spanning cell
- 参考
  - https://huggingface.co/microsoft/table-transformer-structure-recognition
  - [microsoft/table-transformer-structure-recognition-v1.1-all](https://huggingface.co/microsoft/table-transformer-structure-recognition-v1.1-all)

```py
from transformers import TableTransformerForObjectDetection
import torch

tatr = TableTransformerForObjectDetection.from_pretrained("microsoft/table-structure-recognition-v1.1-all")
device = torch.device(("cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"))
tatr = tatr.to(device)
tatr.config.id2label
#%%
from torchvision import transforms

class MaxResize(object):
  def __init__(self, max_size=800):
    self.max_size = max_size

  def __call__(self, image):
    width, height = image.size
    current_max_size = max(width, height)
    scale = self.max_size / current_max_size
    resized_image = image.resize((int(round(scale * width)), int(round(scale * height))))
    return resized_image


structure_transform = transforms.Compose([
  MaxResize(1000),
  transforms.ToTensor(),
  transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

from PIL import Image

img = Image.open("./inputs/table.png").convert("RGB")
pixel_values = structure_transform(img).unsqueeze(0).to(device)

with torch.no_grad():
  structure_outputs = tatr(pixel_values)

structure_outputs
#%%
def box_cxcywh_to_xyxy(x):
  x_c, y_c, w, h = x.unbind(-1)
  b = [(x_c - 0.5 * w), (y_c - 0.5 * h), (x_c + 0.5 * w), (y_c + 0.5 * h)]
  return torch.stack(b, dim=1)

def rescale_bboxes(out_bbox, size):
  img_w, img_h = size
  b = box_cxcywh_to_xyxy(out_bbox)
  b = b * torch.tensor([img_w, img_h, img_w, img_h], dtype=torch.float32)
  return b

def outputs_to_objects(outputs, img_size, class_idx2name):
  m = outputs['logits'].softmax(-1).max(-1)
  pred_labels = list(m.indices.detach().cpu().numpy())[0]
  pred_scores = list(m.values.detach().cpu().numpy())[0]
  pred_bboxes = outputs['pred_boxes'].detach().cpu()[0]
  pred_bboxes = [elem.tolist() for elem in rescale_bboxes(pred_bboxes, img_size)]

  objects = []
  for label, score, bbox in zip(pred_labels, pred_scores, pred_bboxes):
    class_label = class_idx2name[int(label)]
    if not class_label == 'no object':
      objects.append({'label': class_label, 'score': float(score), 'bbox': [float(elem) for elem in bbox]})

  return objects

import copy

structure_id2label = copy.deepcopy(tatr.config.id2label)
structure_id2label[len(structure_id2label)] = "no object"

structure_objects = outputs_to_objects(structure_outputs, img.size, structure_id2label)
structure_objects  # [{label,score,bbox}]
#%%
from PIL import ImageDraw

def draw_bboxes(bboxes, page_image, color='red'):
  page_image = page_image.copy()
  draw = ImageDraw.Draw(page_image)

  for bbox in bboxes:
    draw.rectangle(bbox, outline=color)

  return page_image


objects = [x for x in structure_objects if x['score'] > 0.5]
draw_bboxes([x['bbox'] for x in objects], img)
```
