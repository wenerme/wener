---
id: grafana
title: Grafana
---

# Grafana

## Tips

```bash
brew install grafana

# 默认服务端配置
grafana-server \
  --config=/opt/grafana/grafana.ini \
  --homepath /usr/local/share/grafana \
  --packaging=brew cfg:default.paths.logs=/usr/local/var/log/grafana cfg:default.paths.data=/usr/local/var/lib/grafana cfg:default.paths.plugins=/usr/local/var/lib/grafana/plugins

# 启动服务
brew services start grafana

code /opt/grafana/grafana.ini
grafana-server --config /opt/grafana/grafana.ini --homepath /usr/local/share/grafana --packaging=brew
```

__基本配置__

```ini
[path]
data = /opt/grafana
logs = /opt/grafana
plugins = /usr/local/var/lib/grafana/plugins

[server]
http_port = 3030

[database]
type=sqlite3

[remote_cache]

[analytics]
reporting_enabled = false
```