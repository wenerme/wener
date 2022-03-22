---
title: tmate
---

# tmate

- [tmate.io](https://tmate.io/) - 终端共享
- [tmate-io/tmate](https://github.com/tmate-io/tmate)
  - BSD
  - tmux fork
- 配置文件 `~/.tmate.conf`
  - 语法和 tmux 一样

```bash
apk add -X https://mirrors.aliyun.com/alpine/edge/testing/ tmate
tmate

# 注册后可使用固定名字
tmate -k API_KEY -n session-name
# 固定 URL
ssh username/session-name@nyc1.tmate.io
```

## 配置

```ini
# 授权
# tmate -a ~/.ssh/authorized_keys
set tmate-authorized-keys "~/.ssh/authorized_keys"
# 注册时的 API KEY
# -k
set tmate-api-key "API_KEY"
# 链接时用的会话名字
# -n
set tmate-session-name "session-name"
```

## 服务端

- [tmate-io/tmate-ssh-server](https://github.com/tmate-io/tmate-ssh-server)
- docker [tmate/tmate-ssh-server](https://hub.docker.com/r/tmate/tmate-ssh-server)
  - 需要 SYS_ADMIN 权限来创建嵌套的容器
- [tmate-io/tmate-kube](https://github.com/tmate-io/tmate-kube)
  - Kubernetes 部署

| env                | value | desc                                                                                                |
| ------------------ | ----- | --------------------------------------------------------------------------------------------------- |
| SSH_KEYS_PATH      |       | ssh key                                                                                             |
| HAS_WEBSOCKET      | 1     | tmate-websocket server exists (for HTML5 clients).                                                  |
| USE_PROXY_PROTOCOL | 1     | behind a load balancer that uses the proxy protocol enabled. This is useful to get client real IPs. |
| SSH_HOSTNAME       |       | configures the SSH hostname to advertise to tmate hosts.                                            |
| SSH_PORT_LISTEN    |       | port on which the SSH server should listen on.                                                      |
| SSH_PORT_ADVERTISE |       | 默认 SSH_PORT_LISTEN                                                                                |

```ini
# 修改 ~/.tmate.conf 使用自定义的 server
set -g tmate-server-host "ssh.tmate.io"
set -g tmate-server-port 22
set -g tmate-server-rsa-fingerprint     "SHA256:Hthk2T/M/Ivqfk1YYUn5ijC2Att3+UPzD7Rn72P5VWs"
set -g tmate-server-ed25519-fingerprint "SHA256:jfttvoypkHiQYUqUCwKeqd9d1fJj/ZiQlFOHVl6E9sI"
```
