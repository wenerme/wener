---
title: unbound
---

# unbound

- [unbound](https://github.com/NLnetLabs/unbound)
  - BSD, C
  - recursive DNS resolver - 直接与 dns root server 通讯
  - BSD 系列 OS 的默认 DNS server
  - 跨平台 - BSD, macOS, Linux, Windows
- 参考
  - [unbound.conf.5](https://nlnetlabs.nl/documentation/unbound/unbound.conf/)
  - archlinux [Unbound](https://wiki.archlinux.org/index.php/Unbound)

```bash
# macOS - /usr/local/etc/unbound/unbound.conf
brew install unbound

# 简单配置
cat <<EOF > unbound.conf
server:
  username: $USER
  verbosity: 3
EOF

unbound-checkconf unbound.conf
unbound -d -c unbound.conf
```

## unbound.conf

```conf
server:

# 远程控制
remote-control:

stub-zone:

forward-zone:

auth-zone:

view:

#python-script: <python file>

dynlib:
  #dynlib-file: <dynlib file>

# Response Policy Zone Options
rpz:
```
