---
title: Networking Awesome
tags:
  - Awesome
---

# Kubernetes Networking Awesome

- kube-router
- metallb

## Ingress & Gateway

- [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/#additional-controllers) 实现

| -                     | based on     | ingress | gateway | governance    |
| --------------------- | ------------ | ------- | ------- | ------------- |
| [ingress-nginx]       | nginx        | 🟢      | 🔴      |
| [haproxy-ingress]     | haproxy      | 🟢      | 🟢      |
| [haproxytech-ingress] | haproxy      | 🟢      |         | haproxytech   |
| istio                 | envoy        | 🟢      | 🟢      | CNCF/google   |
| [contour]             | envoy        | 🟢      | 🟢      | CNCF          |
| [traefik]             | traefik      | 🟢      | 🟢      |
| [gloo]                | envoy        | 🟢      | 🟡      |
| Emissary-Ingress      | envoy        | 🟢      | 🟢      |
| [kong]                | nginx/kong   | 🟢      | 🟡      | Kong          |
| [apisix]              | nginx/apisix | 🟢      | 🟡      | Apache        |
| [citrix]              | Citrix ADC   | 🟢      |
| [enroute]             | envoy        | 🟢      |         | CNCF/saarasio |
| [easegress]           | easegress    | 🟢      |         | megaease      |
| [voyager]             | haproxy      | 🟢      |         | AppsCode      |
| [tyk]                 | typ          | 🟢      |
| [skipper]             | skipper      | 🟢      |

[ingress-nginx]: https://github.com/kubernetes/ingress-nginx
[apisix]: https://github.com/apache/apisix-ingress-controller
[gloo]: https://github.com/solo-io/gloo
[haproxy-ingress]: https://github.com/jcmoraisjr/haproxy-ingress
[haproxytech-ingress]: https://github.com/haproxytech/kubernetes-ingress
[kong]: https://github.com/Kong/kubernetes-ingress-controller
[voyager]: https://github.com/voyagermesh/voyager
[contour]: https://github.com/projectcontour/contour
[citrix]: https://github.com/citrix/citrix-k8s-ingress-controller
[enroute]: https://github.com/saarasio/enroute
[easegress]: https://github.com/megaease/easegress
[tyk]: https://github.com/TykTechnologies/tyk-operator
[skipper]: https://github.com/zalando/skipper
