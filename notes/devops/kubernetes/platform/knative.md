---
id: knative
title: Knative
---

# Knative

## Tips
* KNative 提供标准化的 serverless 开发所需组件 - 提供基石
  * OpenFaas、OpenWhisk 可以运行在 KNative 之上
* Gitlab 集成了 KNative 作为 Serveless 运行环境
* 注意
  * 最低系统要求 3节点 6vCPU 22.5G内存 启用 RBAC
  * knative 还不支持 istio 的 mTLS
    * [knative/serving#3903](https://github.com/knative/serving/issues/3903)
  * 如果配置失败会导致一直失败 - 如果一直出现 CrashLoopBackOff 需要检查配置
* 组件
  * knative-eventing - 事件 - 管理和分发事件
  * knative-serving - 服务 - 请求驱动的计算 - 可缩容到 0
  * knative-monitoring - 监控和日志 - elastic/kibana/fluentd/prometheus

## 安装
* https://knative.dev/docs/install/any-kubernetes-cluster/

```bash
# 任意 k8s 的安装逻辑
# 目前还没有正式发布 - 20191130 - 因此取到的是预发布版本
knative_version=$(curl -s https://api.github.com/repos/knative/serving/releases | jq -r '.[0].tag_name')

# crd 安装 - 避免 race conditions
kubectl apply --selector knative.dev/crd-install=true \
--filename https://github.com/knative/serving/releases/download/$knative_version/serving.yaml \
--filename https://github.com/knative/eventing/releases/download/$knative_version/release.yaml \
--filename https://github.com/knative/serving/releases/download/$knative_version/monitoring.yaml

# 再次执行
kubectl apply \
--filename https://github.com/knative/serving/releases/download/$knative_version/serving.yaml \
--filename https://github.com/knative/eventing/releases/download/$knative_version/release.yaml \
--filename https://github.com/knative/serving/releases/download/$knative_version/monitoring.yaml

# 安装完成查看安装内容
kubectl get pods --namespace knative-serving
kubectl get pods --namespace knative-eventing
kubectl get pods --namespace knative-monitoring
```

## 部署服务

```bash
# 部署一个服务
kubectl apply -f- <<YAML
apiVersion: serving.knative.dev/v1 # Knative 当前版本
kind: Service
metadata:
  name: helloworld-go # 应用名字
  namespace: default # 部署的空间
spec:
  template:
    spec:
      containers:
        - image: gcr.io/knative-samples/helloworld-go # 应用的镜像
          env:
            - name: TARGET # 环境变量定义
              value: "Go Sample v1"
YAML

# 会获取到该服务的 URL
# 如果设置过域名，那么看到的就是带域名的 URL - 格式为 http://服务名.空间.域名 - 例如 http://helloworld-go.default.wener.me
# 查看域名配置 - kubectl get cm config-domain -n knative-serving -o jsonpath={.data}
kubectl get ksvc helloworld-go -n default

# 获取 URL
kubectl get route helloworld-go --output jsonpath="{.status.url}" -n default

# 实际服务访问是通过 istio-ingressgateway 暴露的
# 可通过 istio 的负载均衡地址进行访问
kubectl get svc istio-ingressgateway --namespace istio-system --output jsonpath="{.status.loadBalancer.ingress[*]['ip']}"

# 删除服务
kubectl -n default delete ksvc helloworld-go
```

## 配置
* 所有的配置外面都有一个 Key

```yaml
my_config: |
  # 这里才是实际的配置 - 下面的配置都只是这部分内容
```

### config-autoscaler

```yaml
# 配置中的 ContainerConcurrency 指定了容器能处理的并发数
# 这个配置是在总量的多少算是正常状态 - 例如 总量是 10 这里配置 70 则 <= 7 的时候算是稳定的量
container-concurrency-target-percentage: "70"

# The container concurrency target default is what the Autoscaler will
# try to maintain when concurrency is used as the scaling metric for a
# Revision and the Revision specifies unlimited concurrency.
# Even when specifying unlimited concurrency, the autoscaler will
# horizontally scale the application based on this target concurrency.
# NOTE: Only one metric can be used for autoscaling a Revision.
container-concurrency-target-default: "100"

# The requests per second (RPS) target default is what the Autoscaler will
# try to maintain when RPS is used as the scaling metric for a Revision and
# the Revision specifies unlimited RPS. Even when specifying unlimited RPS,
# the autoscaler will horizontally scale the application based on this
# target RPS.
# Must be greater than 1.0.
# NOTE: Only one metric can be used for autoscaling a Revision.
requests-per-second-target-default: "200"

# The target burst capacity specifies the size of burst in concurrent
# requests that the system operator expects the system will receive.
# Autoscaler will try to protect the system from queueing by introducing
# Activator in the request path if the current spare capacity of the
# service is less than this setting.
# If this setting is 0, then Activator will be in the request path only
# when the revision is scaled to 0.
# If this setting is > 0 and container-concurrency-target-percentage is
# 100% or 1.0, then activator will always be in the request path.
# -1 denotes unlimited target-burst-capacity and activator will always
# be in the request path.
# Other negative values are invalid.
target-burst-capacity: "200"

# When operating in a stable mode, the autoscaler operates on the
# average concurrency over the stable window.
stable-window: "60s"

# When observed average concurrency during the panic window reaches
# panic-threshold-percentage the target concurrency, the autoscaler
# enters panic mode. When operating in panic mode, the autoscaler
# scales on the average concurrency over the panic window which is
# panic-window-percentage of the stable-window.
panic-window-percentage: "10.0"

# Absolute panic window duration.
# Deprecated in favor of panic-window-percentage.
# Existing revisions will continue to scale based on panic-window
# but new revisions will default to panic-window-percentage.
panic-window: "6s"

# The percentage of the container concurrency target at which to
# enter panic mode when reached within the panic window.
panic-threshold-percentage: "200.0"

# 最大扩容率 - 必须 > 1
max-scale-up-rate: "1000.0"

# 最大缩容率 - 必须 > 1
max-scale-down-rate: "2.0"

# 是否缩容到 0
enable-scale-to-zero: "true"

# autoscaling 的计算间隔
tick-interval: "2s"

# 动态参数 - 在 configmap 更新后生效

# 缩容到 0 的等待时间
scale-to-zero-grace-period: "30s"
```

### config-domain
* [使用自定义域名](https://knative.dev/docs/serving/using-a-custom-domain/)

```yaml
# 最后选择的域名 - 因为配置信息最少
example.com: |

# 为应用指定分配的域名
example.org: |
  selector:
    app: nonprofit

# svc.cluster.local 域名不会通过 Ingress 暴露
# 也可以设置 标签 "serving.knative.dev/visibility=cluster-local" 来达到同样的目的
svc.cluster.local: |
  selector:
    app: secret
```

### config-tracing

```yaml
# 后端 - 可选为 none zipkin stackdriver
backend: "none"

# zipkin 的后端地址
zipkin-endpoint: "http://zipkin.istio-system.svc.cluster.local:9411/api/v2/spans"

# stackdriver 的项目 ID
stackdriver-project-id: "my-project"

# zipkin 的 debug 模式 - 开启后不会进行采样而是全量输出
debug: "false"

# 0-1 的采样率
sample-rate: "0.1"
```
