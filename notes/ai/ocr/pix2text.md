---
title: Pix2Text
---

# Pix2Text

- [breezedeus/Pix2Text](https://github.com/breezedeus/Pix2Text)
  - MIT
  - 国内开发者维护
  - 简体中文&英文 使用的 CnOCR, 其他使用的 EasyOCR
  - p2t 命令行 https://pix2text.readthedocs.io/zh-cn/stable/command/
  - macOS 桌面工具 [breezedeus/Pix2Text-Mac](https://github.com/breezedeus/Pix2Text-Mac)
- 参考
  - [breezedeus/pix2text-layout-docyolo](https://huggingface.co/breezedeus/pix2text-layout-docyolo)
    - 基于 https://github.com/opendatalab/DocLayout-YOLO
  - [breezedeus/pix2text-mfd](https://huggingface.co/breezedeus/pix2text-mfd)
    - 数学公式检测
  - [breezedeus/pix2text-mfr](https://huggingface.co/breezedeus/pix2text-mfr)
    - 数学公式识别
- reshape
  - 224
  - 512
  - 768
  - 1024
  - 1536
  - 2048

:::caution

- table-ocr 可能会错误的识别出 table spanning cell
  - 导致一列少了内容

:::

```bash
# 目前最高只支持 Python 3.12
# CnSTD>=1.2.1, CnOCR>=2.2.2.1, transformers>=4.37.0
# pip install pix2text[multilingual] # 多语言 - 除了 简体中文和英文以外
pip install pix2text -i https://mirrors.aliyun.com/pypi/simple

# for GPU
pip uninstall onnxruntime
pip install onnxruntime-gpu

# --file-type [pdf|page|text_formula|formula|text]
# -i, --img-file-or-dir TEXT
p2t predict \
  -l en,ch_sim --disable-formula --enable-table \
  --resized-shape 768 \
  --file-type pdf \
  -i docs/examples/test-doc.pdf \
  -o output-md \
  --save-debug-res output-debug

# 启动 HTTP 服务
p2t serve -l en,ch_sim -H 0.0.0.0 -p 8503

curl -X POST \
  -F "file_type=page" \
  -F "resized_shape=768" \
  -F "embed_sep= $,$ " \
  -F "isolated_sep=$$\n, \n$$" \
  -F "image=@docs/examples/page2.png;type=image/jpeg" \
  http://0.0.0.0:8503/pix2text
```

## Notes

- Pix2Text
  - #from_config(total_configs:{layout,text_formula,table},enable_table,enable_formula)
  - recognize
  - recognize_pdf
  - recognize_page
  - recognize_text
  - recognize_text_formula
- TableOCR
  - recognize(out_cells,out_objects,out_html,out_csv,out_markdown)
  - `AutoModelForObjectDetection.from_pretrained("$HOME/.pix2text/1.1/table-ocr")`
- DocYoloLayoutParser
  - layout 识别
- LayoutLMv3LayoutParser
  - 之前的 layout 识别
- 数据目录 - data_dir(), root - PIX2TEXT_HOME=$HOME/.pix2text
  - model 目录 `data_dir()/MODEL_VERSION` 例如 `~/.pix2text/1.1`
  - layout-docyolo/
  - mfd-onnx/
  - mfr-onnx/
  - table-rec/
- ~/.cnstd - [breezedeus/CnSTD](https://github.com/breezedeus/CnSTD) - 基于 RapidOCR 集成 PPOCRv4
  - CN STD - 中文文本检测
- ~/.cnocr - [breezedeus/CnOCR](https://github.com/breezedeus/CnOCR)
  - CN OCR - 中文文本识别
- PIX2TEXT_DOWNLOAD_SOURCE=HF

```python
from torchvision import transforms

# TableOCR 的输入处理
structure_transform = transforms.Compose(
    [
        MaxResize(1000),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ]
)
```

## table-rec

- 表格结构识别
- 模型 [breezedeus/pix2text-table-rec](https://huggingface.co/breezedeus/pix2text-table-rec)
- fork [microsoft/table-transformer-structure-recognition-v1.1-all](https://huggingface.co/microsoft/table-transformer-structure-recognition-v1.1-all)
  - ⚠️ 模型完全相同，只是 fork 了仓库
- TATR - Table Transformer
- classes
  - table
  - table column
  - table row
  - table column header
  - table projected row header
  - table spanning cell
  - no object
- 参考
  - Table Transformer (TATR) [microsoft/table-transformer](https://github.com/microsoft/table-transformer)
  - https://huggingface.co/microsoft/table-transformer-structure-recognition

# CN OCR

```bash
# pip install cnocr[ort-gpu]
pip install cnocr[ort-cpu] -i https://mirrors.aliyun.com/pypi/simple
```
