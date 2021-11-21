---
title: Istio Version
tags:
  - Version
---

# Istio Version

| version | date       | kube version |
| ------- | ---------- | ------------ |
| 1.11    | 2021-08-12 | 1.18 - 1.22  |
| 1.10    | 2021-05-18 | 1.18 - 1.21  |
| 1.9     | 2021-02-09 | 1.17 - 1.20  |
| 1.8     | 2020-11-19 |

## 1.11

- 多集群服务支持 [KEP-1645: Multi-Cluster Services API](https://github.com/kubernetes/enhancements/tree/master/keps/sig-multicluster/1645-multi-cluster-services-api)
  Experimental

## 1.10

- Discovery Selectors
- Stable Revision Label istio.io/rev

## 1.9

- Virtual Machine Integration - Beta
- Request Classification - Beta
- Kubernetes Gateway API - Alpha
- Remote fetch and load of WebAssembly (Wasm) HTTP filters - Experimental
- 使用 gcr 镜像 gcr.io/istio-release

## 1.8

- 简化安装和使用
- 支持 HELM 安装
- 集成 Kubernetes CSR API
- 移除 Mixer 组件
- [Announcing Istio 1.8](https://istio.io/latest/news/releases/1.8.x/announcing-1.8/)
