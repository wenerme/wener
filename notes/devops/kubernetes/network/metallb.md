---
title: MetalLB
---

# MetalLB

- 注意
  - 不能 PING https://github.com/danderson/metallb/issues/259
  - 支持 `externalTrafficPolicy` 选项 - BGP 和 L2 行为不一样
  - [网络兼容](https://metallb.universe.tf/installation/network-addons/)
    - Canal Cilium Flannel
- [L2](https://metallb.universe.tf/concepts/layer2/) 使用 ARP/NDP - 配置简单
  - 会监听所有网卡
  - 流量只会到 **一个节点** 不是真正的负载均衡
  - 实现了 failover 机制 - 旧的 leader 有 10s 的租约
- [BGP](https://metallb.universe.tf/concepts/bgp/) - 配置相对复杂
  - 每个节点于网络路由器建立 BGP 会话
  - 如果路由配置了多路支持 - 那么配合 metallb 宣告的地址则能实现 **真正的负载均衡** - 而不只是使用一个作为 下一跳/nexthop
  - 网络变化时会有一瞬间的中断
  - 一般使用基于 hash 的负载均衡 - 部分场景下会有问题
- MetalLB 安装后如果不配置也是没有开始工作的
- 原理
  - `metallb-system/controller` deployment 处理 IP 分发
  - `metallb-system/speaker` daemonset 在每个节点上响应路由
    - 响应 ARP，申明节点有 IP 并返回 MAC

```bash
# 通过 arping 检测网络互通
# interface 和地址需要对应
arping -I eth0 192.168.10.1

# 在另外的节点上可以通过 tcpdump 检测网络互通
tcpdump -n -i eth0 arp src host 192.168.1.240

# metallb
# 下载到本地安装
ver=$(curl -Ls https://api.github.com/repos/danderson/metallb/releases/latest | jq -r .tag_name)
curl https://raw.githubusercontent.com/danderson/metallb/$ver/manifests/metallb.yaml -Lo metallb-$ver.yaml
curl https://raw.githubusercontent.com/danderson/metallb/$ver/manifests/namespace.yaml -Lo metallb-namespace-$ver.yaml
kubectl apply -f metallb-namespace-$ver.yaml
kubectl apply -f metallb-$ver.yaml

# 第一次安装
kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"

# 配置生效
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - 192.168.128.0/17
EOF
```

## 配置

- [example-config.yaml](https://github.com/danderson/metallb/blob/main/manifests/example-config.yaml)
- [配置文档](https://metallb.universe.tf/configuration)

### L2

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - 192.168.1.240-192.168.1.250
      - 192.168.144.0/20
```

### BGP

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    peers:
    - peer-address: 10.0.0.1
      peer-asn: 64501
      my-asn: 64500
    address-pools:
    - name: default
      protocol: bgp
      addresses:
      - 192.168.10.0/24
```

## 服务特殊配置

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
  annotations:
    # 选择地址池 - 否则使用默认
    metallb.universe.tf/address-pool: production-public-ips
    # 如果允许共享 IP 那么可能两次拿到相同的
    metallb.universe.tf/allow-shared-ip: true
spec:
  ports:
    - port: 80
      targetPort: 80
  selector:
    app: nginx
  type: LoadBalancer
```

## FAQ

### 修改 IP 地址池

- [danderson/metallb#308](https://github.com/danderson/metallb/issues/308)

```bash
# 确认上次分发的 IP
kubectl get svc
# 删除旧的配置
kubectl -n metallb-system delete cm config
# 应用新的配置
kubectl apply -f new.yml
# 删除 metallb 容器
kubectl -n metallb-system delete pod --all
# 确保恢复
kubectl -n metallb-system get pods -w
# 查看新获取到的 IP
kubectl get svc
```

## Annotations

- metallb.universe.tf/allow-shared-ip
