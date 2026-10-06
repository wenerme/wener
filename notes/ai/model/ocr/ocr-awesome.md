---
title: OCR Awesome
tags:
  - Model
  - OCR
  - Document Understanding
  - Awesome
---

# OCR Awesome

OCR、文档解析、版面分析、表格和公式识别资源索引。

## OCR Models

| release | model | params |
| --- | --- | --- |
| 2026-02 | [GLM-OCR](https://huggingface.co/THUDM/glm-ocr) | 0.9B |
| 2026-01 | [DeepSeek-OCR-2-3B](https://huggingface.co/deepseek-ai/deepseek-ocr-2-3b) | 3B |
| 2026-01 | [PaddleOCR-VL-1.5](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.5) | 0.9B |
| 2026-01 | [LightOnOCR-2-1B](https://huggingface.co/lightonai/LightOnOCR-2-1B) | 1B |
| 2025-10 | [olmOCR](https://github.com/allenai/olmocr) | 7B |
| 2025-07 | [dots.ocr](https://github.com/Xiaohongshu/Dots-OCR) | 1.7B |
| 2024-09 | [GOT-OCR2.0](https://huggingface.co/stepfun-ai/GOT-OCR2_0) | 580M |

## Document Understanding

- [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR)
- RapidOCR
- Tesseract
- Surya
- [breezedeus/Pix2Text](https://github.com/breezedeus/Pix2Text)
- [mindee/doctr](https://github.com/mindee/doctr)
  - Document Text Recognition；中文支持需要单独验证。
- [docling-project/docling](https://github.com/docling-project/docling)
  - PDF、文档结构和 Markdown/JSON 输出。
  - [ds4sd/docling-models](https://huggingface.co/ds4sd/docling-models)
  - SmolDocling-256M-preview 基于 SmolVLM-256M-Instruct。
- [Yuliang-Liu/MonkeyOCR](https://github.com/Yuliang-Liu/MonkeyOCR)
  - 基于 Qwen2.5-VL-3B，支持中英文、公式和表格识别。
  - SRR：Structure Detection、Content Recognition、Relationship Prediction。
- [nanonets/Nanonets-OCR-s](https://huggingface.co/nanonets/Nanonets-OCR-s)
  - Image → Structure Markdown。
- [ByteDance/Dolphin](https://huggingface.co/ByteDance/Dolphin)
  - Document Image Parsing via Heterogeneous Anchor Prompting。
- [ChatDOC/OCRFlux-3B](https://huggingface.co/ChatDOC/OCRFlux-3B)
- [ocrmypdf/OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF)
  - 为扫描 PDF 添加 OCR text layer。
- [Topdu/OpenOCR](https://github.com/Topdu/OpenOCR)

## Layout Analysis 与 PDF Toolkit

- [opendatalab/OmniDocBench](https://github.com/opendatalab/OmniDocBench)
- Marker
- [rednote-hilab/dots.ocr](https://github.com/rednote-hilab/dots.ocr)
  - 多语言文档版面解析，1.7B，MIT。
- [allenai/olmocr](https://github.com/allenai/olmocr)
  - 将 PDF 线性化为适用于 LLM 数据集和训练的文本。
- [opendatalab/MinerU](https://github.com/opendatalab/MinerU)
  - PDF → JSON / Markdown；AGPLv3。
- [opendatalab/PDF-Extract-Kit](https://github.com/opendatalab/PDF-Extract-Kit)
- DocLayout-YOLO

## 评估关注点

- 文本识别：字符准确率、CER、语言和字体覆盖。
- 版面：标题、段落、表格、公式、图片和阅读顺序。
- 结构化输出：Markdown、JSON、HTML、坐标和 schema 稳定性。
- 复杂文档：扫描件、手写、低清晰度、多栏、旋转、印章和中英文混排。
