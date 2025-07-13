---
title: PaddleOCR
tags:
  - OCR
---

# PaddleOCR

- [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR)
- 支持 英文(ch)、英文(en)、法语(french)、德语(german)、韩语(korean)、日语(japan)
- ocr_version: PP-OCRv5, PP-OCRv4, PP-OCRv3
- PP-OCRv5
  - lang: ch, chinese_cht, en, japan
- 参考
  - https://github.com/PaddlePaddle/PaddleOCR/tree/release/2.7/deploy/hubserving
  - https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.7/doc/doc_ch/installation.md
  - https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.7/doc/doc_ch/whl.md
  - https://gitee.com/duolabmeng666/paddlehub_ppocr/blob/master/Dockerfile
  - https://gitee.com/paddlepaddle/PaddleOCR/blob/release/2.6/deploy/docker/hubserving/cpu/Dockerfile
  - hf space [PaddlePaddle/PaddleOCR](https://huggingface.co/spaces/PaddlePaddle/PaddleOCR)
- 模型
  - https://paddleocr.bj.bcebos.com/PP-OCRv4/chinese/ch_PP-OCRv4_det_infer.tar
    - 文本检测
  - https://paddleocr.bj.bcebos.com/PP-OCRv4/chinese/ch_PP-OCRv4_rec_infer.tar
    - 文本识别
  - https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_cls_infer.tar
    - 文本方向检测
  - ONNX https://huggingface.co/OleehyO/paddleocrv4.onnx/tree/main
- 缓存目录
  - ~/.paddleocr/whl/det/ch/ch_PP-OCRv4_det_infer/ch_PP-OCRv4_det_infer.tar
- 参考
  - 模型列表 https://github.com/frotms/PaddleOCR2Pytorch/blob/main/doc/doc_ch/models_list.md

```bash
# 版本 https://pypi.org/project/paddlepaddle/#history
# registry.baidubce.com/paddlepaddle/paddle:3.0.0b1-jupyter
# registry.baidubce.com/paddlepaddle/paddle:3.0.0b1
docker run --rm -it \
  -v $PWD:/paddle \
  --name paddle registry.baidubce.com/paddlepaddle/paddle:3.0.0b1 /bin/bash
```

```py
from paddleocr import PaddleOCR, draw_ocr

# Paddleocr目前支持中英文、英文、法语、德语、韩语、日语，可以通过修改lang参数进行切换
# 参数依次为`ch`, `en`, `french`, `german`, `korean`, `japan`。
ocr = PaddleOCR(use_angle_cls=True, lang="ch")
img_path = 'PaddleOCR/doc/imgs/11.jpg'
result = ocr.ocr(img_path, cls=True)
for idx in range(len(result)):
    res = result[idx]
    for line in res:
        print(line)

# 显示结果
from PIL import Image
result = result[0]
image = Image.open(img_path).convert('RGB')
boxes = [line[0] for line in result]
txts = [line[1][0] for line in result]
scores = [line[1][1] for line in result]
im_show = draw_ocr(image, boxes, txts, scores, font_path='/path/to/PaddleOCR/doc/fonts/simfang.ttf')
im_show = Image.fromarray(im_show)
im_show.save('result.jpg')
```

```bash
uv venv --python 3.11
uv pip install paddlepaddle paddleocr
```

```
https://paddle-model-ecology.bj.bcebos.com/paddlex/PaddleX3.0/fonts/PingFang-SC-Regular.ttf
https://paddle-model-ecology.bj.bcebos.com/paddlex/PaddleX3.0/fonts/simfang.ttf
https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv5_server_rec_infer.tar
https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-LCNet_x1_0_doc_ori_infer.tar
https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/UVDoc_infer.tar
https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-LCNet_x1_0_textline_ori_infer.tar
```

- ~/.paddlex/fonts
- ~/.paddlex/official_models
  - PP-LCNet_x1_0_doc_ori
  - PP-LCNet_x1_0_textline_ori
  - PP-OCRv5_server_det
  - PP-OCRv5_server_rec
  - UVDoc
- text_detection - 文本检测
  - 输出 polys
- doc_orientation_classify - 方向分类
- doc_unwarping - 文本图像预处理
- textline_orientation - 文字行方向分类
- PP-LCNet_x1_0_textline_ori
  - https://huggingface.co/PaddlePaddle/PP-LCNet_x1_0_textline_ori
- collection [PP-OCRv5](https://huggingface.co/collections/PaddlePaddle/pp-ocrv5-684a5356aef5b4b1d7b85e4b)

## MCP

- [mcp_server/paddleocr_mcp](https://github.com/PaddlePaddle/PaddleOCR/blob/main/mcp_server/paddleocr_mcp/__main__.py)

## PP-Structure

- 模型
  - layout - picodet_lcnet_x1_0_fgd_layout_cdla_infer
  - table - SLANet_infer
    - 推荐替换为 SLANet_plus_infer
- 会输出为 HTML 结构
  - 提供转 excel 方法 `from paddleocr.ppstructure.table.predict_table import to_excel`
    - `from tablepyxl import tablepyxl;tablepyxl.document_to_xl(html_table, excel_path)`
- PP-Structure 文档分析
- https://github.com/PaddlePaddle/PaddleOCR/tree/main/ppstructure
- https://paddlepaddle.github.io/PaddleOCR/latest/ppstructure/overview.html

# FAQ

## No module named 'paddle'

```bash
pip install paddlepaddle
```

## AttributeError: 'paddle.base.libpaddle.AnalysisConfig' object has no attribute 'set_mkldnn_cache_capacity'

```
enable_mkldnn: False
```
