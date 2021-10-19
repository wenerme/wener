---
title: Apache Guacamole
---

# Apache Guacamole

**是什么?**

- 无客户端的远程桌面网关
- 支持 VNC, RDP, SSH, telnet, Kubernetes
  - Kubernetes - 容器控制台
- 支持 mysql, postgresql, ldap, 2factor, totp, http header, cas, oidc, saml, ad-hoc 认证
- 支持录制

## 组件

- guacd
  - 端口 4822
- quickconnect
  - `ssh://linux1.example.com/`
  - `vnc://linux1.example.com:5900/`
  - `rdp://localuser@windows1.example.com/?security=rdp&ignore-cert=true&disable-audio=true&enable-drive=true&drive-path=/mnt/usb`

## 配置

- [Configuring Guacamole](https://guacamole.apache.org/doc/gug/configuring-guacamole.html)

### 认证

- postgresql
  - POSTGRES_HOSTNAME
  - POSTGRES_PORT
  - POSTGRES_DATABASE
  - POSTGRES_USER
  - POSTGRES_PASSWORD
- ldap
  - LDAP_HOSTNAME
  - LDAP_PORT
  - LDAP_ENCRYPTION_METHOD
  - LDAP_USER_BASE_DN
- header
  - HEADER_ENABLED
  - HTTP_AUTH_HEADER=REMOTE_USER
- oidc
  - openid-authorization-endpoint
    - https://identity-provider/.well-known/openid-configuration
  - openid-jwks-endpoint
  - openid-issuer
  - openid-client-id
  - openid-redirect-uri

## Docker

- guacamole/guacd
  - Daemon
  - 支持 VNC, RDP, SSH, telnet, Kubernetes
- guacamole/guacamole
  - Web
  - http://HOSTNAME:8080/guacamole/

```bash
docker run --rm -it -e GUACD_LOG_LEVEL=debug -p 4822:4822 --name guacd guacamole/guacd

docker run --rm guacamole/guacamole /opt/guacamole/bin/initdb.sh --postgres > initdb.sql

# GUACD_HOSTNAME=172.17.42.1
# GUACD_PORT=4822
docker run --rm -it \
  --link guacd:guacd \
  -p 8080:8080 \
  --name guacamole guacamole/guacamole
```
