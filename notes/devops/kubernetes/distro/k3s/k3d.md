---
title: K3S in Docker
---

# K3S in Docker

- [rancher/k3d](https://github.com/rancher/k3d) - 容器运行
  - 基于之前的 [zeerorg/k3s-in-docker](https://github.com/zeerorg/k3s-in-docker)
  - [rancher/k3s/docker-compose.yml](https://github.com/rancher/k3s/blob/master/docker-compose.yml)

```bash
curl -Lo k3d https://ghproxy.com/github.com/k3d-io/k3d/releases/download/v5.4.7/k3d-linux-arm64
chmod +x k3d
mv k3d /usr/local/bin

# k3d-default.yaml
k3d config init

k3d cluster create dev

export KUBECONFIG="$(k3d kubeconfig write k3s-default)"
```

## Registry

- write to /etc/rancher/k3s/registries.yaml

```bash
# 自定义
k3d cluster create mycluster --registry-config "$HOME/my-registries.yaml"

k3d cluster create \
  --volume "${HOME}/.k3d/my-registries.yaml:/etc/rancher/k3s/registries.yaml" \
  --volume "${HOME}/.k3d/my-company-root.pem:/etc/ssl/certs/my-company-root.pem"

# 启动 registry
k3d cluster create mycluster --registry-create mycluster-registry
docker ps -f name=mycluster-registry

k3d registry create myregistry.localhost --port 12345
k3d cluster create newcluster --registry-use k3d-myregistry.localhost:12345
```

```yaml
mirrors:
  'my.company.registry:5000':
    endpoint:
      - http://my.company.registry:5000
```

```yaml
apiVersion: k3d.io/v1alpha3
kind: Simple
name: test
servers: 1
agents: 2
registries:
  create:
    name: myregistry
  config: |
    mirrors:
      "my.company.registry":
        endpoint:
          - http://my.company.registry:5000
```

## macOS

```bash
brew install k3d
```

## Failed Cluster Start: error during post-start cluster preparation: error overwriting contents of /etc/hosts: Exec process in node 'k3d-dev-server-0' failed with exit code '139': Logs from failed access process:

- https://github.com/k3d-io/k3d/issues/1220
  - 5.4.7 BUG, 5.4.6 没问题


覆盖 hosts 时异常

```bash
sh -c cat /tmp/-etc-hosts-cUAunADhzSQlEbdflLOb > /etc/hosts
```

**写入内容**

```hosts
::1 ip6-localhost ip6-loopback localhost
127.0.0.1 localhost
172.18.0.1 host.k3d.internal
172.18.0.2 k3d-dev-server-0
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```
