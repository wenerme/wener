---
title: telepresence
---

# telepresence

- [telepresenceio/telepresence](https://github.com/telepresenceio/telepresence)
  - Apache-2.0, Go

```bash
curl -fLo telepresence https://github.com/telepresenceio/telepresence/releases/download/v2.10.6/telepresence-darwin-amd64
chmod +x telepresence
cp telepresence ~/bin

# 通过 HELM 安装 Traffic Manager
# --values values.yaml
# --upgrade
# 也可以通过 https://app.getambassador.io 安装
telepresence helm install --set ambassador-agent.enabled=false --single-user-mode
```

:::caution

- team mode 依赖 Ambassador Cloud [#2996](https://github.com/telepresenceio/telepresence/issues/2996)

:::

- intercept
  - global
    - 一个服务只能一个人拦截
  - personal
- single-user-mode - 默认
  - 全局拦截
- team-mode
  - 依赖 Ambassador Cloud
