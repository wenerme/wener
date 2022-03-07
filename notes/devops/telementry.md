---
title: Telementry
---

# Telementry

Collection of how to disable telementry.

## NextJS

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
  ga.trackingid: ''
```

## kubed

> alose named config-syncer

**Flags**

--enable-analytics

**Helm**

```yaml title="values.yaml"
enableAnalytics: false
```
