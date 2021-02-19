# Linkerd 常见问题

## 问题排查

```bash
# 检查 proxy 是否正常
# --context default 指定其他上下文
# 确保 linkerd 是正常的
linkerd check --proxy -n linkerd
# 检查其他空间
linkerd check --proxy -n ingress-nginx

# config.linkerd.io/enable-debug-sidecar=true
# --enable-debug-sidecar
linkerd inject --enable-debug-sidecar whoami.deploy.yaml | kubectl -n default apply -f -
```

## error: unable to retrieve the complete list of server APIs: tap.linkerd.io/v1alpha1: the server is currently unable to handle the request

```bash
# 验证服务正常
kubectl get apiservices
kubectl get pods -n kube-system

# hook 存在
kubectl get validatingwebhookconfigurations
kubectl get mutatingwebhookconfigurations

linkerd -n linkerd tap deploy/web
# Error: HTTP error, status Code [503] (unexpected API response: Error trying to reach service: 'x509: certificate relies on legacy Common Name field, use SANs or temporarily enable Common Name matching with GODEBUG=x509ignoreCN=0')

# 重启 linkerd
kubectl rollout restart -n linkerd deployment

# 查看事件
kubectl get events --field-selector reason=IssuerUpdated -n linkerd
```

## linkerd-proxy-injector - remote error: tls: bad certificate
* [#3754](https://github.com/linkerd/linkerd2/issues/3754)

```bash
linkerd upgrade --identity-trust-anchors-file=./ca.crt
```

## cni
* 自动重写 Pod 的 iptables 规则
* 安装后则不再需要 init - 该 Container 需要 NET_ADMIN 权限
* 适用于集群对权限限制的比较严谨的场景

```bash
# 安装 CNI
linkerd install-cni | kubectl apply -f -
# 安装后
linkerd install --linkerd-cni-enabled | kubectl apply -f -

# HELM 安装 CNI
helm install linkerd2-cni linkerd2/linkerd2-cni
# check
linkerd check --pre --linkerd-cni-enabled
```

## Failed to initialize identity service
