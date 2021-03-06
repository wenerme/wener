---
title: K8S Secrets
---

# Kubernetes Secrets

* 注意
  * secret 使用 subPath 不会接收更新

## 密钥方案
- [bitnami-labs/sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)
  - 生成不可逆的密钥存储在仓库，控制器生成对应 Secret - 非对称加密
  - 最简单实用
- [banzaicloud/bank-vaults](https://github.com/banzaicloud/bank-vaults)
- [hashicorp/vault](https://github.com/hashicorp/vault)
  - Secret as a Service, Encryption as a Servic
  - 如何与 K8S 集成是个问题
- 参考
  - [Secret Management](https://argoproj.github.io/argo-cd/operator-manual/secret-management/)


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

