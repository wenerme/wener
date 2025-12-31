---
title: Kubernetes Services
tags:
  - DevOps
  - Kubernetes
  - Network
  - Service
  - DNS
---

# Kubernetes Services

- [Connecting Applications with Services](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/)
- [Mapping External Services Best Practices](https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-mapping-external-services)

## Service Types

### ExternalName

- CNAME redirection at the kernel level.
- Cannot do port remapping.

## DNS for Services and Pods

- [DNS for Services and Pods Reference](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
- **Service Domain**: `my-svc.my-namespace.svc.cluster-domain.example`
- **SRV Record**: `_my-port-name._my-port-protocol.my-svc.my-namespace.svc.cluster-domain.example`
- **Pod Domain**: `pod-ip-address.my-namespace.pod.cluster-domain.example`
- **Example**: `172-17-0-3.default.pod.cluster.local`

## Configuration Examples

### External Database (IP)

```yaml
kind: Service
apiVersion: v1
metadata:
  name: mongo
spec:
  type: ClusterIP
  ports:
    - port: 27017
      targetPort: 27017
---
kind: Endpoints
apiVersion: v1
metadata:
  name: mongo
subsets:
  - addresses:
      - ip: 10.240.0.4
    ports:
      - port: 27017
```

### External Database (URI)

```yaml
kind: Service
apiVersion: v1
metadata:
  name: mongo
spec:
  type: ExternalName
  externalName: ds149763.mlab.com
```

### External Database (Port Remapping)

```yaml
kind: Service
apiVersion: v1
metadata:
  name: mongo
spec:
  ports:
    - port: 27017
      targetPort: 49763
---
kind: Endpoints
apiVersion: v1
metadata:
  name: mongo
subsets:
  - addresses:
      - ip: 35.188.8.12
    ports:
      - port: 49763
```
