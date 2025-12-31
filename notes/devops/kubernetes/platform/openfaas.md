---
title: OpenFaaS
tags:
  - DevOps
  - Kubernetes
  - Serverless
  - OpenFaaS
---

# OpenFaaS

- [openfaas/faas](https://github.com/openfaas/faas) - Deploy event-driven functions and microservices to Kubernetes without repetitive, boiler-plate coding.

## PLONK Stack

- [Getting Started with the PLONK Stack](https://blog.alexellis.io/getting-started-with-the-plonk-stack-and-serverless/)

Cloud Native stack for building applications:

- **P**rometheus - metrics and time-series
- **L**inux/Linkerd - OS or service mesh (Linkerd is optional)
- **O**penFaaS - management and auto-scaling of compute
- **N**ATS - asynchronous message bus / queue
- **K**ubernetes - declarative, extensible, scale-out clustering

## faasd

[faasd](https://github.com/openfaas/faas) is a light-weight option for adopting OpenFaaS on a single host, removing the need for complex infrastructure.

## Installation

- [Helm Chart README](https://github.com/openfaas/faas-netes/blob/master/chart/openfaas/README.md)

```bash
helm repo add openfaas https://openfaas.github.io/faas-netes/
helm pull openfaas/openfaas --untar
```

## Configuration (部署说明)

- 支持 OAuth - 默认不部署
- 部署空间: `openfaas-fn`
- **faas-netes**: OpenFaaS on Kubernetes implementation (`openfaas/faas-netes`).
- **Operator**: CRD management (`openfaas/faas-netes`).
- **queue-worker**: NATS worker (`openfaas/queue-worker`).
- **Prometheus**: Monitoring (`prom/prometheus`).
- **Alertmanager**: Alerting (`prom/alertmanager`).
- **NATS**: Message bus (`nats-streaming`).
- **ingress-operator**: Ingress management (`openfaas/ingress-operator`).
- **faas-idler**: Scale-to-zero function (`openfaas/faas-idler`).

_Note: 默认不配置 Ingress._

## Architecture

- [OpenFaaS Stack Architecture](https://docs.openfaas.com/architecture/stack/)
