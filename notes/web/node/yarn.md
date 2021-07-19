---
id: yarn
title: Yarn
---

# Yarn

- [nohoist in Workspaces](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/)

```bash
# $HOME/.yarn/global
yarn global dir
# 可升级依赖
yarn outdated
# 升级依赖
yarn upgrade
```

## .yarnrc

```
registry "https://registry.npm.taobao.org"
disturl "https://npm.taobao.org/dist"

network-timeout 60000

chromedriver_cdnurl "http://cdn.npm.taobao.org/dist/chromedriver"
electron_mirror "http://cdn.npm.taobao.org/dist/electron/"
fse_binary_host_mirror "https://npm.taobao.org/mirrors/fsevents"
node_inspector_cdnurl "https://npm.taobao.org/mirrors/node-inspector"
NODEJS_ORG_MIRROR "http://npm.taobao.org/mirrors/node"
nvm_nodejs_org_mirror "http://npm.taobao.org/mirrors/node"
operadriver_cdnurl "https://npm.taobao.org/mirrors/operadriver"
phantomjs_cdnurl "https://npm.taobao.org/mirrors/phantomjs"
profiler_binary_host_mirror "http://npm.taobao.org/mirrors/node-inspector/"
puppeteer_download_host "https://npm.taobao.org/mirrors"
sass_binary_site "http://npm.taobao.org/mirrors/node-sass"
selenium_cdnurl "http://npm.taobao.org/mirrors/selenium"
SQLITE3_BINARY_SITE "http://npm.taobao.org/mirrors/sqlite3"
```

## berry

- 为什么用 yarn2
  - 没有 node_moduels
  - 依赖以压缩包形式存在
    - 占用空间更少
    - 文件数少
  - 依赖压缩包不可变
    - 缓存
    - 构建更加快速
    - 能实现离线安装构建
  - 访问界限更加严谨
    - 如果没有定义依赖，则 impor 会失败
    - node_moduels 时只要有都能 import
  - 构建速度更快
  - 支持插件
  - 新增 dlx 命令 - 等同于 `npm dlx`
- 所有 .yarnrc.yml 中的配置都可以用环境变量
  - 例如 YARN_HTTPS_PROXY - 不会使用 HTTPS_PROXY
- 注意
  - 配置 [nodeLinker](https://yarnpkg.com/configuration/yarnrc#nodeLinker) 为 `node-modules` 可使用以前的方式

```bash
# 安装/升级
# yarn >= 1.22
yarn set version berry
# yarn < v1.22
yarn policies set-version berry

yarn config set enableTelemetry 0
yarn config set --home enableTelemetry 0

# 常用插件
# ====================
# https://github.com/yarnpkg/berry/blob/master/plugins.yml
# yarn workspaces 命令 - yarn workspaces foreach -pt run build
yarn plugin import workspace-tools
yarn plugin import pnp
# yarn version 命令 - 修改版本号 - yarn version check
yarn plugin import version
# yarn upgrade-interactive - 交互升级
yarn plugin import interactive-tools
# yarn stage - 将 yarn 相关文件添加到 git
yarn plugin import stage
# 自动添加 @types 依赖
yarn plugin import typescript

# 当前插件列表
yarn plugin list

# 并行构建所有 workspace
yarn workspaces foreach -pt run build

# plugins 和 releases 需要提交
git add .yarn/plugins .yarn/releases

# 配置 IDE - vscode vim emacs
# https://yarnpkg.com/advanced/editor-sdks
yarn dlx @yarnpkg/pnpify --sdk

# 检查依赖
yarn dlx @yarnpkg/doctor .

# 交互升级
yarn upgrade-interactive

# 手动安装新版
curl -LC- -o .yarn/releases/yarn-berry.js https://github.com/yarnpkg/berry/raw/master/packages/yarnpkg-cli/bin/yarn.js
yarn -v

# 手动安装新版插件
curl -LC- -o .yarn/plugins/@yarnpkg/plugin-version.js https://github.com/yarnpkg/berry/raw/master/packages/plugin-version/bin/@yarnpkg/plugin-version.js
# 再次 import 也可以
yarn plugin import version
```

## yarnrc.yml

```yaml
packageExtensions:
  webpack@*:
    dependencies:
      lodash: '^4.15.0'
    peerDependencies:
      webpack-cli: '*'
  # 注意引号
  '@storybook/core@*':
    dependencies:
      '@storybook/addon-essentials': '*'
```

# FAQ

## yarn set version 慢

可以从现有项目拷贝，免安装

- 酌情考虑是否需要拷贝缓存 - 一般本地有全局缓存，不拷问题不大

```bash
PROJ=/other/porject
cp $PROJ/.yarnrc.yml ./
rsync -a --include=releases --include=plugins $PROJ/.yarn/ .yarn/
```
