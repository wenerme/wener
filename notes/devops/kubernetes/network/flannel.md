---
title: Flannel
---

# Flannel


- [flannel-io/flannel](https://github.com/flannel-io/flannel)
  - layer 2
  - overlay network
  - 每个节点一个 CIDR 段
- [支持后端](https://github.com/flannel-io/flannel/blob/master/Documentation/backends.md)
  - vxlan
    - 大多时候默认
    - DirectRouting 可以在相同 subnet 时直连 - 类似 host-gw
  - host-gw
    - 性能更好 - ip ro add 的方式添加路由
    - 需要 2 层直连 - TincVPN, n2n 可以
- [执行方式](https://github.com/coreos/flannel/tree/master/dist)
- flanneld
  - 每个节点上执行一个 daemon

```bash
# kube-flannel - vxlan
# https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

<!--
The flannel host-gw option was the first solution I evaluated.
This backend takes the PodCIDR addresses assigned to all of the nodes and creates routing table entries so the workers can reach each other through the cluster IP range.
In addition, flanneld will NAT the cluster IPs to the host IP if a pod needs to contact a host outside of the local broadcast domain.
The flannel daemon (flanneld) runs as a DaemonSet so one pod (and one flanneld daemon) will be created on each worker.
Setting up the flannel host-gw is ridiculously easy.
-->

## vxlan

```json
{
  "Network": "10.50.0.0/16",
  "Backend": {
    "Type": "extension",
    "PreStartupCommand": "export VNI=1; export IF_NAME=flannel-vxlan; ip link del $IF_NAME 2>/dev/null; ip link add $IF_NAME type vxlan id $VNI dstport 8472 nolearning && ip link set mtu 1450 dev $IF_NAME && cat /sys/class/net/$IF_NAME/address",
    "PostStartupCommand": "export IF_NAME=flannel-vxlan; export SUBNET_IP=`echo $SUBNET | cut -d'/' -f 1`; ip addr add $SUBNET_IP/32 dev $IF_NAME && ip link set $IF_NAME up",
    "ShutdownCommand": "export IF_NAME=flannel-vxlan; ip link del $IF_NAME",
    "SubnetAddCommand": "export SUBNET_IP=`echo $SUBNET | cut -d'/' -f 1`; export IF_NAME=flannel-vxlan; read VTEP; ip route add $SUBNET nexthop via $SUBNET_IP dev $IF_NAME onlink && arp -s $SUBNET_IP $VTEP dev $IF_NAME && bridge fdb add $VTEP dev $IF_NAME self dst $PUBLIC_IP"
  }
}
```

## host-gw

```json
{
  "Network": "10.50.0.0/16",
  "Backend": {
    "Type": "extension",
    "SubnetAddCommand": "ip route add $SUBNET via $PUBLIC_IP",
    "SubnetRemoveCommand": "ip route del $SUBNET via $PUBLIC_IP"
  }
}
```

## wireguard

```json
{
  "Network": "10.50.0.0/16",
  "Backend": {
    "Type": "extension",
    "PreStartupCommand": "wg genkey | tee privatekey | wg pubkey",
    "PostStartupCommand": "export SUBNET_IP=`echo $SUBNET | cut -d'/' -f 1`; ip link del flannel-wg 2>/dev/null; ip link add flannel-wg type wireguard && wg set flannel-wg listen-port 51820 private-key privatekey && ip addr add $SUBNET_IP/32 dev flannel-wg && ip link set flannel-wg up && ip route add $NETWORK dev flannel-wg",
    "ShutdownCommand": "ip link del flannel-wg",
    "SubnetAddCommand": "read PUBLICKEY; wg set flannel-wg peer $PUBLICKEY endpoint $PUBLIC_IP:51820 allowed-ips $SUBNET",
    "SubnetRemoveCommand": "read PUBLICKEY; wg set flannel-wg peer $PUBLICKEY remove"
  }
}
```
