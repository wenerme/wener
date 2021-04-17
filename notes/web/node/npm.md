# NPM

- [npm download size](https://arve0.github.io/npm-download-size/)

```bash
# 参考
#   https://docs.npmjs.com/misc/scope
#   https://docs.npmjs.com/private-modules/intro
#   https://docs.npmjs.com/getting-started/scoped-packages
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

# 使用淘宝镜像安装依赖
npm i --registry=https://registry.npm.taobao.org

npm_config_registry=https://registry.npm.taobao.org npx @scoped/package
```

https://registry.npm.taobao.org
https://registry.npmjs.org

yarn outdated --registry https://registry.npm.taobao.org

yarn cache dir
/usr/local/share/.cache/yarn/v6
https://classic.yarnpkg.com/en/docs/cli/cache/

YARN_CACHE_FOLDER

##

https://docs.npmjs.com/misc/scripts

不能自定义 publish 目录
https://stackoverflow.com/questions/38935176/how-to-npm-publish-specific-folder-but-as-package-root

https://blog.izs.me/2013/02/why-no-directorieslib-in-node-the-less-snarky
Why No directories.lib in Node

```ini

```

## .npmrc

- https://docs.npmjs.com/cli/v6/configuring-npm/npmrc

```ini
registry=https://registry.npm.taobao.org

disturl=https://npm.taobao.org/dist
chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
operadriver_cdnurl=http://cdn.npm.taobao.org/dist/operadriver
phantomjs_cdnurl=http://cdn.npm.taobao.org/dist/phantomjs
fse_binary_host_mirror=https://npm.taobao.org/mirrors/fsevents
sass_binary_site=http://cdn.npm.taobao.org/dist/node-sass
electron_mirror=http://cdn.npm.taobao.org/dist/electron/
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

# Version

## v7 - NodeJS 15

- workspace
- 自动安装 peer 依赖
  - 解析版本会有冲突 - 之前不安装无影响
- package-lock v2 - 支持 yarn.lock
- `npx -y` 自动安装 - 不询问
- npx 基于 `npm exec`

```bash
# 只显示顶级依赖
npm ls
# 之前行为
npm ls --all

# why -> explain
npm why node_modules/react/

# 进入到 workspace 环境 - shell
npm exec -w @wener/reaction
# -w 指定空间 -c 运行 shell
# -w 可多次指定
npm exec -w @wener/reaction -c 'pwd'
# -ws 所有空间运行
npm exec -ws -c 'pwd'

# 运行 foo bar --package=@npmcli/foo
npx foo@latest bar --package=@npmcli/foo
# 运行 foo@latest bar
npm exec foo@latest bar --package=@npmcli/foo
# 建议使用 -- 分割命令
npm exec -- foo@latest bar --package=@npmcli/foo
```
