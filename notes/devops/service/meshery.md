---
title: meshery
---

# meshery

- [meshery/meshery](https://github.com/meshery/meshery)
  - servicemesh 管理面板
  - 适配管理多种 servicemesh 服务
  - 支持 docker 部署 - 管理外部 kube 集群
  - 支持 istio, linkerd, consul, nsm, octarine, kuma, cpx, osm, traefik-mesh, nginx-sm, app-mesh, yanzi-sm

| Components               |                                               |
| ------------------------ | --------------------------------------------- |
| Meshery Server           | Golang, gRPC, GraphQL, SMP                    |
| Meshery Adapters         | Golang, gRPC, CloudEvents, SMI, OAM           |
| Meshery WASM Filters     | Rust and C++                                  |
| Meshery UI               | ReactJS, NextJS, BillboardJS                  |
| Meshery Provider UI      | ReactJS, NextJS                               |
| Meshery Remote Providers | any - must adhere to Meshery Extension Points |
| Meshery Operator         | Golang                                        |
| ↳ MeshSync               | Golang                                        |
| ↳ Broker                 | Golang, NATS                                  |
| Meshery Database         | Golang, SQLlite                               |
