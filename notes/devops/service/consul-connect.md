---
title: Consule Connect Mesh
---

# Consule Connect Mesh

- 优势
  - mesh gateway 打通集群
  - ingress gateway 允许外部访问内部服务
  - terminating gateway 允许内部 mtls 访问外部服务
  - 支持代码层集成 - 提供 Go SDK
  - 连通性好
  - 支持 7 层路由
  - 没有集成 prometheus 和 grafana - 更适合利用现有实例
- 劣势
  - 需要两个 sidecard
    - consul-connect-inject-init
    - consul-connect-envoy-sidecar
    - consul-connect-lifecycle-sidecar
  - connect 主要 支持连通性，跟踪和指标都没有支持
  - 界面功能较弱
  - 流量切分实例分组需要配置，没有界面
  - observability 和 指标都依赖 envoy - 没有默认配置
- 特性
  - mtls
  - intention - Service-to-Service 权限
    - `consul intention create -deny web '*'`
  - 自动注入
    - `consul.hashicorp.com/connect-inject: 'true'`
- Control Plane
  - Consul UI
- Data Plane
  - 内建 - 主要用于开发
  - envoy
- 注意
  - 必须配合 consule 使用
- Mesh Gateway
  - 网关互通 - 跨集群/区域
  - 服务到服务
- Ingress Gateway
  - 接受外部流量
  - 外部访问内部服务
- Terminating Gateway
  - 内部访问外部
- Intention - ACL 控制
- 代理
  - 内建 - 不适用于生产
  - Envoy
- 证书管理
  - 内建 CA
  - Vault
- 参考
  - [hashicorp/consul-k8s-prometheus-grafana-hashicups-demoapp](https://github.com/hashicorp/consul-k8s-prometheus-grafana-hashicups-demoapp)

```bash
kubectl port-forward service/consul-server 8500:8500
# tls
# kubectl port-forward service/consul-server 8501:8501

# token
export CONSUL_HTTP_TOKEN=$(kubectl get secrets/consul-bootstrap-acl-token --template={{.data.token}} | base64 -d)
consul info

# in pod
export CONSUL_HTTP_ADDR="${HOST_IP}:8500"

# 命令行启动
# -- -l trace - envoy 的 trace 日志
consul connect envoy \
  -sidecar-for echo -http-addr http://127.0.0.1:8500 \
  -grpc-addr http://127.0.0.1:8502 \
  -admin-bind 127.0.0.1:0
```

## annotations

- consul.hashicorp.com/connect-inject
  - bool
  - 是否注入 sidecard
- consul.hashicorp.com/connect-service
  - 服务的名字
  - 默认为第一个 container 的名字
  - 如果启用了 acl，名字必须与 ServiceAccount 相同
- consul.hashicorp.com/connect-service-port
  - 接受请求的端口
  - 默认为第一个暴露端口
  - 可以是名字也可以是端口号
  - proxy 监听动态端口
- consul.hashicorp.com/connect-service-upstreams
  - 连接到的上游服务
  - 逗号分割指定多个
  - `[service-name]:[port]:[optional datacenter]`
  - `prepared_query:[query name]:[port]`
- consul.hashicorp.com/connect-service-protocol
  - 注册协议
  - helm 安装时使用 `defaultProtocol` 指定默认协议
    - 建议指定为 http
- consul.hashicorp.com/service-tags
  - 逗号分割指定多个
- `consul.hashicorp.com/service-meta-<KEY>`
- `consul.hashicorp.com/sidecar-proxy-` - proxy 配置
  - cpu/memory-limit/request
  - helm 默认配置 `connectInject.sidecarProxy.resources`

## k8s

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: alpine-connect
---
apiVersion: v1
kind: Pod
metadata:
  name: alpine-connect
  annotations:
    consul.hashicorp.com/connect-inject: 'true'
    consul.hashicorp.com/connect-service-upstreams: consul:8500,static-server:1234,web-test:2019,whoami-v1:1992
spec:
  serviceAccountName: alpine-connect
  containers:
    - name: alpine-connect
      image: wener/base
      command:
        - tail
      args:
        - -f
        - /dev/null
```

```bash
kubectl exec alpine-connect -it -c alpine-connect -- sh
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: static-server
---
apiVersion: v1
kind: Pod
metadata:
  name: static-server
  annotations:
    consul.hashicorp.com/connect-inject: 'true'
spec:
  containers:
    # consule 中的服务名
    - name: static-server
      image: hashicorp/http-echo:latest
      args:
        - -text="hello world"
        - -listen=:8080
      ports:
        - containerPort: 8080
          name: http
  # 如果启用了 ACL， serviceAccountName 必须要匹配 Consil 中的服务名
  serviceAccountName: static-server
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: static-client
---
apiVersion: v1
kind: Pod
metadata:
  name: static-client
  annotations:
    'consul.hashicorp.com/connect-inject': 'true'
    'consul.hashicorp.com/connect-service-upstreams': 'static-server:1234'
spec:
  containers:
    # 服务名
    - name: static-client
      image: tutum/curl:latest
      # 保持运行
      command: ['/bin/sh', '-c', '--']
      args: ['while true; do sleep 30; done;']
  # ACL 要求
  serviceAccountName: static-client
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: web-test
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-test
  labels:
    app: web-test
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-test
  template:
    metadata:
      name: web-test
      labels:
        app: web-test
      annotations:
        consul.hashicorp.com/connect-service-upstreams: 'static-server:1234'
        consul.hashicorp.com/connect-inject: 'true'
    spec:
      containers:
        - name: web-test
          image: nginx:alpine
          ports:
            - containerPort: 80
      serviceAccountName: web-test
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: static-server-next
---
apiVersion: v1
kind: Pod
metadata:
  name: static-server-next
  annotations:
    consul.hashicorp.com/connect-inject: 'true'
spec:
  containers:
    - name: static-server-next
      image: hashicorp/http-echo:latest
      args:
        - -text="hello world"
        - -listen=:8080
      ports:
        - containerPort: 8080
          name: http
  serviceAccountName: static-server-next
```

```bash
cat << HCL | consul config write -
Kind      = "service-defaults"
Name      = "static-server"
Protocol  = "http"
HCL
cat << HCL | consul config write -
Kind      = "service-defaults"
Name      = "static-server-next"
Protocol  = "http"
HCL
cat << HCL | consul config write -
Kind = "service-router"
Name = "static-server"
Routes = [
  {
    Match {
      HTTP {
        PathPrefix = "/next"
      }
    }

    Destination {
      Service = "static-server-next"
    }
  },
]
HCL
```

## whomai

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: whoami
---
kind: Deployment
apiVersion: apps/v1
metadata:
  name: whoami-v1
  labels:
    app: whoami-v1
spec:
  replicas: 2
  selector:
    matchLabels:
      app: whoami-v1
  template:
    metadata:
      labels:
        app: whoami-v1
      annotations:
        consul.hashicorp.com/connect-inject: 'true'
        consul.hashicorp.com/connect-service-protocol: http
        consul.hashicorp.com/service-tags: app=whoami
        consul.hashicorp.com/service-meta-version: v1
    spec:
      serviceAccountName: whoami
      containers:
        - name: whoami
          image: containous/whoami
          # diff
          env:
            - name: WHOAMI_NAME
              value: V1
          ports:
            - containerPort: 80
          livenessProbe:
            httpGet:
              path: /health
              port: 80
            initialDelaySeconds: 3
            periodSeconds: 3
---
kind: Deployment
apiVersion: apps/v1
metadata:
  name: whoami-v2
  labels:
    app: whoami-v2
spec:
  replicas: 2
  selector:
    matchLabels:
      app: whoami-v2
  template:
    metadata:
      labels:
        app: whoami-v2
      annotations:
        consul.hashicorp.com/connect-inject: 'true'
        consul.hashicorp.com/connect-service-protocol: http
        consul.hashicorp.com/service-tags: app=whoami
        consul.hashicorp.com/service-meta-version: v2
    spec:
      # same service
      serviceAccountName: whoami
      containers:
        - name: whoami
          image: containous/whoami
          # diff
          env:
            - name: WHOAMI_NAME
              value: V2
          ports:
            - containerPort: 80
          livenessProbe:
            httpGet:
              path: /health
              port: 80
            initialDelaySeconds: 3
            periodSeconds: 3
```

```bash
cat << HCL | consul config write -
Kind      = "service-defaults"
Name      = "whoami"
Protocol  = "http"
Expose    = {
  Checks = true
  Paths = [{
    Path = "/health"
  }]
}
HCL
cat << HCL | consul config write -
Kind          = "service-resolver"
Name          = "whoami"
DefaultSubset = "v2"
Subsets = {
  "v1" = {
    Filter = "Service.Meta.version == v1"
  }
  "v2" = {
    Filter = "Service.Meta.version == v2"
  }
}
HCL

cat << HCL | consul config write -
Kind = "service-router"
Name = "whoami"
Routes = [
  {
    Match {
      HTTP {
        Header = [
          {
            Name  = "x-version"
            Exact = "2"
          },
        ]
      }
    }
    Destination {
      Service       = "whoami"
      ServiceSubset = "v2"
    }
  },
  {
    Match {
      HTTP {
        PathPrefix = "/v2"
      }
    }
    Destination {
      Service       = "whoami"
      ServiceSubset = "v2"
    }
  },

    {
    Match {
      HTTP {
        Header = [
          {
            Name  = "x-version"
            Exact = "1"
          },
        ]
      }
    }
    Destination {
      Service       = "whoami"
      ServiceSubset = "v1"
    }
  },
    {
    Match {
      HTTP {
        PathPrefix = "/v1"
      }
    }
    Destination {
      Service       = "whoami"
      ServiceSubset = "v1"
    }
  },
]
HCL
```

**分组**

```hcl
Kind          = "service-resolver"
Name          = "whoami"
DefaultSubset = "v1"
Subsets = {
  "v1" = {
    Filter = "Service.Meta.version == v1"
  }
  "v2" = {
    Filter = "Service.Meta.version == v2"
  }
}
```

**流量切分**

```hcl
Kind = "service-splitter"
Name = "web"
Splits = [
  {
    Weight        = 90
    ServiceSubset = "v1"
  },
  {
    Weight        = 10
    ServiceSubset = "v2"
  },
]
```
