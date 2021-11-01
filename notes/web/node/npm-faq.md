---
title: NPM FAQ
tags:
  - FAQ
---

# NPM FAQ

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
# --only=production 不安装 dev - 看情况
# --silent
npm ci --prefer-offline --no-audit

# 或者还是直接用 install
npm install --no-fund --no-audit
```
