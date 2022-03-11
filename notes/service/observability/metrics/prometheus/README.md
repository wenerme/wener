---
title: Prometheus
---

# Prometheus

- [Prometheus](https://prometheus.io)
- Prometheus [vs](https://prometheus.io/docs/introduction/comparison/)
- Prometheus 可以和 Grafana 集成, 在 https://grafana.net/dashboards 可以找到很多预定义的面板定义
- Prometheus vs TICK
  - Pull vs Push
- [prometheus/pushgateway](https://github.com/prometheus/pushgateway)
- 磁盘空间
  - `needed_disk_space = retention_time_seconds * ingested_samples_per_second * bytes_per_sample`
    - bytes_per_sample 一般为 1、2 bytes
    - `--storage.tsdb.retention.time` 默认 15d
    - node_exporter 大约 3000 指标
    - scrape_interval 15s
    - `(3000/15*2 * 15*24*60*60) /1000/1000 = 518M`
- 参考
  - https://www.robustperception.io/configuring-prometheus-storage-retention

:::caution

- Prometheus 不支持 auth，如果要对外暴露建议添加反向代理

:::

```bash
# 安装
brew install prometheus
# 从源码编译安装
go install github.com/prometheus/prometheus@latest

# 启动 默认前端页面 http://localhost:9090
prometheus --config.file ~/.config/prometheus.yml

# docker 启动
docker run \
  -p 9090:9090 \
  -v /etc/prometheus:/etc/prometheus \
  prom/prometheus

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
# 参考 https://prometheus.io/docs/operating/security/
prometheus --config.file ~/.config/prometheus.yml --web.enable-admin-api --web.enable-lifecycle
# brew 参数
echo "--config.file $HOME/.config/prometheus.yml --storage.tsdb.path $HOME/.data/prometheus --web.enable-admin-api --web.enable-lifecycle" > /usr/local/etc/prometheus.args
# 重启服务
brew services restart prometheus
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

## Config

:::tip

- 配置不支持环境变量替换，但涉及到凭证信息的地方都支持 文件 或使用 常用的 环境变量

:::

```yaml
# 全局配置
global:
  # 抓取间隔，默认 1m
  scrape_interval: 15s
  # 抓取超时，默认 10s
  scrape_timeout: 10s
  # 计算规则间隔，默认 1m
  evaluation_interval: 15s

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

## 服务发现

- [支持配置](https://prometheus.io/docs/prometheus/latest/configuration/configuration)
  - azure
  - consul - 服务 catalog
  - digitalocean
  - dockerswarm
  - dns - SVR 记录
  - ec2
  - openstack
  - file - 检测文件变化
    - 格式与 static_config 相同
  - gce
  - kubernetes
    - node、service、pod、endpoints、ingress
  - marathon
  - nerve
  - serverset
  - triton
- mDNS
  - [#2537](https://github.com/prometheus/prometheus/issues/2537) - Cannot scrape targets specified by mDNS name
  - [msiebuhr/prometheus-mdns-sd](https://github.com/msiebuhr/prometheus-mdns-sd)
    - 写入文件，使用文件发现

```bash
# _prometheus-http._tcp
# _prometheus-https._tcp
go get github.com/msiebuhr/prometheus-mdns-sd
#
prometheus-mdns-sd -out /etc/prometheus/mdns-sd.json

cat <<XML > /etc/avahi/services/node-exporter.service
<service-group>
  <name replace-wildcards="yes">%h</name>

  <service>
    <type>_prometheus-http._tcp</type>
    <port>9100</port>
  </service>
</service-group>
XML

# macOS
dns-sd -R "node_exporter metrics" _prometheus-http._tcp. . 9100 path=/metrics
```

## 集成

- [INTEGRATIONS](https://prometheus.io/docs/operating/integrations)
- 支持读写的存储
  - Azure Data Explorer
  - Cortex
  - CrateDB
  - Google BigQuery
  - Google Cloud Spanner
  - InfluxDB
  - IRONdb
  - M3DB
  - MetricFire
  - PostgreSQL/TimescaleDB
  - QuasarDB
  - Splunk
  - TiKV
  - Thanos

## Pushing

- https://prometheus.io/docs/practices/pushing/
- only valid use case for the Pushgateway is for capturing the outcome of a service-level batch job

## Proxy

- https://github.com/prometheus-community/PushProx

```yaml
scrape_configs:
  - job_name: node
    # 代理
    proxy_url: http://proxy:8080/
    static_configs:
      - targets: ['client:9100'] # Presuming the FQDN of the client is "client".
```

## label

- `__` 开头的为内部 label
- `__meta` 可能由 Service Discovery 添加
- `__tmp` 可由用户使用

| Label            | Desc       |
| ---------------- | ---------- |
| `__address__`    | 目标地址   |
| `__schema__`     | http/https |
| `__name__`       | 标签名字   |
| `__param_target` | `?target=` |
| `__param_module` | `?module=` |

```yaml
- job_name: 'printer'
  static_configs:
    - targets:
        - 192.168.1.2
  metrics_path: /snmp
  params:
    module: [printer_mib]
  relabel_configs:
    # __param_target=__address__
    - source_labels: [__address__]
      target_label: __param_target
    # instance=__param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      # snmp exporter 地址
      replacement: 192.168.1.3:9116
```

# FAQ

## Push vs Pull

- Push
  - IoT 场景
  - 网络隔离场景
  - 数据导入
- [Pros/Cons of allowing push in Prometheus](https://docs.google.com/document/d/1H47v7WfyKkSLMrR8_iku6u9VB73WrVzBHb2SB6dL9_g)
