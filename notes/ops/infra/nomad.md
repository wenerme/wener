---
title: Nomad
---

# Nomad

- [hashicorp/nomad](https://github.com/hashicorp/nomad) 是什么？
  - MPL-2.0, Go
  - 分布式调度器
  - 工作负载编排
- 核心卖点： 混合工作负载编排
- 特点
  - Agent 方式运行
  - UI 提供基本信息和操作
  - 声明式任务定义
  - 主要调度 工作负载/Workload - 不包含网络、存储、服务、配置等
  - 支持 CSI 存储插件
- Driver
  - docker
  - exec - 隔离执行
    - pid, ipc 隔离
    - chroot, host, group
    - caps
    - cgroups
  - raw_exec - 不隔离，直接执行
  - java
  - podman
  - qemu
  - remote - ecs
- 社区 Driver
  - Containerd
  - Firecracker
  - Jailtask
  - lightrun
  - LXC
  - Pot
  - ~~Rtk~~
  - rookout
  - Sigularity
  - Systemd nspawn
  - Windows IIS
- 端口
  - 4646/HTTP
  - 4647/RPC
  - 4648/Serf
- 生态
  - Nomad - 调度器
  - consul - 服务发现、注册、健康检查
  - consul connect - 网络
  - vault - 密钥
  - packer - 构建
- 参考
  - [hashicorp/go-getter](https://github.com/hashicorp/go-getter) - 获取 artifact
  - [Why HashiCorp Customers Choose Nomad](https://www.hashicorp.com/resources/why-hashicorp-customers-choose-nomad/)
  - https://www.nomadproject.io/downloads/

:::tip 适用场景

- Windows, macOS 调度
- EDGE 场景 - 节点多，每个节点部署 kube node 耗费额外资源，网络复杂
- 重计算量 场景 - 容器、网络抽象带来额外消耗
- 分布式 supervisor
- 非标准资源调度 - GPU、外部设备
- 非标准 CPU arch 调度

:::

```bash
# macOS
brew install nomad

# apk add nomad -X https://mirrors.aliyun.com/alpine/edge/community/
apk add nomad -u -X https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/community/

# http://0.0.0.0:4646/ui/
nomad agent -dev -bind 0.0.0.0

# Bash 补全
complete -C $(which nomad) nomad

nomad node status
nomad server members

# 如果不是本地 export NOMAD_ADDR=http://192.168.1.1:4646
nomad job init
nomad job run example.nomad
nomad status example
# 状态 - 可 tab 补全
nomad alloc status deb1c863-cf72-80fd-9dd8-18729f1dd0c6
nomad alloc logs deb1c863-cf72-80fd-9dd8-18729f1dd0c6 redis

nomad job stop example
```

## job

## server

```bash
cat << HCL > server.hcl
# Increase log verbosity
log_level = "DEBUG"

# Setup data dir
data_dir = "/tmp/server1"

# Enable the server
server {
    enabled = true

    # Self-elect, should be 3 or 5 for production
    bootstrap_expect = 1
}
HCL
nomad agent -config server.hcl
```

```hcl
# Increase log verbosity
log_level = "DEBUG"

# Setup data dir
data_dir = "/tmp/client1"

# Give the agent a unique name. Defaults to hostname
name = "client1"

# Enable the client
client {
    enabled = true

    # For demo assume we are talking to server1. For production,
    # this should be like "nomad.service.consul:4647" and a system
    # like Consul used for service discovery.
    servers = ["127.0.0.1:4647"]
}

# 修改端口
# ports {
#     http = 5656
# }

```

## 配置

- [Nomad Configuration](https://www.nomadproject.io/docs/configuration)

```hcl
data_dir  = "/var/lib/nomad"

bind_addr = "0.0.0.0" # the default

datacenter = "dc1"
region = "global"

advertise {
  # Defaults to the first private IP address.
  http = "1.2.3.4"
  rpc  = "1.2.3.4"
  serf = "1.2.3.4:5648" # non-default ports may be specified
}

server {
  enabled          = true
  bootstrap_expect = 3
  data_dir = "/opt/nomad/server"

  enabled_schedulers = ["batch", "service"]
  num_schedulers     = 7
  server_join {
    retry_join     = [ "1.1.1.1", "2.2.2.2" ]
    retry_max      = 3
    retry_interval = "15s"
  }

  default_scheduler_config {
    scheduler_algorithm = "spread"

    preemption_config {
      batch_scheduler_enabled   = true
      system_scheduler_enabled  = true
      service_scheduler_enabled = true
    }
  }
}

client {
  enabled       = true
  servers = ["1.2.3.4:4647", "5.6.7.8:4647"]
  alloc_dir = [data_dir]/alloc

  // 不设置为默认
  // 例如
  chroot_env {
    "/bin/ls"           = "/bin/ls"
    "/etc/ld.so.cache"  = "/etc/ld.so.cache"
    "/etc/ld.so.conf"   = "/etc/ld.so.conf"
    "/etc/ld.so.conf.d" = "/etc/ld.so.conf.d"
    "/etc/passwd"       = "/etc/passwd"
    "/lib"              = "/lib"
    "/lib64"            = "/lib64"
  }
  max_kill_timeout = "30s"
  disable_remote_exec = false
  # map[string]string
  meta = nil

  # network_interface
  network_speed = 0
  cpu_total_compute=0
  memory_total_mb=0

  node_class=""
  // 客户端选项
  options = {
    //
    "driver.allowlist" = "docker,qemu"
    "driver.denylist" = "docker,qemu"
    # 默认
    # CONSUL_TOKEN
    # CONSUL_HTTP_TOKEN
    # VAULT_TOKEN
    # AWS_ACCESS_KEY_ID
    # AWS_SECRET_ACCESS_KEY
    # AWS_SESSION_TOKEN
    # GOOGLE_APPLICATION_CREDENTIALS
    "env.denylist" = "MY_CUSTOM_ENVVAR"

    # 默认 root, Administrator
    "user.denylist" = "root,ubuntu"
    # 默认 exec qemu java
    "user.checked_drivers" = "exec,raw_exec"
    "fingerprint.allowlist" = "network"
    "fingerprint.denylist" = "network"
    "fingerprint.network.disallow_link_local" = "true"
  }
  reserved {
    # MHz
    cpu = 0
    memory = 0
    disk = 0
    reserved_ports = "22,80,8500-8600"
  }

  # Server Join 方式 - 用于服务端角色
  server_join {
    retry_join = [ "1.1.1.1", "2.2.2.2" ]
    retry_max = 3
    retry_interval = "15s"
  }
  state_dir = [data_dir]/client

  gc_interval = "1m"
  gc_disk_usage_threshold=80
  gc_inode_usage_threshold=70
  gc_max_allocs=50
  gc_parallel_destroys=2
  no_host_uuid = true
  cni_path = "/opt/cni/bin"
  cni_config_dir = "/opt/cni/config"
  bridge_network_name = "nomad"
  bridge_network_subnet = "172.26.66.0/23"

  template {}
  host_volume "ca-certificates" {
    path = "/etc/ssl/certs"
    read_only = true
  }
  host_network "public" {
    cidr = "203.0.113.0/24"
    interface = ""
    reserved_ports = "22,80"
  }
}

consul {
  address = "127.0.0.1:8500"
  auth    = "admin:password"
  token   = "abcd1234"
}

acl {
  enabled = true
  token_ttl = "30s"
  policy_ttl = "60s"
  replication_token = ""
}

autopilot {
  cleanup_dead_servers      = true
  last_contact_threshold    = "200ms"
  max_trailing_logs         = 250
  server_stabilization_time = "10s"
  // enterprise
  enable_redundancy_zones   = false
  disable_upgrade_migration = false
  enable_custom_upgrades    = false
}

tls {}

vault {
  enabled = true
  address = "https://vault.company.internal:8200"
}


disable_anonymous_signature = false
disable_update_check = false
enable_debug=false
enable_syslog=false
syslog_facility="LOCAL0"

# map[string]string
http_api_response_headers=nil
leave_on_interrupt=false
leave_on_terminate=false

limits {
  https_handshake_timeout="5s"
  http_max_conns_per_client=100
  rpc_handshake_timeout="5s"
  rpc_max_conns_per_client=100
}

log_level="INFO"
log_json-false
log_file=""
log_rotate_bytes=0
log_rotate_duration="24h"
log_rotate_max_files=0

# hostname
name=

plugin_dir=$data_dir/plugins
plugin "raw_exec" {
  config {
    enabled = true
  }
}

ports {
  http = 4646
  rpc  = 4647
  serf = 4648
}

telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true

  prometheus_metrics = true
}
```
