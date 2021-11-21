---
title: cloudflared
---

# cloudflared

- 默认配置 `~/.cloudflared/config.yml`

```bash
# macOS 安装
brew install cloudflare/cloudflare/cloudflared
# Docker 运行
docker run -v ~/.cloudflared:/etc/cloudflared \
  --name cfd cloudflare/cloudflared:2021.4.0 \
  tunnel --no-autoupdate --hostname demo.wener.me --url http://localhost:8080
# Linux 安装
curl -Lo cloudflared https://github.com/cloudflare/cloudflared/releases/download/2021.4.0/cloudflared-linux-amd64
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# 升级版本
cloudflared update

# 手动更新
curl -Lo `which cloudflared` https://github.com/cloudflare/cloudflared/releases/download/2021.11.0/cloudflared-linux-amd64
```

## tunnel

```bash
# 登陆后生成证书 ~/.cloudflared/cert.pem
cloudflared tunnel login

# 创建后生成配置 ~/.cloudflared/UUID.json
cloudflared tunnel create dev
cloudflared tunnel list

# cloudflared tunnel delete dev

TUNNEL_ID=6ff42ae2-765d-4adf-8112-31c55c1551ef
cat <<YAML > ~/.cloudflared/config.yml
tunnel: dev
credentials-file: $HOME/.cloudflared/$TUNNEL_ID.json

ingress:
  - hostname: demo.wener.me
    service: http://localhost:3000
  - service: http_status:404
YAML
# 校验路由规则
cloudflared tunnel ingress validate
# 测试路由
cloudflared tunnel ingress rule https://demo.wener.me
# 启动
cloudflared tunnel run dev

# 访问服务需要
# CNAME demo.wener.me 到 ${TUNNEL_ID}.cfargotunnel.com
cloudflared tunnel route dns dev demo.wener.me
# 至此可以通过通道访问服务
curl -L demo.wener.me
```

## 远程启动 tunner

```bash
cloudflared tunnel list
# 只需要 tunnel json
TUNNEL_ID=6ff42ae2-765d-4adf-8112-31c55c1551ef
# rsync 方便创建目录
rsync --no-owner ~/.cloudflared/$TUNNEL_ID.json admin@192.168.1.1:~/.cloudflared/
rsync --no-owner ~/.cloudflared/config.yml admin@192.168.1.1:~/.cloudflared/
```

## config.yaml

```yaml
# 可是名字或者 ID
# cloudflared tunnel run NAME-OR-ID
tunnel: dev
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
ingress:
  - service: hello_world
```

### ingress

```yaml
# 路由规则
ingress:
  # 域名路由
  - hostname: example.com
    service: https://localhost:8000
  # 域名+路径规则
  - hostname: '*.example.com'
    path: /.well-known/acme-challenge/
    service: https://localhost:8000
  - hostname: static.example.com
    path: /*.(jpg|png|css|js)
    service: https://localhost:8001
  # 泛域名
  - hostname: '*.example.com'
    service: https://localhost:8002
  # 匹配所有 - 必须包含一个捕获所有的规则
  # 未匹配的请求这个服务
  - service: https://localhost:8003
  # 未匹配的返回 404
  - service: http_status:404
```

**service 规则**

- https://localhost:8000
- ssh://localhost:2222
  - TCP, RDP, SSH, SMB, kubectl
- bastion
  - TCP, RDP, SSH, SMB, kubectl
  - cloudflared 作为跳板机
- hello_world
  - 测试服务
- tcp://localhost:8000
- unix:/home/production/echo.sock
- http_status:404
  - 返回状态码
