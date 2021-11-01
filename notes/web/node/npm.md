---
title: NPM
---

# NPM

- [npm download size](https://arve0.github.io/npm-download-size/)
- cache
  - `$HOME/.npm`
  - `%AppData%/npm-cache`
  - --cache
- https://www.runpkg.com/
- https://deps.dev/

```json title="建议限定版本"
{
  "engines": {
    "node": "14",
    "npm": "8"
  }
}
```

```bash
# 查看本地缓存大小
du -hs ~/.npm/_cacache/
```

## .npmrc

- https://docs.npmjs.com/cli/v6/configuring-npm/npmrc

```ini
# package-lock=false
registry="https://registry.npm.taobao.org"
disturl="https://npm.taobao.org/dist"
chromedriver_cdnurl="https://npm.taobao.org/mirrors/chromedriver"
electron_mirror="http://npm.taobao.org/mirrors/electron/"
fse_binary_host_mirror="https://npm.taobao.org/mirrors/fsevents"
node_inspector_cdnurl="https://npm.taobao.org/mirrors/node-inspector"
nodejs_org_mirror="http://npm.taobao.org/mirrors/node"
nvm_nodejs_org_mirror="http://npm.taobao.org/mirrors/node"
operadriver_cdnurl="https://npm.taobao.org/mirrors/operadriver"
phantomjs_cdnurl="https://npm.taobao.org/mirrors/phantomjs"
profiler_binary_host_mirror="http://npm.taobao.org/mirrors/node-inspector/"
puppeteer_download_host="https://npm.taobao.org/mirrors"
sass_binary_site="http://npm.taobao.org/mirrors/node-sass"
selenium_cdnurl="http://npm.taobao.org/mirrors/selenium"
SQLITE3_BINARY_SITE="http://npm.taobao.org/mirrors/sqlite3"
```

## registry

| url                                            | from     |
| ---------------------------------------------- | -------- |
| https://registry.npmjs.org                     | 官方     |
| https://registry.npm.taobao.org                | 淘宝     |
| https://mirrors.sjtug.sjtu.edu.cn/npm-registry | 上海交大 |

```bash
# 淘宝镜像
npm i --registry=https://registry.npm.taobao.org
# 上海交大镜像
npm ci --registry=https://mirrors.sjtug.sjtu.edu.cn/npm-registry
# npx 使用镜像
npm_config_registry=https://registry.npm.taobao.org npx @scoped/package
```

## scope

- https://docs.npmjs.com/getting-started/scoped-packages
- https://docs.npmjs.com/private-modules/intro
- https://docs.npmjs.com/misc/scope

```bash
# 添加一个 scope
npm login --registry=https://reg.wener.me/nexus/repository/npm-internal/ --scope=@wener
# 添加后可修改关联的仓库
npm config set @wener:registry https://reg.wener.me/nexus/repository/npm-internal/
# 初始化时可以使用指定的 scope, 包名中会加上  @wener
npm init --scope=wener
# 发布是会发往 @wener 的仓库中
npm publish
# 安装指定 scope 中的模块
npm install @wener/wener-test
# 可以设置当前的全局 scope
npm config set scope wener
```

## workspaces

- [npm workspaces](https://github.com/npm/rfcs/blob/latest/implemented/0026-workspaces.md)

```json
{
  "name": "workspace-example",
  "version": "1.0.0",
  "workspaces": {
    "packages": ["packages/*"]
  }
}
```

```json
{
  "name": "workspace-example",
  "version": "1.0.0",
  "workspaces": ["packages/*"]
}
```
