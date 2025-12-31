---
title: Kubernetes Components
tags:
  - DevOps
  - Kubernetes
  - Component
---

# Kubernetes Components

- [Command line tools reference](https://kubernetes.io/docs/reference/command-line-tools-reference/)
- `cloud-controller-manager`
- `kube-apiserver`
- `kube-controller-manager`
- `kube-proxy`
- `kube-scheduler`
- `kubelet`

## API Server

- [Adding a name to Kubernetes API server certificate](https://blog.scottlowe.org/2019/07/30/adding-a-name-to-kubernetes-api-server-certificate/)

### Admission Controllers

- [Admission Controllers Reference](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)

```bash
# Example: enable admission plugins
# kube-apiserver --enable-admission-plugins=NamespaceLifecycle,LimitRanger ...
```

admissionregistration
