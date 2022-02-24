| 站点                                                              | 静态内容                                                 | 持续集成                                                                                                         |
| ----------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [wener.me](https://wener.me)/[wener.tech](https://www.wener.tech) | [部署状态](https://github.com/wenerme/wener/deployments) | [![Build](https://github.com/wenerme/wener/workflows/Build/badge.svg)](https://github.com/wenerme/wener/actions) |

# 笔记

[这里](https://github.com/wenerme/wener)算是我的杂物箱了,囤积了我大部分的乱七八糟的东西,
虽然乱七八糟,但是我还是想尽量的分类好啊!

同时这是[我的博客](https://wener.me)
文章源,也就是博客的文章大部分都会放在这里,编辑管理都很方便.

成长路中,有很多微不足道的东西,生活的点点滴滴,
想尽量把它们记录下来,这样回望自己曾经的时候
不觉得那么空荡荡,至少曾经有过什么,努力过什么,
尝试过什么.

一步步的脚印.

## Featured

- [AlpineLinux](https://www.wener.tech/notes/os/alpine/alpine)
- [Auth 服务](https://www.wener.tech/notes/service/auth/auth)
- [Golang](https://www.wener.tech/notes/languages/go/go)
- [Java](https://www.wener.tech/notes/java/java)
- [Kubernetes](https://www.wener.tech/notes/devops/kubernetes/kubernetes)
- [VoIP](https://www.wener.tech/notes/voip/voip)
- [纪念那些在 BBK 的时光](https://wener.me/story/bbk-memory)
- [虚拟化](https://www.wener.tech/notes/os/virt/virt)

## Projects Working On

| Project | CI  | Desc                                       |
| ------- | --- | ------------------------------------------ |
| [bbvm]  |     | BeBasic Virtual Machine / 步步高早期 Basic |

[bbvm]: https://github.com/wenerme/bbvm

| Kubernetes          | CI                                                  | Desc                               |
| ------------------- | --------------------------------------------------- | ---------------------------------- |
| [charts]            | [![][charts-ci-img]][charts-ci]                     | helm repo agg & cdn                |
| [container-mirror]  | [![][container-mirror-ci-img]][container-mirror-ci] | ali image mirror                   |
| [kube-stub-cluster] |                                                     | ArgoCD/Helm/Kubernetes deploy stub |

[charts]: https://github.com/wenerme/charts
[charts-ci-img]: https://github.com/wenerme/charts/actions/workflows/pages.yaml/badge.svg
[charts-ci]: https://github.com/wenerme/charts/actions/workflows/pages.yaml
[container-mirror]: https://github.com/wenerme/container-mirror
[container-mirror-ci-img]: https://github.com/wenerme/container-mirror/actions/workflows/sync.yaml/badge.svg
[container-mirror-ci]: https://github.com/wenerme/container-mirror/actions/workflows/sync.yaml
[kube-stub-cluster]: https://github.com/wenerme/kube-stub-cluster

| Golang         | CI                                          | Desc                           |
| -------------- | ------------------------------------------- | ------------------------------ |
| [go-req]       | [![][go-req-ci-img]][go-req-ci]             | Declarative HTTP Request       |
| [go-gb]        | [![][go-gb-ci-img]][go-gb-ci]               | Chinese Guobiao/国标           |
| [go-wecom]     | [![][go-wecom-ci-img]][go-wecom-ci]         | Wechat Work/Wecom/企业微信 SDK |
| [go-miniquery] | [![][go-miniquery-ci-img]][go-miniquery-ci] | SQL like filter expression     |
| [go-magic]     | [![][go-magic-ci-img]][go-magic-ci]         | libmagic                       |
| [astgo]        |                                             | asterisk AMI, AGI              |
| [scel]         |                                             | 搜狗 scel 词库                 |
| [stardict]     |                                             | 星际译王                       |
| [telattr]      |                                             | 电话归属地                     |

[go-req]: https://github.com/wenerme/go-req
[go-req-ci-img]: https://github.com/wenerme/go-req/actions/workflows/ci.yml/badge.svg
[go-req-ci]: https://github.com/wenerme/go-req/actions/workflows/ci.yml
[go-magic]: https://github.com/wenerme/go-magic
[go-magic-ci]: https://github.com/wenerme/go-magic/actions/workflows/ci.yml
[go-magic-ci-img]: https://github.com/wenerme/go-magic/actions/workflows/ci.yml/badge.svg
[astgo]: https://github.com/wenerme/astgo
[go-gb]: https://github.com/wenerme/go-gb
[go-gb-ci-img]: https://github.com/wenerme/go-gb/actions/workflows/ci.yml/badge.svg
[go-gb-ci]: https://github.com/wenerme/go-gb/actions/workflows/ci.yml
[go-wecom]: https://github.com/wenerme/go-wecom
[go-wecom-ci]: https://github.com/wenerme/go-wecom/actions/workflows/ci.yml
[go-wecom-ci-img]: https://github.com/wenerme/go-wecom/actions/workflows/ci.yml/badge.svg
[go-miniquery]: https://github.com/wenerme/go-miniquery
[go-miniquery-ci]: https://github.com/wenerme/go-miniquery/actions/workflows/ci.yml
[go-miniquery-ci-img]: https://github.com/wenerme/go-miniquery/actions/workflows/ci.yml/badge.svg
[scel]: https://github.com/wenerme/scel
[stardict]: https://github.com/wenerme/stardict
[telattr]: https://github.com/wenerme/telattr

| DevOps                              | Desc                                               |
| ----------------------------------- | -------------------------------------------------- |
| [ansible-collection-wenerme-alpine] | Ansible roles/tasks for AlpineLinux                |
| [alpine-image]                      | AlpineLinux image builder & prebuild images        |
| [coredns-ipin]                      | CoreDNS Plugin to resolve `<IP>.example.tld` to IP |
| [coredns-pdsql]                     | CoreDNS Plugin use PowerDNS DB Backend to resolve  |

[coredns-pdsql]: https://github.com/wenerme/coredns-pdsql
[coredns-ipin]: https://github.com/wenerme/coredns-ipin
[ansible-collection-wenerme-alpine]: https://github.com/wenerme/ansible-collection-wenerme-alpine
[alpine-image]: https://github.com/wenerme/alpine-image
[wenerme/wener]: https://github.com/wenerme/wener

| Frontend             | Desc                     |
| -------------------- | ------------------------ |
| [pm-exam-cheatsheet] | 软考项目管理考试知识整理 |
| [apis]               | Dev Utils on Web         |

[pm-exam-cheatsheet]: https://github.com/wenerme/pm-exam-cheatsheet
[apis]: https://github.com/wenerme/apis

## License

[![CC BY-SA 4.0][cc-by-sa-img]][cc-by-sa]

[cc-by-sa-img]: https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg
[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
