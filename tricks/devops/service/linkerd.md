---
id: linkerd
title: Linkerd
---

# Linkerd
## Tips
* [架构](https://linkerd.io/2/reference/architecture/)
  * 组件
    * cp
      * sp-validator - Service Profile Validator
        * admission controller
        * 当 service profile 保存的时候校验
      * destination
      * identity - CA, 接受代理的 CSR 请求
      * heartbeat
      * web
      * tap
        * 接受 cli 和 dashboard 请求监听代理的流量
      * proxy-injector
        * admission controller
        * 添加注入逻辑，使用 initContainer 初始化 iptables
      * grafana
      * prometheus
    * dp
      * proxy - linkerd2-proxy
      * linkerd-init
* Control Plane
  * [linkerd/linkerd2](https://github.com/linkerd/linkerd2)
* Dataplane
  * [linkerd/linkerd2-proxy](https://github.com/linkerd/linkerd2-proxy)
  * 无配置代理 - iptable 转发
  * /metrics
  * WebSocket 代理
  * 延时感知的 L7 负载均衡
  * L4 TCP 负载均衡
  * mtls
  * `tap` 诊断接口 - 类似 tcpdump 概念
* 特性
  * HTTP, HTTP/2, gRPC
  * TCP 代理和协议检测
  * 超时、重试
  * mtls
  * 不提供 Ingress，与现有 Ingress 共存
  * 指标监控
    * 为所有流量记录核心指标 - request volume, success rate, latency distributions
    * 记录 TCP 指标
    * 根据 Service Profile 记录请求、被请求指标
    * 生成拓扑图
    * 请求采样
    * 查看
      * `linkerd stat`, `linkerd routes`
      * dashboard -> Grafana
      * 内建 Prometheus 实例
        * 默认保留 6 小时
  * 负载均衡 - EWMA 算法 - exponentially weighted moving average
  * 自动注入 - `linkerd.io/inject: enabled`
    * admission webhook 实现
    * linkerd-init 配置 iptables
    * linkerd-proxy - dp
    * 添加 annotation 后需要 `kubectl rollout restart`
    * 主动禁用 `linkerd.io/inject: disabled`
  * CNI 插件
    * 使用了则不需要 linkerd-init 配置 iptables，会自动重写
  * 集成 grafana
  * 分布式跟踪
  * Fault Injection
  * ha cp
    * `linkerd install --ha --controller-replicas=2`
  * 跨集群通信
  * Service Profile
    * 提供额外接口信息
  * 流量切分
* `linkerd install`
  * 默认安装到 linkerd 空间
  * ClusterRole - `$NAMESPACE-linkerd-$COMPONENT`
    * linkerd-linkerd-identity
    * linkerd-linkerd-controller
    * linkerd-linkerd-destination
    * linkerd-linkerd-prometheus
    * linkerd-linkerd-proxy-injector
    * linkerd-linkerd-sp-validator
    * linkerd-linkerd-tap
  * linkerd-heartbeat
  * linkerd-web
  * crds
    * serviceprofiles.linkerd.io/v1alpha2
    * trafficsplits.split.smi-spec.io/v1alpha1
  * secret/linkerd-proxy-injector-tls
  * secret/linkerd-sp-validator-tls
  * secret/linkerd-tap-tls
  * cm/linkerd-config
  * cm/linkerd-config-addons
  * deploy/linkerd-identity
  * deploy/linkerd-controller
    * svc/linkerd-controller-api
  * deploy/linkerd-destination
    * svc/linkerd-dst
  * cronjob/linkerd-heartbeat
    * linkerd telemetry
  * deploy/linkerd-web
    * svc/linkerd-web
  * deploy/linkerd-prometheus
    * svc/linkerd-prometheus
    * cm/linkerd-prometheus-config
  * deploy/linkerd-proxy-injector
    * svc/linkerd-proxy-injector
  * deploy/linkerd-sp-validator
    * svc/linkerd-sp-validator
  * deploy/linkerd-tap
    * svc/linkerd-tap
  * deploy/linkerd-grafana
    * svc/linkerd-grafana
    * cm/linkerd-grafana-config

```bash
brew install linkerd

linkerd version
linkerd check --pre

linkerd install | kubectl apply -f -

linkerd check

kubectl -n linkerd get deploy

linkerd dashboard
linkerd -n linkerd top deploy/linkerd-web

# 注入
kubectl get -n emojivoto deploy -o yaml \
  | linkerd inject - \
  | kubectl apply -f -
```

## 安装
```bash
# https://linkerd.io/2/reference/cli/install/
# --addon-config - 自定义配置
# --controller-replicas=1
# --disable-heartbeat 
# --registry=gcr.io/linkerd-io 默认镜像仓库
# cmi - https://github.com/wenerme/container-mirror
linkerd install --disable-heartbeat --registry registry.cn-hongkong.aliyuncs.com/cmi

# 所有的镜像
linkerd install | grep 'image: ' | sed -r 's/\s*image:\s*(.*)/\1/' | sort -u

linkerd install | grep 'image: ' | sed -r 's/\s*image:\s*(.*)/\1/' | sort -u | xargs -n 1 -I {} echo A {} B
```
