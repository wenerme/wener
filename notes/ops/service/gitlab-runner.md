---
title: Gitlab Runner
---

# Gitlab Runner
* 是什么？
  * Gitlab 运行 CI/CD 任务的终端
  * Golang 实现
  * 支持架构 x86, AMD64, ARM64, ARM, s390x
  * 支持平台 Linux, Windows, macOS, FreeBSD
  * 部署方式 Docker, Helm, Shell




```bash
# 查看注册参数
docker run --rm -it gitlab/gitlab-runner:alpine register --help
# 交互式注册
docker run --rm -it gitlab/gitlab-runner:alpine register
# 非交互式注册
TOKEN=""
docker run --rm \
  -v /data/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner:alpine register \
  --non-interactive \
  --executor "docker" \
  --docker-image wener/base:latest \
  --url "https://gitlab.com/" \
  --registration-token "$TOKEN" \
  --description "docker-runner" \
  --tag-list "docker,internal" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"

# 会生成配置 /data/gitlab-runner/config/config.toml

# 启动 runner
docker run -d --restart always -e TZ=Asia/Shanghai \
  -v /data/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name gitlab-runner gitlab/gitlab-runner:alpine
```

## 配置
* /etc/gitlab-runner/config.toml - `*nix`
* ~/.gitlab-runner/config.tom - `*nix` 非 root
* `./config.toml` - 其他
* [Advanced configuration](https://docs.gitlab.com/runner/configuration/advanced-configuration.html)

```ini
concurrent=4
# debug, info, warn, error, fatal, panic
log_level=info
# runner, text, json
log_format=runner
# 检测任务的间隔 - 最低 3s
check_interval=3
# 错误发送到 Sentry
sentry_dsn=false
# metrics 地址
# listen_address=0.0.0.0:9090

# 多 runner 协同用的会话服务
[session_server]
  listen_address = "[::]:8093"
  advertise_address = "runner-host-name.tld:8093"
  session_timeout = 1800

[[runners]]
  name = "My Docker Runner"
  # Gitlab 地址
  url = "http://127.0.0.1:3000/"
  # 内部特殊 token
  token = "$TOKEN"
  # tls-ca-file
  # tls-cert-file
  # tls-key-file
  # 该 token 能并行处理的任务数 - 0 不限
  limit=0
  # shell, docker, docker-windows, docker-ssh, ssh, parallels, virtualbox, docker+machine
  # docker-ssh+machine, kubernetes
  executor = "docker"
  # bash, sh, powershell, pwsh (PowerShell Core)
  shell=""
  # builds_dir=/build
  # cache_dir=/cache
  # 环境变量
  # environment=["ENV=value", "LC_ALL=en_US.UTF-8"]
  # 请求任务的并发
  request_concurrency=1
  # 日志大小 - 默认 4MB
  output_limit=4096
  # clone 之前 hook 脚本
  # pre_clone_script=
  # pre_build_script
  # post_build_script

  # 修改 clone 用的地址
  # clone_url

  # 是否禁用 CI_DEBUG_TRACE 特性
  # debug_trace_disabled
  # Extra job monitoring workers that pass their results as job artifacts to GitLab
  # referees
  [runners.custom_build_dir]
[runners.docker]
  # 优先使用 DOCKER_HOST
  host=unix:///var/run/docker.sock
  hostname=""
  runtime=""

  # ca.pem, cert.pem, key.pem
  # tls_cert_path
  # tls_verify

  # build 使用镜像
  image = "docker:stable"
  # 内存限制 - 例如 1G
  memory=""
  memory_swap=""
  memory_reservation=""

  # OOM 时不 kill
  oom_kill_disable=false
  # OOM kill 优先级
  oom_score_adjust=0

  # CPU 限制
  cpuset_cpus=0
  cpu_shares=1024
  cpus=""

  dns=[]
  dns_search=[]

  privileged=false

  # 是否禁止修改入口
  disable_entrypoint_overwrite=false
  userns_mode=
  cap_add=[]
  cap_drop=[]
  security_opt=[]
  devices=[]
  cache_dir=""
  # docker volume 构建时缓存
  disable_cache=true
  network_mode=
  wait_for_services_timeout=
  volumes = ["/certs/client", "/cache"]
  volumes_from=[]
  volume_driver=[]
  extra_hosts=[]
  shm_size = 0
  links=[]
  allowed_images=[]
  allowed_services=[]
  # never, if-not-present, always
  pull_policy=always
  sysctls=[]
  # 修改默认 helper
  # helper_image=""

  # 定义服务和别名
  [[runners.docker.services]]
    name = "redis:5"
    alias = "cache"

[runners.parallels]
  base_name=""
  template_name=""
  disable_snapshots=false

[runners.virtualbox]
  base_name=""
  template_name=""
  disable_snapshots=false

[runners.ssh]
  host = "my-production-server"
  port = "22"
  user = "root"
  password = "production-server-password"
  identity_file = ""

# Docker Machine
[runners.machine]
# https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-runnersmachine-section

# 自定义
[runners.custom]

# 缓存配置
[runners.cache]
# s3, gcs
Type=s3
Path=
Shared=false

  # S3 配置
  [runners.cache.s3]
    ServerAddress = "s3.amazonaws.com"
    AccessKey = "AWS_S3_ACCESS_KEY"
    SecretKey = "AWS_S3_SECRET_KEY"
    BucketName = "runners-cache"
    BucketLocation = "eu-west-1"
    Insecure = false

# Kubernetes
[runners.kubernetes]
  host = "https://45.67.34.123:4892"
  cert_file = "/etc/ssl/kubernetes/api.crt"
  key_file = "/etc/ssl/kubernetes/api.key"
  ca_file = "/etc/ssl/kubernetes/ca.crt"
  image = "golang:1.8"
  privileged = true
  allow_privilege_escalation = true
  image_pull_secrets = ["docker-registry-credentials"]
  [runners.kubernetes.node_selector]
    gitlab = "true"

[runners.referees]
  [runners.referees.metrics]
    prometheus_address = "http://localhost:9090"
    query_interval = 10
    metric_queries = []
```


https://about.gitlab.com/releases/2019/07/31/docker-in-docker-with-docker-19-dot-03/

## Docker in Docker
* `volumes = ["/certs/client", "/cache"]`
* [gitlab-org/gitlab-runner#4566](https://gitlab.com/gitlab-org/gitlab-runner/-/issues/4566)
* [gitlab-org/gitlab-runner#4501](https://gitlab.com/gitlab-org/gitlab-runner/-/issues/4501) - Docker in Docker 19.03 service fails

## 将共享 runner 修改为 私有
移除 runner 从新添加

## Windows
0. 下载安装 Git https://git-scm.com/download/win
  * 建议下载 Portable 解压即可
  * 如果想安装 Runner 为 Service 则需要用 msi
0. 下载 [Windows Runner](https://docs.gitlab.com/runner/install/windows.html)

```bash
mkdir -p /usr/local/bin
# 打开 bin 目录 - 复制下载的 gitlab runner 到这里，并更名为 gitlab-runner.exe
start "$(cygpath -d /usr/local/bin)"

# gitlab TOKEN
TOKEN=
gitlab-runner register \
  --non-interactive \
  --executor shell \
  --shell bash \
  --url "https://gitlab.com/" \
  --registration-token "$TOKEN" \
  --description windows-runner \
  --tag-list "windows,bash,internal" \
  --run-untagged=false \
  --locked=false \
  --access-level=not_protected \
  --builds-dir ./build \
  --cache-dir ./cache
# 生成的配置
cat config.toml
# 在 runner 下执行 - build 和 cache 也在该目录下
gitlab-runner run -d ./runner
```
