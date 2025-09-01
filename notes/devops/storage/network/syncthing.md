---
title: Syncthing
---

# Syncthing

- [syncthing/syncthing](https://github.com/syncthing/syncthing)
  - MLP-2.0, Go
  - Continuous File Synchronization
- 参考
  - https://docs.syncthing.net/users/syncthing.html
  - [MobiusSync/syncthing](https://github.com/MobiusSync/syncthing)
    - iOS
    - free 20MB - 意义不大
    - https://apps.apple.com/us/app/m%C3%B6bius-sync/id1539203216
    - https://www.mobiussync.com/faq/
- Ports
  - 8384: Web UI
  - 22000: TCP file transfers
  - 22000: QUIC file transfers
  - 21027: Receive local discovery broadcasts

```bash
brew install syncthing # macOS brew

ST_HOME=$PWD/syncthing
syncthing -generate=$ST_HOME
syncthing -home=$ST_HOME -paths
syncthing -home=$ST_HOME -logfile=$ST_HOME/syncthing.log

# 可以考虑 --network=host
# http://localhost:8384/
docker run --rm -it \
  -p 8384:8384 \
  -p 22000:22000/tcp \
  -p 22000:22000/udp \
  -p 21027:21027/udp \
  -v $PWD/syncthing:/var/syncthing \
  --hostname=my-syncthing \
  --name syncthing syncthing/syncthing:latest
```

```yaml title="docker-compose.yml"
---
version: '3'
services:
  syncthing:
    image: syncthing/syncthing
    container_name: syncthing
    hostname: my-syncthing
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - ./syncthing:/var/syncthing
    network_mode: host
    restart: unless-stopped
    healthcheck:
      test: curl -fkLsS -m 2 127.0.0.1:8384/rest/noauth/health | grep -o --color=never OK || exit 1
      interval: 1m
      timeout: 10s
      retries: 3
```

## 配置 {#configuration}

- 位置
  - $XDG_STATE_HOME/syncthing
  - $HOME/.local/state/syncthing
  - $HOME/Library/Application Support/Syncthing
  - %LOCALAPPDATA%\Syncthing
- 配置文件
  - config.xml
  - cert.pem, key.pem
  - https-cert.pem, https-key.pem
  - `index-*`
  - syncthing.log
  - `audit-*.log`
  - `panic-*.log`

```xml
<configuration version="37">
  <folder></folder>
  <device></device>
  <gui></gui>
  <ldap></ldap>
  <options></options>
  <remoteIgnoredDevice></remoteIgnoredDevice>
  <defaults></defaults>
</configuration>
```
