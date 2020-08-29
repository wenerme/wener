---
id: kuma
title: Kuma
---

# Kuma

## Tips

- Built by Envoy contributors at Kong
- 特性
  - UI 管理
  - 支持非 K8S 环境
    - DP CP 独立
    - Docker
    - Linux
    - CP 运行为 Universal 模式 - 配置存储到 PostgreSQL
  - 支持 K8S CRDs 控制
  - 支持多 Zone - 集群
  - 支持 http、http2、grpc、tcp
  - Mesh
    - 支持多 Mesh
    - 常见划分 - 业务产线、团队、应用、环境
    - 网络、策略隔离
  - mtls
    - 启用后需要配置权限
    - 支持 内建、手动、vault CA
  - traffic permission
    - 依赖 mtls 实现
  - traffic routing
    - L4
    - 默认轮训
    - 支持权重
  - health check
    - 主动 - dp 发起请求
    - 被动 - cp 分析请求
  - traffic log
    - 写入到 TCP - logstash
    - 写入到 文件
  - traffic trace
    - zipkin 协议
  - traffic metrics
    - Prometheus /metrics
  - Fault Injection
    - 错误注入
  - Circuit Breaker
  - Proxy Template
    - 配置 envoy
- Data Plane 
  - 基于 Envoy
  - L4/L7
  - Service Dataplane
  - Gateway Dataplane
- Control Plane - Kuma
  - Admin API - 5679
  - 后端
    - 默认 `KUMA_STORE_TYPE=memory`
    - 支持 kubernetes、postgres
    - 执行 `kuma-cp migrate up` 创建 pg 数据库
  - Kuma DNS
    - `:5653`
    - IP 范围 240.0.0.0/4
    - 默认 tld mesh
    - `curl http://echo-server_echo-example_svc_1010.mesh`
  - [部署模式](https://kuma.io/docs/latest/documentation/deployments/#standalone-mode)
    - standalone - 默认模式，平台网络
    - multi-zone - 支持 k8s 多集群和基于 vm 的模式
- 环境变量
  - KUMA_DATAPLANE_ADMIN_PORT
  - KUMA_CONTROL_PLANE_API_SERVER_URL=http://kuma-control-plane:5681
  - KUMA_DATAPLANE_ADMIN_PORT
  - KUMA_ADMIN_SERVER_LOCAL_PORT=5679
  - KUMA_ADMIN_SERVER_PUBLIC_PORT
  - KUMA_ADMIN_SERVER_PUBLIC_INTERFACE
  - KUMA_ADMIN_SERVER_PUBLIC_CLIENT_CERTS_DIR
- [security](https://kuma.io/docs/latest/documentation/security)
- 参考
  - [Webinar: Kuma: Service Mesh and the Future of Application Connectivity](https://www.youtube.com/watch?v=Bu0-y9h8V5w)

## kuma k8s
```bash
brew install kumactl

ver=0.7.1
# 使用私有仓库
# registry-vpc.cn-hongkong.aliyuncs.com/cmi
cat <<IMAGES | xargs -n1 -I {} sh -c 'docker pull kong-docker-kuma-docker.bintray.io/{}; docker tag kong-docker-kuma-docker.bintray.io/{} registry-vpc.cn-hongkong.aliyuncs.com/cmi/{}; docker push registry-vpc.cn-hongkong.aliyuncs.com/cmi/{}'
kuma-cp:0.7.1
kuma-dp:0.7.1
kumactl:0.7.1
kuma-prometheus-sd:0.7.1
kuma-init:0.7.1
IMAGES

# docker 镜像
# kong-docker-kuma-docker.bintray.io/kuma-cp:0.7.1
# kong-docker-kuma-docker.bintray.io/kuma-dp:0.7.1
# kong-docker-kuma-docker.bintray.io/kumactl:0.7.1
# kong-docker-kuma-docker.bintray.io/kuma-prometheus-sd:0.7.1
# kong-docker-kuma-docker.bintray.io/kuma-init:0.7.1

# 默认安装到 kuma-system
# --control-plane-version 0.7.1
# --control-plane-image kong-docker-kuma-docker.bintray.io/kuma-cp
# --dataplane-image kong-docker-kuma-docker.bintray.io/kuma-dp
# --dataplane-init-image kong-docker-kuma-docker.bintray.io/kuma-init
kumactl install control-plane \
  --control-plane-image registry.cn-hongkong.aliyuncs.com/cmi/kuma-cp \
  --dataplane-image registry.cn-hongkong.aliyuncs.com/cmi/kuma-dp \
  --dataplane-init-image registry.cn-hongkong.aliyuncs.com/cmi/kuma-init \
  --control-plane-version 0.7.1 | kubectl apply -f -

kubectl port-forward svc/kuma-control-plane -n kuma-system 5681:5681

echo "
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-demo
  labels:
    app: nginx-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx-demo
  template:
    metadata:
      name: nginx-demo
      labels:
        app: nginx-demo
      annotations:
        kuma.io/direct-access-services: '*'
        kuma.io/mesh: default
        kuma.io/sidecar-injected: 'true'
        kuma.io/transparent-proxying: enabled
        kuma.io/transparent-proxying-inbound-port: '15006'
        kuma.io/transparent-proxying-outbound-port: '15001'
    spec:
      containers:
      - name: nginx-demo
        image: nginx:alpine
        ports:
        - containerPort: 80" | kubectl apply -f -

echo "
apiVersion: v1
kind: Service
metadata:
  name: nginx-demo
  namespace: default
  annotations:
    80.service.kuma.io/protocol: http
    ingress.kubernetes.io/service-upstream: 'true'
spec:
  selector:
    app: nginx
  ports:
  - name: http
    port: 80
    targetPort: 80" | kubectl apply -f -

# 空间添加注入
echo "apiVersion: v1
kind: Namespace
metadata: 
  name: default
  namespace: default
  labels: 
    kuma.io/sidecar-injection: enabled
    kuma.io/mesh: default" | kubectl apply -f - && kubectl delete pod --all -n default

# default mesh 启用 mtls
echo "apiVersion: kuma.io/v1alpha1
kind: Mesh
metadata:
  name: default
spec:
  mtls:
    enabledBackend: ca-1
    backends:
    - name: ca-1
      type: builtin" | kubectl apply -f -

# metrics
kumactl install metrics \
  --kuma-prometheus-sd-image registry.cn-hongkong.aliyuncs.com/cmi/kuma-prometheus-sd \
  --kuma-prometheus-sd-version 0.7.1 | kubectl apply -f -

echo "apiVersion: kuma.io/v1alpha1
kind: Mesh
metadata:
  name: default
spec:
  mtls:
    enabledBackend: ca-1
    backends:
    - name: ca-1
      type: builtin
  metrics:
    enabledBackend: prometheus-1
    backends:
    - name: prometheus-1
      type: prometheus" | kubectl apply -f -

kubectl port-forward svc/grafana -n kuma-metrics 3000:80
```

### 卸载
```bash
kumactl install metrics \
  --kuma-prometheus-sd-image registry.cn-hongkong.aliyuncs.com/cmi/kuma-prometheus-sd \
  --kuma-prometheus-sd-version 0.7.1 | kubectl delete -f -

kumactl install control-plane \
  --control-plane-image registry.cn-hongkong.aliyuncs.com/cmi/kuma-cp \
  --dataplane-image registry.cn-hongkong.aliyuncs.com/cmi/kuma-dp \
  --dataplane-init-image registry.cn-hongkong.aliyuncs.com/cmi/kuma-init \
  --control-plane-version 0.7.1 | kubectl delete -f -
```

## docker
* 单 docker 部署
* 类似于 vm 部署
* multi-zone 模式

```bash
# 构建环境
# ==========
docker run -u $(id -u) --rm -it -v $PWD:/host kong-docker-kuma-docker.bintray.io/kumactl:0.7.1 cp /usr/bin/kumactl /host
docker run -u $(id -u) --rm -it -v $PWD:/host --entrypoint sh kong-docker-kuma-docker.bintray.io/kuma-cp:0.7.1 -c 'cp /usr/bin/kuma-cp /host'

cat <<EOF > Dockerfile
FROM kong-docker-kuma-docker.bintray.io/kuma-dp:0.7.1

COPY kumactl /usr/bin/
COPY kuma-cp /usr/bin/

ENTRYPOINT [ "/bin/sh" ]
EOF

docker build -t kuma .

# http://localhost:5681/gui/
docker run --rm -it \
  -p 5681:5681 \
  -p 8080:8080 \
  -w /tmp/kuma \
  -u 0 \
  --name kuma kuma

# 启动 kuma
kuma-cp run &

kumactl get meshes

# enable mtls
echo "type: Mesh
name: default
mtls:
  enabledBackend: ca-1
  backends:
  - name: ca-1
    type: builtin" | kumactl apply -f -

# 允许所有访问
cat <<EOF | kumactl apply -f -
type: TrafficPermission
name: permission-all
mesh: default
sources:
  - match:
      kuma.io/service: '*'
destinations:
  - match:
      kuma.io/service: '*'
EOF

# create dp
echo "type: Dataplane
mesh: default
name: web-dp
networking:
  address: 127.0.0.1
  inbound:
    - port: 80
      servicePort: 8080
      tags:
        kuma.io/service: web
        kuma.io/protocol: http" | kumactl apply -f -
# generate dp token
kumactl generate dataplane-token --dataplane=web-dp > kuma-token-web-dp

# start dp
kuma-dp run --name web-dp --mesh=default --dataplane-token-file=kuma-token-web-dp
```

## kumactl
```bash
#
cat <<EOF | kumactl apply -f -
type: Mesh
name: default
mtls:
  enabledBackend: ca-1
  backends:
  - name: ca-1
    type: builtin
metrics:
  enabledBackend: prometheus-1
  backends:
  - name: prometheus-1
    type: prometheus
EOF
```

## 证书配置

```bash
alias kumactl="docker run --rm -i -v $PWD:/host -u 1000 -w /host -v $HOME/.kumactl:/.kumactl --net=host kong-docker-kuma-docker.bintray.io/kumactl:0.7.1 kumactl"

# KUMA_ADMIN_SERVER_PUBLIC_CLIENT_CERTS_DIR
kumactl generate tls-certificate \
  --cert-file=server-cert \
  --key-file=server-key \
  --type=server --cp-hostname=localhost

# https://kuma.io/docs/0.7.1/documentation/security/#universal
# https://kuma.io/docs/0.7.1/installation/docker/
# localhost:5681/gui
# KUMA_GENERAL_ADVERTISED_HOSTNAME
docker run --rm -it \
  -p 5681:5681 \
  -p 15679:15679 \
  -v $PWD:/host \
  -e KUMA_ADMIN_SERVER_PUBLIC_ENABLED=true \
  -e KUMA_ADMIN_SERVER_PUBLIC_TLS_CERT_FILE=/host/server-cert \
  -e KUMA_ADMIN_SERVER_PUBLIC_TLS_KEY_FILE=/host/server-key \
  -e KUMA_ADMIN_SERVER_PUBLIC_INTERFACE=0.0.0.0 \
  -e KUMA_ADMIN_SERVER_PUBLIC_PORT=15679 \
  -e KUMA_ADMIN_SERVER_PUBLIC_CLIENT_CERTS_DIR=/host/certs \
  --name kuma-cp kong-docker-kuma-docker.bintray.io/kuma-cp:0.7.1 run

kumactl get meshes
# enable mtls
echo "type: Mesh
name: default
mtls:
  enabledBackend: ca-1
  backends:
  - name: ca-1
    type: builtin" | kumactl apply -f -

# 创建 dp
echo "type: Dataplane
mesh: default
name: web-dp
networking:
  address: 192.168.1.1
  inbound:
    - port: 80
      servicePort: 8080
      tags:
        kuma.io/service: web
        kuma.io/protocol: http" | kumactl apply -f -


kumactl generate tls-certificate --cert-file=client-cert --key-file=client-key --type=client
kumactl config control-planes add \
  --name test --address http://172.17.0.1:5681 \
  --admin-client-cert server-cert \
  --admin-client-key server-key --overwrite

kumactl generate dataplane-token --dataplane=web-dp > kuma-token-web-dp

mkdir -p ~/.kumactl
cat <<YAML > ~/.kumactl/config
contexts:
- controlPlane: local
  name: local
controlPlanes:
- coordinates:
    apiServer:
      url: http://172.17.0.1:5681
  name: local
currentContext: local
YAML

# 启动 dp
docker run --rm -it \
  -p 8080:8080 \
  --name kuma-dp kong-docker-kuma-docker.bintray.io/kuma-dp:0.7.1 \
  run --cp-address http://172.17.0.1:5681 --name web-dp --dataplane-token-file=
```

## 配置

**默认 cp 配置**

```json
{
  "adminServer": {
    "apis": { "dataplaneToken": { "enabled": true } },
    "local": { "port": 5679 },
    "public": {
      "clientCertsDir": "",
      "enabled": false,
      "interface": "",
      "port": 0,
      "tlsCertFile": "",
      "tlsKeyFile": ""
    }
  },
  "apiServer": {
    "catalog": {
      "bootstrap": { "url": "http://localhost:5682" },
      "monitoringAssignment": { "url": "grpc://localhost:5676" },
      "sds": { "url": "" }
    },
    "corsAllowedDomains": [".*"],
    "port": 5681,
    "readOnly": false
  },
  "bootstrapServer": {
    "params": {
      "adminAccessLogPath": "/dev/null",
      "adminAddress": "127.0.0.1",
      "adminPort": 0,
      "xdsConnectTimeout": "1s",
      "xdsHost": "localhost",
      "xdsPort": 5678
    },
    "port": 5682
  },
  "dataplaneTokenServer": {
    "enabled": true,
    "local": { "port": 5679 },
    "public": {
      "clientCertsDir": "",
      "enabled": false,
      "interface": "",
      "port": 0,
      "tlsCertFile": "",
      "tlsKeyFile": ""
    }
  },
  "defaults": { "skipMeshCreation": false },
  "dnsServer": { "CIDR": "240.0.0.0/4", "domain": "mesh", "port": 5653 },
  "environment": "universal",
  "general": { "advertisedHostname": "localhost" },
  "guiServer": { "apiServerUrl": "" },
  "metrics": { "dataplane": { "enabled": true, "subscriptionLimit": 10 } },
  "mode": "standalone",
  "monitoringAssignmentServer": {
    "assignmentRefreshInterval": "1s",
    "grpcPort": 5676
  },
  "multicluster": {
    "global": {
      "kds": {
        "grpcPort": 5685,
        "refreshInterval": "1s",
        "tlsCertFile": "/tmp/676369516.crt",
        "tlsKeyFile": "/tmp/334691547.key"
      },
      "pollTimeout": "500ms"
    },
    "remote": { "kds": { "refreshInterval": "1s", "rootCaFile": "" } }
  },
  "reports": { "enabled": true },
  "runtime": {
    "kubernetes": {
      "admissionServer": { "address": "", "certDir": "", "port": 5443 },
      "injector": {
        "cniEnabled": false,
        "initContainer": { "image": "kuma/kuma-init:latest" },
        "sidecarContainer": {
          "adminPort": 9901,
          "drainTime": "30s",
          "gid": 5678,
          "image": "kuma/kuma-dp:latest",
          "livenessProbe": {
            "failureThreshold": 12,
            "initialDelaySeconds": 60,
            "periodSeconds": 5,
            "timeoutSeconds": 3
          },
          "readinessProbe": {
            "failureThreshold": 12,
            "initialDelaySeconds": 1,
            "periodSeconds": 5,
            "successThreshold": 1,
            "timeoutSeconds": 3
          },
          "redirectPortInbound": 15006,
          "redirectPortOutbound": 15001,
          "resources": {
            "limits": { "cpu": "1000m", "memory": "512Mi" },
            "requests": { "cpu": "50m", "memory": "64Mi" }
          },
          "uid": 5678
        }
      }
    }
  },
  "sdsServer": {
    "dataplaneConfigurationRefreshInterval": "1s",
    "grpcPort": 5677,
    "tlsCertFile": "/tmp/792743550.crt",
    "tlsKeyFile": "/tmp/964085189.key"
  },
  "store": {
    "cache": { "enabled": true, "expirationTime": "1s" },
    "kubernetes": { "systemNamespace": "kuma-system" },
    "postgres": {
      "connectionTimeout": 5,
      "dbName": "kuma",
      "host": "127.0.0.1",
      "maxOpenConnections": 0,
      "password": "*****",
      "port": 15432,
      "tls": { "caPath": "", "certPath": "", "keyPath": "", "mode": "disable" },
      "user": "kuma"
    },
    "type": "memory"
  },
  "xdsServer": {
    "dataplaneConfigurationRefreshInterval": "1s",
    "dataplaneStatusFlushInterval": "1s",
    "diagnosticsPort": 5680,
    "grpcPort": 5678,
    "tlsCertFile": "",
    "tlsKeyFile": ""
  }
}
```


## 网络
* https://kuma.io/docs/latest/documentation/networking

__Standalone Control Plane__

| port     | protocol                                                                                                                                                                                                              | desc |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 5676     | Monitoring Assignment server that responds to discovery requests from monitoring tools, such as Prometheus, that are looking for a list of targets to scrape metrics from, e.g. a list of all dataplanes in the mesh. |
| 5677     | SDS server being used for propagating mTLS certificates across the data-planes.                                                                                                                                       |
| 5678     | xDS gRPC server implementation that the data-planes will use to retrieve their configuration.                                                                                                                         |
| 5679     | Admin Server that serves Dataplane Tokens and manages Provided Certificate Authority                                                                                                                                  |
| 5680     | HTTP server that returns the health status of the control-plane.                                                                                                                                                      |
| 5681     | HTTP API server that is being used by kumactl, and that you can also use to retrieve Kuma's policies and - when running in universal - that you can use to apply new policies. It also exposes the Kuma GUI at /gui   |
| 5682     | HTTP server that provides the Envoy bootstrap configuration when the data-plane starts up.                                                                                                                            |
| 5685     | Kuma Discovery Service port, leveraged in Distributed control plane mode                                                                                                                                              |
| 5653/udp | Kuma DNS server                                                                                                                                                                                                       |
