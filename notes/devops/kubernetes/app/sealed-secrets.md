---
title: sealed-secrets
---

# sealed-secrets

- 注意
  - SealdSecret 是绑定 namespace，kubeseal 的时候指定或原 secret 包含，不可修改
    - 或者指定 `sealedsecrets.bitnami.com/cluster-wide": "true"` 集群内可用
- [stable/sealed-secrets](https://github.com/helm/charts/tree/master/stable/sealed-secrets)
- 模式
  - strict - 默认 - 名字和 namespace 匹配
  - namespace-wide - 相同 namespace 内可修改 name
  - cluster-wide - 可修改 namespace 和 name

:::caution

- 如果一个 yaml 包含多个 secret 只有第一个会 seal - [#114](https://github.com/bitnami-labs/sealed-secrets/issues/114)
- 删除 secret 不会重建 - [bitnami-labs/sealed-secrets#224](https://github.com/bitnami-labs/sealed-secrets/issues/224)

:::

```bash
# 集群安装
# 查看版本 https://github.com/bitnami-labs/sealed-secrets/releases
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.13.1/controller.yaml

brew install kubeseal

# 正常 secret
echo -n bar | kubectl create secret generic mysecret --dry-run=client --from-file=foo=/dev/stdin -o json >mysecret.json
# seal
kubeseal <mysecret.json >mysealedsecret.json
# 创建 seal
kubectl create -f mysealedsecret.json
# 生成 secret
kubectl get secret mysecret

# 限定范围
kubeseal --scope cluster-wide <secret.yaml >sealed-secret.json

# 备份 master.key - 恢复则可以使得之前的加密数据生效
kubectl get secret -n kube-system -l sealedsecrets.bitnami.com/sealed-secrets-key -o yaml >master.key

# 恢复 master.key
kubectl apply -f master.key
# 生效
kubectl delete pod -n kube-system -l name=sealed-secrets-controller

# 离线解密
kubeseal --recovery-unseal --recovery-private-key file1.key
```

```yaml
annotations:
  # 集群内可解密 - 不绑定 namespace
  sealedsecrets.bitnami.com/cluster-wide": 'true'
  # 不绑定 name
  sealedsecrets.bitnami.com/namespace-wide: 'true'
```

# FAQ

## already exists and is not managed by SealedSecret

存在于将 secret 迁移为 sealed-secrets 的情况

- [bitnami-labs/sealed-secrets#288](https://github.com/bitnami-labs/sealed-secrets/issues/288)

```yaml
annotations:
  # 识别方式
  sealedsecrets.bitnami.com/managed: 'true'
```

## 删除 secret 重建

- 目前不支持
- 重启 controller 可以 - 但是 sealedsecrets 多的时候非常慢
  - 单个一般 0.7 - 1.2s

* [bitnami-labs/sealed-secrets#224](https://github.com/bitnami-labs/sealed-secrets/issues/224)
