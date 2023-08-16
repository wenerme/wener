---
title: Keepalived
---

# Keepalived

- [acassen/keepalived](https://github.com/acassen/keepalived) 是什么？
  - 虚拟路由 - 主要用于实现 VIP
  - 不是反向代理
  - 4 层负载均衡 - 不感知 7 层协议
    - 不支持任何 HTTP 协议层面功能
  - 非常块
- [VRPP](https://datatracker.ietf.org/wg/vrrp/documents/) Virtual Router Redundancy Protocol
- [BFD](https://datatracker.ietf.org/wg/bfd/documents/) Bidirectional Forwarding Detection

```
global_defs {
  notification_email {
  }
  router_id LVS_DEVEL
  vrrp_skip_check_adv_addr
  vrrp_garp_interval 0
  vrrp_gna_interval 0
}

vrrp_script chk_haproxy {
  script "killall -0 haproxy"
  interval 2
  weight 2
}

vrrp_instance haproxy-vip {
  state BACKUP
  priority 100
  interface eth0                       # Network card
  virtual_router_id 60
  advert_int 1
  authentication {
    auth_type PASS
    auth_pass 1111
  }
  unicast_src_ip 172.16.0.2      # The IP address of this machine
  unicast_peer {
    172.16.0.3                         # The IP address of peer machines
  }

  virtual_ipaddress {
    172.16.0.10/24                  # The VIP address
  }

  track_script {
    chk_haproxy
  }
}
```

```bash
# 开启后 HAProxy 等服务可以绑定不存在的 IP，非常适用于 VIP 场景
sysctl -w net.ipv4.ip_nonlocal_bind=1
```

- https://github.com/haproxytech/vmware-haproxy/blob/main/docs/virtual-ip-config.md
