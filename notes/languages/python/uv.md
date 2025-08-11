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

## No module named 'setuptools'

```bash
uv pip install setuptools
```
