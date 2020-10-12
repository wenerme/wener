---
id: statsd_exporter
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
```
