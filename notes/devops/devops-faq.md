---
title: DevOps 常见问题
tags:
  - FAQ
---

# DevOps 常见问题

## Kubernetes vs Docker Swarm

> 结论: 选择 Kubernetes 或者 K3S

- Docker Swarm
  - 劣势
    - 开发维护不活跃
    - 网络模块弱
  - 基本被淘汰
  - 简单易用
- Kubernetes
  - 大规模部署使用
  - 功能完善各方面支持好
  - 较多发布版可选择
  - 劣势
    - 占用资源多 - 少于 50 节点建议选择 k3s 这种轻量的发布版
    - 需要学习更多知识 - 但值得
      - 对开发来发来说压力大
    - 部署维护复杂 - k3s 一定程度上减轻了复杂度

**2018 年**

就稳定性和功能的完善性上来说, Kubernetes 是完败 Docker Swarm 的.但易用性和用户的友好度来说, Docker Swarm 是完胜的.
因此从不同的角度个和个人的身份角色来说,对这两者的评判都有所不同.

从运维人员来说, Kubernetes 肯定是更好的,但是前提是团队中得有这样的运维人员对 Kubernetes 进行支撑和维护. Kubernetes 的搭建相对来说是比较困难的,但大的团队都会有致力于维护运营 Kubernetes 集群的能力,因此 Kubernetes 对于这样的团队或公司来说是更好的选择.

而从开发人员的角度来说, Docker Swarm 能够快速搭建并且使用,虽然问题较多但是对开发人员而言绕过或修正这些问题远比运维一个 Kubernetes 来的轻松.如果一个团队中没有专门的运维人员,且无法使用到像 Azure,AWS,GKE 这样的 IaaS 服务,那么 Docker Swarm 在这时是更好的选择.

## Cloud vs Primier

- Cloud
  - 成本高
  - 过度

---

- https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0
