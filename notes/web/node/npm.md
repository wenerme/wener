# NPM

* [npm download size](https://arve0.github.io/npm-download-size/)

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

npm_config_registry=https://registry.npm.taobao.orgnpx @scoped/package
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
* https://docs.npmjs.com/cli/v6/configuring-npm/npmrc

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
