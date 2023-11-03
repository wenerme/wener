---
title: V2Ray
---

# V2Ray/V2Fly

- [v2fly/v2ray-core](https://github.com/v2fly/v2ray-core)
  - MIT, Golang
- ~~[v2ray/v2ray-core](https://github.com/v2ray/v2ray-core)~~
  - MIT, Golang
- [v2rayA/v2rayA](https://github.com/v2rayA/v2rayA)
  - web GUI
- [XTLS/Xray-core](https://github.com/XTLS/Xray-core)
  - MPLv2, Go
  -  VLESS, XTLS, REALITY, XUDP, PLUX
- 参考
  - https://www.v2ray.com/

```bash
brew install v2ray

curl -LO https://github.com/v2fly/v2ray-core/releases/download/v5.10.1/v2ray-linux-64.zip
unzip v2ray-linux-64.zip

# https://github.com/v2fly/docker
# https://hub.docker.com/r/v2fly/v2fly-core
docker run --rm -it v2fly/v2fly-core

UUID=$(uuidgen)
cat << JSON > svr.json
{
  "inbounds": [
    {
      "port": 10086,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "${UUID}"
          }
        ]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom"
    }
  ]
}
JSON

cat << JSON > cli.json
{
  "inbounds": [
    {
      "port": 1080,
      "listen": "127.0.0.1",
      "protocol": "socks",
      "settings": {
        "udp": true
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "127.0.0.1",
            "port": 10086,
            "users": [
              {
                "id": "${UUID}"
              }
            ]
          }
        ]
      }
    },
    {
      "protocol": "freedom",
      "tag": "direct"
    }
  ],
  "routing": {
    "domainStrategy": "IPOnDemand",
    "rules": [
      {
        "type": "field",
        "ip": ["geoip:private"],
        "outboundTag": "direct"
      }
    ]
  }
}
JSON

v2ray run -c svr.json                          # 服务端
v2ray run -c cli.json                          # 客户端
curl -x socks5h://127.0.0.1:1080 icanhazip.com # 测试
```

- /etc/v2ray/config.json 配置文件
- /usr/bin/v2ray V2Ray 主程序
- /usr/bin/v2ctl V2Ray 辅助工具
- /usr/local/share/v2ray/geoip.dat IP 数据文件
- /usr/local/share/v2ray/geosite.dat 域名数据文件

```json
{
  "log": {},
  "dns": {},
  "router": {},
  "inbounds": [],
  "outbounds": [],
  "services": {}
}
```

- 代理协议
  - socks - SOCKS5
  - vmess
    - 要求时间误差 < 90s
    - uuid 认证
  - vlite
    - 只支持 UDP
    - 针对 P2P 优化
  - shadowsocks
  - http
  - trojan
  - ~~vless~~
    - 用 trojan
  - dokodemo
  - blackhole
    - block 效果
  - dns
    - 只处理 DNS
  - loopback
    - 重新路由出站
- 传输协议
  - tcp
  - ws
  - kcp - mKCP
    - UDP 模拟 TCP
    - 牺牲带宽来降低延迟
  - grpc
  - quic
