# Run container

## 常用选项
```bash
# docker run
--restart always
# 调整容器中的时间
-v /etc/localtime:/etc/localtime:ro
# 后台运行
-d
```

## xhyve

```bash
# 安装 https://github.com/zchee/docker-machine-driver-xhyve#install
docker-machine create --driver xhyve xhyve
eval `docker-machine env xhyve`
docker info
```

## MySQL
```bash
# 自定义配置
mkdir -p /data/mysql/conf.d/
echo '
[mysqld]
character_set_server=utf8mb4
collation_server=utf8mb4_unicode_ci
' > /data/mysql/conf.d/my.cnf

# 自定义数据目录
mkdir -p /data/mysql/conf.d/datadir

# 使用自定义的配置启动 MySQL
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 3306:3306 \
  -v /data/mysql/datadir:/var/lib/mysql -v /data/mysql/conf.d:/etc/mysql/conf.d \
  -e MYSQL_ROOT_PASSWORD=ThisIsPassword \
  --name mysql mysql
```

## OwnCloud/Nextcloud
```bash
# 需要先创建名为 mysql 的 mysql 容器,如果没有,可去除 --link
# 启动 OwnCloud
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 8080:80 \
  -v /data/owncloud:/var/www/html \
  --link mysql:mysql \
  --name owncloud owncloud
```

### 反向代理
sudo nano /data/owncloud/config/config.php
```php
<?php
/* $CONFIG */

$EXTRA_CONFIG = array (
  "trusted_proxies"   => ['10.0.0.1'],
  "overwritehost"     => "ssl-proxy.tld",
  "overwriteprotocol" => "https",
  "overwritewebroot"  => "/domain.tld/owncloud",
  "overwritecondaddr" => "^10\.0\.0\.1$",
);
$CONFIG = array_merge($CONFIG, $EXTRA_CONFIG)
```

## Jenkins

```bash
# 不用映射, 备份通过 docker cp $ID:/var/jenkins_home
# 设置 JENKINS_OPTS="--prefix=/jenkins" 来做反向代理
# 如果目录有权限问题可手动设置 mkdir -p /data/jenkins && chwon 1000:1000 /data/jenkins
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 8080:8080 -p 50000:50000 \
  -v /data/jenkins:/var/jenkins_home \
  --name jenkins jenkins
```

Jenkins 是离线的,由于 `jenkins-ci.org` 被墙,所以可能需要使用 HTTP 代理

## gitea

```bash
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 3000:3000 \
  -v /data/gitea:/data \
  --name gitea gitea/gitea
```

## PHP

官方提供了很多 PHP 版本, 如果需要额外的扩展建议自己 build 一个, 例如

__php.dockerfile__
```dockerfile
FROM php:5-apache
RUN apt-get update
RUN apt-get install -y libcurl4-openssl-dev pkg-config libssl-dev  \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb
RUN pecl install redis && docker-php-ext-enabl redis
```

```bash
docker build -t wener/php -f php.dockerfile .
docker run -d --restart always -p 80:80 -v /data/php/www:/var/www/html --name php wener/php
# 也可以添加自己的配置
# 设置默认时区
echo 'date.timezone=Asia/Shanghai' > /data/php/config/php.ini;
docker run -d --restart always  -p 80:80 -v /data/php/www:/var/www/html \
  -v /data/php/config/php.ini:/usr/local/etc/php/php.ini  --name php wener/php
```

## Drone.io

```bash
# Drone 一般配合 Gogs 使用
mkdir /opt/apps/drone && cd /opt/apps/drone
# 用于存放数据
mkdir data
# 需要预先在 MySQL 中将 drone 库创建出来
# 需要将数据库修改为具体的
# 配置参考 http://readme.drone.io/setup/settings/
echo '
REMOTE_DRIVER=gogs
REMOTE_CONFIG=https://gogs.hooli.com?open=false
DATABASE_DRIVER=mysql
DATABASE_CONFIG=root:pa55word@tcp(localhost:3306)/drone?parseTime=true
# HTTPS_PROXY=https://proxy.example.com
# HTTP_PROXY=http://proxy.example.com
# NO_PROXY=.example.com, *.docker.example.com
' > dronerc

docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p=8080:8000 \
	-v /opt/apps/drone/data:/var/lib/drone \
	-v /var/run/docker.sock:/var/run/docker.sock \
	--env-file ./dronerc \
  --link mysql:mysql \
	--name=drone drone/drone
```

### 更新
```bash
docker stop drone
docker rm drone
docker pull drone/drone
docker run ...
```

### 安装 Go 环境

```bash
# 进入容器执行
docker exec -it jenkins bash
# 安装 Go 环境
mkdir /var/jenkins_home/go/root
cd /var/jenkins_home/go/root
GOVERSION=1.7
wget https://storage.googleapis.com/golang/go$GOVERSION.linux-amd64.tar.gz
# 或者使用代理下载
# https_proxy=socks://127.0.0.1:8888 curl https://storage.googleapis.com/golang/go$GOVERSION.linux-amd64.tar.gz -o go$GOVERSION.linux-amd64.tar.gz
tar -C /var/jenkins_home/go/root -xzf go$GOVERSION.linux-amd64.tar.gz
# 然后在 Jenkins 中添加环境变量
# GOROOT=/var/jenkins_home/go/root/go
# GOPATH=/var/jenkins_home/go
```

## WatchTower

```bash
# 将主机上的 docker 配置授权映射到容器内以便于拉取私有仓库
docker run -d \
  --name watchtower \
  -v $HOME/.docker/config.json:/config.json \
  -v /var/run/docker.sock:/var/run/docker.sock \
  v2tec/watchtower container_to_watch --debug -i 60
```

## Redis

```bash
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 6379:6379 \
  -v /data/redis:/data \
  --name redis redis redis-server --appendonly yes

# 客户端
docker run -it --link some-redis:redis --rm redis redis-cli -h redis -p 6379
```

## Docker in Docker

```bash
# start dockerd
docker run -it --privileged -v /data/docker:/var/lib/docker --name dockerd --rm docker:dind
# 客户端
# DOCKER_HOST=tcp://docker:2375
docker run --rm -it --link dockerd:docker docker info
```

## MongoDB
```bash
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 27017:27017 \
  -v /data/mongo:/data/db \
  --name mongo mongo

# 客户端
docker run -it --link some-mongo:mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'
```

* 由于 MongoDB 使用的 memmap, 通过 vbox 的映射不能够做共享数据卷, 但可以使用 xhyve 驱动的 docker-machine

```bash
# mongo with mongoclient
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -p 27017:27017 \
  -v $HOME/data/mongo:/data/db \
  --name mongo mongo
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
    --network service \
    -e MONGO_URL=mongodb://mongo:27017 \
    -p 3000:3000 \
    --name mongoclient mongoclient/mongoclient
```

## RethinkDB

```bash
# 配置参考
# https://github.com/rethinkdb/rethinkdb/blob/next/packaging/assets/config/default.conf.sample
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 8080:8080 -p 28015:28015 \
  -v /data/rethinkdb:/data \
  --name some-rethink rethinkdb

# 管理界面
$BROWSER "http://$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' some-rethink):8080"

# 端口转发
ssh -fNTL localhost:8080:$(ssh remote "docker inspect --format '{{ .NetworkSettings.IPAddress }}' some-rethink"):8080 remote
# 在浏览器中打开
xdg-open http://localhost:8080
# 停止端口转发
kill $(lsof -t -i @localhost:8080 -sTCP:listen)
```

## Nexus

```bash
# nexus3 支持 docker
# 默认端口为 8081
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -e NEXUS_CONTEXT=nexus \
  -p8004:8004 -p8003:8003 -p8081:8081 \
  -v /data/nexus:/nexus-data \
  --name nexus sonatype/nexus3

# 默认账号密码 admin / admin123
# 测试状态
curl http://localhost:8081/nexus/service/local/status
```

## Registry

```bash
# 确保 /certs 中有 domain.crt 和 domain.key
# 生成密码
mkdir auth
docker run --entrypoint htpasswd registry:2 -Bbn testuser testpassword > auth/htpasswd
# 启动
docker run -d -p 5000:5000 --restart=always --name registry \
  -v `pwd`/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  -v `pwd`/certs:/certs \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  registry:2

# 启动一个简单的不安全的 registry
docker run -d -p 5000:5000 -v `pwd`/data:/var/lib/registry --restart=always --name registry registry:2
```

## Odoo

```bash
# Postgres
# 数据目录 /var/lib/postgresql/data
docker run -d -e POSTGRES_USER=odoo -e POSTGRES_PASSWORD=odoo --name odoo-db postgres

# Odoo
# 配置文件 /etc/odoo/openerp-server.conf
# 扩展路径 /mnt/extra-addons
# docker run -p 8069:8069 --name odoo --link db:db -t odoo -- 自定义参数
docker run -d -p 8069:8069 -v /data/odoo/addons:/mnt/extra-addons --name odoo --link odoo-db:db -t odoo
```

__默认 openerp-server.conf__

```
[options]
[options]
addons_path = /mnt/extra-addons,/usr/lib/python2.7/dist-packages/openerp/addons
data_dir = /var/lib/odoo
auto_reload = True
; admin_passwd = admin
; csv_internal_sep = ,
; db_maxconn = 64
; db_name = False
; db_template = template1
; dbfilter = .*
; debug_mode = False
; email_from = False
; limit_memory_hard = 2684354560
; limit_memory_soft = 2147483648
; limit_request = 8192
; limit_time_cpu = 60
; limit_time_real = 120
; list_db = True
; log_db = False
; log_handler = [':INFO']
; log_level = info
; logfile = None
; longpolling_port = 8072
; max_cron_threads = 2
; osv_memory_age_limit = 1.0
; osv_memory_count_limit = False
; smtp_password = False
; smtp_port = 25
; smtp_server = localhost
; smtp_ssl = False
; smtp_user = False
; workers = 0
; xmlrpc = True
; xmlrpc_interface =
; xmlrpc_port = 8069
; xmlrpcs = True
; xmlrpcs_interface =
; xmlrpcs_port = 8071
```


## XAMPP
* [tomsik68/xampp](https://hub.docker.com/r/tomsik68/xampp/)
* mysql
  * /opt/lampp/var/mysql
* phpadmin
  * /opt/lampp/phpmyadmin/config.inc.php
    * 配置数据库密码等
```php
// 在网页上输入账号密码
$cfg['Servers'][$i]['auth_type']    = 'cookie';
$cfg['Servers'][$i]['AllowNoPassword']     = false;
```


```bash
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 22222:22 -p 80:80 -p 443:443 -d \
  -v/data/xampp/www:/www \
  --name xampp  tomsik68/xampp

# 重启 xampp
/opt/lampp/lampp restart
# 重启 apache
/opt/lampp/bin/httpd -k restart
```

## ldap

```bash
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 10636:10636 -p 10389:10389 \
  -v /data/apacheds:/opt/apacheds/instances \
  --name apacheds wener/apacheds
```

## Postgres

## 其他服务

### cow
```bash
curl https://github.com/cyfdecyf/cow/releases/download/0.9.8/cow-linux64-0.9.8.gz -Lo cow-linux64-0.9.8.gz
gunzip cow-linux64-0.9.8.gz
mkdir ~/bin
mv cow-* ~/bin/cow
chmod +x ~/bin/cow

mkdir ~/.cow
echo '
listen = http://127.0.0.1:7777
proxy = socks5://127.0.0.1:8888
' > ~/.cow/rc

cd ~/.cow
nohup cow &
```
