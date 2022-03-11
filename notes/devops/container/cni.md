---
title: CNI
---

# CNI

- 是什么？
  - 抽象容器网络接口规范
  - cni-plugins 提供了大量实现
- [containernetworking/cni](https://github.com/containernetworking/cni) - 规范
- [containernetworking/plugins](https://github.com/containernetworking/plugins) - 参考实现
  - [包内容](https://pkgs.alpinelinux.org/contents?branch=edge&name=cni-plugins&arch=x86_64&repo=community)
- alpine 默认安装路径 `/usr/libexec/cni/`
- 默认网络配置目录 `/etc/cni/net.d`
- CNI 包含了启动脚本 - [cni/scripts](https://github.com/containernetworking/cni/tree/master/scripts)
  - 操作 netns - `ip netns`
  - `exec-plugins add|del CNI_CONTAINERID CNI_NETNS`
    - CNI_CONTAINERID - 容器 ID
      - 唯一标示目的，可以随机生成
      - docker 可直接使用 容器 ID
      - 例如 `printf '%x%x%x%x' $RANDOM $RANDOM $RANDOM $RANDOM`
    - CNI_NETNS - 网络命名空间路径
      - `/proc/<pid>/ns/net`

| Type              | Desc                                          |
| ----------------- | --------------------------------------------- |
| Main: 网口创建    |
| bridge            | 创建桥接，添加宿主机和容器网络到桥接          |
| ipvlan            | 添加 ipvlan 到容器                            |
| loopback          | ip li set lo1 up                              |
| macvlan           | 创建 macvlan 给容器，转发 mac 流量            |
| ptp               | veth 对                                       |
| vlan              | 创建 vlan                                     |
| host-device       | 透传已存在设备                                |
| Windows           |
| win-bridge        |
| win-overlay       |
| IPAM: IP 地址申请 |
| dhcp              | DHCP 申请                                     |
| host-local        | 管理本地申请到的 IP                           |
| static            | 使用静态地址                                  |
| Meta: 其他插件    |
| flannel           | 基于 flannel 生成网口                         |
| tuning            | 通过 sysctl 修改网口配置                      |
| portmap           | 基于 iptables 的端口映射 - 主机地址端口到容器 |
| bandwidth         | 进出带宽限制                                  |
| sbr               | 基于来源的路由                                |
| firewall          | 基于 iptables 或 firewalld 的防火墙控制       |

## spec

- add,delete,version
- stdin, stdout
- CNI_ARGS, CAP_ARGS

```bash
cat <<CONF > bridge.conf
{
  "name": "mynet",
  "type": "bridge",
  "ipam": {
    "type":"host-local",
    "subnet": "10.10.1.0/24"
  }
}
CONF
ip netns add ns1

CNI_COMMAND=ADD CNI_CONTAINERID=ns1 CNI_NETNS=/var/run/netns/ns1 CNI_IFNAME=eth2 CNI_PATH="$PWD" \
bridge < bridge.conf
```

## bridge

```json
{
  "cniVersion": "0.3.1",
  // 网络名字
  "name": "mynet",
  // 网络类型 - 对应 /usr/libexec/cni/
  "type": "bridge",

  // 桥接名字 - 默认 cni0
  "bridge": "cni0",
  // 设置的 IP 作为默认路由
  "isDefaultGateway": false,
  // 设否设置新的 IP 地址
  "forceAddress": false,
  // 是否配置 masquerade
  "ipMasq": false,
  // MTU 默认取决于 内核
  "mtu": 0,
  // hairpin 模式
  "hairpinMode": false,
  // IP 地址管理 - L2 网络
  "ipam": {
    "type": "host-local",
    "subnet": "10.10.0.0/16"
  },
  // promiscuous 模式
  "promiscMode": false
  // 是否设置 VLAN tag
  // "vlan":0
}
```

## Windows

- win-overlay
- win-bridge
- host-local
- flannel

```bash
cat <<CONF > overlay.conf
{
	"name": "mynet",
	"type": "win-overlay",
	"ipMasq": true,
	"endpointMacPrefix": "0E-2A",
	"ipam": {
		"type": "host-local",
		"subnet": "10.10.0.0/16"
	},
  "loopbackDSR": true,
  "capabilites": {
      "dns": true
  }
}
CONF

CNI_COMMAND=ADD CNI_CONTAINERID=ns1 CNI_NETNS=/var/run/netns/ns1 CNI_IFNAME=eth2 CNI_PATH="$PWD" \
./win-overlay < overlay.conf
```

## error while GETHNSNewtorkByName(mynet): hnsCall failed in Win32: The specified module could not be found. (0x7e)
