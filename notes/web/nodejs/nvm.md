---
title: nvm
---

# nvm

- node 版本管理
- brew 默认安装最新版
- 实际开发使用强烈建议使用 lts

```bash
brew install nvm

# 添加 profile - 下次 shell 还能用
cat << 'SHELL' >> ~/.bash_profile
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"
SHELL

mkdir -p ~/.nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"

nvm install --lts         # 安装
nvm use --lts             # 切换版本
nvm install 'lts/*'       #
nvm alias default 'lts/*' # 设置默认 LTS
nvm alias default 16      #
```

## AlpineLinux

```bash
export NVM_NODEJS_ORG_MIRROR=https://unofficial-builds.nodejs.org/download/release
NVM_DIR="$HOME/.nvm"
source "$HOME/.nvm/nvm.sh"

nvm_get_arch() { nvm_echo "x64-musl"; }

nvm i --lts
```
