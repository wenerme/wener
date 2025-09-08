---
tags:
  - Awesome
---

# Python Awesome

| PEP     | tags                                                          | for                         |
| ------- | --------------------------------------------------------------- | --------------------------- |
| PEP 513 | manylinux1_x86_64, manylinux1_i686                              | CentOS 5, EOL on 2017-3-31  |
| PEP 571 | manylinux2010_x86_64, manylinux2010_i686                        | CentOS 6, EOL on 2020-11-30 |
| PEP 599 | manylinux2014\_{x86_64,i686,aarch64,armv7l,ppc64,ppc64le,s390x} | CentOS 7, EOL on 2024-06-30 |
| PEP 656 | musllinux_x_y                                                   | musl >= x.y                 |
| PEP 600 | manylinux_x_y                                                   | glibc >= x.y                |

- https://pypa.io
  - PyPA -> Python Packaging Authority
- PSF -> Python Software Foundation
- Wheel -> A built-package format for Python
- Spec
  - [PEPs](./python-pep.md) - Python Enhancement Proposals
  - [pypa/manylinux](https://github.com/pypa/manylinux)
- Typing
  - [pydantic](https://github.com/pydantic/pydantic)
    - MIT
    - ⭐⭐⭐⭐⭐
    - by Samuel Colvin
    - Data validation and settings management using Python type annotations.
    - 要求 Python 3.8+
  - [dataclasses](https://docs.python.org/3/library/dataclasses.html)
    - PSF
    - by PSF
    - Python 3.7+, lightweight, immutable data classes with minimal boilerplate.
  - [typing](https://docs.python.org/3/library/typing.html)
    - PSF
    - by PSF
    - PEP 484, static type checking in Python.
  - [mypy](https://github.com/python/mypy)
    - MIT
    - by Jukka Lehtosalo
  - [pyright](https://github.com/microsoft/pyright)
    - MIT
    - by Microsoft
  - [pytype](https://github.com/google/pytype)
    - Apache-2.0
    - by Google
    - A Python type inferencer and static analyzer that checks and infers Python types, supporting legacy Python code.
- Toolchain
  - [pip](./pip.md)
  - [uv](./uv.md)
  - [poetry](./poetry.md)
  - tox
  - pipx
- QA/Fomatter/Linter
  - [psf/black](https://github.com/psf/black)
    - ⚠️ 不支持 sort import
      - https://github.com/psf/black/issues/333
    - https://black.vercel.app/
  - isort
    - 可以结合 black
    - https://pycqa.github.io/isort/docs/configuration/black_compatibility.html
  - usort
  - pylint
  - ufmt
- GUI
  - Tkinter
    - 需要额外安装 python-tk
    - theme
      - [rdbende/Sun-Valley-ttk-theme](https://github.com/rdbende/Sun-Valley-ttk-theme)
  - PyQT5
  - [Kivy](https://github.com/kivy/kivy)
    - MIT, Python, Cython
    - OpenGL ES 2.0
  - wxPython
  - Libavg
    - for media-centric applications
  - PySimpleGUI
  - PyForms
  - Wax
  - PySide2
    - Qt
  - PyGUI
    - OpenGL, GTK
  - Streamlit
  - Dear PyGui

| abbr.   | stand for                             | meaning                     |
| ------- | ------------------------------------- | --------------------------- |
| API     | Application Programming Interface     | 应用程序编程接口            |
| ASGI    | Asynchronous Server Gateway Interface | 异步服务器网关接口          |
| AST     | Abstract Syntax Tree                  | 抽象语法树                  |
| CLI     | Command Line Interface                | 命令行界面                  |
| CPython | C Python Implementation               | 官方C语言实现的Python解释器 |
| GIL     | Global Interpreter Lock               | 全局解释器锁                |
| IDLE    | Integrated DeveLopment Environment    | Python自带集成开发环境      |
| OOP     | Object-Oriented Programming           | 面向对象编程                |
| PEP     | Python Enhancement Proposal           | Python增强提案              |
| PIP     | Python Package Index                  | Python包索引                |
| pipenv  | Pip + Virtualenv                      | 包管理与虚拟环境工具        |
| PyPI    | Python Package Index                  | Python官方包仓库            |
| RE      | Regular Expression                    | 正则表达式                  |
| REPL    | Read-Eval-Print Loop                  | 交互式命令行环境            |
| TOML    | Tom's Obvious, Minimal Language       | 配置文件格式                |
| TTY     | Teletypewriter                        | 终端设备                    |
| venv    | Virtual Environment                   | 虚拟环境                    |
| WSGI    | Web Server Gateway Interface          | Web服务器网关接口           |
| YAML    | YAML Ain't Markup Language            | 一种简洁的数据序列化格式    |

# FAQ

## Uvicorn vs Gunicorn

- Gunicorn (Green Unicorn)
  - WSGI 服务器
  - 进程管理器 和应用服务器
  - 多进程模型 (Pre-fork)。它会预先启动多个独立的 worker 进程来处理请求。
  - 用于同步框架，如 Flask, Django
- Uvicorn
  - ASGI 服务器
  - 异步 I/O 的 Web 服务器
  - 单进程事件循环 (Event Loop)。基于 asyncio 在单个进程中通过异步协程处理大量并发连接。
  - 用于异步框架，如 FastAPI, Starlette。
