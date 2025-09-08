---
tags:
  - Package Manager
---

# uv

- [astral-sh/uv](https://github.com/astral-sh/uv)
  - Apache-2.0, MIT, Rust

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
brew install uv # macOS Homebrew
pip install uv
# ~/.local/bin
pipx install uv
export PATH="$HOME/.local/bin:$PATH"

uv init example
cd example
uv add ruff
uv run ruff check
uv sync

# Python 版本管理
uv python install 3.10 3.11 3.12
uv venv --python 3.11 # 按需下载
uv run --python pypy@3.8 -- python --version
uv python pin 3.12 # 固定 .python-version

uv pip
uv venv

uv pip sync pyproject.toml
uv pip compile pyproject.toml -o requirements.lock
uv pip sync requirements.lock
```

# FAQ

```bash
uv sync --extra cpu
```

```toml
# 可选依赖组
[project.optional-dependencies]
cpu = [
    "torch==2.8.0+cpu",
    "torchvision==0.23.0+cpu",
    "torchaudio==2.8.0+cpu",
]
cu128 = [
    "torch==2.8.0+cu128",
    "torchvision==0.23.0+cu128",
    "torchaudio==2.8.0+cu128",
]

# 包索引 / 源
[[tool.uv.index]]
name = "pytorch-cpu"
url = "https://download.pytorch.org/whl/cpu"
# 专用
explicit = true

[[tool.uv.index]]
name = "pytorch-cu128"
url = "https://download.pytorch.org/whl/cu128"
explicit = true

# 关联 包 <-> Index
[tool.uv.sources]
torch = [
	{ index = "pytorch-cpu", extra = "cpu" }, # 条件控制
	{ index = "pytorch-cu128", extra = "cu128" },
]
torchvision = [
	{ index = "pytorch-cpu", extra = "cpu" },
	{ index = "pytorch-cu128", extra = "cu128" },
]

[tool.uv]
index-url = "https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"
# 互斥
conflicts = [[
	{ extra = "cpu" },
	{ extra = "cu128" },
]]



```

## No module named 'setuptools'

```bash
uv pip install setuptools
```
