---
tags:
  - Protocol
---

# mieru

- https://github.com/enfein/mieru

```bash
make client-mac-arm64
make client-linux-amd64

make server-linux-amd64

MITA_CONFIG_JSON_FILE=server.conf.json mita run

mita status

MIERU_CONFIG_JSON_FILE=client.conf.json mieru run
```

```json title="server.conf.json"
{
  "portBindings": [
    {
      "portRange": "2100-2200",
      "protocol": "TCP"
    }
  ],
  "users": [
    {
      "name": "user",
      "password": "password"
    }
  ],
  "loggingLevel": "INFO",
  "mtu": 1400
}
```

```json title="client.conf.json"
{
  "profiles": [
    {
      "profileName": "default",
      "user": {
        "name": "user",
        "password": "password"
      },
      "servers": [
        {
          "ipAddress": "127.0.0.1",
          "portBindings": [
            {
              "portRange": "2100-2200",
              "protocol": "TCP"
            }
          ]
        }
      ],
      "mtu": 1400,
      "multiplexing": {
        "level": "MULTIPLEXING_HIGH"
      }
    }
  ],
  "activeProfile": "default",
  "rpcPort": 8964,
  "socks5Port": 1080,
  "loggingLevel": "INFO"
}
```

## 配置

```jsonc title="server.conf.json"
{
  // 端口绑定配置
  "portBindings": [
    {
      "portRange": "2100-2200", // 连续端口范围
      "protocol": "TCP", // TCP 或 UDP
    },
    {
      "port": 25000, // 单个端口
      "protocol": "UDP",
    },
  ],
  // 用户列表
  "users": [
    {
      "name": "username", // 用户名
      "password": "password", // 密码
      "allowPrivateIP": false, // 允许访问内网 IP (192.168.x.x 等)
      "allowLoopbackIP": false, // 允许访问本机 (127.0.0.1)
      "quotas": [
        // 流量限制 (可选)
        {
          "days": 30, // 周期天数
          "megabytes": 10240, // 流量限制 MB
        },
      ],
    },
  ],
  "loggingLevel": "INFO", // 日志级别: INFO, DEBUG
  "mtu": 1400, // UDP 传输载荷大小 (1280-1400)
  // 出站代理配置 (可选)
  "egress": {
    "proxies": [
      {
        "name": "upstream",
        "protocol": "SOCKS5_PROXY_PROTOCOL",
        "host": "127.0.0.1",
        "port": 4000,
      },
    ],
    "rules": [
      {
        "domainNames": ["example.com"],
        "action": "PROXY", // DIRECT, PROXY, REJECT
        "proxyNames": ["upstream"],
      },
      {
        "ipRanges": ["*"],
        "action": "DIRECT",
      },
    ],
  },
  // DNS 策略 (可选, 双栈网络)
  "dns": {
    "dualStack": "USE_FIRST_IP", // PREFER_IPv4, PREFER_IPv6, ONLY_IPv4, ONLY_IPv6
  },
}
```

```jsonc title="client.conf.json"
{
  // 配置档案列表
  "profiles": [
    {
      "profileName": "default", // 档案名称
      "user": {
        "name": "username", // 用户名 (与服务端一致)
        "password": "password", // 密码 (与服务端一致)
      },
      "servers": [
        {
          "ipAddress": "1.2.3.4", // 服务器 IP (支持 IPv6)
          "domainName": "", // 服务器域名 (可选)
          "portBindings": [
            {
              "portRange": "2100-2200", // 与服务端一致
              "protocol": "TCP",
            },
          ],
        },
      ],
      "mtu": 1400, // 与服务端一致
      "multiplexing": {
        // 多路复用级别
        // MULTIPLEXING_OFF: 关闭, 每个请求新建连接
        // MULTIPLEXING_LOW: 低 (默认)
        // MULTIPLEXING_MIDDLE: 中等
        // MULTIPLEXING_HIGH: 高, 尽量复用连接
        "level": "MULTIPLEXING_HIGH",
      },
      // 握手模式
      // HANDSHAKE_STANDARD: 标准握手 (默认)
      // HANDSHAKE_NO_WAIT: 0-RTT 握手, 更快但安全性略低
      "handshakeMode": "HANDSHAKE_STANDARD",
    },
  ],
  "activeProfile": "default", // 当前使用的档案
  "rpcPort": 8964, // RPC 端口 (内部通信)
  "socks5Port": 1080, // SOCKS5 代理端口
  "socks5ListenLAN": false, // 允许局域网访问 SOCKS5
  "httpProxyPort": 8080, // HTTP/HTTPS 代理端口 (可选)
  "httpProxyListenLAN": false, // 允许局域网访问 HTTP 代理
  "loggingLevel": "INFO", // 日志级别: INFO, DEBUG
  // SOCKS5 认证 (可选, 与 HTTP 代理互斥)
  "socks5Authentication": [
    {
      "user": "localuser",
      "password": "localpass",
    },
  ],
}
```
