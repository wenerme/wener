# Prometheus

## Tips
* [Prometheus](https://prometheus.io)
* Prometheus [vs](https://prometheus.io/docs/introduction/comparison/)
* Prometheus 可以和 Grafana 集成, 在 https://grafana.net/dashboards 可以找到很多预定义的面板定义
* Prometheus vs TICK
  * Pull vs Push
  * 

* JMX 集成 https://github.com/prometheus/jmx_exporter


https://prometheus.io/docs/instrumenting/exporters/

[Node Exporter](https://github.com/prometheus/node_exporter) 节点监控

```bash
go get -u -v github.com/prometheus/node_exporter
cd ~/gp/src/github.com/prometheus/node_exporter
make
./node_exporter

```

[Redis Exporter](https://github.com/oliver006/redis_exporter)

```bash
go get github.com/oliver006/redis_exporter
redis_exporter
# Prometheus Redis https://grafana.net/dashboards/763
```

[mysqld Exporter](https://github.com/prometheus/mysqld_exporter)

```bash
go get github.com/prometheus/mysqld_exporter
export DATA_SOURCE_NAME='login:password@(hostname:port)/'
mysqld_exporter
```




__端口__

服务|默认端口|监控面板
----|----
prometheus| 9090
grafana| 3000
[mysqld-exporter](https://github.com/prometheus/mysqld_exporter)| 9104
[redis-exporter]((https://github.com/oliver006/redis_exporter))| 9121|[Prometheus Redis](https://grafana.net/dashboards/763)
[node-exporter](https://github.com/prometheus/node_exporter)| 9100|[Node Exporter Server Metrics](https://grafana.net/dashboards/405)<br>[Node exporter single server](https://grafana.net/dashboards/22)
[container-exporter](https://github.com/docker-infra/container_exporter)| 9104|[Docker Dashboard](https://grafana.net/dashboards/179)
[nginx-lua-prometheus](https://github.com/knyar/nginx-lua-prometheus)|n/a|[Nginx Overview](https://grafana.net/dashboards/462)

https://prometheus.io/docs/guides/node-exporter/

https://prometheus.io/docs/prometheus/latest/querying/basics/

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

```bash
# Get start
go get -v -u github.com/prometheus/prometheus/cmd/...


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

# docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \

# http://docs.grafana.org/installation/docker/
docker run -i -p 12000:3000 \
  -e "GF_SERVER_ROOT_URL=http://grafana.server.name"  \
  -e "GF_SECURITY_ADMIN_PASSWORD=secret"  \
  grafana/grafana


```

docker run -p 9090:9090 -v /tmp/prometheus.yml:/etc/prometheus/prometheus.yml \
       prom/prometheus


https://prometheus.io/docs/prometheus/latest/federation/

```yaml
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
    - targets: ['localhost:9090']
```
