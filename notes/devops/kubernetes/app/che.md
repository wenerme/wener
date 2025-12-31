---
title: Eclipse Che on Kubernetes
tags:
  - DevOps
  - Kubernetes
  - IDE
  - EclipseChe
---

# Eclipse Che on Kubernetes

- [Installing Che on bare-metal using Kubespray](https://www.eclipse.org/che/docs/che-7/installing-che-on-bare-metal-using-kubespray/)

## Quick Start

```bash
chectl server:start --platform k8s --domain --self-signed-cert < ip-from-load-balancer > .nip.io
```
