---
id: k8s-network
title: Kubernates 网络
---

# Kubernates Network

## 网络设计
* 物理网络 - Phycial Net - OS Net
  * 节点之际网络通信
  * 宿主机实际网络 - 例如 eth0
  * 地址为 node-ip
* 容器网络 - Pod Net
  * 容器之间互通的网络
  * 每个容器都有唯一独立 IP
  * 通常实现是一个节点一个子网，让给 Pod 分配子网进行通信
  * Pod 网络流量在物理网络上看不到 - 例如 eth0 上看不到
  * CNI - Container Network Interface - 容器网络接口 - 标准化了容器之间网络实现接口
    * JSON 配置 - 插件化
    * kubelet 在每次启动 pod 前都会调用 cni 插件
    * `/etc/cni/net.d`
    * `/opt/cni/bin`
    * 常见后端
      * linux-bridge
      * ipvlan
      * macvlan
      * Open vSwitch
  * 有非常多不同的实现
    * flannel - 会在节点上创建 flannel1.1 网卡来通信
* 服务网络 - Service Net
  * 集群内部服务发现、流量分发
  * 服务发现 - 例如 nginx.default.svc.cluser.local 域名
  * 没有访问控制、没有流量控制
  * 虚拟地址 - VIP - Virtual IP
  * 三种模式
    * ClusterIP
    * LoadBalancer
    * NodePort
  * kube-proxy - 配置 iptables 暴露服务
    * 通过修改 iptables 来实现流量转发
    * iptables 指向每个 endpoint
    * 每个包打随机数用来实现负载 - 但不精确
  * iptables-save 会看到 `KUBE-SERVICE` 相关的规则
  * service-cird 指定了 ClusterIP 的地址段
  * 服务之下为 Endpoint - 通常为 Pod，也可以直接定义 Endpoint
* Ingress
  * Kubernates 的网络入口，将服务暴露到外部
  * 直接与 Pod 通信而不是与服务通信
  * 通常为 7 层 HTTP - 部分支持 4 层 TCP
  * 大多实现也支持 CRD 方式，支持更复杂的定义逻辑
* Egress - 出口流量
  * 使用较少，目前 calico 支持
* 参考
  * [The Easy--Don't Drive Yourself Crazy--Way to Kubernetes Networking [B] - Gerard Hickey](https://www.youtube.com/watch?v=H5Zl_kDOwBU)
  * [An illustrated guide to Kubernetes Networking](https://itnext.io/an-illustrated-guide-to-kubernetes-networking-part-1-d1ede3322727)

## 集群网络
* [Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
* [网络设计文档](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/network/networking.md)
* 四种网络类型
  1. 容器 到 容器
    * 对于容器本身来说它就像运行在同一个主机上
  2. Pod 到 Pod
    * 每个都有真实独立 IP
    * IP 跨节点唯一、通信
  3. Pod 到 Service
  4. 外部 到 Service
* 要求
  * Pod 之间互通 - 无 NAT
  * 节点上 Agent 和 Pod 互通
  * 支持 Host 网络的平台 - Pod 在主机网络下能与其他 Pod 互通 - 无 NAT
* 实现
  * Linux L2 层桥接网络
    * [Tinc](https://www.tinc-vpn.org/)
  * [coreos/flannel](https://github.com/coreos/flannel)
  * [projectcalico/calico](https://github.com/projectcalico/calico)
  * [ovn-org/ovn-kubernetes](https://github.com/ovn-org/ovn-kubernetes)

## 服务发现
* [Service Discovery Proposal](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/network/service-discovery.md)

__推荐 Annotation__

```json
{
  "api.service.kubernetes.io/protocol"              : "REST",
  "api.service.kubernetes.io/scheme"                : "http",
  "api.service.kubernetes.io/path"                  : "cxfcdi",
  "api.service.kubernetes.io/description-path"      : "cxfcdi/swagger.json",
  "api.service.kubernetes.io/description-language"  : "SwaggerJSON"
}
```

## resolv.conf
* [Custom /etc/resolv.conf](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/network/pod-resolv-conf.md)

## 服务网络
* [Kubernetes NodePort vs LoadBalancer vs Ingress? When should I use what?](https://medium.com/google-cloud/922f010849e0)

### ClusterIP

* 无外部访问
* 可通过 `kubectl proxy --port=8080` 进行访问 - 地址为 `http://localhost:8080/api/v1/proxy/namespaces/<NAMESPACE>/services/<SERVICE-NAME>:<PORT-NAME>/`
* 用于调试和暴露内部服务

```yaml
apiVersion: v1
kind: Service
metadata:  
  name: my-internal-service
spec:
  selector:    
    app: my-app
  type: ClusterIP
  ports:  
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP
```

### NodePort
* 提供外部访问最原始的方法
* 在所有节点开启相同端口进行转发
* 缺点
  * 一个服务只能暴露一个端口
  * 端口限定在 30000–32767
  * 需要关注节点地址变化
* 场景
  * 演示服务
  * 单端口服务 - 例如 DNS

```yaml
apiVersion: v1
kind: Service
metadata:  
  name: my-nodeport-service
spec:
  selector:    
    app: my-app
  type: NodePort
  ports:  
  - name: http
    port: 80
    targetPort: 80
    # 不指定则随机分配
    # 30000-32767
    nodePort: 30036
    protocol: TCP
```

### LoadBalancer
* 标准的暴露服务方式
* 每个服务都会获取到自己的IP - 因此每个暴露的服务都会需要对负载均衡付费
* 缺点
  * 负载均衡是由平台提供且伴随费用
* 参考
  * [danderson/metallb](https://github.com/danderson/metallb) - 基于路由的内部 LB 实现
  * 可通过自定义 [Cloud Controller Manager](https://kubernetes.io/docs/tasks/administer-cluster/developing-cloud-controller-manager/) 来提供 LoadBalancer
  * [Create an External Load Balancer](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer)
  * NGINX Ingress Controller [Bare-metal considerations](https://kubernetes.github.io/ingress-nginx/deploy/baremetal)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: example-service
spec:
  selector:
    app: example
  ports:
    - port: 8765
      targetPort: 9376
  type: LoadBalancer
```

```bash
# 将某个服务通过负载均衡的方式进行端口暴露
kubectl expose svc web --type=LoadBalancer --port=80 --target-port=8080 --external-ip=192.168.1.2 --name=web-lb

# 查看服务状态包含地址信息
kubectl describe svc ingress-nginx-ingress-controller
```


### Ingress
* 不是一个服务
* 应用层路由 - 分为 Ingress 定义和 IngressController 控制器
* 常见实现 Nginx、Istio、[Traefik](https://github.com/containous/traefik)、[Contour](https://github.com/projectcontour/contour)
* 一般需要配套 cert-manager 使用
* 能附带其它能力 SSL、鉴权、路由等
* 场景
  * 使用 HTTP 协议
  * 一个后端暴露多个服务

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: my-ingress
spec:
  backend:
    serviceName: other
    servicePort: 8080
  rules:
  - host: foo.mydomain.com
    http:
      paths:
      - backend:
          serviceName: foo
          servicePort: 8080
  - host: mydomain.com
    http:
      paths:
      - path: /bar/*
        backend:
          serviceName: bar
          servicePort: 8080
```


### ExternalName
* 会将 `my-service.prod.svc.cluster.local` CNAME 为 `my.database.example.com`
* 如果使用 SSL 会有证书问题
* 如果使用的环境 DNS 不互通也会有问题

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: prod
spec:
  type: ExternalName
  externalName: my.database.example.com
```

### ExternalIPs

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 9376
  externalIPs:
    - 80.11.12.10
```
