---
id: k3d
title: K3S in Docker
---

# K3S in Docker

## Tips

* [rancher/k3d](https://github.com/rancher/k3d) - 容器运行
  * 基于之前的 [zeerorg/k3s-in-docker](https://github.com/zeerorg/k3s-in-docker)
  * [rancher/k3s/docker-compose.yml](https://github.com/rancher/k3s/blob/master/docker-compose.yml)


## macOS
* 可运行 K3d (K3s in Docker) 和 docker-compose

```bash
brew install k3d

# docker-compose.yaml 位于 https://github.com/rancher/k3s
docker-compose up --scale agent=3

# kubeconfig is written to current dir
kubectl --kubeconfig kubeconfig.yaml get node

# 启动 server
docker run --rm -it \
  --tmpfs /run --tmpfs /var/run \
  -v /var/run/docker.sock:/var/run/docker.sock \
  rancher/k3s k3s server --docker


# 只启动 agent
# docker-compose up agent 
# 或者直接 docker 启动
sudo docker run \
  -d --tmpfs /run \
  --tmpfs /var/run \
  -e K3S_URL=${SERVER_URL} \
  -e K3S_TOKEN=${NODE_TOKEN} \
  --privileged rancher/k3s
```
