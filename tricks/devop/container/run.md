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

## MySQL
```bash
# 自定义配置
mkdir -p /opt/apps/mysql/conf.d/
echo '
[mysqld]
character_set_server=utf8mb4
collation_server=utf8mb4_unicode_ci
' > /opt/apps/mysql/conf.d/my.cnf

# 自定义数据目录
mkdir -p /opt/apps/mysql/conf.d/datadir

# 使用自定义的配置启动 MySQL
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 3306:3306 \
  -v /opt/apps/mysql/datadir:/var/lib/mysql -v /opt/apps/mysql/conf.d:/etc/mysql/conf.d \
  -e MYSQL_ROOT_PASSWORD=ThisIsPassword \
  --name mysql mysql
```

## OwnCloud
```bash
# 需要先创建名为 mysql 的 mysql 容器,如果没有,可去除 --link
# 启动 OwnCloud
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 8080:80 \
  -v /opt/apps/owncloud:/var/www/html \
  --link mysql:mysql \
  --name owncloud owncloud
```

### 反向代理
sudo nano /opt/apps/owncloud/config/config.php
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
# 创建 jenkins 用户,因为容器里需要使用到 uid
useradd jenkins
# 数据目录
mkdir -p /opt/apps/jenkins/data
# 修改数据目录权限
chown -R jenkins:jenkins /opt/apps/jenkins/data
# 需要使用 -u 修改 uid
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --name jenkins -u `id -u jenkins` \
  -p 8080:8080 -p 50000:50000 \
  -v /opt/apps/jenkins/data:/var/jenkins_home \
  jenkins

# 在容器中添加对应的用户名,如果 uid 对应的用户名找不到,会出现错误
docker exec -it -u root jenkins useradd dev --uid `id -u jenkins` -d /home/dev
```

Jenkins 是离线的,由于 `jenkins-ci.org` 被墙,所以需要使用 HTTP 代理

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

## Redis

```bash

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
docker run -d -p 8069:8069 -v `pwd`/addons:/mnt/extra-addons --name odoo --link odoo-db:db -t odoo
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
