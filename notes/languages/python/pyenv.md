---
title: pyenv
---

# pyenv

- [pyenv/pyenv](https://github.com/pyenv/pyenv)
  - MIT
  - 管理多版本 Python

:::tip

- 机器学习建议使用 3.9, 3.10 这样的版本，避免太新的 3.11 和 3.12

:::

```bash
brew install pyenv
pyenv install --list
pyenv install 3.10 # 安装指定版本
pyenv local 3.10   # 切换当前目录的 Python 版本, 需要先 init
cat .python-version

python3 -m venv venv # 使用当前的版本来初始化 venv, 之后 activate 也是这个版本
source venv/bin/activate

# pyenv install 2
# pyenv global 2

export PATH=$(pyenv root)/shims:$PATH

# $HOME/.pyenv/
pyenv root
ls $(pyenv root)/shims

echo 'export PATH="$HOME/.pyenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init --path)"' >> ~/.bashrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
source ~/.bashrc

# 单次初始化 pyenv
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"

# virtualenv
brew install pyenv-virtualenv
pyenv virtualenv 3 venv
```

- PYENV_VERSION
- .python-version
- $(pyenv root)/version
