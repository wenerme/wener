---
id: istio-intro
title: Istio 服务网格
---

# Istio

## Tips
* 注意
  * ingressgateway 默认需要 LoadBalaner - 因此需要集群能获取到 IP - 在不更改配置的前提下可以使用 [metallb](./metallb)
* 架构
  * 数据层
    * 控制服务之间的网络通信
  * 控制层
    * 管理配置路由
    * 配置策略和采集
* 组件
  * Envoy 代理/Sidecar
    * 动态服务发现
    * 负载均衡
    * TLS 终止
    * HTTP/2 gRPC 代理
    * 熔断
    * 健康检查
    * 阶段发布 - 百分比流量切分
    * 错误注入
    * 指标监控
  * Mixer - 策略和远程控制
  * Pilot - 配合 Envoy 工作
    * 服务发现
    * 流量管理 - A/B 测试、灰度发布
    * 弹性 - 超时控制、重试、熔断
  * Citadel
    * 服务到服务、服务到用户 鉴权
    * 可将网格服务内的未加密通信升级为加密通信
    * 控制谁能访问什么 - 而不是简单的依赖底层的 IP 限制
  * Galley
    * 配置校验、读取、处理分发
    * 将底层系统的配置(例如 k8s)应用到 istio 体系中
* 设计目标
  * 最大的透明性
  * 扩展性
  * 便携性 - 降低对底层的感知、运行在任何云上
  * 统一的策略控制


## 常用配置项

配置 ｜ 值
----|----
values.global.mtls.enabled ｜ mTLS - 不建议开启

## 安装

```bash
# 配置列表
istioctl profile list

# 查看配置的内容
# 所有的选项可以在 apply 的时候使用 set 修改
istioctl profile dump demo
# 查看某项配置
istioctl profile dump --config-path trafficManagement.components.pilot demo

# 安装 demo 配置
# 可选 default	demo	minimal	sds	remote
# https://istio.io/docs/setup/additional-setup/config-profiles/
istioctl manifest apply --set profile=demo

# 查看安装的服务
kubectl get svc -n istio-system

# 为空间开启注入
kubectl label namespace default istio-injection=enabled
# 或者在创建应用的时候配置注入
kubectl create -n <namespace> -f <app-spec>.yaml

# 手动注入
istioctl kube-inject -f <app-spec>.yaml | kubectl apply -f -

# 卸载
istioctl manifest generate --set profile=demo | kubectl delete -f -
```

## 自定义安装

```bash
# 可以生成 Manifest 然后 kubectk 安装 - 也可以看到做了什么
istioctl manifest generate

istioctl manifest generate > istio-manifest.yaml
# 可以验证配置
istioctl verify-install -f istio-manifest.yaml
```
