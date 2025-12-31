---
title: Prompts
---

# Prompts

## qwen3vl

```
Locate every object that matches the description "{{sentence}}" in the image. Report bbox coordinates in JSON format.
```

```
Locate the {{class_name}} in the provided image and output their positions and dimensions using 3D bounding boxes. The results must be in the JSON format: `[{"bbox_3d":[x_center, y_center, z_center, x_size, y_size, z_size, roll, pitch, yaw],"label":"category"}]
```

```
Detect all **{{sentence}}** objects in the image and return their locations in the form of coordinates. The format of output should be like {"bbox_2d": [x1, y1, x2, y2], "label": "object name or value"}.
```
