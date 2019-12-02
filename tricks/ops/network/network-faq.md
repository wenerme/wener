# FAQ



## What is kernel ip forwarding
* [What is kernel ip forwarding?](https://unix.stackexchange.com/q/14056/47774)

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
```

"IP forwarding" is a synonym for "routing." It is called "kernel IP forwarding" because it is a feature of the Linux kernel.

A router has multiple network interfaces. If traffic comes in on one interface that matches a subnet of another network interface, a router then forwards that traffic to the other network interface.

## Bridge vs NAT
https://serverfault.com/q/490043/190601

https://en.wikipedia.org/wiki/Bridging_(networking)
https://en.wikipedia.org/wiki/Network_address_translation


## tinc vs wireguard
* [wireguard what do you guys tinc?](https://www.tinc-vpn.org/pipermail/tinc/2017-February/004755.html)
* tinc 是用户空间的, 相对更慢
* wg 目前只支持 ipv4, ipv6, 不支持 ethernet 层通道

