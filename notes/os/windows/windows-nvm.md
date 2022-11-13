---
title: nvm
---

# nvm

- [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- 下载安装 https://github.com/coreybutler/nvm-windows/releases/download/1.1.10/nvm-setup.zip
- node 下载位置 https://nodejs.org/dist
- npm 会走 github 下载 [npm/cli](https://github.com/npm/cli)
- 参数
  - node_mirror https://nodejs.org/dist
    - http://npm.taobao.org/mirrors/node/
  - npm_mirror https://github.com/npm/cli/archive
    - http://npm.taobao.org/mirrors/npm/
  - proxy 代理
- use 会直接替代路径为符号链接 - 而不是针对 exe 创建符号链接
- install.cmd 需要管理员身份执行 - 会写注册表
- 推荐卸载旧的 NodeJS %ProgramFiles%\nodejs

```bash
# 支持版本
nvm list available
# 16 为当前 lts
nvm install 16
nvm use 16

npm add -g pnpm
```

> **Note**
>
> 不同版本的全局内容不共享，因此安装了新版本需要重新安装全局工具。

**settings.txt**

```yaml
root: C:\nvm
path: C:\msys64\usr\local\nodejs\bin
arch: 64
proxy: none

node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: http://npm.taobao.org/mirrors/npm/
```
