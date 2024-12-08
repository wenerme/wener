---
title: conda
tags:
- Package Manager
---

# conda

- [conda/conda](https://github.com/conda/conda)
  - BSD-3, Python
- Miniconda - 只有 conda 和 Python 的 Anaconda 最小发行版
  - Anaconda 包含了非常多的基础包，开箱即用
  - https://docs.anaconda.com/free/miniconda/

```bash
brew instakk miniconda

conda --help

# 基础使用
# /opt/homebrew/Caskroom/miniconda/base/envs/py310
conda create --name py310 python=3.10
conda activate py310
conda update --all
conda install -c conda-forge openvino=2023.3.0

# ~/.condarc
conda config --show

# 初始化脚本
conda shell.zsh hook
conda shell.bash hook

eval "$(conda shell.bash hook)"

conda config --set auto_activate_base false # 如果不想默认激活 base 环境

conda env list
conda info --envs
conda env remove --name py310
```

- Channel - `-c`
  - conda-forge - https://conda.anaconda.org/conda-forge

**~~/.bash_profile**

```sh
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/opt/homebrew/Caskroom/miniconda/base/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
  eval "$__conda_setup"
else
  if [ -f "/opt/homebrew/Caskroom/miniconda/base/etc/profile.d/conda.sh" ]; then
    . "/opt/homebrew/Caskroom/miniconda/base/etc/profile.d/conda.sh"
  else
    export PATH="/opt/homebrew/Caskroom/miniconda/base/bin:$PATH"
  fi
fi
unset __conda_setup
# <<< conda initialize <<<
```
