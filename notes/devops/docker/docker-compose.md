---
title: Docker compose
---

# Docker compose


:::caution

- docker-compose.yaml 设计用于 docker compose/swarm/stack
  - 在不同场景不同的配置会生效
  - deploy 不在 docker compose 生效

:::

- [compose-spec/compose-spec](https://github.com/compose-spec/compose-spec)
- docker compose 1.27.0+ -> Compose V2
- docker compose - 本地开发
  - 管理多个 docker run
  - 忽略 deploy
- docker stack deploy -> Docker Swarm
  - 先 `docker swarm init`
  - 忽略 build
  - 支持 deploy - 资源限制
- https://docs.docker.com/compose/compose-file/

```bash
# V1
docker-compose version
# V2
docker compose version

# disable v2
# docker-compose disable-v2
```

## docker-compose.yaml

- services, volumes,
- configs
  - 全局配置定义
- secrets
  - container_name - 定义容器名字，默认生成
  - configs
    - 挂载为一个文件
  - credential_spec - 定义拉的授权信息
    - config
    - registry - file://, registry://
  - depends_on - 控制启动顺序，控制是否重启
  - build
  - deploy
  - develop
- networks
- version - 现在一般不需要了
- https://github.com/compose-spec/compose-spec/blob/master/spec.md
  - {compose,docker-compose}.{yaml,yml}

```yaml
# COMPOSE_PROJECT_NAME
name:

services:
  web:
    attach: true # false 不收集日志
    build: . # 构建 context
    # 修改 CMD - 数组或字符串
    command: bundle exec thin -p 3000
    # 修改 ENTRYPOINT - 数组或字符串
    entrypoint: /code/entrypoint.sh
    # USER
    user:
    # namespace
    userns_mode: "host"
    # [HOST:]CONTAINER[/PROTOCOL]
    # HOST - [IP:](port | range)
    # CONTAINER - port | range
    # PROTOCOL - tcp|udp
    ports:
      - '5000:5000'
      - target: 80
        host_ip: 127.0.0.1
        published: 8000-9000
        protocol: tcp
        mode: host
    expose:
      - "3000"
      - "8000"
    # 数组或字符串
    env_file: .env
    environment:
      RACK_ENV: development
      SHOW: "true"
      USER_INPUT:
    environment:
      - COMPOSE_PROJECT_NAME # 定义了可直接访问
      - RACK_ENV=development
      - SHOW=true
      - USER_INPUT
    # 启动以来院系
    depends_on:
      - redis
    # 另外一种写法
    depends_on:
      redis:
        # service_healthy
        condition: service_started
    container_name: my_web
    credential_spec:
      # Windows  HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Virtualization\Containers\CredentialSpecs
      file: my-credential-spec.json
      registry: my-credential-spec
    # SERVICE:ALIAS
    links:
    # /etc/hosts
    # container -> alias
    external_links:
    - redis
    - database:mysql
    # /etc/hosts
    extra_hosts:
    - "somehost:162.242.195.82"
    - "otherhost:50.31.209.229"
    # ACL
    group_add:
      - mail
    # 健康检查 - 和 dockerfile 相同
    # https://docs.docker.com/engine/reference/builder/#healthcheck
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 1m30s
      timeout: 10s
      retries: 3
      start_period: 40s
    # always|never|missing|build
    pull_policy:
    # no|always|no-failure|unless-stopped
    restart:
    # fs 只读
    read_only:
    # 数组或字符串
    tmpfs:
    - /run
    - /tmp
    # 运行平台
    runtime: runc
    # 引用配置
    configs:
    - web_config
    - source: my_config # 引用
      target: /redis_config # 目标位置 - 默认 /<source>
      uid: "103"
      gid: "103"
      mode: 0440
    profiles:
    # 引用 secrets
    # /run/secrets/<secret_name>
    secrets:
    - server-certificate
    # VOLUME:CONTAINER_PATH:ACCESS_MODE
    volumes:
      - type: volume
        source: db-data
        target: /data
        volume:
          nocopy: true
      - type: bind
        source: /var/run/postgres/postgres.sock
        target: /var/run/postgres/postgres.sock
    volumes_from:
    working_dir:
  redis:
    image: 'redis:alpine'
    domainname:
    hostname:
    labels:
    stdin_open:
    tty:
    ulimits:
      nproc: 65535
      nofile:
        soft: 20000
        hard: 40000
    stop_grace_period: 10s
    stop_signal: SIGTERM
    storage_opt:
      size: '1G'
    # tinit
    init: false
    # shareable
    # service:{name}
    ipc:
    isolation:
    # 日志配置
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://192.168.0.42:123"
    # host|none|service:[service name]
    network_mode:
    # 数组或对象
    networks:
      some-network:
        ipv4_address:
        ipv6_address:
        aliases:
          - alias1
      app_net:
        link_local_ips:
          - 57.123.22.11
        priority: 100
        mac_address:
    dns:
    - 8.8.8.8
    - 9.9.9.9
    # /etc/resolv.conf
    dns_opt:
    - use-vc
    - no-tld-query
    dns_search:
    - dc1.example.com
    - dc2.example.com
    # 能力权限
    cap_add:
      - ALL
    cap_drop:
      - NET_ADMIN
      - SYS_ADMIN
    # 数组或对象
    sysctls:
      net.core.somaxconn: 1024
      net.ipv4.tcp_syncookies: 0
    privileged:
    security_opt:
    - label:user:USER
    # CPU 限制
    cpu_count:
    cpu_percent:
    cpu_shares:
    cpu_period:
    cpu_quota:
    cpu_rt_runtime:
    cpu_rt_period:
    cpuset:
    # 内存限制
    mem_swappiness:
    memswap_limit:
    oom_kill_disable:
    oom_score_adj:
    # /dev/shm
    shm_size:
    #
    pid:
    # os[/arch[/variant]]
    platform:
    # cgourp
    cgourp:
    cgroup_parent:
    # https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v1/devices.html
    device_cgroup_rules:
      - 'c 1:3 mr'
      - 'a 7:* rmw'
    # HOST_PATH:CONTAINER_PATH[:CGROUP_PERMISSIONS]
    devices:
      - "/dev/ttyUSB0:/dev/ttyUSB0"
      - "/dev/sda:/dev/xvda:rwm"
    # Block device 配置
    blkio_config:
      weight: 300
      weight_device:
        - path: /dev/sda
          weight: 400
      device_read_bps:
        - path: /dev/sdb
          rate: '12mb'
      device_read_iops:
        - path: /dev/sdb
          rate: 120
      device_write_bps:
        - path: /dev/sdb
          rate: '1024k'
      device_write_iops:
        - path: /dev/sdb
          rate: 30
configs:
  web_config:
    file: ./default.nginx
  redis_config:
    external: true
networks:
  front-tier:
    ipam:
      driver: default
      config:
        - subnet: "172.16.238.0/24"
        - subnet: "2001:3984:3989::/64"
  app_net:
    driver: bridge
volumes:
  db-data:
```

```yaml
web:
  extends:
    # compose.yaml
    file: common.yml
    # base service
    service: webapp
```

