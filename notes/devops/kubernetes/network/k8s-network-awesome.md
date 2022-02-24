---
title: Networking Awesome
tags:
  - Awesome
---

# Kubernetes Networking Awesome

- kube-router
- metallb
- [k8snetworkplumbingwg](https://github.com/k8snetworkplumbingwg)
  - [multus-cni](https://github.com/k8snetworkplumbingwg/multus-cni)
- 参考
  - [Comparing Kubernetes CNI Providers: Flannel, Calico, Canal, and Weave](https://rancher.com/blog/2019/2019-03-21-comparing-kubernetes-cni-providers-flannel-calico-canal-and-weave/)

## Ingress & Gateway

- Ingress V2 -> Gateway
- [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/#additional-controllers) 实现

:::tip Ingress 实现情况

1. 针对实现 Ingress API
   - 通常不暴露额外的 CDR
   - 例如 ingress-nginx
2. 基于现有 Web 服务支持 Ingress
   - 通常支持自定义 CDR
   - 例如 traefik
3. 基于现有 平台 支持 Ingress
   - 通常支持 接口 操作规则
   - 服务有状态
   - 例如 kong, apisix

:::

:::tip Ingress 选择

- 最好选择简单实用熟悉的
  - 例如 已知怎么定义一些特殊规则
- 选择轻量，功能单一的
  - 例如 证书尽量配合 cert-manager 使用
- 需要支持复杂 API 网关场景最好利用多 IngressClass 或 通过服务 进行继承使用
  - 例如 使用 kong 或 apisix 统一管理 API - ingress 执行 网关服务
- 将 Ingress 看作是反向代理的替代
- 推荐 - ingress-nginx
- IngressClass 可配合使用
  - HAProxy 擅长 TLS、SNI、LB
  - Nginx 擅长 反向代理
  - Envoy 擅长 协议感知、定制性高
  - 自定义网关 擅长 API 管理、集成、Web 可视化管理

:::

| ingress               | stars                        | based on     | ingress | gateway | governance    |
| --------------------- | ---------------------------- | ------------ | ------- | ------- | ------------- |
| [ingress-nginx]       | ![ingress-nginx-stars]       | nginx        | 🟢      | 🔴      |
| [haproxy-ingress]     | ![haproxy-ingress-stars]     | haproxy      | 🟢      | 🟢      |
| [haproxytech-ingress] | ![haproxytech-ingress-stars] | haproxy      | 🟢      | 🔴      | haproxytech   |
| istio                 |                              | envoy        | 🟢      | 🟢      | CNCF/google   |
| [contour]             |                              | envoy        | 🟢      | 🟢      | CNCF          |
| [traefik]             |                              | traefik      | 🟢      | 🟢      |
| [gloo]                |                              | envoy        | 🟢      | 🟡      |
| [Emissary-Ingress]    | ![emissary-ingress-stars]    | envoy        | 🟢      | 🟢      |
| [kong]                |                              | nginx/kong   | 🟢      | 🟡      | Kong          |
| [apisix]              |                              | nginx/apisix | 🟢      | 🟡      | Apache        |
| [citrix]              |                              | Citrix ADC   | 🟢      |
| [enroute]             |                              | envoy        | 🟢      |         | CNCF/saarasio |
| [easegress]           | ![easegress-stars]           | easegress    | 🟢      |         | megaease      |
| [voyager]             |                              | haproxy      | 🟢      |         | AppsCode      |
| [tyk]                 |                              | typ          | 🟢      |
| [skipper]             |                              | skipper      | 🟢      |

[emissary-ingress]: https://github.com/emissary-ingress/emissary
[emissary-ingress-stars]: https://img.shields.io/github/stars/emissary-ingress/emissary
[ingress-nginx]: ./nginx-ingress.md
[ingress-nginx-stars]: https://img.shields.io/github/stars/kubernetes/ingress-nginx
[apisix]: https://github.com/apache/apisix-ingress-controller
[gloo]: https://github.com/solo-io/gloo
[haproxy-ingress]: ./haproxy-ingress.md
[haproxy-ingress-stars]: https://img.shields.io/github/stars/jcmoraisjr/haproxy-ingress
[haproxytech-ingress]: https://github.com/haproxytech/kubernetes-ingress
[haproxytech-ingress-stars]: https://img.shields.io/github/stars/haproxytech/kubernetes-ingress
[kong]: https://github.com/Kong/kubernetes-ingress-controller
[kong-stars]: https://img.shields.io/github/stars/Kong/kubernetes-ingress-controller
[voyager]: https://github.com/voyagermesh/voyager
[contour]: https://github.com/projectcontour/contour
[citrix]: https://github.com/citrix/citrix-k8s-ingress-controller
[enroute]: https://github.com/saarasio/enroute
[easegress]: https://github.com/megaease/easegress
[easegress-stars]: https://img.shields.io/github/stars/megaease/easegress
[tyk]: https://github.com/TykTechnologies/tyk-operator
[skipper]: https://github.com/zalando/skipper
[traefik]: ./traefik-ingress.md

- ingress-nginx
  - ssl passthrough 性能问题 [ingress-nginx#7827](https://github.com/kubernetes/ingress-nginx/issues/7827)
- haproxy-ingress
  - 支持外部 HAProxy

## CNI

| vs.           | starts               | IPv6 | Windows | Policy |
| ------------- | -------------------- | ---- | ------- | ------ |
| [calico]      | ![calico-stars]      | ✅   | ✅      | ✅     |
| [kube-router] | ![flannel-stars]     | ❌   | ❌      | ❌     |
| [flannel]     | ![kube-router-stars] | ❌   | ✅      | ❌     |
| [cilium]      | ![cilium-stars]      | ❌   | ❌      | ✅     |

[cilium]: ./cilium.md
[flannel]: ./flannel.md
[kube-router]: ./kube-router.md
[calico]: ./calico.md
[cilium-stars]: https://img.shields.io/github/stars/cilium/cilium
[flannel-stars]: https://img.shields.io/github/stars/flannel-io/flannel
[kube-router-stars]: https://img.shields.io/github/stars/cloudnativelabs/kube-router
[calico-stars]: https://img.shields.io/github/stars/projectcalico/calico

<!--
[kube-router]: https://github.com/cloudnativelabs/kube-router
[cilium]: https://github.com/cilium/cilium
[flannel]: https://github.com/flannel-io/flannel
[projectcalico/calico]: https://github.com/projectcalico/calico
[k0s-issues]: https://img.shields.io/github/issues/k0sproject/k0s
[k0s-stars]: https://img.shields.io/github/stars/k0sproject/k0s
-->

:::tip

- 不支持 IPv6 也不支持 DualStack
- NetworkPolicy 支持控制 Ingress 和 Egress 网络

:::

- kube-router
  - layer 3, lvs/ipvs
- flannel
  - overlay
  - 轻量, 专注网络层
  - 后端: vxlan, host-gw, udp, ipip, ipsec, wireguard
  - 配置: etcd, k8s api
- calico
  - layer 3, overlay, BGP,
  - 后端: vxlan, pip, eBPF, WindowsHNS
  - IPv6 不支持 IPIP/VXLAN [calico#5206](https://github.com/projectcalico/calico/issues/5206)
- cilium
  - layer 3/4/7, eBPF
  - IPv6 [cilium#13891](https://github.com/cilium/cilium/issues/13891)
- weave
  - IPsec ESP
- canal - 停止 - calico+flannel - 目前 calico 内置 vxlan

**网络组件功能选项**

- Policy
- IPAM
- CNI
- Overlay - VXLAN, IPIP, WG, IPIP, IPSec
- Routing - BGP, VPC

---

- https://kubernetes.io/docs/concepts/cluster-administration/networking/

## Overlay

- tinc
- n2n
