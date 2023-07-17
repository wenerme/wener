---
title: Redis
---

# Redis Exporter

- [oliver006/redis_exporter](https://github.com/oliver006/redis_exporter)
- https://github.com/oliver006/redis_exporter/blob/master/contrib/grafana_prometheus_redis_dashboard.json

```
ACL SETUSER $USERNAME +client +ping +info +config|get +cluster|info +slowlog +latency +memory +select +get +scan +xinfo +type +pfcount +strlen +llen +scard +zcard +hlen +xlen +eval allkeys on > $PASSWORD
```

**password file**

```json
{
  "redis://redis6:6379": "",
  "redis://pwd-redis5:6380": "redis-password"
}
```
