---
tags:
  - FAQ
---

# Python FAQ

- PEP 8 Spaces are the preferred indentation method.
  - 官方推荐 4 space
- distutils
  - 3.12 之后移除
- Python 3.12 需要 numpy > 1.26.4
  - paddlex 3.0.0b2 依赖 numpy 1.24.4
- `__pycache__`
  - 缓存目录
  - 默认开启
  - 可以通过 `python -B` 关闭
  - 存储的文件名是 `__pycache__/module_name.cpython-312.pyc`

```bash
python -V && pip -V
pip list --outdated

# 简单的 HTTP 服务器
python3 -m http.server 8080
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

## ModuleNotFoundError: No module named 'PIL'

```bash
pip install pillow
```

## decord

```
error: Distribution `decord==0.6.0 @ registry+https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple` can't be installed because it doesn't have a source distribution or wheel for the current platform
hint: You're on Linux (`linux_x86_64`), but `decord` (v0.6.0) only has wheels for the following platforms: `manylinux2010_x86_64`, `win_amd64`; consider adding your platform to `tool.uv.required-environments` to ensure uv resolves to a version with compatible wheels
error building image: error building stage: failed to execute command: waiting for process to exit: exit status 2
```

- https://github.com/dmlc/decord
- [georgia-tech-db/eva-decord](https://github.com/georgia-tech-db/eva-decord)
  - fork decord
