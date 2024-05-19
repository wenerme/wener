---
title: Labeling
---

# Labeling

- VOC - Visual Object Classes
  - Pascal VOC
  - XML
    - object, name, bndbox
- COCO
  - Common Objects in Context
  - JSON
    - images, annotations, categories
    - bbox - `[x, y, w, h]`
- YOLO - You Only Look Once
  - `<class_index> <x_center> <y_center> <width> <height>`
- 参考
  - https://github.com/KKKSQJ/DeepLearning/tree/master/others/label_convert

## VOC

```xml
<annotation>
    <folder>VOC2012</folder>
    <filename>image1.jpg</filename>
    <size>
        <width>800</width>
        <height>600</height>
        <depth>3</depth>
    </size>
    <object>
        <name>dog</name>
        <pose>Unspecified</pose>
        <truncated>0</truncated>
        <difficult>0</difficult>
        <bndbox>
            <xmin>48</xmin>
            <ymin>240</ymin>
            <xmax>195</xmax>
            <ymax>371</ymax>
        </bndbox>
    </object>
</annotation>

```

## COCO

```json
{
  "images": [
    {
      "id": 1,
      "file_name": "image1.jpg",
      "width": 800,
      "height": 600
    }
  ],
  "annotations": [
    {
      "id": 1,
      "image_id": 1,
      "category_id": 18,
      "bbox": [48, 240, 147, 131],
      "segmentation": [],
      "area": 19257,
      "iscrowd": 0
    }
  ],
  "categories": [
    {
      "id": 18,
      "name": "dog",
      "supercategory": "animal"
    }
  ]
}
```
