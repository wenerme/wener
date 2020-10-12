---
id: tinc-transparency-proxy
title: 如何基于 TINC 实现透明代理
date: 2019-12-13
---

## 场景

![](https://www.plantuml.com/plantuml/svg/SoWkIImgISaluKh9J2zABCXGS5UevihBJqcDBiv8B4YrJSglq2akgSn9jKtBpCb9JT59pi_9Bx8jAKhCAov8B4hDAz41IK14bPITd5nStPoKOhaWXaM3J2fEBR0rZENYIaykKD2rKoXApKciZCv9J4hDiRLvsjFwOk-Qf_qJxO0ACeiX2l9BIrABO2fUxfxnOjsI5zlNFv-o4QW8h1jJbOKU21he6vc0r82bG8eAai7MmcrRCktvtealkfgUD-sqIIhIjpCqq3C4GGEWBg3jC7MUmG7wB_PFU35XwTEfRM25pwTiVR9_uUE6nXUDKrusp08odY_V_RHh1Sn5C9rFTgnzldivn0Rz44y_PqpBZ24SIoCzGpCBiELWPwC4exE5gvcpfHBCAp3J8Q6W3_J3qzRD-k6PRfdePc6OvERcxE9Y13I9go0PPioppkvdStRf0_tqecKYkd8tIsSJeF9QBeVKl1HWmW00)

__透明代理__

* 在路由上配置 IP 段的下一跳为中继节点
  * 中继节点通过 TINC 进行 IP 段转发
    * 将请求转发到位于外部 TINC 节点
    * 实现局域网内透明代理
* 例如 上图中，当 手机/电脑 访问 8.8.8.0/24 网段时，网络出口为外网节点出口

__使用场景__

* TINC 中继节点作为桥接，打通不同网络
  * 例如 Kubernates 集群中使用 TINC 进行桥接云上云下网络
  * 例如 Docker 使用 TINC 作为基础网络，通过中继实现所有的容器内部服务访问
* 外部 IP 为 VIP 实现高可用的代理访问
* 为更智能的动态路由做铺垫

__优势__

* 安全 - 不需要暴露任何额外的外部端口，一切都使用 TINC 内部网络
* 组网灵活 - 任意能加入 TINC 的节点、任意有转发能力的系统
* 网络便携 - 中继节点可能就是一个树莓派

## 原理

* 中继节点是一个 TINC 网络中的节点，与其它节点相当于是有一条直连的网线，通过这条网线进行内部的包转发
* IP 路由就是逐个找下一跳的地址，这里做的事情就是将部分网段的下一跳地址做了修改
  * macOS `route add -host 8.8.8.8 -interface tun0`
  * Linux `ip ro add 8.8.8.8 via 10.1.1.10`
* 路由器都支持静态路由表，配合路由静态路由表就能实现无侵入的透明代理
