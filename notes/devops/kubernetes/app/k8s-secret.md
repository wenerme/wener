---
title: K8S Secrets
---

# Kubernetes Secrets

- https://kubernetes.io/docs/concepts/configuration/secret/

:::caution

- secret 使用 subPath 不会接收更新

:::

| type                                | fields            |
| ----------------------------------- | ----------------- | --------------------- |
| Opaque                              |                   | 容易数据              |
| kubernetes.io/service-account-token |                   | 服务账号令牌          |
| kubernetes.io/dockercfg             | .dockercfg        | ~/.dockercfg          |
| kubernetes.io/dockerconfigjson      | .dockerconfigjson | ~/.docker/config.json |
| kubernetes.io/basic-auth            | username,password |                       |
| kubernetes.io/ssh-auth              | ssh-privatekey    |                       |
| kubernetes.io/tls                   | tls.crt,tls.key   | TLS client or server  |
| bootstrap.kubernetes.io/token       |                   | bootstrap token data  |

## docker

```bash
# 从 docker 生成的配置创建
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
    --type=kubernetes.io/dockerconfigjson
# 直接提供授权信息
kubectl create secret docker-registry regcred \
  --docker-server=<your-registry-server> \
  --docker-username=<your-name> \
  --docker-password=<your-pword> \
  --docker-email=<your-email>
```

## GitOps 密钥

- 因为 GitOps 要求所有内容都在仓库，因此密钥也需要存储在仓库
- 出于安全考虑不能直接放明文的 Secret，因此需要曲线提供 Secret
- 部分要求在 helm values.yaml 提供密钥的还需要先生成 chart 然后修改为另外的方式提供密钥
