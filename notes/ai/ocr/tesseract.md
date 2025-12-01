---
title: tesseract
---

# tesseract

- [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract)
  - Apache-2.0, C++
  - Tesseract 主要是为印刷体文本设计的, 有提供手写体识别
  - 2017 4.0 引入 LSTM
  - 2021 5.0 代码优化、指令集加速
  - tessdata 由 Google 维护训练
- 目前不是最准确的 而是 最通用、最轻量、最容易嵌入

```bash
# tesseract-lang -> https://github.com/tesseract-ocr/tessdata_fast/
brew install tesseract

tesseract img.png stdout

# /opt/homebrew/share/tessdata/
# -l eng+chi_sim
tesseract input.jpg -l chi_sim output hocr
```

- https://github.com/tesseract-ocr/tessdata_fast
  - Fast integer versions of trained LSTM models
- https://github.com/tesseract-ocr/tessdata_best
  - Best (most accurate) trained LSTM models.
- https://github.com/tesseract-ocr/tessdata
  - Trained models with fast variant of the "best" LSTM models + legacy models
- https://github.com/tesseract-ocr/langdata
- Static Binary
  - https://github.com/DanielMYT/tesseract-static
    - Linux 大约 10MB

---

- 输出格式支持
  - text, hOCR (HTML), PDF, invisible-text-only PDF, TSV, ALTO , PAGE
  - ALTO - Analyzed Layout and Text Object XML
- ./
  - configs
  - eng.traineddata
  - osd.traineddata - Orientation and Script Detection
  - pdf.ttf
    - GlyphLessFont
  - ~~tessconfigs~~
  - snum.traineddata

## tesseract.js

- [naptha/tesseract.js](https://github.com/naptha/tesseract.js)
  - Apache-2.0
  - npm tesseract.js
  - worker+lib 约 200Kb
  - 模型 osd.traineddata 约 10MB
- [naptha/tesseract.js-core](https://github.com/naptha/tesseract.js-core)
  - wasm 引擎
