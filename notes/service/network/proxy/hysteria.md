---
title: hysteria
---

# hysteria

- [apernet/hysteria](https://github.com/apernet/hysteria)
- Protocol
  - QUIC
  - https://v2.hysteria.network/docs/developers/Protocol/
- Server - Client -> SOCKS5, HTTP

:::tip

- 使用 ACME - 需要 tls、acme 配置

:::

```bash
docker run --rm -it \
  -v $PWD/hysteria.yaml:/etc/hysteria.yaml \
  -p 8080:8080 \
  --name hysteria tobyxdd/hysteria \
  server -c /etc/hysteria.yaml

curl -LO https://github.com/apernet/hysteria/releases/download/app%2Fv2.1.1/hysteria-linux-amd64
chmod +x hysteria-linux-amd64
./hysteria-linux-amd64 --help
PASSWORD=$(openssl rand -base64 12 | tr -- '-_' '+/' | tee /dev/tty)

openssl genrsa -out ca.key 2048
openssl req -new -x509 -days 3650 -key ca.key -subj "/O=Example, Inc./CN=Example Root CA" -out ca.crt
# CN 可以为 IP 地址
openssl req -newkey rsa:2048 -nodes -keyout tls.key -subj "/O=Server A, Inc./CN=example.com" -out server.csr
# -extfile <(printf "subjectAltName=IP:${ipaddress}")
openssl x509 -extfile <(printf "subjectAltName=IP:`curl 4.icanhazip.com -sf`") -req -days 3650 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out tls.crt

cat <<YAML > hysteria.yaml
listen: :8443

tls:
  cert: tls.crt
  key: tls.key

auth:
  type: password
  password: $PASSWORD
YAML

./hysteria-linux-amd64 server -c hysteria.yaml

# 如果直接监听 443
sudo setcap cap_net_bind_service=+ep ./hysteria-linux-amd64

# Client
# ==========
brew install hysteria

cat <<YAML > hysteria.client.yaml
server: 127.0.0.1:8443
alpn: h3
auth_str: ${PASSWORD}
socks5:
  listen: 127.0.0.1:1080
http:
  listen: 127.0.0.1:8080
ca: ca.crt
YAML

```

## config


- https://v2.hysteria.network/zh/docs/advanced/Full-Server-Config/
