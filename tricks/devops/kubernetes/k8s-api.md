---
id: k8s-api
title: Kubernates 接口
---

# Kubernates 接口

## Tips
* [定义文档](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/)
  * 包含了所有对象的字段说明和定义
* 分类
  * Workloads are objects you use to manage and run your containers on the cluster.
  * Discovery & LB resources are objects you use to "stitch" your workloads together into an externally accessible, load-balanced Service.
  * Config & Storage resources are objects you use to inject initialization data into your applications, and to persist data that is external to your container.
  * Cluster resources objects define how the cluster itself is configured; these are typically used only by cluster operators.
  * Metadata resources are objects you use to configure the behavior of other resources within the cluster, such as HorizontalPodAutoscaler for scaling workloads.
