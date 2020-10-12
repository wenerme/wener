# 如何组建一个自己的服务器

* 网站
* 代码仓库
  * gitea
* 统一授权
  * ipa
* 邮件
  * docker-mail
* 个人服务
  * 存储
    * minio?
    * nextcloud?
* 基础服务
  * mysql
  * redis
  * rethindb
  * mongo
* PowerDNS
  * 用来做 NS


```bash
# 所有的服务都运行在同一个网络下
docker network create service

docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -v /data/gitea:/data \
  --name gitea gitea/gitea

# 主要用于统一授权
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -p 10636:10636 -p 10389:10389 \
  -v /data/apacheds:/opt/apacheds/instances \
  --name apacheds wener/apacheds

# 启动代码仓库 Gitea
# 配置说明 https://docs.gitea.io/zh-cn/config-cheat-sheet/
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -v /data/gitea:/data \
  --name gitea gitea/gitea

# 启动代码仓库 nextcloud
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -v /data/nextcloud:/var/www/html \
  --name nextcloud nextcloud

# 配置 Caddy
nano Caddyfile
# 启动 Web 服务
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -v /data/caddy/Caddyfile:/etc/Caddyfile \
  -v /data/caddy/www:/srv \
  -v /data/caddy/.caddy:/root/.caddy \
  -p 80:80 -p 443:443 \
  --name web wener/caddy:full

docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -p 80:80 -p 443:443 \
  --name web wener/web:dev

# Nexus
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -e NEXUS_CONTEXT=nexus \
  -p8004:8004 -p8003:8003 -p8081:8081 \
  -v /data/nexus:/nexus-data \
  --name nexus sonatype/nexus3

# PowerDNS
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -v /data/pdns/:/etc/pdns \
  -p 53:53 -p 53:53/udp -p 8080:8080 \
  --name dns wener/pdns

# 启动 Jenkins
# 授权使用 LDAP
# 备份 docker stop jenkins && docker cp jenkins:/var/jenkins_home
# 镜像接受  JENKINS_OPTS 和 JAVA_OPTS
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  -p 3000:8080 -p 50000:50000 \
  -v /data/jenkins:/var/jenkins_home \
  --name jenkins wener/jenkins

docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name watchtower v2tec/watchtower --debug --cleanup
```

__/data/gogs/app.ini__
```ini
APP_NAME = Wener: code
RUN_USER = git
RUN_MODE = prod

[database]
DB_TYPE  = sqlite3
NAME     = gogs
USER     = root
PASSWD   =

SSL_MODE = disable
PATH     = /data/gogs/data/gogs.db

[repository]
ROOT = /data/gogs/gogs-repositories

[server]
DOMAIN       = https://dev.wener.me
HTTP_PORT    = 3000
ROOT_URL     = https://dev.wener.me/code
DISABLE_SSH  = true
OFFLINE_MODE = true

[mailer]
ENABLED = false

[service]
REGISTER_EMAIL_CONFIRM = false
ENABLE_NOTIFY_MAIL     = false
DISABLE_REGISTRATION   = true
ENABLE_CAPTCHA         = false
REQUIRE_SIGNIN_VIEW    = true

[picture]
DISABLE_GRAVATAR = true

[session]
PROVIDER = file

[log]
MODE      = file
LEVEL     = Info
ROOT_PATH = /data/gogs/log

[security]
INSTALL_LOCK = true
SECRET_KEY   = 9mfbYjYkS8qqemu829PvAxvPxgt8sVrX
```

__Caddyfile__
```
dev.wener.me {
  proxy /code gitea:3000{
    transparent
  }
}
```


```bash
mkdir -p /data/mail/config
touch config/postfix-accounts.cf
docker run --rm \
  -e MAIL_USER=user1@domain.tld \
  -e MAIL_PASS=mypassword \
  -ti tvial/docker-mailserver:latest \
  /bin/sh -c 'echo "$MAIL_USER|$(doveadm pw -s SHA512-CRYPT -u $MAIL_USER -p $MAIL_PASS)"' >> config/postfix-accounts.cf
```

```bash
# 参数会传递给 ipa-server-install , 可查看相应文档 https://linux.die.net/man/1/ipa-server-install\
# 自动安装和启动
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --network service \
  -h i.wener.me --privileged \
  -v /sys/fs/cgroup:/sys/fs/cgroup:ro \
  --tmpfs /run --tmpfs /tmp \
  -p 53:53/udp -p 53:53 \
  -p 389:389 -p 636:636 \
  -p 88:88 -p 464:464 -p 88:88/udp -p 464:464/udp \
  -p 7389:7389 -p 9443:9443 -p 9444:9444 -p 9445:9445 \
  -v /data/ipa:/data \
  --name freeipa freeipa/freeipa-server
```
__/data/ipa/ipa-server-install-options__
```
--ds-password=3gJXFlrt9eIeKu0pCxgWmTrjNz2u2scv
--admin-password=SP11nVx6PSgHT70yR7RsVrYKcvFfzm9e
--hostname=i.wener.me
--domain=i.wener.me
--realm=I.WENER.ME
--no-ntp
--setup-dns
--no-reverse
--forwarder=8.8.8.8
-U
--no-ui-redirect
```

* 123 NTPD
* 53 DNS
* 389 LDAP
* 636 LDAPS
* 88 Kerberos authentication system
* 464 Kerberos Change/Set password
* dogtag
  * CA
  * 9443 (agents)	-- ?
  * 9444 (users, SSL)	-- ?
  * 9445 (administrators)	-- ?
  * 9446 (users, client authentication)	-- ?
  * 7389 (internal LDAP database) -- ?
* 9701 (Tomcat)	-- ?

uid=admin,cn=users,cn=accounts,dc=i,dc=wener,dc=me

http://www.freeipa.org/page/Demo
http://www.freeipa.org/page/Main_Page

''/bin/systemctl' 'start' 'ntpd.service'' returned non-zero exit status 1
https://github.com/freeipa/freeipa-container/issues/94
--no-ntp

kinit: Keytab contains no suitable keys for host/i.wener.me@I.WENER.ME while getting initial credentials
保证是存在的
klist -kte /data/etc/krb5.keytab
安装时尽量使用同一个域名,这样以保证安装没问题

反向代理允许 http, 以便于 caddy 对 freeipa 做反向代理, 注释掉 https 重写规则, 注释掉默认 /ipa, 注释掉主机名重写跳转
vi /etc/httpd/conf.d/ipa-rewrite.conf
service httpd restart
反向代理使用不同的域名时可能会遇到 Missing Refer 的问题

虽然文档上说 -e IPA_SERVER_IP=10.12.0.98 会修改 DNS 中的主机位置,但是安装后 DNS 的 A 还是 docker 的 ip, 此时可以将主机的 443 映射到本地,然后在本地 hosts 添加记录, 保证能登陆 ipa 后再上去修改 A 记录

最终将设置的域名的 NS 设置为该服务器地址

* [kinit](https://linux.die.net/man/1/kinit)


```bash
cd /data/mail
mkdir -p config
# Create your mail accounts
docker run --rm \
  -e MAIL_USER=wener@mail.i.wener.me \
  -e MAIL_PASS=xf3UkDCVsnWGk7WdqIbgc0O420kqsWA7 \
  -ti tvial/docker-mailserver:latest \
  /bin/sh -c 'echo "$MAIL_USER|$(doveadm pw -s SHA512-CRYPT -u $MAIL_USER -p $MAIL_PASS)"' >> config/postfix-accounts.cf

# Generate DKIM keys
docker run --rm \
  -v "$(pwd)/config":/tmp/docker-mailserver \
  -ti tvial/docker-mailserver:latest generate-dkim-config
```


```yaml
version: '2'

services:
  mail:
    image: tvial/docker-mailserver:2.1
    hostname: mail
    domainname: i.wener.me
    container_name: mail
    ports:
    - "25:25"
    - "143:143"
    - "587:587"
    - "993:993"
    volumes:
    - /data/mail/data:/var/mail
    - /data/mail/state:/var/mail-state
    - /data/mail/config:/tmp/docker-mailserver/
    environment:
    - ENABLE_SPAMASSASSIN=1
    - ENABLE_CLAMAV=1
    - ENABLE_FAIL2BAN=1
    - ENABLE_POSTGREY=1
    - ENABLE_POP3=1
    - ONE_DIR=1
    - DMS_DEBUG=0
    - ENABLE_LDAP=1
    - LDAP_SERVER_HOST=i.wener.me
    - LDAP_SEARCH_BASE=cn=users,cn=accounts,dc=i,dc=wener,dc=me
    - LDAP_BIND_DN=uid=admin,cn=users,cn=accounts,dc=i,dc=wener,dc=me
    - LDAP_BIND_PW=SP11nVx6PSgHT70yR7RsVrYKcvFfzm9e
    - SSL_TYPE=letsencrypt
    cap_add:
    - NET_ADMIN
```


## Home

```bash
docker network create service

# 转发和代理
docker run -d --restart always \
  -p 8888:8888 -v $HOME/.ssh:/root/.ssh \
  --name fwd-bwg --network service \
  wener/autossh \
    -vgN -o StrictHostKeyChecking=no -o ExitOnForwardFailure=yes -o ServerAliveCountMax=3 -o ServerAliveInterval=10 \
    -D 8888 \
    -R :2201:172.17.0.1:22 \
    bwg

# 服务端配置
# ClientAliveInterval 300
# ClientAliveCountMax 2
# 客户端配置
# ServerAliveCountMax 3
# ServerAliveInterval 10
# docker run -it --rm \
docker run -d --restart always \
  -v $HOME/.ssh:/root/.ssh \
  --name fwd-ali --network service \
  wener/autossh \
     -vgN -o StrictHostKeyChecking=no -o ExitOnForwardFailure=yes -o ServerAliveCountMax=3 -o ServerAliveInterval=10 \
    -R :2201:172.17.0.1:22 \
    ali


# 监控

docker run -d --restart always --network service \
  -p 9090:9090 -v /data/prom/data:/prometheus \
  -v /data/prom/prometheus.yml:/etc/prometheus/prometheus.yml \
  --name prom \
  prom/prometheus


docker run -d --restart always --network service \
  -v "/proc:/host/proc:ro" \
  -v "/sys:/host/sys:ro" \
  -v "/:/rootfs:ro" \
  --name node-exporter prom/node-exporter \
    --collector.procfs /host/proc \
    --collector.sysfs /host/sys \
    --collector.filesystem.ignored-mount-points "^/(sys|proc|dev|host|etc)($|/)"

docker run -d --restart always --network service \
  -v /sys/fs/cgroup:/cgroup \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name container-exporter prom/container-exporter

# 数据库
docker run -d --restart always --network service \
  -p 5432:5432 -e POSTGRES_PASSWORD=postgres \
  -v /data/pg/data:/var/lib/postgresql/data \
  --name pg postgres:alpine

docker run -it --rm -p 5432:5432 -e POSTGRES_PASSWORD=postgres -v $HOME/data/pg/data:/var/lib/postgresql/data --name pg postgres:alpine

#
docker run -d --restart always --network service \
  -v /data/ipfs-scel/export:/export -v /data/ipfs-scel/data:/data/ipfs \
  -p 8080:8080 -p 4001:4001 -p 5001:5001 \
  --name ipfs-scel ipfs/go-ipfs:latest
```

```yml
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: "node"
    scrape_interval: "30s"
    static_configs:
    - targets: ['node-exporter:9100']
  - job_name: container
    scrape_interval: 30s
    static_configs:
    - targets: ['container-exporter:9104']
```
