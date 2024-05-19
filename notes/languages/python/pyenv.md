---
title: pyenv
---

# pyenv

- [pyenv/pyenv](https://github.com/pyenv/pyenv)
  - MIT

```bash
brew install pyenv
pyenv install --list
pyenv install 3

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

# virtualenv
brew install pyenv-virtualenv
pyenv virtualenv 3 venv
```

- PYENV_VERSION
- .python-version
- $(pyenv root)/version
