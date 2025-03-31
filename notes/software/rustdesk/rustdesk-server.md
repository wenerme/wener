---
tags:
  - Server
---

# RustDesk Server

:::caution

- API Server 不在开源部分 - 因此不能登录
  - https://github.com/rustdesk/rustdesk-server/issues/73

:::

- [rustdesk/rustdesk-server](https://github.com/rustdesk/rustdesk-server)
  - AGPLv3, Rust
  - hbb ->
- https://rustdesk.com/docs/en/self-host/
  - TCP 21115-21117
  - UDP 21116
- RustDesk Server Pro
  - Auth、2FA、OIDC、WebConsole、LDAP
  - https://rustdesk.com/pricing.html

| port      | for                                                             |
| --------- | --------------------------------------------------------------- |
| 21114     | API Server - 未开源，可自行实现                                 |
| 21115     | RustDesk Server hbbs - NAT type test                            |
| 21116/UDP | RustDesk Server hbbs - ID registration and heartbeat service    |
| 21116/TCP | RustDesk Server hbbs - TCP hole punching and connection service |
| 21117     | RustDesk Server hbbr - Relay services                           |
| 21118     |
| 21119     | hbbr WebSocket                                                  |

```bash
# AlpineLinux
apk add -X https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/testing/ --no-cache rustdesk-server
KEY=$(uuidgen)
RELAY_SERVER=hbbs.example.com:21116
echo "command_args='-k $KEY -r $RELAY_SERVER'"  | sudo tee -a /etc/conf.d/hbbs
echo "command_args='-k $KEY'" | sudo tee -a /etc/conf.d/hbbr

# 会附带启动 hbbr
sudo service hbbs start

# Docker rustdesk/rustdesk-server:latest
docker image pull rustdesk/rustdesk-server
docker run --name hbbs -v ./data:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]>
docker run --name hbbr -v ./data:/root -td --net=host rustdesk/rustdesk-server hbbr
```

```yaml
version: '3'

services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: 'host'
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: 'host'
    restart: unless-stopped
```

| hbbs                           | default | for                            |
| ------------------------------ | ------- | ------------------------------ |
| -c, --config FILE              |
| -k, --key KEY                  |
| --mask MASK                    |         | CIDR mask                      |
| -p,--port NUMBER               | 21116   |
| -r, --relay-servers HOST       |         | `:`分割                        |
| -R, --rendezvous-servers HOSTS |         | `:`分割                        |
| -M, --rmem NUMBER              | 0       |
| -S, --serial NUMBER            | 0       | configure update serial number |
| -u, --software-url URL         |         | 下载地址                       |

| hbbr             | default | for |
| ---------------- | ------- | --- |
| -k, --key KEY    |
| -p,--port NUMBER | 21117   |

```bash
# rmem
# 52428800
sysctl net.core.rmem_max
```

- hbbs - RustDesk ID/Rendezvous server
- hbbr - RustDesk relay server
- rustdesk-utils - RustDesk CLI utilities
- windows 可以通过文件名进行配置
  - `rustdesk-host=MY.DOMAIN,key=MY-PUBLIC-KEY=.exe`
  - https://github.com/rustdesk/rustdesk/discussions/966

---

- /var/lib/rustdesk-server/
  - db_v2.sqlite3

```sql
CREATE TABLE peer (
                guid blob primary key not null,
                id varchar(100) not null,
                uuid blob not null,
                pk blob not null,
                created_at datetime not null default(current_timestamp),
                user blob,
                status tinyint,
                note varchar(300),
                info text not null
            ) without rowid;
CREATE UNIQUE INDEX index_peer_id on peer (id);
CREATE INDEX index_peer_user on peer (user);
CREATE INDEX index_peer_created_at on peer (created_at);
CREATE INDEX index_peer_status on peer (status);
```
