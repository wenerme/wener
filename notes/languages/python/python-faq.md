---
tags:
  - FAQ
---

# Python FAQ

```bash
python -V && pip -V
pip list --outdated
```

- PYTHONPATH
- https://docs.python.org/3/using/cmdline.html

## venv

:::caution

- 不要在 venv 环境下工作 - 不要放项目内容

:::


```bash
# 以前为 pyvenv -  3.3 - 3.7
# 有些 distro 需要额外安装 python3-venv
# 只有部分 virtualenv 功能
python3 -m venv venv

source venv/bin/activate
deactivate

# 如果只删除虚拟环境
cd venv
rm -rf bin include lib lib64 Scripts Lib pyvenv.cfg
```

```
venv/
├── bin/ (Linux/macOS) or Scripts/ (Windows)
│   ├── activate
│   ├── activate.csh
│   ├── activate.fish
│   ├── pip
│   ├── python -> python3
│   └── python3
├── include/
├── lib/ (Linux/macOS) or Lib/ (Windows)
│   └── pythonX.Y/
│       └── site-packages/
├── lib64/ (Linux, optional)
├── pyvenv.cfg
└── share/ (Linux, optional)
```

- [pyenv](./pyenv.md)
  - 多版本管理
- [python-poetry/poetry](https://github.com/python-poetry/poetry)
- pyenv-virtualenv
- venv
  - https://docs.python.org/3/library/venv.html
- virtualenv
  - https://virtualenv.pypa.io/en/latest/
- pipenv
- ~~pyvenv~~
