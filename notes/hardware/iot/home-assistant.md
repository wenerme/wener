---
title: Home Assistant
---

# Home Assistant

- [home-assistant/core](https://github.com/home-assistant/core)
  - Python3 + SQLite3
  - [架构](https://developers.home-assistant.io/docs/architecture_index/)
  - [Demo](https://demo.home-assistant.io/)
- [安装](https://www.home-assistant.io/docs/installation/)
- 端口
  - http 8123
  - HomeKit 桥接 51828

```bash
# try
docker run --rm -it \
  -e TZ=Asia/Shanghai \
  --net=host \
  --name="homeassistant" homeassistant/home-assistant:stable

# run
docker run -d --restart always \
  -e TZ=Asia/Shanghai \
  -p 8123:8123 \
  -v /data/home-assistant/config:/config \
  --name="homeassistant" homeassistant/home-assistant:stable
```

## 配置

- https://www.home-assistant.io/docs/configuration/
- /config - docker/Home Assistant
- ~/.homeassistant - 直接安装时的目录 - macOS/Linux

```yaml
homeassistant:
  name: Home
  # 位置
  latitude: 32.87336
  longitude: 117.22743
  elevation: 430
  # 单位
  unit_system: metric
  temperature_unit: C
  time_zone: Asia/Shanghai
  external_url: 'https://www.example.com'
  internal_url: 'http://homeassistant.local:8123'
  allowlist_external_dirs:
    - /usr/var/dumping-ground
    - /tmp
  allowlist_external_urls:
    - 'http://images.com/image1.png'
  media_dirs:
    media: /media
    recordings: /mnt/recordings

  auth_providers:
    - type: homeassistant
    - type: legacy_api_password
      api_password: !secret http_password
    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - fd00::/8

    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - 192.168.10.0/24
        - fd00::/8
      trusted_users:
        192.168.0.1: user1_id
        192.168.0.0/24:
          - user1_id
          - user2_id
        'fd00::/8':
          - user1_id
          - group: system-users

    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - 127.0.0.1
        - ::1
      allow_bypass_login: true

    - type: command_line
      command: /absolute/path/to/command
      # Optionally, define a list of arguments to pass to the command.
      #args: ["--first", "--second"]
      # Uncomment to enable parsing of meta variables (see below).
      #meta: true
```

# FAQ

## Home Assistant vs. Home Assistant Core

- Core
  - Python 应用
  - 独立安装
- Home Assistant
  - Core + 工具
  - 一般通过系统镜像安装
  - 支持扩展
  - [安装](https://www.home-assistant.io/hassio/installation/)
- [Home Assistant vs. Home Assistant Core](https://www.home-assistant.io/faq/ha-vs-hassio/)
