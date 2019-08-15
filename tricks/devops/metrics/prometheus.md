# Prometheus

## Tips
* [Prometheus](https://prometheus.io)
* Prometheus [vs](https://prometheus.io/docs/introduction/comparison/)
* Prometheus 可以和 Grafana 集成, 在 https://grafana.net/dashboards 可以找到很多预定义的面板定义
* Prometheus vs TICK
  * Pull vs Push
* [prometheus/pushgateway](https://github.com/prometheus/pushgateway)

```bash
# 安装
brew install prometheus
# 从源码编译安装
go get -v -u github.com/prometheus/prometheus/cmd/...

# 启动 默认前端页面 localhost:9090
prometheus --config.file ~/.config/prometheus.yml

# 或通过 brew 启动服务
# 如果没有 --storage.tsdb.path 可能出现权限问题
echo "--config.file $HOME/.config/prometheus.yml --storage.tsdb.path $HOME/.data/prometheus" > /usr/local/etc/prometheus.args
brew services start prometheus
# 错误日志
cat /usr/local/var/log/prometheus.err.log
# 正常日志
cat /usr/local/var/log/prometheus.log

# 管理接口
# --web.enable-admin-api 启用 /api/*/admin/ 相关接口
# --web.enable-lifecycle 启用 reload 和 quite
prometheus --config.file ~/.config/prometheus.yml --web.enable-admin-api --web.enable-lifecycle
# brew 参数
# echo "--config.file $HOME/.config/prometheus.yml --storage.tsdb.path $HOME/.data/prometheus --web.enable-admin-api --web.enable-lifecycle" > /usr/local/etc/prometheus.args
# 参考 https://prometheus.io/docs/operating/security/
# 重载配置
curl -X POST http://localhost:9090/-/reload

# 主机节点监控
brew install node_exporter
# 通过 service 启动
echo --web.listen-address :9101 > /usr/local/etc/node_exporter.args
brew services start node_exporter

# 直接启动
node_exporter --web.listen-address :9101

# Docker
# ===================
docker pull prom/prometheus
docker pull prom/alertmanager
# 需要挂载 /proc
docker pull prom/node-exporter
docker pull prom/blackbox-exporter
docker pull prom/container-exporter
docker pull prom/mysqld-exporter

# node_exporter 在容器中运行的不太好
go get github.com/prometheus/node_exporter

# 默认账号密码为 admin/admin
docker pull grafana/grafana

docker network create --subnet=172.18.0.0/16 mon-net

docker run --net mon-net --ip 172.18.0.10 -i -p 12000:3000 grafana/grafana
docker run --net mon-net --ip 172.18.0.20 -i -p 12001:9090 prom/prometheus

# http://docs.grafana.org/installation/docker/
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 12000:3000 \
  -e "GF_SERVER_ROOT_URL=http://grafana.server.name"  \
  -e "GF_SECURITY_ADMIN_PASSWORD=secret"  \
  grafana/grafana
```

## Exporter
* [exporters and integration](https://prometheus.io/docs/instrumenting/exporters/)

__端口__

服务|默认端口|监控面板
----|----|----
prometheus| 9090
grafana| 3000
[mysqld-exporter](https://github.com/prometheus/mysqld_exporter) | 9104
[redis-exporter]((https://github.com/oliver006/redis_exporter)) | 9121|[Prometheus Redis](https://grafana.net/dashboards/763)
[node-exporter](https://github.com/prometheus/node_exporter)| 9100|[Node Exporter Server Metrics](https://grafana.net/dashboards/405)<br>[Node exporter single server](https://grafana.net/dashboards/22)
[container-exporter](https://github.com/docker-infra/container_exporter)| 9104|[Docker Dashboard](https://grafana.net/dashboards/179)
[nginx-lua-prometheus](https://github.com/knyar/nginx-lua-prometheus)|n/a|[Nginx Overview](https://grafana.net/dashboards/462)

* [node_exporter](https://github.com/prometheus/node_exporter) 节点监控
  * [Guide](https://prometheus.io/docs/guides/node-exporter/)
```bash
brew install node_exporter

# 从源码编译
go get -u -v github.com/prometheus/node_exporter
cd ~/gp/src/github.com/prometheus/node_exporter
make
./node_exporter
```

* [redis_exporter](https://github.com/oliver006/redis_exporter)
```bash
go get github.com/oliver006/redis_exporter
redis_exporter
# Prometheus Redis https://grafana.net/dashboards/763
```

* [mysqld_exporter](https://github.com/prometheus/mysqld_exporter)
```bash
go get github.com/prometheus/mysqld_exporter
export DATA_SOURCE_NAME='login:password@(hostname:port)/'
mysqld_exporter
```

* [jmx_exporter](https://github.com/prometheus/jmx_exporter)


## Config
```yaml
# 全局配置
global:
  # 抓取间隔，默认 1m
  scrape_interval:      15s
  # 抓取超时，默认 10s
  scrape_timeout:       10s
  # 计算规则间隔，默认 1m
  evaluation_interval:  15s

# 告警配置
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093

# 周期性计算的规则文件
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# 抓取配置
scrape_configs:
  # 任务名字，会添加一个 job=$job_name 的标签
  - job_name: 'prometheus'
    # 指标路径，默认 '/metrics'
    metrics_path: '/metrics'
    # 请求 schema，默认 'http'
    scheme: 'http'
    # 静态配置
    static_configs:
    # 抓取目标
    - targets: ['localhost:9090']
```

## PromQL
* [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [QUERY EXAMPLES](https://prometheus.io/docs/prometheus/latest/querying/examples/)
* [PromQL tutorial for beginners and humans](https://medium.com/@valyala/9ab455142085)
* 支持 PromQL 的应用
  * [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics)
    * long-term remote storage for Prometheus

```
# 指标
node_cpu_seconds_total
# 标签过滤，支持操作符号 = != 匹配 =~ 不匹配 !~
node_cpu_seconds_total{mode="user"}
# 5 分钟均值
rate(node_cpu_seconds_total{mode="user"}[5m])
# 聚合结果
sum(rate(node_cpu_seconds_total{mode="user"}[5m]))
# 按照 mode 分组
sum(rate(node_cpu_seconds_total[5m])) by (mode)
# 不看 idle 和 nice
sum(rate(node_cpu_seconds_total{mode!~"idle|nice"}[5m])) by (mode)
# 只看 user 和 system
sum(rate(node_cpu_seconds_total{mode=~"user|system"}[5m])) by (mode)
# 分别返回
# by (mode) 是必须的，如果丢失了 label，则会认为是同样的指标，会被丢弃
sum(rate(node_cpu_seconds_total{mode="user"}[5m])) by (mode) or sum(rate(node_cpu_seconds_total{mode="system"}[5m])) by (mode)
# 结果加上另外一个指标
sum(rate(node_cpu_seconds_total{mode=~"user|system"}[5m])) by (mode) or node_load15
```

<!--
https://gitlab.awesome-it.de/overlays/awesome/blob/master/net-analyzer/prometheus-node-exporter/files/prometheus-node-exporter-initd

```bash
#!/sbin/openrc-run
description="Prometheus Node Exporter"
pidfile="/var/run/${SVCNAME}.pid"
command=/data/code/bin/node_exporter
command_args="${PROMETHEUS_NODE_EXPORTER_ARGS}"
command_background="true"
user=root
logfile="/var/log/${SVCNAME}.log"

start_stop_daemon_args="-u ${user} -1 ${logfile} -2 ${logfile}"

depend() {
  need net
}
```

-->