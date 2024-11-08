---
title: Drone Runner
---

# drone runner


:::caution

- exec runner 目前用不了 - 无法注入 git cred
  - 新的插件基于 container
  - exec 不再维护了

:::


## exec runner

- /etc/drone-runner-exec/config
- ~/.drone-runner-exec/config
- [drone-runners/drone-runner-exec](https://github.com/drone-runners/drone-runner-exec) 已经被归档

```bash
curl -L https://github.com/drone-runners/drone-runner-exec/releases/latest/download/drone_runner_exec_linux_amd64.tar.gz | tar zx
sudo install -t /usr/local/bin drone-runner-exec
```

```ini
DRONE_RPC_PROTO=https
DRONE_RPC_HOST=drone.company.com
DRONE_RPC_SECRET=super-duper-secret
DRONE_LOG_FILE=/var/log/drone-runner-exec/log.txt
```

配置 UI 后可访问 runner 的界面， :3000

- DRONE_UI_USERNAME=root
- DRONE_UI_PASSWORD=root

```bash
# daemon 前台运行
drone-runner-exec daemon /etc/drone-runner-exec/config

DRONE_DEBUG=true drone-runner-exec service run --config /etc/drone-runner-exec/config

# 服务模式 - 后台
drone-runner-exec service install # 不是 OpenRC /etc/init.d/drone-runner-exec
drone-runner-exec service start   # service run
```

| var               | e.g. |
| ----------------- | ---- |
| DRONE_RUNNER_ROOT | /tmp |

- https://docs.drone.io/runner/exec/configuration/reference/
- 注册的 Webhook `https://drone.dev.wener.me/hook?secret=`

## docker runner

```bash
docker run --detach \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  --env=DRONE_RPC_PROTO=https \
  --env=DRONE_RPC_HOST=drone.company.com \
  --env=DRONE_RPC_SECRET=super-duper-secret \
  --env=DRONE_RUNNER_CAPACITY=2 \
  --env=DRONE_RUNNER_NAME=first-runner \
  --publish=3000:3000 \
  --restart=always \
  --name=runner \
  drone/drone-runner-docker:1

docker run --rm -it \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  --env-file=config \
  --publish=3000:3000 \
  --name=drone-runner drone/drone-runner-docker:1
```

- DRONE_RUNNER_CLONE_IMAGE=docker/git:1
  - clone 到 /drone/src/.git/
- https://docs.drone.io/runner/docker/configuration/reference/
- DRONE_RUNNER_VOLUMES


```bash
if [ ! -z "${DRONE_NETRC_FILE}" ]; then
	echo $DRONE_NETRC_FILE > $HOME/.netrc
	chmod 600 $HOME/.netrc
fi
unset DRONE_SCRIPT
unset DRONE_NETRC_MACHINE
unset DRONE_NETRC_USERNAME
unset DRONE_NETRC_PASSWORD
unset DRONE_NETRC_FILE
set -e
```

- https://github.com/drone-runners/drone-runner-docker/blob/7e9969423c0883c0300c974bbb7583e3d9ece875/engine/compiler/shell/shell.go#L37-L50
- DRONE_BUILD_DEBUG=true
  - 会设置 DRONE_TMATE_HOST
## kubernates runner

- [drone-runners/drone-runner-kube](https://github.com/drone-runners/drone-runner-kube)
- https://github.com/drone-runners/drone-runner-kube/blob/master/command/daemon/config.go

```bash
docker run --rm -it \
  --name=drone-runner-kube drone/drone-runner-kube
```

- https://docs.drone.io/runner/kubernetes/installation/
