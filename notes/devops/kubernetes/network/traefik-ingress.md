---
title: Traefik Ingress
---

# Traefik Ingress

- [Traefik Ingress](https://doc.traefik.io/traefik/providers/kubernetes-ingress/)
- Traefik 的 K8S 分为 CRD 方式和标准的 IngressController
  - CRD 支持更多功能 - Helm 安装

:::caution

- traefik 内置 acme, 但有不少问题 - 官方推荐使用 cert-manager
  - 官方 issues 排前面有好几个关于证书的问题
- 只有 repilca 为 1 才支持 acme - 开源版不支持集群
  - [#5426](https://github.com/traefik/traefik/issues/5426#issuecomment-533598163)
    官方表明 社区版 不考虑集群
- Middleware 通过 CRD 引用 - 使用相对麻烦

:::

```bash
# 转发 9000
kubectl port-forward $(kubectl get pods --selector "app.kubernetes.io/name=traefik" -n traefik --output=name) 9000:9000 -n traefik
```

## CRD

- [示例资源配置](https://github.com/containous/traefik/tree/v2.2/pkg/provider/kubernetes/crd/fixtures)

- 启动参数
  - `--global.checknewversion`
  - `--global.sendanonymoususage`
  - `--entryPoints.traefik.address=:9000`
  - `--entryPoints.web.address=:8000`
  - `--entryPoints.websecure.address=:8443`
  - `--api.dashboard=true`
  - `--ping=true`
  - `--providers.kubernetescrd`
  - `--providers.kubernetesingress`

```bash
helm repo add traefik https://containous.github.io/traefik-helm-chart
helm repo update
helm install traefik traefik/traefik

# 可安装在独立命名空间
kubectl create ns traefik
helm install --namespace=traefik \
    traefik traefik/traefik

# 转发 dashboard 到本地 9000
# 然后访问 http://localhost:9000/dashboard/
kubectl port-forward -n traefik $(kubectl get pods -n traefik --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000

# 可以配置一个 Ingress 然后即可通过域名访问
cat <<YAML
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-dashboard
  namespace: traefik
spec:
  entryPoints:
    - web
    - traefik
  routes:
    - match: Host(`traefik.localhost`) && (PathPrefix(`/dashboard`) || PathPrefix(`/api`))
      kind: Rule
      services:
        - name: api@internal
          kind: TraefikService
YAML
```

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: foo
  namespace: bar
spec:
  # 入口
  entryPoints:
    - foo
  # 路由配置
  routes:
    - kind: Rule
      # 路由匹配规则
      match: Host(`test.example.com`)
      # 匹配攸县酒
      priority: 10
      # 引用中间件
      middlewares:
        - name: middleware1
          namespace: default
      # 后端服务
      services:
        - kind: Service
          name: foo
          namespace: default
          # 透传头信息
          passHostHeader: true
          port: 80
          responseForwarding:
            flushInterval: 1ms
          scheme: https
          # 粘性配置
          sticky:
            cookie:
              httpOnly: true
              name: cookie
              secure: true
              sameSite: none
          # 负载策略
          strategy: RoundRobin
          weight: 10
  # TLS
  tls:
    # 密钥信息
    secretName: supersecret
    # TLSOption
    options:
      name: opt
      namespace: default
    certResolver: foo # CertResolver
    domains: # TLS 域名
      - main: example.net
        sans:
          - a.example.net
          - b.example.net
```

## Ingress

- [示例资源配置](https://github.com/containous/traefik/tree/v2.2/pkg/provider/kubernetes/ingress/fixtures)
- [Kubernetes Ingress Controller](https://docs.traefik.io/routing/providers/kubernetes-ingress/)

```yaml
# 全局默认
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: cheese
spec:
  backend:
    serviceName: stilton
    servicePort: 80

---
apiVersion: v1
kind: Service
metadata:
  name: whoami
  annotations:
    # 修改 schema： http h2c https
    traefik.ingress.kubernetes.io/service.serversscheme: https
    # 透传 头
    traefik.ingress.kubernetes.io/service.passhostheader: 'true'
    # 粘性配置
    traefik.ingress.kubernetes.io/service.sticky: 'true'
    traefik.ingress.kubernetes.io/service.sticky.cookie.name: foobar
    traefik.ingress.kubernetes.io/service.sticky.cookie.secure: 'true'
    traefik.ingress.kubernetes.io/service.sticky.cookie.samesite: 'none'
    traefik.ingress.kubernetes.io/service.sticky.cookie.httponly: 'true'
spec:
  type: LoadBalancer
  selector:
    app: whoami
  ports:
    - protocol: TCP
      port: 80
      name: web
      targetPort: 80

---
kind: Ingress
apiVersion: networking.k8s.io/v1beta1
metadata:
  name: myingress
  annotations:
    # 终端
    traefik.ingress.kubernetes.io/router.entrypoints: web,websecure
    # 中间件
    traefik.ingress.kubernetes.io/router.middlewares: <namespace>-<name>@kubernetescrd,cb@file
    # 优先级
    traefik.ingress.kubernetes.io/router.priority: '42'
    # 路径匹配方式 Path, PathPrefix
    traefik.ingress.kubernetes.io/router.pathmatcher: PathPrefix

    # 是否 TLS
    traefik.ingress.kubernetes.io/router.tls: 'true'
    # 解析 TLS 方式
    traefik.ingress.kubernetes.io/router.tls.certresolver: myresolver
    # TLS 的 SNI 域名
    traefik.ingress.kubernetes.io/router.tls.domains.0.main: example.org
    traefik.ingress.kubernetes.io/router.tls.domains.0.sans: test.example.org,dev.example.org
    traefik.ingress.kubernetes.io/router.tls.options: foobar

spec:
  # 证书
  tls:
    - secretName: supersecret
  rules:
    - host: example.com
      http:
        paths:
          - path: /bar
            backend:
              serviceName: whoami
              servicePort: 80
```

## Cert Manager

- https://github.com/mmatur/traefik-cert-manager

## FAQ

### Cannot create service: subset not found


## TBD

https://docs.traefik.io/routing/providers/kubernetes-ingress/
https://github.com/rancher/k3s/issues/1141
https://github.com/containous/traefik-helm-chart
https://docs.traefik.io/getting-started/install-traefik/#use-the-helm-chart

```bash
kubectl port-forward $(kubectl get pods --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000
```

ClusterRoleBinding

error syncing 'traefik/traefik'
handler svccontroller: Operation cannot be fulfilled on "svccontroller": delaying object set, requeuing

INOTIFY_USR
