---
title: Dokku
---

# Dokku

- 单服务器的 PaaS, 非常简单易用.
- [文档](http://dokku.viewdocs.io/dokku)

```bash
# 无法操作挂载的目录时
dokku plugin:install https://github.com/expa/dokku-app-user.git

# Git 部署
# 使用 Buildpack 构建
dokku config:set < app > DOKKU_APP_USER=expauser
git push dokku@dokku.me: < app > master

# Docker 镜像部署
# 将应用镜像拉到本地
docker pull registry.gitlab.com/wenerme/myapp:master
# tag 为 dokku 下 myapp 的 v1
docker tag registry.gitlab.com/wenerme/myapp:master dokku/myapp:v1
# 部署 v1
dokku tags:deploy myapp v1
```

## Notes

- Dokku 控制 Docker
  - 也可以通过 Nomad 或 Kubernates 调度
  - 但使用 Dokku 一般是单机 Docker
- 提供类似 Heroku 的接口
- 每个应用暴露端口，通过内置的 Nginx 进行域名反向代理
- Nginx
  - 访问日志 `/var/log/nginx/${APP}-access.log`
  - 错误日志 `/var/log/nginx/${APP}-error.log`
  - `dokku nginx:report` 查看 Nginx 信息
  - `dokku nginx:show-config` 查看生成的配置
  - `dokku nginx:validate-config` 配置校验
- [自定义 Nginx 配置](http://dokku.viewdocs.io/dokku/configuration/nginx/#customizing-the-nginx-configuration)
  - 配置模板使用 [gliderlabs/sigil](https://github.com/gliderlabs/sigil) 生成
  - 模版 [nginx.conf.sigil](https://github.com/dokku/dokku/blob/master/plugins/nginx-vhosts/templates/nginx.conf.sigil) 放到 WORKDIR 或 `/app` 目录
  - 默认会 include `nginx.conf.d/` 下的配置 - 可以在这里配置自定义而不是全量替换
    - 例如 `/home/dokku/myapp/nginx.conf.d/upload.conf`
    - 重载 nginx 生效 `service nginx reload`

## 安装

**需求**

- Ubuntu 16.04/18.04 x64, Debian 9+ x64 or CentOS 7 x64
- 1GB 内存

```bash
# 安装
wget https://raw.githubusercontent.com/dokku/dokku/v0.20.4/bootstrap.sh
sudo DOKKU_TAG=v0.20.4 bash bootstrap.sh

# 浏览器打开该主机的 80 端口,设置公钥
# 如果为主机设置了域名,可使用虚拟主机
# sudo hostname -f

# 安装 Redis 插件
sudo dokku plugin:install --help https://github.com/dokku/dokku-redis.git redis

# 服务器: 创建应用
dokku apps:create my-app
# 添加相关配置
dokku config:set my-app PORT=2333
# 将应用容器中的 2333 映射为主机上的 8080
dokku proxy:proxys-add my-app http:8080:2333

# 本地: 项目有 Git 仓库添加服务器作为仓库地址
git remote add svr dokku@服务器地址:my-app
# 发布应用
git push svr

# 可直接远程执行 dokku 命令
ssh -t dokku@服务器地址 -- help
# 在环境中执行命令
dokku run my-app ls
# 如果在 Procfile 中定义了命令,可执行通过 run 执行
# console: bundle exec racksh
dokku run my-app console
# 直接进入 APP 容器
dokku enter my-app web
# 指定使用的 buildpack
dokku config:set APP BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-ruby.git#v142
# 也可在 .buildpacks 文件中指定多个 buildpack
```

## Docker 安装

- http://dokku.viewdocs.io/dokku/getting-started/install/docker/

```bash
# 自动安装的插件列表
mkdir -p /data/dokku/data
cat << PLUGINS > /data/dokku/data/plugin-list
postgres: https://github.com/dokku/dokku-postgres.git
redis: https://github.com/dokku/dokku-redis.git
PLUGINS

# 启动
docker run \
  --env DOKKU_HOSTNAME=dokku.me \
  --name dokku \
  --publish 3022:22 \
  --publish 8080:80 \
  --publish 8443:443 \
  --volume /data/dokku/data:/mnt/dokku \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  dokku/dokku

# 添加公钥
docker exec -it dokku bash
curl https://github.com/wenerme.keys >> ~dokku/.ssh/authorized_keys
```

## 远程访问

```
Host my-dokku
Hostname 192.168.1.1
User dokku
RequestTTY yes
```

```bash
ssh my-dokku dokku apps:list
```

## 客户端

- http://dokku.viewdocs.io/dokku/community/clients/

```bash
# 官方客户端 - 使用 SSH 执行
# 本质是 alias dokku='$HOME/.dokku/contrib/dokku_client.sh'
brew install dokku/repo/dokku
DOKKU_HOST=mydokku dokku apps:list

# 手动安装
# brew 安装可能版本不匹配
# https://github.com/dokku/dokku/blob/master/contrib/dokku_client.sh
git clone https://github.com/dokku/dokku ~/.dokku

cd ~/.dokku
# 切换版本
git checkout <tag/branch>
alias dokku='$HOME/.dokku/contrib/dokku_client.sh'
DOKKU_HOST=mydokku dokku dokku apps:list
```

## Reference

- [Running multiple applications in Dokku](https://glebbahmutov.com/blog/running-multiple-applications-in-dokku/)
