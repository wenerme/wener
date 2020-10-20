# Open vSwitch

## Tips
* [Open vSwitch](https://www.openvswitch.org/)
  * Apache 2.0
  * Linux 3.3
  * VM 交互 - NetFlow、sFlow
  * LACP - 链路聚合控制协议
  * VLAN
  * QoS
  * HFSC
  * Per Interface Policy
* Why
  * 分布式虚拟化部署
  * 动态终端
  * 逻辑抽象
  * 硬件集成或 OffLoad
* http://containertutorials.com/network/ovs_docker.html
* [SDN OpenFlow Controller](https://github.com/floodlight/floodlight)
* https://www.slideshare.net/rajdeep/openvswitch-deep-dive

## FAQ
### OpenVSwitch vs Linux Bridge
* OVS
  * 多协议 - GRE、VXLAN、IPsec
  * 管理能力 - OpenFlow、OVSDB 
  * SDN 能力
  * QoS、流控、安全、隔离、监控
  * 可作为 2 层或 3 层交换
  * 复杂
* Linux Bridge
  * Linux 内建
  * 只支持 GRE Tunnel
  * 只工作在 2 层
* [OVS vs Linux Bridge](http://www.fiber-optic-transceiver-module.com/ovs-vs-linux-bridge-who-is-the-winner.html)
