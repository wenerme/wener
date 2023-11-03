---
title: tuic
---

# TUIC

- [EAimTY/tuic](https://github.com/EAimTY/tuic)
  - GPLv3, Rust
  - Delicately-TUICed 0-RTT proxy protocol

```bash
curl -o tuic-server -L https://github.com/EAimTY/tuic/releases/download/tuic-server-1.0.0/tuic-server-1.0.0-x86_64-unknown-linux-musl
chmod +x tuic-server
tuic-server -c tuic.json

apk add libcap-utils
sudo setcap cap_net_bind_service=+ep tuic-server
```

```json
{
    "server": "[::]:8443",
    "users": {
        "00000000-0000-0000-0000-000000000000": "PASSWORD_0"
    },
    "certificate": "tls.crt",
    "private_key": "tls.key",
    "congestion_control": "bbr",
    "alpn": ["h3", "spdy/3.1"],
    "udp_relay_ipv6": true,
    "zero_rtt_handshake": false,
    "dual_stack": true,
    "auth_timeout": "3s",
    "task_negotiation_timeout": "3s",
    "max_idle_time": "10s",
    "max_external_packet_size": 1500,
    "send_window": 16777216,
    "receive_window": 8388608,
    "gc_interval": "3s",
    "gc_lifetime": "15s",
    "log_level": "info"
}
```

# FAQ

## unauthenticated authenticate timeout

- https://github.com/EAimTY/tuic/issues/186
