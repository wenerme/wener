---
title: Kubernetes App Essentials
tags:
  - DevOps
  - Kubernetes
  - App
---

# Kubernetes App Essentials

## Resources

- [Deploy Nextcloud on Kubernetes](https://kauri.io/48-deploy-nextcloud-on-kuberbetes-the-selfhosted-d/f958350b22794419b09fc34c7284b02e/a) - Self-hosted Dropbox alternative.
- [Self-host Media Center on Kubernetes](https://kauri.io/) - Plex, Sonarr, Radarr, Transmission, and Jackett.
- [Self-host Pi-Hole on Kubernetes](https://kauri.io/) - Block ads and trackers at the network level.
- [Self-host Bitwarden on Kubernetes](https://kauri.io/) - Password manager.

## Namespaces

- 默认创建三个空间 default、kube-system、kube-public
- 不建议超过 10 个服务的场景下使用 default 空间
- 创建空间没有什么坏处，相反，如果单个空间内容过多可能影响性能
- 空间职责
  - 切分团队
  - 切分环境
  - 切分服务

### Best Practices

- Use [kubens](https://github.com/ahmetb/kubectx) for namespace management.
- [Kubernetes best practices: Organizing with Namespaces](https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-organizing-with-namespaces)
- Kubernetes ships with: `default`, `kube-system` (used for Kubernetes components), and `kube-public`.
- Avoid using the `default` namespace in large production systems to prevent accidental overwrites or disruption.
- Use multiple namespaces to segment services into manageable chunks.
- To isolate namespaces, use **Network Policies**.

## Platform Components (Mantl Example)

[Mantl](https://github.com/mantl/mantl) is a modern platform for rapidly deploying globally distributed services.

- **Kubernetes**: For managing, organizing, and scheduling containers.
- **Consul**: For service discovery.
- **Vault**: For managing secrets.
- **Mesos**: Cluster manager for efficient resource isolation and sharing.
- **Marathon**: Cluster management for long-running containerized services.
- **Terraform**: Deployment to multiple cloud providers.
- **Docker**: Container runtime.
- **Traefik**: For proxying external traffic.
- **mesos-consul**: Populating Consul service discovery with Mesos tasks.

## GitOps
