---
tags:
  - OCR
---

# OmniParser

- [microsoft/OmniParser](https://github.com/microsoft/OmniParser)
  - 识别 UI 交互元素, 屏幕分析
  - Pure Vision Based GUI Agent
  - hf [microsoft/OmniParser-v2.0](https://huggingface.co/microsoft/OmniParser-v2.0)
  - demo [microsoft/OmniParser-v2](https://huggingface.co/spaces/microsoft/OmniParser-v2)
  - provider
    - https://replicate.com/microsoft/omniparser-v2
      - $0.0017 / run
      - $1.00 / 588 runs


```bash
docker run --rm -it -p 5000:5000 --gpus=all r8.im/microsoft/omniparser-v2
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d $'{
    "input": {
      "image": "https://example.com/screenshot.png",
      "imgsz": 640,
      "box_threshold": 0.05,
      "iou_threshold": 0.1
    }
  }' \
  http://localhost:5000/predictions
```
