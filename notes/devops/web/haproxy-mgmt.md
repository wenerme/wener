---
title: HAProxy Management & Operations
tags:
  - DevOps
  - Web
  - HAProxy
  - Operations
  - Dashboard
  - Prometheus
---

# HAProxy Management & Operations

Detailed guide on managing HAProxy instances, reloads, monitoring, and APIs.

## Documentation

- [Official Management Documentation](https://www.haproxy.org/download/2.1/doc/management.txt)
- [HAProxy 2.2 Management Manual](https://cbonte.github.io/haproxy-dconv/2.2/management.html)

## Hitless Reload

To achieve seamless reloads without losing connections using `SIGUSR2` or the `-x` flag.

- [Truly Seamless Reloads with HAProxy](https://www.haproxy.com/blog/truly-seamless-reloads-with-haproxy-no-more-hacks/)
- [Hitless Reloads with HAProxy – HOWTO](https://www.haproxy.com/blog/hitless-reloads-with-haproxy-howto/)

### Configuration

```haproxy
# Enable stats socket for hitless reload
stats socket /var/run/haproxy.sock mode 600 expose-fd listeners level user
```

### Execution

```bash
# Graceful restart/reload using the previous process ID and the state socket
haproxy -f /etc/haproxy/haproxy.cfg -p /run/haproxy.pid -sf $(cat /run/haproxy.pid) -x /var/run/haproxy.sock
```

## Monitoring & Stats

- [Exploring the HAProxy Stats Page](https://www.haproxy.com/blog/exploring-the-haproxy-stats-page/)
- [HAProxy Prometheus Metrics Endpoint](https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/)
- [Grafana Dashboard (ID: 2428)](https://grafana.com/grafana/dashboards/2428)

Check if Prometheus is supported:

```bash
haproxy -vv | grep 'Prometheus'
```

### Stats & Metrics Frontend

```haproxy
frontend stats
   bind *:8404
   mode http
   option http-use-htx

   # Prometheus metrics
   http-request use-service prometheus-exporter if { path /metrics }

   # Traditional stats page
   stats enable
   stats uri /stats
   stats refresh 10s
```

## Runtime Commands

Interact with HAProxy via socket (requires `socat`):

```bash
echo "disable frontend website" | sudo socat stdio /run/haproxy.sock
```

## Data Plane API

The Data Plane API allows dynamic configuration changes via REST.

- [Data Plane API GitHub](https://github.com/haproxytech/dataplaneapi)
- [Using the Data Plane API](https://www.haproxy.com/documentation/hapee/2-1r1/configuration/dataplaneapi)

### Example setup

```bash
# Create a restart script for the API to call
echo -e '#!/bin/sh\nhaproxy -f haproxy.cfg -p haproxy.pid -sf $(cat haproxy.pid)' > hap-restart.sh
chmod +x hap-restart.sh

# Run Data Plane API
dataplaneapi --port 5555 -b $(which haproxy) -c haproxy.cfg -d 5 -r 'hap-restart.sh' \
  -s 'haproxy -f haproxy.cfg -p haproxy.pid' -t /tmp/haproxy --userlist hap-dp

# Test API
curl -X GET --user dataplaneapi:mypassword http://localhost:5555/v2/info
```
