# Dokku
单服务器的 PaaS, 非常简单易用.

__需求__

* Ubuntu 14.04 LTS
* 1GB 内存

```bash
# 安装
wget https://raw.githubusercontent.com/dokku/dokku/v0.6.5/bootstrap.sh
sudo DOKKU_TAG=v0.6.5 bash bootstrap.sh

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

## Tips

```bash
# 无法操作挂载的目录时
dokku plugin:install https://github.com/expa/dokku-app-user.git

dokku config:set <app> DOKKU_APP_USER=expauser
git push dokku@dokku.me:<app> master
```


## Reference
* [Running multiple applications in Dokku](https://glebbahmutov.com/blog/running-multiple-applications-in-dokku/)
