---
tags:
  - Version
---

# Consul Version

| version                      | date       |
| ---------------------------- | ---------- |
| [Consul v1.12](#consul-v112) | 2022-04-20 |
| [Consul v1.11](#consul-v111) | 2021-12-15 |
| [Consul v1.10](#consul-v110) | 2021-06-22 |
| [Consul v1.9](#consul-v19)   | 2020-11-24 |

## Consul v1.12

- 自动配置重载 auto-reload-config

## Consul v1.11

- Virtual IPs for services deployed with Consul Service Mesh
- Replace boltdb with etcd-io/bbolt for raft log store
- TLS Certificates for Ingress Gateways via an SDS source
- Vault Auth Method support for Connect CA Vault Provider
- 企业版
  - Admin Partitions

## Consul v1.10

- Transparent Proxy
  - `consul connect redirect-traffic`
  - 操作 iptables
- Streaming Enabled by Default for Service Health
- Redesigned UI and Observability Enhancements
- Deprecation of Legacy ACL System
- xDS v3 and Incremental xDS

## Consul v1.9

- Application-Aware Intentions
- Service Mesh Visualization
- Custom Resources for Kubernetes
- Active Health Checks for Consul on Kubernetes
- Streaming
