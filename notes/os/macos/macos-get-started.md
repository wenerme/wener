---
title: 入门指南
tags:
  - Beginner
---

# macOS 入门指南

```bash
sudo softwareupdate --install --all # 系统更新 - 可以同时操作安装环境
xcode-select --install              # 安装 xcode command line tools
```

- 软件
  - [Google Chrome](https://www.google.com/intl/en/chrome/?standalone=1)
  - [Jetbrains Toolbox](https://www.jetbrains.com/toolbox-app/)


**Brew**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

export PATH="/opt/homebrew/bin:$PATH"

export HOMEBREW_NO_ANALYTICS=1
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"
# export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
brew update

brew install iterm2 google-chrome
```

## 开发

```bash
# Linux/GNU 命令
brew install openssh git bash ssh-copy-id sshuttle tmux vim bash-completion2
brew install less nano file-formula findutils coreutils binutils diffutils wget rsync unzip gzip unrar telnet p7zip
brew install gnu-{indent,sed,tar,which,units,time} gnutls gpatch grep

# Utils
brew install jq yq

# Extra
brew install mosh wdiff fping
# autossh
```

## 环境

```bash
# Docker
brew install orbstack

# Golang
brew install go

# K8S
brew install kubectl krew openlens helm kustomize
```


## NodeJS 环境 {#node}

```bash
brew install nvm
mkdir -p ~/.nvm
# 配置环境变量到 .zprofile 或 .profile
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix)/opt/nvm/nvm.sh" ] && . "$(brew --prefix)/opt/nvm/nvm.sh"                                       # This loads nvm
[ -s "$(brew --prefix)/opt/nvm/etc/bash_completion.d/nvm" ] && . "$(brew --prefix)/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion

# zprofile for zsh
test -r ~/.zprofile && cat << 'EOF' >> ~/.zprofile
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix)/opt/nvm/nvm.sh" ] && . "$(brew --prefix)/opt/nvm/nvm.sh"  # This loads nvm
[ -s "$(brew --prefix)/opt/nvm/etc/bash_completion.d/nvm" ] && . "$(brew --prefix)/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
EOF

nvm install --lts
nvm use --lts
```

