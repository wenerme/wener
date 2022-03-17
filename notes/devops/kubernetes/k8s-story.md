---
title: K8S 使用经验
---

# K8S Story

> Kubernetes is a platform for building platforms. It's a better place to start: not the endgame.
>
> -- Kelsey Hightower

- [The future of Kubernetes – and why developers should look beyond Kubernetes in 2022](https://www.eficode.com/blog/the-future-of-kubernetes-and-why-developers-should-look-beyond-kubernetes-in-2022)


## 两年 K8S 心得

- 选用了 Traefik + Cert-Manager + Ext-DNS
- 用了 Prometheus-Operator 但觉得 Thanos 也很好
- 推崇 [GitOps](https://www.gitops.tech/)
  - 选用了 [ArgoCD](https://argoproj.github.io/argo-cd/)
  - [FluxCD](https://github.com/fluxcd/flux)
  - 无法存储到 Git 的考虑使用 [velero](https://velero.io/) 备份
    - 例如 cert-manager 证书
  - 觉得单个 Git 仓库好，但是希望能切分为多个 ArgoCD 应用
- 推荐多使用 Operator 模式
  - 外部资源交互
  - 应用状态 - 例如应用 SQL 迁移
  - 可以参考 [kubebuilder](https://book.kubebuilder.io/)
- Secret 管理依然困难
  - 可以尝试 [mozilla/sops](https://github.com/mozilla/sops)
- K8S 原生 CI 和日志分析依然不太明确
  - 原生 CI
    - JenkinsX 接近但过于复杂
    - Tekton Pipelines 和 Argo Workflows 都接近原生，但无法暴露给团队
  - 日志分析
    - [fluentbit](https://fluentbit.io/) 作为 DaemonSet 采集到 [fluentd](https://www.fluentd.org/) Pod
    - 存储选用 ES 或 Loki
    - Kibana
      - 开源版用户认证和每个用户的权限都不容易管理
      - 分析功能强
    - Grafana
      - 日志分析功能非常弱
      - substring searching and per-line tag searching

> [Lessons Learned From Two Years Of Kubernetes](https://coderanger.net/lessons-learned/)
