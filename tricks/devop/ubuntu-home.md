# Ubuntu 家用

* Ubuntu 桌面版
* 安装至少需要 1024*768 的显示器

```bash
apt update
apt upgrade
apt dist-upgrade

# 桌面版没有 sshd
apt install -y openssh-server

############
# brew
############
brew install gcc redis tmux mosh

############
# 容器服务配置
############
# 使用阿里提供的仓库进行安装会非常快
curl -sSL http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh -
# 安装完毕后为当前用户添加权限,需要退出重新登录才能生效
sudo usermod -aG docker $USER

# 安装完成建议选择一家容器镜像,比如 https://cr.console.aliyun.com 或者 daocloud

docker pull gogs/gogs
docker network create --subnet=172.18.1.0/24 home-net

# 准备数据目录
sudo mkdir /data
sudo chown $USER:$USER /data
cd /data

# ==========
# 监控配置
# ==========
docker pull grafana/grafana
docker pull prom/container-exporter
docker pull prom/prometheus

docker run --net home-net --ip 172.18.1.10 -d --restart always -v /etc/localtime:/etc/localtime:ro \
    -v $PWD/grafana:/var/lib/grafana \
    -v $PWD/grafana.ini:/etc/grafana/grafana.ini \
    --name grafana grafana/grafana

nohup node_exporter 2>node_exporter.log &

docker run -d --net home-net --ip 172.18.1.21 \
    -v /sys/fs/cgroup:/cgroup \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --name container-exporter prom/container-exporter

docker run --net home-net --ip 172.18.1.20 -d --restart always -v /etc/localtime:/etc/localtime:ro \
    -v $PWD/prom:/prometheus \
    -v $PWD/prom.yaml:/etc/prometheus/prometheus.yml \
    --name prom prom/prometheus

# Web 服务
# 选择需要的 Caddy 插件用于构建容器
mkdir -p /tmp/caddy && cd /tmp/caddy
wget 'https://caddyserver.com/download/build?os=linux&arch=amd64&features=cors%2Cexpires%2Cfilemanager%2Cgit%2Chugo%2Cipfilter%2Cjsonp%2Cjwt%2Clocale%2Cmailout%2Cminify%2Cmultipass%2Cprometheus%2Cratelimit%2Crealip%2Csearch%2Cupload' -O caddy.tar.gz
tar -zxvf caddy.tar.gz

docker build -t home/caddy -f caddy.Dockerfile .
cd -

docker run --net home-net --ip 172.18.1.30  -d --restart always -v /etc/localtime:/etc/localtime:ro \
    -v $PWD/Caddyfile:/etc/Caddyfile \
    -v $PWD/caddy:/data \
    -v $HOME/.caddy:/root/.caddy \
    -p 80:80 -p 443:443 \
    --name web home/caddy



```

### caddy.Dockerfile
```Dockerfile
FROM alpine
MAINTAINER wener <wener@wener.me>

COPY caddy /app/caddy

VOLUME     [ "/data" ]
WORKDIR    /data

EXPOSE 2015
EXPOSE 2000
ENTRYPOINT ["/app/caddy"]
CMD ["-conf","/etc/Caddyfile","-log","./internal/log"]
```

### grafana.ini
```ini
##################### Grafana Configuration Example #####################
#
# Everything has defaults so you only need to uncomment things you want to
# change

# possible values : production, development
; app_mode = production

# instance name, defaults to HOSTNAME environment variable value or hostname if HOSTNAME var is empty
; instance_name = ${HOSTNAME}

#################################### Paths ####################################
[paths]
# Path to where grafana can store temp files, sessions, and the sqlite3 db (if that is used)
#
;data = /var/lib/grafana
#
# Directory where grafana can store logs
#
;logs = /var/log/grafana
#
# Directory where grafana will automatically scan and look for plugins
#
;plugins = /var/lib/grafana/plugins

#
#################################### Server ####################################
[server]
# Protocol (http or https)
;protocol = http

# The ip address to bind to, empty will bind to all interfaces
;http_addr =

# The http port  to use
;http_port = 3000

# The public facing domain name used to access grafana from a browser
domain = d.yikaiye.com

# Redirect to correct domain if host header does not match domain
# Prevents DNS rebinding attacks
;enforce_domain = false

# 使用 /monitor 作为路径,以便于反向代理
;root_url = %(protocol)s://%(domain)s:%(http_port)s/
root_url = /monitor

# Log web requests
;router_logging = false

# the path relative working path
;static_root_path = public

# enable gzip
enable_gzip = true

# https certs & key file
;cert_file =
;cert_key =

#################################### Database ####################################
[database]
# Either "mysql", "postgres" or "sqlite3", it's your choice
;type = sqlite3
;host = 127.0.0.1:3306
;name = grafana
;user = root
;password =

# For "postgres" only, either "disable", "require" or "verify-full"
;ssl_mode = disable

# For "sqlite3" only, path relative to data_path setting
;path = grafana.db

#################################### Session ####################################
[session]
# Either "memory", "file", "redis", "mysql", "postgres", default is "file"
;provider = file

# Provider config options
# memory: not have any config yet
# file: session dir path, is relative to grafana data_path
# redis: config like redis server e.g. `addr=127.0.0.1:6379,pool_size=100,db=grafana`
# mysql: go-sql-driver/mysql dsn config string, e.g. `user:password@tcp(127.0.0.1:3306)/database_name`
# postgres: user=a password=b host=localhost port=5432 dbname=c sslmode=disable
;provider_config = sessions

# Session cookie name
;cookie_name = grafana_sess

# If you use session in https only, default is false
;cookie_secure = false

# Session life time, default is 86400
;session_life_time = 86400

#################################### Analytics ####################################
[analytics]
# Server reporting, sends usage counters to stats.grafana.org every 24 hours.
# No ip addresses are being tracked, only simple counters to track
# running instances, dashboard and error counts. It is very helpful to us.
# Change this option to false to disable reporting.
;reporting_enabled = true

# Set to false to disable all checks to https://grafana.net
# for new vesions (grafana itself and plugins), check is used
# in some UI views to notify that grafana or plugin update exists
# This option does not cause any auto updates, nor send any information
# only a GET request to http://grafana.net to get latest versions
check_for_updates = true

# Google Analytics universal tracking code, only enabled if you specify an id here
;google_analytics_ua_id =

#################################### Security ####################################
[security]
# default admin user, created on startup
;admin_user = admin

# default admin password, can be changed before first start of grafana,  or in profile settings
;admin_password = admin

# used for signing
;secret_key = SW2YcwTIb9zpOOhoPsMm

# Auto-login remember days
;login_remember_days = 7
;cookie_username = grafana_user
;cookie_remember_name = grafana_remember

# disable gravatar profile images
;disable_gravatar = false

# data source proxy whitelist (ip_or_domain:port separated by spaces)
;data_source_proxy_whitelist =

[snapshots]
# snapshot sharing options
external_enabled = false
;external_snapshot_url = https://snapshots-origin.raintank.io
;external_snapshot_name = Publish to snapshot.raintank.io

#################################### Users ####################################
[users]
# 禁用注册功能
allow_sign_up = false

# 不允许非管理员创建组织
allow_org_create = false

# Set to true to automatically assign new users to the default organization (id 1)
auto_assign_org = true

# Default role new users will be automatically assigned (if disabled above is set to true)
auto_assign_org_role = Viewer

# Background text for the user field on the login page
login_hint = 用户名

# Default UI theme ("dark" or "light")
default_theme = light

#################################### Anonymous Auth ##########################
[auth.anonymous]
# enable anonymous access
enabled = false

# specify organization name that should be used for unauthenticated users
;org_name = Main Org.

# specify role for unauthenticated users
;org_role = Viewer

#################################### Auth Proxy ##########################
[auth.proxy]
;enabled = false
;header_name = X-WEBAUTH-USER
;header_property = username
;auto_sign_up = true

#################################### Basic Auth ##########################
[auth.basic]
;enabled = true

#################################### SMTP / Emailing ##########################
[smtp]
;enabled = false
;host = localhost:25
;user =
;password =
;cert_file =
;key_file =
;skip_verify = false
;from_address = admin@grafana.localhost

[emails]
;welcome_email_on_sign_up = false

#################################### Logging ##########################
[log]
# Either "console", "file", "syslog". Default is console and  file
# Use space to separate multiple modes, e.g. "console file"
;mode = console, file

# Either "trace", "debug", "info", "warn", "error", "critical", default is "info"
;level = info

# For "console" mode only
[log.console]
;level =

# log line format, valid options are text, console and json
;format = console

# For "file" mode only
[log.file]
;level =

# log line format, valid options are text, console and json
;format = text

# This enables automated log rotate(switch of following options), default is true
;log_rotate = true

# Max line number of single file, default is 1000000
;max_lines = 1000000

# Max size shift of single file, default is 28 means 1 << 28, 256MB
;max_size_shift = 28

# Segment log daily, default is true
;daily_rotate = true

# Expired days of log file(delete after max days), default is 7
;max_days = 7

[log.syslog]
;level =

# log line format, valid options are text, console and json
;format = text

# Syslog network type and address. This can be udp, tcp, or unix. If left blank, the default unix endpoints will be used.
;network =
;address =

# Syslog facility. user, daemon and local0 through local7 are valid.
;facility =

# Syslog tag. By default, the process' argv[0] is used.
;tag =


#################################### AMQP Event Publisher ##########################
[event_publisher]
;enabled = false
;rabbitmq_url = amqp://localhost/
;exchange = grafana_events

;#################################### Dashboard JSON files ##########################
[dashboards.json]
;enabled = false
;path = /var/lib/grafana/dashboards

#################################### Internal Grafana Metrics ##########################
# Metrics available at HTTP API Url /api/metrics
[metrics]
# Disable / Enable internal metrics
;enabled           = true

# Publish interval
;interval_seconds  = 10

# Send internal metrics to Graphite
; [metrics.graphite]
; address = localhost:2003
; prefix = prod.grafana.%(instance_name)s.

#################################### Internal Grafana Metrics ##########################
# Url used to to import dashboards directly from Grafana.net
[grafana_net]
url = https://grafana.net
```


### prom.yaml
```yaml
global:
  scrape_interval:     5s
  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'dev-monitor'

rule_files:
  - mysql.rules

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']

  - job_name: container_exporter
    static_configs:
    - targets: ['172.18.1.21:9104']

  - job_name: node_exporter
    static_configs:
    - targets: [ '172.18.1.1:9100']

  - job_name: caddy
    static_configs:
    - targets: [ '172.18.1.30:2000']
```

### Caddyfile
```
:80 {
  log internal/access.log {
      rotate {
          size 50
          age  14
          keep 10
      }
  }
  prometheus :2000
  root .
  internal ./internal
  filemanager /file {
    show file/
  }
  proxy /monitor 172.18.1.10:3000 {
    without /monitor
    transparent
  }
}
```

```

$ sudo vim /etc/udev/rules.d/75-persistent-net-generator.rules

SUBSYSTEM=="net", ACTION=="add", ATTR{address}=="f0:42:1c:85:07:41", NAME="eth0"
sudo vim /etc/network/interfaces

```
