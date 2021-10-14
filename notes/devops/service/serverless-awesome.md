---
title: Serverless Awesome
tags:
- Awesome
---

# Serverless Awesome

- Kubernetes 之前的 FaaS 平台和之后的平台有一定区别


:::caution

- faas 会往 wasm 支持上转
- 大多基于 http 路由 - 基于 http 触发
  - 重 service 的方式不太行的通 - 例如 grpc
- 基于 消息 的 faas 相对更底层 - 需要一定基础实现才能实际使用 - 例如 keda

:::

## 实现

- [kedacore/keda](https://github.com/kedacore/keda)
  Kubernetes-based Event Driven Autoscaling component
- [knative](https://github.com/knative)
  - 源自 Google
- [kyma-project/kyma](https://github.com/kyma-project/kyma)
- [webiny/webiny-js](https://github.com/webiny/webiny-js)
  - MIT, Typescript
  - 只支持 AWS
- [dapr/dapr](https://github.com/dapr/dapr)
  portable, event-driven, runtime
- [serverless/serverless](https://github.com/serverless/serverless)
- [openfaas/faas](https://github.com/openfaas/faas)
  - 源自 VMWare
  - [openfaas/faas-netes](https://github.com/openfaas/faas-netes)
    K8S 集成
  - [openfaas/fassd](https://github.com/openfaas/fassd)
    lightweight & portable faas engine
- [kubeless/kubeless](https://github.com/kubeless/kubeless)
  - 源自 Bitnami
  - 开发不是特别活跃
- [fission/fission](https://github.com/fission/fission)
  - 源自 Platform9
- [apache/openwhisk](https://github.com/apache/openwhisk)
  - 源自 IBM
- [nuclio/nuclio](https://github.com/nuclio/nuclio)
  - 数据流处理
- [fnproject/fn](https://github.com/fnproject/fn)
  - 源自 Oracle
  - 🚧 项目停止
- 参考
  - [anaibol/awesome-serverless](https://github.com/anaibol/awesome-serverless)
  - [A Comparison of Serverless Frameworks for Kubernetes: OpenFaas, OpenWhisk, Fission, Kubeless and more](https://winderresearch.com/a-comparison-of-serverless-frameworks-for-kubernetes-openfaas-openwhisk-fission-kubeless-and-more/)
  - [Comparison of Kubernetes Serverless Frameworks](https://www.vshn.ch/en/blog/a-very-quick-comparison-of-kubernetes-serverless-frameworks/)
  - [Examining the FaaS on K8S Market](https://blogs.cisco.com/cloud/examining-the-faas-on-k8s-market)

# FAQ

## OpenFaas vs Serverless

- Serverless 是一套标准
  - SDK
  - 部署规范
- OpenFaas 是运行时
  - 实现了 Serverless 要求
