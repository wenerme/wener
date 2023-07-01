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

## strapi

1. telemetry:disable

```bash
npm run strapi telemetry:disable
```

2. delete package.json strip.uuid
3. add package.json telemetryDisabled:true

## openobserve

```bash
ZO_TELEMETRY=false
```

## openpolicyagent

```
--disable-telemetry
```

- OPA_TELEMETRY_SERVICE_URL=https://telemetry.openpolicyagent.org
- **ON by-default**

```http
POST /v1/version HTTP/1.1
Host: telemetry.openpolicyagent.org
Content-Type: application/json
User-Agent: "Open Policy Agent/v0.12.3 (darwin, amd64)"

{
  "id": "08c1d850-6065-478a-b9b5-a8f9f464ad33",
  "version": "v0.12.3",
  "heap_usage_bytes": "596000"
}
```
