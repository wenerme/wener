---
title: Kubernetes Best Practices
tags:
  - DevOps
  - Kubernetes
  - BestPractice
  - Labels
---

# Kubernetes Best Practices

- [9 Best Practices and Examples for Working with Kubernetes Labels](https://www.replex.io/blog/9-best-practices-and-examples-for-working-with-kubernetes-labels)
- [Labels and Selectors in Kubernetes on AWS](https://kubernetes-on-aws.readthedocs.io/en/latest/user-guide/labels.html)
- [Kubernetes Best Practices (GitHub)](https://github.com/diegolnasc/kubernetes-best-practices)
- [Kubernetes Production Best Practices (Medium)](https://medium.com/@diego.lnasc/kubernetes-production-best-pratices-41ee2dcd1ea)

## Labeling Examples

```yaml
metadata:
  labels:
    application: my-app
    version: 'v31'
    release: 'r42'
    stage: production
```

```yaml
kind: Service
apiVersion: v1
metadata:
  name: my-app
spec:
  selector:
    application: my-app
    stage: production
  ports:
    - port: 80
      targetPort: 8080
      protocol: TCP
```

### Recommended Labels

Standard labels recommended by Kubernetes:

- `app.kubernetes.io/name`
- `app.kubernetes.io/instance`
- `app.kubernetes.io/version`
- `app.kubernetes.io/component`
- `app.kubernetes.io/part-of`
- `app.kubernetes.io/managed-by`

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    app.kubernetes.io/name: my-pod
    app.kubernetes.io/instance: Auth-1a
    app.kubernetes.io/version: '2.0.1'
    app.kubernetes.io/component: Auth
    app.kubernetes.io/part-of: my-app
    app.kubernetes.io/managed-by: helm
```
