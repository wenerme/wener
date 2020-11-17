---
id: fleet
---

# Rancher Fleet
* [rancher/fleet](https://github.com/rancher/fleet)
  * 多集群 GitOps
* 安装 rancher 2.5+ 会默认安装 fleet
* 注意
  * 目前要求压缩后的 Repo < 1MB
    * 对于非 Helm 应用， 1 MB 限制就比较小，因为 CDR 包含了很多内容，例如 cert-manager 1.6 MB
    * https://fleet.rancher.io/gitrepo-structure/

## 概念
* Fleet Manager
  * 中控 - 多集群只需要启一个
* Fleet controller
  * 只是概念层，实际使用 manager 与 controller 无区别
* 单集群
  * Manager 与受控集群在一起
* 多集群
  * Manager 位于其他集群，Controller 在受控集群
* Fleet agent
  * 受控集群的代理，与 manager 交互
  * 一组组件

## 结构
* /
  * Chart.yaml
  * kustomization.yaml
* 任意目录/fleet.yaml
* `*.yaml` - 没有 Chart 和 kustomization 则会部署所有 yaml
* `overlays/{name}`

## fleet.yaml
