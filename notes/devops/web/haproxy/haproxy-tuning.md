---
tags:
- Tuning
---


# HAProxy Tuning

```
haproxy -vv
echo "show info" | socat stdio /run/haproxy-runtime-api.sock
```

- maxconn
- CPU Pinning
  - nbproc
  - nbthread
  - cpu-map

```ini title="/etc/sysctl.d/30-haproxy.conf"
net.ipv4.tcp_rmem            = 4096 16060 262144
net.ipv4.tcp_wmem            = 4096 16384 262144
net.ipv4.ip_local_port_range = 1024 65023
net.ipv4.tcp_max_syn_backlog = 60000
#net.ipv4.tcp_fin_timeout     = 30
net.ipv4.tcp_synack_retries  = 3
net.core.somaxconn           = 60000
```

- https://www.haproxy.com/documentation/hapee/latest/getting-started/system-tuning/


```
# CPU Pinning
nbproc 2
cpu-map 1 0
cpu-map 2 1
```

- https://www.haproxy.com/blog/multithreading-in-haproxy
