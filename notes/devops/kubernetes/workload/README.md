---
title: Kubernetes Workload Objects
tags:
  - DevOps
  - Kubernetes
  - Workload
  - StatefulSet
  - CronJob
---

# Kubernetes Workload Objects

## StatefulSet

StatefulSet maintains a sticky identity for each of their Pods. These pods are created from the same spec but are not interchangeable: each has a persistent identifier that it maintains across any rescheduling.

Valuable for applications that require:

- Stable, unique network identifiers.
- Stable, persistent storage.
- Ordered, graceful deployment and scaling.
- Ordered, automated rolling updates.

> [!NOTE]
> If an application doesn't require any stable identifiers or ordered deployment, deletion, or scaling, you should deploy your application using a workload object that provides a set of stateless replicas (e.g., **Deployment** or **ReplicaSet**).

## CronJob & Issues

- [CronJob Issue - Job is not cleaned up](https://stackoverflow.com/questions/51065538)
- [Kubernetes Issue 42649 - CronJob controller performance](https://github.com/kubernetes/kubernetes/issues/42649)
