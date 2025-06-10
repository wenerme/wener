---
tags:
  - Serverless
---

# replicate

- [replicate/cog](https://github.com/replicate/c
  og)
  - Apache-2.0, Go, Python, Docker
  - 用于机器学习模型的部署和运行
  - 支持多种模型格式
  - 提供了一个简单的 API 来运行模型
- https://replicate.com/microsoft/omniparser-v2
  - $0.0017 / run
  - $1.00 / 588 runs
- https://replicate.com/black-forest-labs/flux-kontext-pro
  - $0.04 / run
  - $1.00 / 25 runs
- PaddleOCR v4 https://replicate.com/hexiaochun/pp-ocr-v4

```bash
# crane 能获取 image 大小
# 7.5G
crane manifest r8.im/hexiaochun/pp-ocr-v4@sha256:084b779cb09bc2462335a5768fabaeaaba53bb3f70afd0d2fe48fad71fdc4d5a | jq '.config.size + ([.layers[].size] | add)' | numfmt --to=iec
# 11G
crane manifest r8.im/microsoft/omniparser-v2@sha256:49cf3d41b8d3aca1360514e83be4c97131ce8f0d99abfc365526d8384caa88df | jq '.config.size + ([.layers[].size] | add)' | numfmt --to=iec
```

- /src
  - predictor.py
  - cog.yaml

## hexiaochun/pp-ocr-v4

```yaml
build:
  gpu: true
  python_version: '3.9'
  system_packages:
    - ffmpeg # Required for video processing
  python_packages:
    - pillow
  run:
    - pip install --default-timeout=1000 paddlepaddle-gpu
    - pip install paddleocr
    - mkdir -p /root/.paddleocr/whl/cls/ch_ppocr_mobile_v2.0_cls_infer # 先创建目录
    - wget -O /root/.paddleocr/whl/cls/ch_ppocr_mobile_v2.0_cls_infer/ch_ppocr_mobile_v2.0_cls_infer.tar https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_cls_infer.tar
    - tar -xvf /root/.paddleocr/whl/cls/ch_ppocr_mobile_v2.0_cls_infer/ch_ppocr_mobile_v2.0_cls_infer.tar -C /root/.paddleocr/whl/cls/ch_ppocr_mobile_v2.0_cls_infer
    - mkdir -p /root/.paddleocr/whl/det/ch/ch_PP-OCRv4_det_infer # 创建目录
    - wget -O /root/.paddleocr/whl/det/ch/ch_PP-OCRv4_det_infer/ch_PP-OCRv4_det_infer.tar https://paddleocr.bj.bcebos.com/PP-OCRv4/chinese/ch_PP-OCRv4_det_infer.tar
    - tar -xvf /root/.paddleocr/whl/det/ch/ch_PP-OCRv4_det_infer/ch_PP-OCRv4_det_infer.tar -C /root/.paddleocr/whl/det/ch/ch_PP-OCRv4_det_infer
    - mkdir -p /root/.paddleocr/whl/rec/ch/ch_PP-OCRv4_rec_infer # 创建目录
    - wget -O /root/.paddleocr/whl/rec/ch/ch_PP-OCRv4_rec_infer/ch_PP-OCRv4_rec_infer.tar https://paddleocr.bj.bcebos.com/PP-OCRv4/chinese/ch_PP-OCRv4_rec_infer.tar
    - tar -xvf /root/.paddleocr/whl/rec/ch/ch_PP-OCRv4_rec_infer/ch_PP-OCRv4_rec_infer.tar -C /root/.paddleocr/whl/rec/ch/ch_PP-OCRv4_rec_infer
```

```py
from cog import BasePredictor, Input, Path
from paddleocr import PaddleOCR, draw_ocr
from PIL import Image

class Predictor(BasePredictor):
    def setup(self):
        # Load the PaddleOCR model once during setup
        self.lang = 'ch'  # Save the default language
        self.ocr = PaddleOCR(use_angle_cls=True, lang=self.lang)  # Load the model with the default language

    def predict(self, image: Path = Input(description="Input image file"), lang: str = Input(description="Language model", default="ch")) -> dict:
        # Update the language if different from the loaded model
        if self.lang != lang:
            self.ocr = PaddleOCR(use_angle_cls=True, lang=lang)
            self.lang = lang  # Update the current language

        # Perform OCR on the image
        result = self.ocr.ocr(str(image), cls=True)

        # Extract results
        extracted_data = []
        for res in result:
            for line in res:
                box = line[0]
                text = line[1][0]
                confidence = line[1][1]
                extracted_data.append({
                    "box": box,
                    "text": text,
                    "confidence": confidence
                })

        # Return the OCR results
        return {"results": extracted_data}
```

```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d $'{
    "input": {
      "lang": "ch",
      "image": "https://replicate.delivery/pbxt/LU2RNiJHWHYLMvsZZjGktBFFVUB3OYR49mzp20Mln3WNPznP/output.jpg"
    }
  }' \
  http://localhost:5000/predictions
```
