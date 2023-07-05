---
tags:
  - Tuning
---

# Tuning

```bash
getconf PAGE_SIZE
```

## Swap

```bash
sysctl vm.swappiness vm.overcommit_memory vm.overcommit_ratio

sysctl vm.dirty_background_ratio vm.dirty_background_bytes
sysctl vm.dirty_ratio vm.dirty_bytes
```

## PostgreSQL

```bash
# Shared Memory
# =============
ipcs -l
ipcs -lm # Shared Memory Limits
# ipcs -M # macOS

sysctl kernel.shmmax kernel.shmall

# HugePage
# =============
cat /proc/meminfo | grep -i huge
# HugePages_Total
sysctl vm.nr_hugepages
```

```bash title='hpsizeof.sh'
#!/bin/bash
pid=`head -1 $PGDATA/postmaster.pid`
echo "Pid:            $pid"
peak=`grep ^VmPeak /proc/$pid/status | awk '{ print $2 }'`
echo "VmPeak:            $peak kB"
hps=`grep ^Hugepagesize /proc/meminfo | awk '{ print $2 }'`
echo "Hugepagesize:   $hps kB"
hp=$((peak/hps))
echo Set Huge Pages:     $hp
```

- postgresql.conf
  - huge_pages
- https://www.percona.com/blog/tune-linux-kernel-parameters-for-postgresql-optimization/
- https://docs.tibco.com/pub/ast/2.5.11/doc/html/tuningguide/ch04s06.html

## haproxy

```ini title="/etc/sysctl.d/30-haproxy.conf"
net.ipv4.tcp_rmem             = 4096 16060 262144 # 减少默认 receive/send buffers
net.ipv4.tcp_wmem             = 4096 16384 262144 #
net.ipv4.tcp_tw_reuse         = 1                 # early reuse of a same source port for outgoing connections
net.ipv4.ip_local_port_range  = 1024 65023        # 增加可用端口
net.ipv4.tcp_max_syn_backlog  = 60000             # 增加 syn backlog
#net.ipv4.tcp_fin_timeout     = 30                # 更早 timeout FIN_WAIT，更快释放 dead conn
net.ipv4.tcp_synack_retries   = 3                 # 减少 SYN-ACK 重试
net.ipv4.ip_nonlocal_bind     = 1                 # 允许 bind 还不存在的 ip
net.core.somaxconn            = 60000             # 至少 tcp_max_syn_backlog
```

- https://www.haproxy.com/documentation/hapee/latest/getting-started/system-tuning/

## nginx

- net.core.somaxconn
  - 匹配 [listen backlog=N](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen)
  - 系统默认 512，nginx 默认 511
- net.core.netdev_max_backlog
- net.ipv4.ip_local_port_range
- https://www.nginx.com/blog/tuning-nginx/

## default.conf

```ini
net.ipv4.tcp_rmem           =4096 87380 4194304
net.ipv4.tcp_wmem           =4096 87380 4194304
net.ipv4.tcp_tw_reuse       =0
net.ipv4.ip_local_port_range=32768 61000
net.ipv4.tcp_max_syn_backlog=1024
net.ipv4.tcp_fin_timeout    =60
net.ipv4.tcp_synack_retries =5
net.ipv4.ip_nonlocal_bind   =1
net.core.somaxconn          =128
```

## limits

- /etc/security/limits.conf
