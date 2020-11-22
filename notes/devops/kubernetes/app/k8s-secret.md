---
title: K8S Secrets
---

# Kubernetes Secrets

* 注意
  * secret 使用 subPath 不会接收更新

## sealed-secrets
* 注意
  * SealdSecret 是绑定 namespace，kubeseal 的时候指定或原 secret 包含，不可修改
* [stable/sealed-secrets](https://github.com/helm/charts/tree/master/stable/sealed-secrets)

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
```

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
