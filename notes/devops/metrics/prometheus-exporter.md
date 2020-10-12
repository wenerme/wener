---
id: prometheus-exporter
title: Prometheus Exporter
---

# Prometheus Exporter

## Tips

- [exporters and integration](https://prometheus.io/docs/instrumenting/exporters/)

**端口**

<!-- pbpaste | sort | pbcopy -->

| 服务                                                                     | 默认端口 | 说明                                      | 监控面板                                                                                                                                |
| ------------------------------------------------------------------------ | -------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [blackbox_exporter](https://github.com/prometheus/blackbox_exporter)     | 9115     |  检测 HTTP, HTTPS, DNS, TCP, ICMP.         |
| [container-exporter](https://github.com/docker-infra/container_exporter) | 9104     |                                           | [Docker Dashboard](https://grafana.net/dashboards/179)                                                                                  |
| [jmx_exporter](https://github.com/prometheus/jmx_exporter)               |
| [mysqld-exporter](https://github.com/prometheus/mysqld_exporter)         | 9104     |                                           |
| [mysqld_exporter](https://github.com/prometheus/mysqld_exporter)         |
| [nginx-lua-prometheus](https://github.com/knyar/nginx-lua-prometheus)    | n/a      |                                           | [Nginx Overview](https://grafana.net/dashboards/462)                                                                                    |
| [node_exporter](https://github.com/prometheus/node_exporter)             | 9100     | 节点状态信息                              | [Node Exporter Server Metrics](https://grafana.net/dashboards/405)<br/>[Node exporter single server](https://grafana.net/dashboards/22) |
| [postgres_exporter](https://github.com/wrouesnel/postgres_exporter)      | 9178     |
| [redis-exporter](https://github.com/oliver006/redis_exporter)            | 9121     |                                           | [Prometheus Redis](https://grafana.net/dashboards/763)                                                                                  |
| [redis_exporter](https://github.com/oliver006/redis_exporter)            |
| [snmp_exporter](https://github.com/prometheus/snmp_exporter)             | 9116     | http://localhost:9116/snmp?target=1.2.3.4 |
| grafana                                                                  | 3000     |
| prometheus                                                               | 9090     |

```bash
brew install node_exporter

# 从源码编译
go get -u -v github.com/prometheus/node_exporter
cd ~/gp/src/github.com/prometheus/node_exporter
make
./node_exporter
```

**redis_exporter**

```bash
go get github.com/oliver006/redis_exporter
redis_exporter
# Prometheus Redis https://grafana.net/dashboards/763
```

**mysqld_exporter**

```bash
go get github.com/prometheus/mysqld_exporter
export DATA_SOURCE_NAME='login:password@(hostname:port)/'
mysqld_exporter
```

### blackbox-exporter

- [prometheus/blackbox_exporter](https://github.com/prometheus/blackbox_exporter)
- `http://localhost:9115/probe?target=google.com&module=http_2xx` , debug=true 会包含额外信息
  - probe_success
- `SIGHUP`, `POST /-/reload`
- ICMP 需要更高的权限
- IP Hash 转换 `(3057428492).toString(2).match(/.{8}/g).map(v=>parseInt(v,2)).join('.')`

**blackbox.yml**

- [配置](https://github.com/prometheus/blackbox_exporter/blob/master/CONFIGURATION.md)
- [example.yml](https://github.com/prometheus/blackbox_exporter/blob/master/example.yml)

```yaml
# 模块配置 - probe 时进行引用
modules:
  http_2xx:
    # 底层 probe 类型
    # http, tcp, dns, icmp
    prober: http
  http_post_2xx:
    prober: http
    http:
      method: POST
  # IPv4
  http_2xx_ipv4:
    prober: http
    timeout: 5s
    http:
      preferred_ip_protocol: "ip4"
  tcp_connect:
    prober: tcp
  pop3s_banner:
    prober: tcp
    tcp:
      query_response:
        - expect: '^+OK'
      tls: true
      tls_config:
        insecure_skip_verify: false
  ssh_banner:
    prober: tcp
    tcp:
      query_response:
        - expect: '^SSH-2.0-'
  irc_banner:
    prober: tcp
    tcp:
      query_response:
        - send: 'NICK prober'
        - send: 'USER prober prober prober :prober'
        - expect: 'PING :([^ ]+)'
          send: 'PONG ${1}'
        - expect: '^:[^ ]+ 001'
  icmp:
    prober: icmp
```

**prometheus.yml**

```yaml
scrape_configs:
  - job_name: 'blackbox'
    metrics_path: /probe
    params:
      module: [http_2xx] # Look for a HTTP 200 response.
    static_configs:
      - targets:
          - http://prometheus.io # Target to probe with http.
          - https://prometheus.io # Target to probe with https.
          - http://example.com:8080 # Target to probe with http on port 8080.
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115 # The blackbox exporter's real hostname:port.
```

## postgresql-exporter

- [wrouesnel/postgres_exporter](https://github.com/wrouesnel/postgres_exporter)
- https://grafana.com/grafana/dashboards/12273
- https://github.com/lstn/misc-grafana-dashboards
- https://github.com/percona/grafana-dashboards/blob/master/dashboards/PostgreSQL_Overview.json

## snmp-exporter
- 默认端口 9116
- 默认 [generator.yaml](https://github.com/prometheus/snmp_exporter/blob/master/generator/generator.yml)
- 默认 [snmp.yml](https://github.com/prometheus/snmp_exporter/blob/master/snmp.yml)
  - apcups
  - arista_sw
  - cisco_wlc
  - ddwrt
  - if_mib
  - infrapower_pdu
  - keepalived
  - nec_ix
  - paloalto_fw
  - printer_mib
  - paritan
  - servertech_sentry3
  - synology
  - ubiquiti_airfiber
  - ubiquiti_airmax
  - ubiquiti_unifi
- /usr/share/snmp/mibs

```bash
# 安装
apk add -X https://mirrors.aliyun.com/alpine/edge/testing/ prometheus-snmp-exporter

# /usr/share/snmp/mibs/
apk add net-snmp
# prepare mibs
mkdir -p $HOME/.snmp/mibs
curl -O https://raw.githubusercontent.com/prometheus/snmp_exporter/master/generator/Makefile
make mibs MIBDIR=$HOME/.snmp/mibs
curl -LOC- https://raw.githubusercontent.com/prometheus/snmp_exporter/master/generator/generator.yml

# docker 启动
docker run --rm -it -p 9116:9116 prom/snmp-exporter
```

```yaml
modules:
  module_name:
    walk:
      - 1.3.6.1.2.1.2
      - sysUpTime
      - 1.3.6.1.2.1.31.1.1.1.6.40
```

```yaml
modules:
  module_name:  # The module name. You can have as many modules as you want.
    walk:       # List of OIDs to walk. Can also be SNMP object names or specific instances.
      - 1.3.6.1.2.1.2              # Same as "interfaces"
      - sysUpTime                  # Same as "1.3.6.1.2.1.1.3"
      - 1.3.6.1.2.1.31.1.1.1.6.40  # Instance of "ifHCInOctets" with index "40"

    version: 2  # SNMP version to use. Defaults to 2.
                # 1 will use GETNEXT, 2 and 3 use GETBULK.
    max_repetitions: 25  # How many objects to request with GET/GETBULK, defaults to 25.
                         # May need to be reduced for buggy devices.
    retries: 3   # How many times to retry a failed request, defaults to 3.
    timeout: 5s  # Timeout for each individual SNMP request, defaults to 5s.

    auth:
      # Community string is used with SNMP v1 and v2. Defaults to "public".
      community: public

      # v3 has different and more complex settings.
      # Which are required depends on the security_level.
      # The equivalent options on NetSNMP commands like snmpbulkwalk
      # and snmpget are also listed. See snmpcmd(1).
      username: user  # Required, no default. -u option to NetSNMP.
      security_level: noAuthNoPriv  # Defaults to noAuthNoPriv. -l option to NetSNMP.
                                    # Can be noAuthNoPriv, authNoPriv or authPriv.
      password: pass  # Has no default. Also known as authKey, -A option to NetSNMP.
                      # Required if security_level is authNoPriv or authPriv.
      auth_protocol: MD5  # MD5 or SHA, defaults to MD5. -a option to NetSNMP.
                          # Used if security_level is authNoPriv or authPriv.
      priv_protocol: DES  # DES or AES, defaults to DES. -x option to NetSNMP.
                          # Used if security_level is authPriv.
      priv_password: otherPass # Has no default. Also known as privKey, -X option to NetSNMP.
                               # Required if security_level is authPriv.
      context_name: context # Has no default. -n option to NetSNMP.
                            # Required if context is configured on the device.

    lookups:  # Optional list of lookups to perform.
              # The default for `keep_source_indexes` is false. Indexes must be unique for this option to be used.

      # If the index of a table is bsnDot11EssIndex, usually that'd be the label
      # on the resulting metrics from that table. Instead, use the index to
      # lookup the bsnDot11EssSsid table entry and create a bsnDot11EssSsid label
      # with that value.
      - source_indexes: [bsnDot11EssIndex]
        lookup: bsnDot11EssSsid
        drop_source_indexes: false  # If true, delete source index labels for this lookup.
                                    # This avoids label clutter when the new index is unique.

     overrides: # Allows for per-module overrides of bits of MIBs
       metricName:
         ignore: true # Drops the metric from the output.
         regex_extracts:
           Temp: # A new metric will be created appending this to the metricName to become metricNameTemp.
             - regex: '(.*)' # Regex to extract a value from the returned SNMP walks's value.
               value: '$1' # The result will be parsed as a float64, defaults to $1.
           Status:
             - regex: '.*Example'
               value: '1' # The first entry whose regex matches and whose value parses wins.
             - regex: '.*'
               value: '0'
         type: DisplayString # Override the metric type, possible types are:
                             #   gauge:   An integer with type gauge.
                             #   counter: An integer with type counter.
                             #   OctetString: A bit string, rendered as 0xff34.
                             #   DateAndTime: An RFC 2579 DateAndTime byte sequence. If the device has no time zone data, UTC is used.
                             #   DisplayString: An ASCII or UTF-8 string.
                             #   PhysAddress48: A 48 bit MAC address, rendered as 00:01:02:03:04:ff.
                             #   Float: A 32 bit floating-point value with type gauge.
                             #   Double: A 64 bit floating-point value with type gauge.
                             #   InetAddressIPv4: An IPv4 address, rendered as 1.2.3.4.
                             #   InetAddressIPv6: An IPv6 address, rendered as 0102:0304:0506:0708:090A:0B0C:0D0E:0F10.
                             #   InetAddress: An InetAddress per RFC 4001. Must be preceded by an InetAddressType.
                             #   InetAddressMissingSize: An InetAddress that violates section 4.1 of RFC 4001 by
                             #       not having the size in the index. Must be preceded by an InetAddressType.
                             #   EnumAsInfo: An enum for which a single timeseries is created. Good for constant values.
                             #   EnumAsStateSet: An enum with a time series per state. Good for variable low-cardinality enums.
                             #   Bits: An RFC 2578 BITS construct, which produces a StateSet with a time series per bit.
```

## cadvisor
* [docker metric](https://docs.docker.com/config/daemon/prometheus/)
  * 实验阶段
* [google/cadvisor](https://github.com/google/cadvisor)

```bash
# 版本 https://github.com/google/cadvisor/releases
# google/cadvisor 没有新版本 tag
docker run \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/dev/disk/:/dev/disk:ro \
  --publish=8080:8080 \
  --detach=true \
  --name=cadvisor \
  --privileged \
  --device=/dev/kmsg \
  gcr.io/cadvisor/cadvisor:v0.36.0
```
