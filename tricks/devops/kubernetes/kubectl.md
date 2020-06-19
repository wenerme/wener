---
id: kubectl
title: Kubectl
---

# Kubectl
* [kubernetes-sigs/krew](https://github.com/kubernetes-sigs/krew/) - Find and install kubectl plugins
* [ahmetb/kubectx](https://github.com/ahmetb/kubectx) - 辅助上下文控制
* [cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

```bash
brew install kubectl kubectx
```

## 配置
* 默认配置 `~/.kube/config`
* 环境变量控制 `KUBECONFIG`
  * 可配置多个 `KUBECONFIG=~/.kube/config:~/.kube/kubconfig2 `
  * 会进行合并

```bash
# 查看配置
kubectl config view --kubecoonfig=~/.kube/dev
# 只查看生效配置
kubectl config view --minify
# 查看用户密码
kubectl config view -o jsonpath='{.users[?(@.name == "admin")].user.password}'
# 所有用户
kubectl config view -o jsonpath='{.users[*].name}'

# 所有上下文
kubectl config get-contexts
# 当前上下文
kubectl config current-context
# 使用上下文
kubectl config use-context my-cluster-name

# 添加用户
kubectl config set-credentials kubeuser/foo.kubernetes.com --username=kubeuser --password=kubepassword

# 设置当前正在使用的命名空间
kubectl config set-context --current --namespace=myapp

# 删除 用户、集群、上下文
kubectl --kubeconfig=config-demo config unset users.<name>
kubectl --kubeconfig=config-demo config unset clusters.<name>
kubectl --kubeconfig=config-demo config unset contexts.<name>
```

```yaml
apiVersion: v1
kind: Config
# 当前上下文
current-context: ""
preferences: {}

# 集群
clusters:
- cluster:
    # 证书信息
    certificate-authority: ca-file
    # Base64 编码的证书信息
    certificate-authority-data: ABCD==
    # 不校验 TLS
    # insecure-skip-tls-verify: true
    # 服务地址
    server: https://1.2.3.4
  # 集群名字
  name: dev
- cluster:
    server: https://5.6.7.8
  name: staging

# 用户信息
users:
- name: developer
  user:
    # 证书认真
    client-certificate: fake-cert-file
    client-key: fake-key-file
- name: admin
  user:
    # 用户名密码认证
    password: Admin
    username: admin
# 上下文 = 集群+用户+命名空间
contexts:
- context:
    cluster: dev
    namespace: frontend
    user: developer
  name: dev-frontend
- context:
    cluster: dev
    namespace: storage
    user: developer
  name: dev-storage
```

