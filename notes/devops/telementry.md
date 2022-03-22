---
title: Telementry
tags:
  - Collection
---

# Telementry

Collection of how to disable telementry and analytics that default to enable.

## NextJS

```bash
# 1. by env
export NEXT_TELEMETRY_DISABLED=1
# 2. by cli
npx next telemetry disable
```

- https://nextjs.org/telemetry

## cubejs

```ts
new CubejsServer({
  telemetry: false,
});
```

## k0sctl

```bash
export DISABLE_TELEMETRY=true
export DISABLE_UPGRADE_CHECK=true
```

## k0s

```yaml title="k0s.yaml"
spec:
  # api.segment.io
  telemetry:
    enabled: true
```

## grafana

```ini title="grafana.ini"
[analytics]
# stats.grafana.org 24h
reporting_enabled=false
# grafana.org 10m
check_for_updates=false
```

```bash title="env"
export GF_ANALYTICS_REPORTING_ENABLED=false
export GF_ANALYTICS_CHECK_FOR_UPDATES=false
```

## argocd

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-cm
    app.kubernetes.io/part-of: argocd
data:
  # unset tracking id
  ga.trackingid: ''
```

## kubed

> alose named config-syncer

**Flags**

- remove --enable-analytics

**Helm**

```yaml title="values.yaml"
enableAnalytics: false
```
