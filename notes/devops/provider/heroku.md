# Heroku

## Tips

* Node
  * [部署运行 build 或 heroku-postbuild 脚本](https://devcenter.heroku.com/changelog-items/1573)
  * 启动默认为 `npm start` 除非在 Procfile 指定
    * `web: yarn start`
  * 启动需要绑定到 PORT
  * [heroku/heroku-buildpack-nodejs](https://github.com/heroku/heroku-buildpack-nodejs)
* [连接超时](https://devcenter.heroku.com/articles/request-timeout#long-polling-and-streaming-responses)
  * 初始 30s 响应窗口
  * 之后 55s 响应窗口
* [自定义域名 SSL](https://devcenter.heroku.com/articles/ssl-endpoint)
  * 需要购买证书
* [限制](https://devcenter.heroku.com/articles/limits)

```bash
# 安装命令行工具
brew tap heroku/brew && brew install heroku

# 升级 CLI
heroku update

# 构建补全
heroku autocomplete
# 加载补全
$(heroku autocomplete:script bash)
# 添加到 profile 自动加载
printf "$(heroku autocomplete:script bash)" >> ~/.bashrc; source ~/.bashrc

# 创建应用
# 访问地址 https://myapp.herokuapp.com/
# 仓库地址 https://git.heroku.com/myapp.git
heroku apps:create myapp

# Git 部署
heroku git:remote -a <应用名字>
git push heroku master

# 容器部署
# https://devcenter.heroku.com/articles/container-registry-and-runtime
heroku container:login
# web 为类型 - 当前目录下要有 Dockerfile
# 镜像为 registry.heroku.com/myapp/web
heroku container:push web
heroku container:release web

# 使用已有的镜像
docker tag <image> registry.heroku.com/<app>/<process-type>
docker push registry.heroku.com/<app>/<process-type>

# 启动镜像
# type 默认为 web
heroku run bash --type=worker
```


```bash
# 自定义域名
heroku domains:add app.my.com

# heroku addons:create ssl:endpoint
heroku certs:add server.crt server.key --type endpoint
```

```bash
# 应用执行情况
heroku ps -a wener
```

## auth

* 默认使用 `~/.netrc` 中的鉴权信息

```bash
# 可以使用 TOKEN 登录
HEROKU_API_KEY=XXX heroku login

# 查看当前 Token
heroku auth:token

# 登录 docker
heroku container:login
```

## dyno
* https://www.heroku.com/dynos
* https://devcenter.heroku.com/articles/dyno-types
* 类似于算力
* Free - [价格](https://www.heroku.com/pricing)
  * 30 分钟休眠
  * 512 MB RAM │ 1 web/1 worker
  * Postgres 10K 行
  * Redis 25 MB 内存, 20 连接
  * 每月 1000 小时

## 进程类型
* [Procfile](https://devcenter.heroku.com/articles/procfile)

## 调度器 / 周期执行
* https://devcenter.heroku.com/articles/scheduler

```bash
# 安装扩展
heroku addons:create scheduler:standard
```

## postgres

```bash
# 免费的 hobby-dev
# 1W行 20并发
# basic 9$/月 100W 行
# 创建后会生成 DATABASE_URL 变量
heroku addons:create heroku-postgresql:hobby-dev
```

## redis
* https://elements.heroku.com/addons/heroku-redis

```bash
# free dev: 20M 20并发
# 15$ premium-0: 50M 40并发
# 创建后会生成 REDIS_URL 变量
heroku addons:create heroku-redis:hobby-dev
```

## 开发
* https://devcenter.heroku.com/articles/dyno-metadata

```
HEROKU_APP_ID:                   9daa2797-e49b-4624-932f-ec3f9688e3da
HEROKU_APP_NAME:                 example-app
HEROKU_DYNO_ID:                  1vac4117-c29f-4312-521e-ba4d8638c1ac
HEROKU_RELEASE_CREATED_AT:       2015-04-02T18:00:42Z
HEROKU_RELEASE_VERSION:          v42
HEROKU_SLUG_COMMIT:              2c3a0b24069af49b3de35b8e8c26765c1dba9ff0
HEROKU_SLUG_DESCRIPTION:         Deploy 2c3a0b2
```
