---
title: gost
---

# gost


- [go-gost/gost](https://github.com/go-gost/gost)
  - MIT, Go
  - v3 还没正式发布
  - GO Simple Tunnel
  - https://gost.run/
- [ginuerzh/gost](https://github.com/ginuerzh/gost)
  - MIT, Go
  - https://v2.gost.run/


```bash
# macOS
curl -LO https://github.com/go-gost/gost/releases/download/v3.0.0-rc8/gost_3.0.0-rc8_darwin_amd64.tar.gz
tar zxvf gost*.tar.gz

# Linux
curl -LO https://github.com/go-gost/gost/releases/download/v3.0.0-rc8/gost_3.0.0-rc8_linux_amd64.tar.gz
tar zxvf gost*.tar.gz

# v3
# -L 监听
# -F 转发，支持配置多个，作为转发链
gost -L http://:8080 -L socks5://:1080  -F http://192.168.1.1:8080

gost -L sni://:80 -L sni://:443 -F socks5://192.168.1.1:1080
```

- 配置 - gost.yml, gost.json
  - /etc/gost
  - $HOME/.gost
- `-L tcp://:8080/192.168.1.1:80`
  - 端口映射
- rudp -> remote udp - 远程映射到本地
