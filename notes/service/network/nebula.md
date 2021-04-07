---
title: nebula
---

# nebula
* * [slackhq/nebula](https://github.com/slackhq/nebula) 是什么？
  * MIT
  * P2P overlay 网络 - 类似 Tinc
  * Layer 3 - IP 层 - 不支持 MAC - 预先配置网络
  * 注重性能和简洁
  * 支持 iOS 和 Android - [DefinedNet/mobile_nebula](https://github.com/DefinedNet/mobile_nebula)
    * Flutter+Go binding
  * 支持 Windows, MacOS, FreeBSD
  * 默认 elliptic curve Diffie-Hellman key exchange, AES-256-GCM
  * Open Source Since 2019 Nov - slackhq 内部开发 3 年
  * 基于 [Noise Protocol Framework.](https://noiseprotocol.org/)
    * 双向认证, p2p, SDN
* lighthouse 辅助 nat punch
* 参考
  * [Creating a Fast, Secure, Location Agnostic Mesh Network with Nebula - Ryan Huber](https://youtu.be/qy2cgqglt3o)

:::caution

* 目前直连为主，没有类似 tinc 的通过节点路由的逻辑 - [#218](https://github.com/slackhq/nebula/issues/218)
  * 通过 lighthouse 支持路由一个网络
* 不支持 unsafe_routes 之外自定义路由 - [#274](https://github.com/slackhq/nebula/issues/274)
  * 只能使用预先定义的网络 - 不能 `ip ro add`
  * 不支持 flannel+nebula
* 不能 ping 节点

:::

```bash
# macOS
brew install nebula
# AlpineLinux
apk add nebula

# ca.crt ca.key
nebula-cert ca -name "Wener"
# Lighthouse
# lh-1.crt lh-1.key
nebula-cert sign -name "lh-1" -ip "192.168.100.1/24"
cat <<LH > lh-1.yaml
pki:
  ca: /home/admin/ca.crt
  cert: /home/admin/lh-1.crt
  key: /home/admin/lh-1.key
static_host_map:
  "192.168.100.1": ["100.64.22.11:4242"]
lighthouse:
  am_lighthouse: true
listen:
  host: 0.0.0.0
  port: 4242
firewall:
  outbound:
  - port: any
    proto: any
    host: any
  inbound:
  - port: any
    proto: icmp
    host: any
  - port: 22
    proto: tcp
    group: ssh
LH
# 同步证书到 lighthouse 节点
scp ca.crt lh-1.yaml lh-1.crt lh-1.key admin@my-lighthouse:~
# 启动服务
ssh admin@my-lighthouse sudo ./nebula -config lh-1.yaml

# laptop
# 添加 ssh 分组即可访问 lh-1 的 22 端口
nebula-cert sign -name "laptop" -ip "192.168.100.2/24" -groups "laptop,home,ssh"
cat <<LH > laptop.yaml
pki:
  ca: ca.crt
  cert: laptop.crt
  key: laptop.key
static_host_map:
  "192.168.100.1": ["100.64.22.11:4242"]
lighthouse:
  hosts:
    - "192.168.100.1"
listen:
  host: 0.0.0.0
  port: 4242
firewall:
  outbound:
  - port: any
    proto: any
    host: any
  inbound:
  - port: any
    proto: icmp
    host: any
LH
sudo nebula -config laptop.yaml
```


## 配置
- https://github.com/slackhq/nebula/blob/master/examples/config.yml

```yaml
# This is the nebula example configuration file. You must edit, at a minimum, the static_host_map, lighthouse, and firewall sections
# Some options in this file are HUPable, including the pki section. (A HUP will reload credentials from disk without affecting existing tunnels)

# PKI defines the location of credentials for this node. Each of these can also be inlined by using the yaml ": |" syntax.
pki:
  # The CAs that are accepted by this node. Must contain one or more certificates created by 'nebula-cert ca'
  ca: /etc/nebula/ca.crt
  cert: /etc/nebula/host.crt
  key: /etc/nebula/host.key
  #blocklist is a list of certificate fingerprints that we will refuse to talk to
  #blocklist:
  #  - c99d4e650533b92061b09918e838a5a0a6aaee21eed1d12fd937682865936c72

# The static host map defines a set of hosts with fixed IP addresses on the internet (or any network).
# A host can have multiple fixed IP addresses defined here, and nebula will try each when establishing a tunnel.
# The syntax is:
#   "{nebula ip}": ["{routable ip/dns name}:{routable port}"]
# Example, if your lighthouse has the nebula IP of 192.168.100.1 and has the real ip address of 100.64.22.11 and runs on port 4242:
static_host_map:
  "192.168.100.1": ["100.64.22.11:4242"]


lighthouse:
  # am_lighthouse is used to enable lighthouse functionality for a node. This should ONLY be true on nodes
  # you have configured to be lighthouses in your network
  am_lighthouse: false
  # serve_dns optionally starts a dns listener that responds to various queries and can even be
  # delegated to for resolution
  #serve_dns: false
  #dns:
    # The DNS host defines the IP to bind the dns listener to. This also allows binding to the nebula node IP.
    #host: 0.0.0.0
    #port: 53
  # interval is the number of seconds between updates from this node to a lighthouse.
  # during updates, a node sends information about its current IP addresses to each node.
  interval: 60
  # hosts is a list of lighthouse hosts this node should report to and query from
  # IMPORTANT: THIS SHOULD BE EMPTY ON LIGHTHOUSE NODES
  # IMPORTANT2: THIS SHOULD BE LIGHTHOUSES' NEBULA IPs, NOT LIGHTHOUSES' REAL ROUTABLE IPs
  hosts:
    - "192.168.100.1"

  # remote_allow_list allows you to control ip ranges that this node will
  # consider when handshaking to another node. By default, any remote IPs are
  # allowed. You can provide CIDRs here with `true` to allow and `false` to
  # deny. The most specific CIDR rule applies to each remote. If all rules are
  # "allow", the default will be "deny", and vice-versa. If both "allow" and
  # "deny" rules are present, then you MUST set a rule for "0.0.0.0/0" as the
  # default.
  #remote_allow_list:
    # Example to block IPs from this subnet from being used for remote IPs.
    #"172.16.0.0/12": false

    # A more complicated example, allow public IPs but only private IPs from a specific subnet
    #"0.0.0.0/0": true
    #"10.0.0.0/8": false
    #"10.42.42.0/24": true

  # local_allow_list allows you to filter which local IP addresses we advertise
  # to the lighthouses. This uses the same logic as `remote_allow_list`, but
  # additionally, you can specify an `interfaces` map of regular expressions
  # to match against interface names. The regexp must match the entire name.
  # All interface rules must be either true or false (and the default will be
  # the inverse). CIDR rules are matched after interface name rules.
  # Default is all local IP addresses.
  #local_allow_list:
    # Example to block tun0 and all docker interfaces.
    #interfaces:
      #tun0: false
      #'docker.*': false
    # Example to only advertise this subnet to the lighthouse.
    #"10.0.0.0/8": true

# Port Nebula will be listening on. The default here is 4242. For a lighthouse node, the port should be defined,
# however using port 0 will dynamically assign a port and is recommended for roaming nodes.
listen:
  # To listen on both any ipv4 and ipv6 use "[::]"
  host: 0.0.0.0
  port: 4242
  # Sets the max number of packets to pull from the kernel for each syscall (under systems that support recvmmsg)
  # default is 64, does not support reload
  #batch: 64
  # Configure socket buffers for the udp side (outside), leave unset to use the system defaults. Values will be doubled by the kernel
  # Default is net.core.rmem_default and net.core.wmem_default (/proc/sys/net/core/rmem_default and /proc/sys/net/core/rmem_default)
  # Maximum is limited by memory in the system, SO_RCVBUFFORCE and SO_SNDBUFFORCE is used to avoid having to raise the system wide
  # max, net.core.rmem_max and net.core.wmem_max
  #read_buffer: 10485760
  #write_buffer: 10485760

# EXPERIMENTAL: This option is currently only supported on linux and may
# change in future minor releases.
#
# Routines is the number of thread pairs to run that consume from the tun and UDP queues.
# Currently, this defaults to 1 which means we have 1 tun queue reader and 1
# UDP queue reader. Setting this above one will set IFF_MULTI_QUEUE on the tun
# device and SO_REUSEPORT on the UDP socket to allow multiple queues.
#routines: 1

punchy:
  # Continues to punch inbound/outbound at a regular interval to avoid expiration of firewall nat mappings
  punch: true

  # respond means that a node you are trying to reach will connect back out to you if your hole punching fails
  # this is extremely useful if one node is behind a difficult nat, such as a symmetric NAT
  # Default is false
  #respond: true

  # delays a punch response for misbehaving NATs, default is 1 second, respond must be true to take effect
  #delay: 1s

# Cipher allows you to choose between the available ciphers for your network. Options are chachapoly or aes
# IMPORTANT: this value must be identical on ALL NODES/LIGHTHOUSES. We do not/will not support use of different ciphers simultaneously!
#cipher: chachapoly

# Local range is used to define a hint about the local network range, which speeds up discovering the fastest
# path to a network adjacent nebula node.
#local_range: "172.16.0.0/24"

# sshd can expose informational and administrative functions via ssh this is a
#sshd:
  # Toggles the feature
  #enabled: true
  # Host and port to listen on, port 22 is not allowed for your safety
  #listen: 127.0.0.1:2222
  # A file containing the ssh host private key to use
  # A decent way to generate one: ssh-keygen -t ed25519 -f ssh_host_ed25519_key -N "" < /dev/null
  #host_key: ./ssh_host_ed25519_key
  # A file containing a list of authorized public keys
  #authorized_users:
    #- user: steeeeve
      # keys can be an array of strings or single string
      #keys:
        #- "ssh public key string"

# Configure the private interface. Note: addr is baked into the nebula certificate
tun:
  # When tun is disabled, a lighthouse can be started without a local tun interface (and therefore without root)
  disabled: false
  # Name of the device
  dev: nebula1
  # Toggles forwarding of local broadcast packets, the address of which depends on the ip/mask encoded in pki.cert
  drop_local_broadcast: false
  # Toggles forwarding of multicast packets
  drop_multicast: false
  # Sets the transmit queue length, if you notice lots of transmit drops on the tun it may help to raise this number. Default is 500
  tx_queue: 500
  # Default MTU for every packet, safe setting is (and the default) 1300 for internet based traffic
  mtu: 1300
  # Route based MTU overrides, you have known vpn ip paths that can support larger MTUs you can increase/decrease them here
  routes:
    #- mtu: 8800
    #  route: 10.0.0.0/16
  # Unsafe routes allows you to route traffic over nebula to non-nebula nodes
  # Unsafe routes should be avoided unless you have hosts/services that cannot run nebula
  # NOTE: The nebula certificate of the "via" node *MUST* have the "route" defined as a subnet in its certificate
  unsafe_routes:
    #- route: 172.16.1.0/24
    #  via: 192.168.100.99
    #  mtu: 1300 #mtu will default to tun mtu if this option is not sepcified


# TODO
# Configure logging level
logging:
  # panic, fatal, error, warning, info, or debug. Default is info
  level: info
  # json or text formats currently available. Default is text
  format: text
  # Disable timestamp logging. useful when output is redirected to logging system that already adds timestamps. Default is false
  #disable_timestamp: true
  # timestamp format is specified in Go time format, see:
  #     https://golang.org/pkg/time/#pkg-constants
  # default when `format: json`: "2006-01-02T15:04:05Z07:00" (RFC3339)
  # default when `format: text`:
  #     when TTY attached: seconds since beginning of execution
  #     otherwise: "2006-01-02T15:04:05Z07:00" (RFC3339)
  # As an example, to log as RFC3339 with millisecond precision, set to:
  #timestamp_format: "2006-01-02T15:04:05.000Z07:00"

#stats:
  #type: graphite
  #prefix: nebula
  #protocol: tcp
  #host: 127.0.0.1:9999
  #interval: 10s

  #type: prometheus
  #listen: 127.0.0.1:8080
  #path: /metrics
  #namespace: prometheusns
  #subsystem: nebula
  #interval: 10s

  # enables counter metrics for meta packets
  #   e.g.: `messages.tx.handshake`
  # NOTE: `message.{tx,rx}.recv_error` is always emitted
  #message_metrics: false

  # enables detailed counter metrics for lighthouse packets
  #   e.g.: `lighthouse.rx.HostQuery`
  #lighthouse_metrics: false

# Handshake Manger Settings
#handshakes:
  # Total time to try a handshake = sequence of `try_interval * retries`
  # With 100ms interval and 20 retries it is 23.5 seconds
  #try_interval: 100ms
  #retries: 20
  # wait_rotation is the number of handshake attempts to do before starting to try non-local IP addresses
  #wait_rotation: 5
  # trigger_buffer is the size of the buffer channel for quickly sending handshakes
  # after receiving the response for lighthouse queries
  #trigger_buffer: 64

# 防火墙安全配置
# 进出规则默认 deny - 所有配置都是配置允许
# 匹配逻辑 port AND proto AND (ca_sha OR ca_name) AND (host OR group OR groups OR cidr)
firewall:
  conntrack:
    tcp_timeout: 12m
    udp_timeout: 3m
    default_timeout: 10m
    max_connections: 100000

  outbound:
    # 允许所有出去流量
    - port: any
      proto: any
      host: any

    # 0, any, 80, 1000-200, fragment
  - port: any
    # 类似 port 但在 ICMP 这样的协议中使用 code 更合理 - 目前未实现
    code: any
    # tcp, udp, icmp
    proto: any
    # 主机名 - test-host
    host: any
    # 在证书中包含的分组
    group: any
    # 等同于 group, 但支持多个值, 要求都匹配
    groups: []
    # 地址限定
    cidr: 0.0.0.0/0
  #   ca_name: An issuing CA name
  #   ca_sha: An issuing CA shasum

  inbound:
    # 允许 ICMP - 能 Ping
    - port: any
      proto: icmp
      host: any

    # Allow tcp/443 from any host with BOTH laptop and home group
    - port: 443
      proto: tcp
      groups:
        - laptop
        - home
```
