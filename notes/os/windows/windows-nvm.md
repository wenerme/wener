---
title: nvm
---

# nvm

- [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
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

```bash
# 支持版本
nvm list available
# 14 为当前 lts
nvm install 14.17.3
nvm use 14.17.3

npm add -g yarn
```

**settings.txt**

```yaml
root: C:\nvm
path: C:\msys64\usr\local\nodejs\bin
arch: 64
proxy: none

node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: http://npm.taobao.org/mirrors/npm/
```
