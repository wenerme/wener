---
tags:
  - FAQ
---

# Python FAQ

- distutils
  - 3.12 之后移除
- Python 3.12 需要 numpy > 1.26.4
  - paddlex 3.0.0b2 依赖 numpy 1.24.4

```bash
python -V && pip -V
pip list --outdated
```

- PYTHONHOME
- PYTHONPATH
- https://docs.python.org/3/using/cmdline.html

## ImportError: attempted relative import with no known parent package

一般是因为直接运行了一个模块文件，而不是通过包的方式运行。

不能

```py
from .module_name
# 修改为
from module_name
```
