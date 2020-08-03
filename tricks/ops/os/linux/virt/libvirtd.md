---
id: libvirtd
title: Libvirt Daemon
---

# Libvirt Daemon

## Tips
* /var/run/libvirt/libvirt-sock
* 默认 tcp 端口 16509
* [Simple vsock setup for QEMU](https://gist.github.com/mcastelino/9a57d00ccf245b98de2129f0efe39857)
* `qemu:///session`
  * 避免使用，尽量使用 system

```bash
virsh -c unix:///var/run/libvirt/libvirt-sock list

# macOS
# ==========
brew install libvirt

# 调整配置，允许用户直接操作
# unix_sock_group = "staff"
# unix_sock_rw_perms = "0770"
nano /usr/local/etc/libvirt/libvirtd.conf

# 启动服务端
sudo libvirtd -v
# 或者使用 brew 进行服务管理
brew services start libvirt

# 客户端连接
virsh -c qemu:///system list
```

## libvirt.conf
* 客户端配置

```ini
# 链接别名
#uri_aliases = [
#  "hail=qemu+ssh://root@hail.cloud.example.com/system",
#  "sleet=qemu+ssh://root@sleet.cloud.example.com/system",
#]

# 默认链接
#uri_default = "qemu:///system"
```

## libvirtd.conf
* https://libvirt.org/format.html

```ini
# Libvirtd Daemon 网络连通性控制
# ====================
# TLS 监听 - 必须要指定 --listen
#listen_tls = 0

# TCP 监听 - 未加密，需要 --listen
# 默认需要 SASL 认证 - DIGEST_MD5、GSSAPI
#listen_tcp = 1

# TLS 端口或服务名
#tls_port = "16514"
# TCP 端口或服务名
#tcp_port = "16509"

# 监听地址 - 默认监听所有
#listen_addr = "192.168.0.1"

# mDNS 广播 libvirt 服务 - 配合 Host 上的 Avahi daemon
#mdns_adv = 1

# mDNS 服务名字 - 默认 "Virtualization Host ${HOSTNAME}"
#mdns_name = "Virtualization Host Joe Demo"

# Libvirtd Daemon UNIX Socket 访问控制
# ====================
# 分组权限 - 默认只允许 root
# unix_sock_group = "libvirt"

# 只读 socket 权限 - 默认 0777
# 如果设置了分组权限，也可以考虑设置只读权限
#unix_sock_ro_perms = "0777"

# 读写 socket 权限 - 默认只有 root
# 如果设置了分组权限，建议设置为 0700
# 如果没有使用 PolicyKit 则可以考虑放松权限
# unix_sock_rw_perms = "0770"

# 管理 socket 权限 - 默认允许 owner
#unix_sock_admin_perms = "0700"

# socket 路径 - linux 一般默认为 /run/libvirt
#unix_sock_dir = "/usr/local/var/run/libvirt"


# 认证
# =====================
# none - 不做认证检查，能连接就能访问 - 适用于 unix scoket 场景
# sasl - TCP GSSAPI & DIGEST-MD5 schema 为 /usr/local/etc/sasl2/libvirt.conf - 非 TCP 任何 schema 都可以
# polkit - UNIX sockets 时

# 只读 unix sockets 认证
#auth_unix_ro = "none"

# 读写 unix sockets 认证
#auth_unix_rw = "none"

# tcp 认证方式 - 默认 sasl
#auth_tcp = "sasl"

# tls 认证方式 - 因为 tls 通过加密证书已经认证了，所以可以关闭，也可以使用 sasl。
#auth_tls = "none"

# API 访问控制 schema - 默认启用了 'nop'
#access_drivers = [ "polkit" ]

# TLS x509 证书配置
# =====================
# 默认位置
#   /usr/local/etc/pki/CA/cacert.pem                 - The CA master certificate
#   /usr/local/etc/pki/libvirt/servercert.pem        - The server certificate signed with the cacert.pem
#   /usr/local/etc/pki/libvirt/private/serverkey.pem - The server private key
#
# It is possible to override the default locations by altering the 'key_file',
# 'cert_file', and 'ca_file' values and uncommenting them below.
#
# NB, overriding the default of one location requires uncommenting and
# possibly additionally overriding the other settings.
#

#key_file = "/usr/local/etc/pki/libvirt/private/serverkey.pem"
#cert_file = "/usr/local/etc/pki/libvirt/servercert.pem"
#ca_file = "/usr/local/etc/pki/CA/cacert.pem"
#crl_file = "/usr/local/etc/pki/CA/crl.pem"

# 鉴权控制
# =====================
# Flag to disable verification of our own server certificates
#
# When libvirtd starts it performs some sanity checks against
# its own certificates.
#
# Default is to always run sanity checks. Uncommenting this
# will disable sanity checks which is not a good idea
#tls_no_sanity_certificate = 1

# Flag to disable verification of client certificates
#
# Client certificate verification is the primary authentication mechanism.
# Any client which does not present a certificate signed by the CA
# will be rejected.
#
# Default is to always verify. Uncommenting this will disable
# verification - make sure an IP whitelist is set
#tls_no_verify_certificate = 1


# A whitelist of allowed x509 Distinguished Names
# This list may contain wildcards such as
#
#    "C=GB,ST=London,L=London,O=Red Hat,CN=*"
#
# See the POSIX fnmatch function for the format of the wildcards.
#
# NB If this is an empty list, no client can connect, so comment out
# entirely rather than using empty list to disable these checks
#
# By default, no DN's are checked
#tls_allowed_dn_list = ["DN1", "DN2"]


# A whitelist of allowed SASL usernames. The format for username
# depends on the SASL authentication mechanism. Kerberos usernames
# look like username@REALM
#
# This list may contain wildcards such as
#
#    "*@EXAMPLE.COM"
#
# See the POSIX fnmatch function for the format of the wildcards.
#
# NB If this is an empty list, no client can connect, so comment out
# entirely rather than using empty list to disable these checks
#
# By default, no Username's are checked
#sasl_allowed_username_list = ["joe@EXAMPLE.COM", "fred@EXAMPLE.COM" ]


# Override the compile time default TLS priority string. The
# default is usually "NORMAL" unless overridden at build time.
# Only set this is it is desired for libvirt to deviate from
# the global default settings.
#
#tls_priority="NORMAL"


# 进程控制
# =====================
# 客户端连接数
#max_clients = 5000

# 最大等待的客户端数
#max_queued_clients = 1000

# 最大匿名客户端数 - 设置为 0 可禁用
#max_anonymous_clients = 20

# 进程数 - 一般将最大值设置为最大允许的客户端数
#min_workers = 5
#max_workers = 20

# 优先 worker 数 - 例如 domainDestroy 会优先
#prio_workers = 5

# 单个客户端并行请求数
#max_client_requests = 5

# 管理接口进程控制
#admin_min_workers = 1
#admin_max_workers = 5
#admin_max_clients = 5
#admin_max_queued_clients = 5
#admin_max_client_requests = 5

# 日志控制
# =====================
# 级别: 4 errors, 3 warnings, 2 information, 1 debug
# journald 只允许 3、4
# 不建议设置为 1
#log_level = 3

# 日志过滤，调整匹配的日志级别:
#    level:match
#    level:+match
# 分类例如 "remote", "qemu", "util.json"， 使用 glob 匹配， 有 + 会输出堆栈
# 空格分割设置多个规则，但匹配第一个
#
# 例如 debug qemu 和 hypervisor 驱动场景
#log_filters="1:qemu 1:libvirt 4:object 4:json 4:event 1:util"

# 日志输出:
#    level:stderr
#    level:syslog:name - name 作为 ident
#    level:file:file_path
#    level:journald
# 空格分割设置多个
#log_outputs="3:syslog:libvirtd"

# 审计
# =====================
# audit 子系统
#   audit_level == 0  -> 禁用
#   audit_level == 1  -> 启用,宿主机(默认)
#   audit_level == 2  -> 启用, and exit if disabled on host
#
#audit_level = 2
#
# 设置为 1 则也可以输出到日志 - 默认 0
#audit_logging = 1

# 主机 ID
# =====================
# 默认使用 host_uuid_source.
#
# - 'smbios': 'dmidecode -s system-uuid'
# - 'machine-id': /usr/local/etc/machine-id
#
# 如果 dmidecode 没有获取到则会生成临时的

# 直接设置
#host_uuid = "00000000-0000-0000-0000-000000000000"
#host_uuid_source = "smbios"

# Keepalive 协议
# =====================
# 检测中断的或已断开的客户端
#
# 发送 keepalive 消息间隔 - 设置为 -1 则不发送
#keepalive_interval = 5
# 最大失败数量 - 最长检测时间为 keepalive_interval * (keepalive_count + 1)
# 设置为 0 则达到间隔后直接断开
#keepalive_count = 5

# 不再使用
#keepalive_required = 1
#admin_keepalive_required = 1

# 管理接口
#admin_keepalive_interval = 5
#admin_keepalive_count = 5

# Open vSwitch:
# =====================
# ovs 交互超时时间 - ovs-vsctl
#ovs_timeout = 5
```
