---
title: glider
---

# glider

- [nadoo/glider](https://github.com/nadoo/glider)
  - GPLv3, Go
  - 类似 gost，但支持更多协议
    - 只有 Listener 和 Forwarder
  - mix - http+socks5
  - http
  - socks5
  - ss
  - trojan
  - trojanc - cleartext
  - vless
  - vmess
  - Forward/TCP - ssr, ssh. socks4, socks4a
  - tcp, udp - tunnel
  - tls, kcp, unic, vsock, smux, ws, wss, PROXY Protocol, simple obfs
  - redir, redir6, TProxy
  - reject

```bash
brew install glider


```

```ini
verbose
listen=trojan://UUID@0.0.0.0:1234?cert=/etc/ssl/certs/host.crt&key=/etc/ssl/private/host.key
```

```bash
#!/sbin/openrc-run
supervisor=supervise-daemon

name="Glider"
description="A forward proxy with multiple protocolso."

command=/usr/local/bin/glider
command_args="-config /etc/glider/${RC_SVCNAME}.conf"

LOGFILE="${LOGFILE:-/var/log/${RC_SVCNAME}.log}"
output_log=${LOGFILE}
error_log=${LOGFILE}

depend() {
  use logger dns
  need net
}

checkconfig() {
  # warn this if not found
  if [ ! -f "/etc/glider/${RC_SVCNAME}.conf" ] ; then
    eerror "No config ${RC_SVCNAME}.conf"
    return 1
  fi
  return 0
}
```
