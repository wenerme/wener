---
tags:
- FAQ
---
# Paddle FAQ

## CPU


```py
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang='ch')
ocr.det_predictor.set_cpu_math_library_num_threads(8)  # 设置使用 8 个线程
ocr.rec_predictor.set_cpu_math_library_num_threads(8)
ocr.cls_predictor.set_cpu_math_library_num_threads(8)
```

```py
import paddle
paddle.set_device('cpu')
```

```py
export OMP_NUM_THREADS=8  # 设置 OpenMP 使用的线程数
export CPU_NUM=8          # PaddlePaddle 中的线程数
```

- 预测 enable_mkldnn=True
  - cpu_threads=10

## MPS

- 默认没有 mps 支持
- https://github.com/PaddlePaddle/PaddleCustomDevice/blob/develop/backends/mps/README.md

```bash
python -c "import paddle; print(paddle.device.get_all_custom_device_type())"
```
