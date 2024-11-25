---
tags:
  - Package Management
---

# poetry

- [python-poetry/poetry](https://github.com/python-poetry/poetry)
  - MIT, Python
- pyproject.toml <- setup.py, requirements.txt, setup.cfg, MANIFEST.in, Pipfile

```bash
brew install poetry # by macOS Homebrew
pip install poetry  # by pip

poetry init           # for existing project
poetry new my-project # for new project

# brew install python@3.12
python3.12 --version # 修改 python 版本
poetry env use python3.12

poetry run which python # venv
poetry run python --version

poetry self update # update poetry

poetry config --list # 查看配置

# POETRY_VIRTUALENVS_PATH
poetry config virtualenvs.path # 查看 virtualenvs 路径
# 可以考虑不提交 poetry.toml 到仓库
poetry config virtualenvs.create false --local    # 项目维度配置 poetry.toml
poetry config virtualenvs.in-project true --local # 推荐 - 创建到 .venv 而不是 {cache-dir}/virtualenvs
```

## Configuration {#conf}

- 配置 POETRY_CONFIG_DIR, cache-dir
  - `~/Library/Application Support/pypoetry`
  - `%APPDATA%\pypoetry`
  - `$XDG_CONFIG_HOME/.config/pypoetry`
  - `~/.config/pypoetry`
- 数据 POETRY_HOME, POETRY_DATA_DIR
  - `$XDG_DATA_HOME/pypoetry`, `~/.local/share/pypoetry`
  - `%APPDATA%\pypoetry`
  - `~/Library/Application Support/pypoetry`
- 缓存目录 POETRY_CACHE_DIR
  - Linux: `$XDG_CACHE_HOME/pypoetry`, `~/.cache/pypoetry`
  - Windows: `%LOCALAPPDATA%\pypoetry`
  - macOS: `~/Library/Caches/pypoetry`
- 参考
  - https://python-poetry.org/docs/configuration/#available-settings

## system site-packages

```bash
python -m venv --system-site-packages .venv
poetry env use .venv/bin/python
```

## Monorepo

- https://gitlab.com/gerbenoostra/poetry-monorepo/

# FAQ

## using requirements.txt

```toml
[project]
dynamic = ["dependencies", "optional-dependencies"]
[tool.setuptools.dynamic]
dependencies = {file = ["requirements.txt"]}
optional-dependencies = {dev = { file = ["requirements-dev.txt"] }}
```

## Docker

- https://miguel-mendez-ai.com/2024/03/12/poetry-torch-docker

## Torch CPU only

```bash
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# TORCH_ARCH cu116
poetry run pip install torch==2.5.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
```

```bash
poetry source add --priority explicit pytorch https://download.pytorch.org/whl/cpu
poetry add --source pytorch torch touchvision

poetry add --source pytorch torch=2.5.0+cpu
```

- 2.2.2 之后版本失败 Unable to find installation candidates for torch
- macOS 会安装失败
  - https://github.com/python-poetry/poetry/issues/9524
- Instructions for installing PyTorch [python-poetry/poetry#6409](https://github.com/python-poetry/poetry/issues/6409)

**支持切换的配置方式**

```toml

[tool.poetry.group.cpu]
optional = true

[tool.poetry.group.cpu.dependencies]
torch = { version = "^2.5.0", source = "pytorch-cpu", markers = "extra=='cpu' and extra!='gpu'" }

[tool.poetry.group.gpu]
optional = true

[tool.poetry.group.gpu.dependencies]
torch = { version = "^2.5.0", source = "pytorch-gpu", markers = "extra=='gpu' and extra!='cpu'" }

[tool.poetry.extras]
cpu = ["torch", "torchvision"]
gpu = ["torch", "torchvision"]

[[tool.poetry.source]]
name = "pytorch-cpu"
url = "https://download.pytorch.org/whl/cpu"
priority = "explicit"

[[tool.poetry.source]]
name = "pytorch-gpu"
url = "https://download.pytorch.org/whl/cu121"
priority = "explicit"

[[tool.poetry.source]]
name = "pytorch-cuda"
url = "https://download.pytorch.org/whl/cu121"
priority = "explicit"
```

```bash
poetry install -E cpu --with cpu --sync

poetry install -E gpu --with gpu --sync
```

## 只初始化 venv {#init-venv-only}

```bash
poetry run echo "Venv initialized"
```

用于先有 venv, 然后需要使用 pip 安装部分依赖, 然后再使用 poetry 安装的场景
