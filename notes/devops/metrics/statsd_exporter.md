---
title: statsd_exporter
---

# statsd_exporter
## Tips
* [prometheus/statsd_exporter](https://github.com/prometheus/statsd_exporter)
* statsd 默认端口 8125/udp
* statsd_exporter 端口 9102

```bash
docker run --rm -it -p 9102:9102 -p 9125:9125 -p 9125:9125/udp \
  --name statsd-exporter prom/statsd-exporter

docker run --rm -it -p 9102:9102 -p 9125:9125 -p 9125:9125/udp \
  -v $PWD/statsd_mapping.yml:/tmp/statsd_mapping.yml \
  --name statsd-exporter prom/statsd-exporter --statsd.mapping-config=/tmp/statsd_mapping.yml

# 测试
# -c close - 但 busybox 的 nc 不支持
echo "deploys.test.myservice:1|c" | nc -w 1 -u 127.0.0.1 8125
echo "deploys.test.myservice:1|c" | socat -t 0 STDIN UDP:127.0.0.1:8125
```

## asterisk

__statsd.conf__

```ini
[general]
enabled = yes
server = 192.168.1.1:8125
prefix = ast-1
```

```bash
asterisk -R -x 'module reload res_statsd.so'
```


```
<PREFIX>_PJSIP_contacts_<CONTACT>__<ID>_rtt{quantile="0.5"} -0.001
```

```yaml
mappings:
- match: "([^.]+)[.]PJSIP[.]contacts[.]([^;]+)(;[^.]*)?[.]rtt"
match_type: regex
name: "pjsip_contacts_rtt"
labels:
asterisk: "$1"
conact: "$2"
summary_options:
quantiles:
- quantile: 0.99
  error: 0.001
- quantile: 0.9
  error: 0.05
- quantile: 0.5
  error: 0.005
max_summary_age: 60s
summary_age_buckets: 3
stream_buffer_size: 1000
```
