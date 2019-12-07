---
id: tinc-multi-path
title: 如何配置 TINC 实现多路容灾？
date: 2019-12-08
---

## 场景

<!--
@startdot
digraph G {
node[shape=box,style=filled,color=transparent]
graph [splines=ortho, nodesep=1]

subgraph cluster_a {
  host_a[label=<A主机<br/>公网 192.0.0.1>,fillcolor="#BBDEFB",color=transparent]
  host_b[label=<B主机<br/>公网 192.0.0.2>,fillcolor="#BBDEFB",color=transparent]

  {rank=same; host_a host_b}
  host_a -> host_b [style=invis]

  label="服务商 A"
}

subgraph cluster_b {
  host_c[label=<B主机<br/>公网 192.1.0.2>,fillcolor="#C8E6C9"]
  label="服务商 B"
}


subgraph cluster_c {
  home[label=<电脑/手机>,fillcolor="#FFF9C4"]
  relay[label=<中继节点<br/><font point-size="10">例如 家里路由/WiFi</font><br/>TINC 10.0.0.2/32>,fillcolor="#FFF9C4"]

  label="家庭网/局域网"
  labelloc=b
}

tincnet[label=<TINC接入点<br/>公网 192.0.0.3<br/>TINC地址 10.0.0.1/24>,fillcolor="#FFCDD2"]

host_a, host_b, host_c -> relay
relay -> home

}
@enddot
-->

![网络结构](http://www.plantuml.com/plantuml/svg/ZPDFJzH06CRl_HIJUYrsMuXnmxQ1Tgdnuid4msP3fktWJfoTQJg34Ga9sOX6K18IlAqX7j2Bg1nKXEYdsTcktyBfFuYmHDEaV-TzVi_xz9q5Bc0gOYQq63zCOT83Ty2wHbcCEhm74-I4x8d1nHf1pWec1CL6n0XB7P52oXEO8YgwMbdOuGd15767fQB7392BS9GuLbVJ-6fOBeh8AXSeNOQA0a2FSR4CEmI6Y3YjnT79sNXusWfJqvLR7xEVUy1gsZSRwh1S8yUNRFs6vxMN0a-VvgKI3MjHxtfH-xz5bUgwUdxaSDX7yvNj2hHntWUOSQjtAeiYCamVOrwKbsxqyV2rt7udtpm7YxgsCIMNy2ANw1yjM5TRy6yltVARUdSQq2k0LubHHUoZcfVjVvqyspF7BtSKzMz040HDVwu0f8Z0jRfaT7AKdNsOR0-omO_2Psk5KG4IXgcOuVWfSdIheRkZNplo_G38Jzz-ltWr-Vuvspys7-00jynykLjKthzxpmTMe_n3vgnzZO6B5fMQF3rIgPZoU5CU7AWxlVvAMEI4UTy2quWYKVlD8UFTGxbrM1k-D1kpvrxay8jykraxianxxh8ZlzssSqVb51ZL35JNA9-A8YkjE9T3qaUQShM0QAostXy0)

* 现有 3 台服务器提供相同的服务，希望使用同一个 IP 进行访问
  * 即为 A B C 主机提供 VIP/虚拟 IP
* 需要支持 2层 转发 - 网桥、网关
  * 如果不需要 2层 也可以考虑 Nginx/HAProxy 等进行转发
  * 使用 mac 寻址
* 一个节点异常后能够快速切换到其它节点
* __不__ 需要负载均衡 - 多路不会进行负载

## 原理

* Tinc 支持两种工作模式 - Route 和 Switch - 分别工作在 3 层和 2 层 - 默认使用 Route
* 使用 Switch 模式时每个节点会生成 mac 地址用于路由
* 访问 IP 时会通过 arp 将 IP 转换为 mac 地址
* 在多个节点上配置相同的 IP，即可以做到多路容灾

## 部署

