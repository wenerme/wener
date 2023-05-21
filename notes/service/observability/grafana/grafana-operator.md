---
title: grafana-operator
tags:
  - Kubernetes
  - Operator
---

# grafana-operator

- [grafana-operator](https://github.com/grafana-operator/grafana-operator)
- 参考
  - [api](https://github.com/grafana-operator/grafana-operator/blob/master/documentation/api.md)
- API
  - GrafanaDashboard
  - GrafanaDataSource
  - GrafanaNotificationChannel
  - Grafana

:::tip

- 支持的 grafana 版本相对旧 - [constants.go#L5](https://github.com/grafana-operator/grafana-operator/blob/master/controllers/constants/constants.go#L5)
- grafana 8 Unified Alerting [#564](https://github.com/grafana-operator/grafana-operator/issues/564)
- manage organizations [#615](https://github.com/grafana-operator/grafana-operator/pull/615)
  - Organisations provisioning [grafana/grafana#12119](https://github.com/grafana/grafana/issues/12119)
- orgId for GrafanaDashboard [#525](https://github.com/grafana-operator/grafana-operator/issues/525)
  - 只能管理 orgId=1 的 dashboard

:::

```yaml
apiVersion: integreatly.org/v1alpha1
kind: Grafana
metadata:
  name: cluster
spec:
  client:
    preferService: true
  deployment:
    envFrom:
      - secretRef:
          name: cluster-grafana-env
  config:
    server:
      root_url: https://grafana.example.com
    log:
      mode: console
      level: info
    log.frontend:
      enabled: true
    auth:
      # default 10m
      token_rotation_interval_minutes: 600
    auth.anonymous:
      enabled: false
    analytics:
      reporting_enabled: false
      check_for_updates: false
  ingress:
    enabled: true
    hostname: grafana.example.com
    path: /
    pathType: Prefix
  service:
    name: grafana-cluster
  # 没有 selector 不会匹配任何 dashboard
  dashboardLabelSelector:
    - matchExpressions:
        - { key: category, operator: In, values: [plugin] }
  # empty match All, null match nothing
  dashboardNamespaceSelector: {}
  resources:
    requests:
      cpu: 100m
      memory: 100Mi
```

# FAQ

## error getting folders, expected status 200 but got 401

如果使用了 envFrom，确保 secret 里包含 GF_SECURITY_ADMIN_PASSWORD, GF_SECURITY_ADMIN_USER，且

```yaml
spec:
  deployment:
    # 是否创建 grafana-admin-credentials
    skipCreateAdminAccount: true
    envFrom:
      - secretRef:
          # 包含 GF_SECURITY_ADMIN_PASSWORD 和 GF_SECURITY_ADMIN_USER，且
          name: grafana-env
```

默认添加 security admin 的方式

```yaml
env:
  - name: GF_SECURITY_ADMIN_USER
    valueFrom:
      secretKeyRef:
        key: GF_SECURITY_ADMIN_USER
        name: grafana-admin-credentials
  - name: GF_SECURITY_ADMIN_PASSWORD
    valueFrom:
      secretKeyRef:
        key: GF_SECURITY_ADMIN_PASSWORD
        name: grafana-admin-credentials
```

## cannot list resource "namespaces" in API group "" at the cluster scope

开启 dashboardNamespaceSelector 后，rabc 需要给权限 list namespace
