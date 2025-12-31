---
title: Kubernetes Environment
tags:
  - DevOps
  - Kubernetes
  - Environment
  - ServiceAccount
---

# Kubernetes Environment

## Environment Variables

- [Environment Variables Documentation](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/#environment-variables)
- **Service Host**: `KUBERNETES_SERVICE_HOST`

## Service Account Files

Pod internal path: `/var/run/secrets/kubernetes.io/serviceaccount`

- `namespace`: Current namespace.
- `ca.crt`: Certificate Authority.
- `token`: Authentication token.
