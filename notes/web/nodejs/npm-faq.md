---
title: NPM FAQ
tags:
  - FAQ
---

# NPM FAQ

## 环境变量

- `npm_config_*`
- https://docs.npmjs.com/cli/v9/using-npm/config#environment-variables
- NPM_CONFIG_REGISTRY
  - Yarn 无 https://github.com/yarnpkg/yarn/issues/2091

## lockfileVersion: 2 install script

没有 hasInstallScript，导致没有调用安装脚本。

```bash
npx fix-has-install-script
```

```bash title="ESBuild"
# 在不修改 packages-lock.json 的情况下手动安装是最简单的
node ./node_modules/esbuild/install.js
```

- [npm/cli#2606](https://github.com/npm/cli/issues/2606)

## speed up npm ci

```bash
# --cache $PWD/.cache 确保利用缓存
# --only=production 不安装 dev - 看情况 - 例如 基础容器已经包含
# --silent
npm ci --prefer-offline --no-audit

# 或者还是直接用 install - 保留现有 node_modules
npm install --no-fund --no-audit
```

## 查看 native 模块依赖

```bash
find node_modules -type f -name "*.node" 2> /dev/null | grep -v "obj\.target" | xargs ldd

npx native-modules
```

## ENOTEMPTY: directory not empty, rename

1. 尝试删除
2. 尝试 --force
3. 尝试新版本

```bash
npm install -g npm
```

## global permission deined

```bash
# 1. chown
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# 2. 修改 prefix
npm config get prefix # 当前 prefix

mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
# NPM_CONFIG_PREFIX
export PATH=~/.npm-global/bin:$PATH
```
