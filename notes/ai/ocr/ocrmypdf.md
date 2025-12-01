---
title: OCRmyPDF
tags:
  - PDF
---

# OCRmyPDF

- [ocrmypdf/OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF)
  - MPL-2.0, Python
  - adds an OCR text layer to scanned PDF
- 流程
  - 光栅化
  - 预处理
    - deskew
    - clean
  - 准备图像
  - OCR 识别
    - Tesseract OCR
  - 渲染 OCR 层
- PDF/A 格式
  - 无字形字体（Glyphless Font）
  - Form XObject
- Tesseract 4+ OCR engine mode
  - 0 - original Tesseract only
  - 1 - neural nets LSTM only
  - 2 - Tesseract + LSTM
  - 3 - default

```bash
docker run --rm -i \
  --user "$(id -u):$(id -g)" \
  --workdir /data \
  -v "$PWD:/data" \
  jbarlow83/ocrmypdf-alpine \
  --keep-temporary-files \
  --image-dpi 300 \
  /data/input.jpg /data/output.pdf

docker run --rm -i \
  --entrypoint tesseract \
  jbarlow83/ocrmypdf-alpine \
  input.jpg output hocr
```
