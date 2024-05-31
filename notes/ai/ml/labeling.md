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
  - OOB `class_index, x1, y1, x2, y2, x3, y3, x4, y4`
  - SEG `<class-index> <x1> <y1> <x2> <y2> ... <xn> <yn>`
  - Pose DIM=2 `<class-index> <x> <y> <width> <height> <px1> <py1> <px2> <py2> ... <pxn> <pyn>`
  - Pose DIM=3 `<class-index> <x> <y> <width> <height> <px1> <py1> <p1-visibility> <px2> <py2> <p2-visibility> <pxn> <pyn> <p2-visibility>`
- VGG Image Annotator (VIA)
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
