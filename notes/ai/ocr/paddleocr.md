---
title: PaddleOCR
---

# PaddleOCR

- [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR)
- 支持 英文(ch)、英文(en)、法语(french)、德语(german)、韩语(korean)、日语(japan)
- 参考
  - https://github.com/PaddlePaddle/PaddleOCR/tree/release/2.7/deploy/hubserving
  - https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.7/doc/doc_ch/installation.md
  - https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.7/doc/doc_ch/whl.md
  - https://gitee.com/duolabmeng666/paddlehub_ppocr/blob/master/Dockerfile
  - https://gitee.com/paddlepaddle/PaddleOCR/blob/release/2.6/deploy/docker/hubserving/cpu/Dockerfile

```bash
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

## PP-Structure

- PP-Structure 文档分析
- https://github.com/PaddlePaddle/PaddleOCR/tree/main/ppstructure
- https://paddlepaddle.github.io/PaddleOCR/latest/ppstructure/overview.html
