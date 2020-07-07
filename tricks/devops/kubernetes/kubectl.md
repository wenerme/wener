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
# k9s - k8s 的 top - 可以 shell、log 等
brew install derailed/k9s/k9s

# 补全
source <(kubectl completion bash)

# 可以用别名
alias k=kubectl
complete -F __start_kubectl k

# 查看所有上下文
kubectx
# 查看命名空间
kubens

# K9S 所有命名空间 不显示头
k9s -A --headless
```

## 端口映射

```bash
# 单个部署
kubectl port-forward pod/mypod 5000 6000
# 使用 deploy 选择
kubectl port-forward deployment/mydeployment 5000 6000
# 服务
kubectl port-forward service/myservice 5000 6000
# 本地监听地址
kubectl port-forward --address 0.0.0.0 pod/mypod 8888:5000

# 转发 kubernetes-dashboard
kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard 8443:https
```

## 私有仓库

```bash
# 使用已有的认证信息创建
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=$HOME/.docker/config.json \
    --type=kubernetes.io/dockerconfigjson

# 提供账号密码创建
# 镜像地址，例如 https://index.docker.io/v1/  或者 registry.gitlab.com
kubectl create secret docker-registry regcred \
  -docker-server=<your-registry-server> \
  --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>

kubectl get secret regcred --output=yaml
# 明文
kubectl get secret regcred --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode | jq
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: private-reg
spec:
  containers:
  - name: private-reg-container
    image: <your-private-image>
  imagePullSecrets:
  # 使用私钥
  - name: regcred
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

