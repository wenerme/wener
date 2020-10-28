---
title: K3S 实践
---

# K3S 实践

## 简单启动

```bash
cat <<YAML > /etc/rancher/k3s/config.yaml
docker: true
# 主机名作为节点名字
node-name: $(hostname)

# server 加入的 token
token: $(uuidgen)
# agent 加入的 token
agent-token: $(uuidgen)
YAML

service k3s start
```

## 清空 K3S 服务
* 前提是用的 docker
* containerd 得 kill 进程

```bash
# 停止 k3s 避免创建 pod
service k3s stop
# 重启 docker 使得现有 pod 停止
server docker restart
# 清理不必要的内容 - --all 也会清理镜像
docker system prune
```
