---
title: Kubernetes DNS
---

# Kubernetes DNS

- [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
- Service
  - A/AAAA - `my-svc.my-namespace.svc.cluster-domain.example`
  - SRV - `_my-port-name._my-port-protocol.my-svc.my-namespace.svc.cluster-domain.example`
- Pod
  - A/AAAA
    - `<pod-ip-address>.my-namespace.pod.cluster-domain.example`
    - `172-17-0-3.default.pod.cluster.local`
  - hostname, subdomain
    - `<hostname>.<subdomain>.my-namespace.svc.cluster-domain.example`
  - setHostnameAsFQDN - 1.19 Alpha
- pod.spec.dnsPolicy
  - Default
    - 从运行节点集成
  - ClusterFirst
    - 集群域名直接解析
    - 非集群域名转发到 node 指定的 dns 上游
  - ClusterFirstWithHostNet
    - 用于 hostNetwork
  - None
    - 忽略 K8S 环境下的 DNS 配置
    - 通过 dnsConfig 配置

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  namespace: default
spec:
  containers:
    - image: busybox:1.28
      command:
        - sleep
        - '3600'
      imagePullPolicy: IfNotPresent
      name: busybox
  restartPolicy: Always
  hostNetwork: true
  # DNS 策略
  dnsPolicy: ClusterFirstWithHostNet
  # 自定义 DNS 配置 - 生成 /etc/resolv.conf
  # dnsPolicy: None
  dnsConfig:
    nameservers:
      - 1.2.3.4
    searches:
      - ns1.svc.cluster-domain.example
      - my.dns.search.suffix
    options:
      - name: ndots
        value: '2'
      - name: edns0
```
