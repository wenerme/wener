---
title: Kubernetes Certificates
tags:
  - DevOps
  - Kubernetes
  - Security
  - Certificates
---

# Kubernetes Certificates

- [Kubernetes Certificates Concept](https://kubernetes.io/docs/concepts/cluster-administration/certificates)

## Certificate Signing Request (CSR) Example

```yaml
apiVersion: certificates.k8s.io/v1beta1
kind: CertificateSigningRequest
metadata:
  name: john
spec:
  groups:
    - system:authenticated
  request: { { file john.csr | b64enc } }
  usages:
    - client auth
```
