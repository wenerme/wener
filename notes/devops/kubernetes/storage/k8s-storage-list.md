---
title: Kubernetes Storage Solutions
tags:
  - DevOps
  - Kubernetes
  - Storage
  - NFS
  - Ceph
  - Longhorn
---

# Kubernetes Storage Solutions

## Common Storage Types

- **NEX**: Network File System
- **Longhorn**: Cloud-native distributed block storage for Kubernetes.
- **GlusterFS (Gf)**: Scalable network filesystem.
- **Ceph**: Unified, distributed storage system.

## Resources & Comparisons

- [Kubernetes Storage Performance Comparison (2020)](https://medium.com/volterra-io/kubernetes-storage-performance-comparison-v2-2020-updated-1c0b69f0dcf4)
- [Cinder Documentation](https://docs.openstack.org/cinder/latest/): Cinder is a Block Storage service for OpenStack.
- [Fibre Channel Storage Area Networks (Wikipedia)](https://en.wikipedia.org/wiki/Fibre_Channel#Storage_area_networks)
- [Kubernetes Storage Reference Gist](https://gist.github.com/feiskyer/8d41ec27ce449e162d8e18f643+fcca29)

## Legacy & Plugins

- **Flexvolume**: Enables users to mount vendor volumes into Kubernetes by installing drivers on every kubelet node. _Note: Flexvolume is largely superseded by CSI (Container Storage Interface)._
