---
title: Telementry
tags:
  - Collection
---

# Telementry

Collection of how to disable telementry and analytics that default to enable.

**env**

```bash
# for most cases
# https://do-not-track.dev/
# https://consoledonottrack.com/
# https://en.wikipedia.org/wiki/Do_Not_Track
DO_NOT_TRACK=1

# ========================
# Dev/Frontend/Backend
# ========================
# Homebrew
HOMEBREW_NO_ANALYTICS=1
# NextJS
NEXT_TELEMETRY_DISABLED=1
# NuxtJS
NUXT_TELEMETRY_DISABLED=1
# Wrangler/Cloudflare Worker
WRANGLER_SEND_METRICS=false

# ========================
# Service
# ========================
# MinIO
MINIO_UPDATE=off

# K0S
DISABLE_TELEMETRY=true
DISABLE_UPGRADE_CHECK=true

# ferretdb
FERRETDB_TELEMETRY=disable
DO_NOT_TRACK=true

# OpenObserve
ZO_TELEMETRY=false

# grafana
GF_ANALYTICS_REPORTING_ENABLED=false
GF_ANALYTICS_CHECK_FOR_UPDATES=false
```

- https://consoledonottrack.com/

## Storybook

```bash
# STORYBOOK_DISABLE_TELEMETRY=1 npm run storybook

npm run storybook -- --disable-telemetry
```

```ts title=".storybook/main.ts"
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
    enableCrashReports: false,
  },
};

export default config;
```

- STORYBOOK_ENABLE_CRASH_REPORTS
- STORYBOOK_TELEMETRY_DEBUG
- https://storybook.js.org/telemetry


## HTTP DNT

```
DNT: 1
```

```js
console.log(navigator.doNotTrack);
```

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT
- wikipedia [Do Not Track](https://en.wikipedia.org/wiki/Do_Not_Track)

## infisical

```bash
export TELEMETRY_ENABLED=false
```

- [infisical](https://github.com/Infisical/infisical)

## ferretdb

- `--telemetry=false`
- `db.disableFreeMonitoring()`

```bash
FERRETDB_TELEMETRY=disable
DO_NOT_TRACK=true
```

- https://docs.ferretdb.io/telemetry/

## Minio

```bash
MINIO_UPDATE=off
```

## Homebrew

```bash
export HOMEBREW_NO_ANALYTICS=1
```

## Scarf

```bash
SCARF_ANALYTICS=false
```

```json title="package.json"
{
  "scarfSettings": {
    "defaultOptIn": false
  }
}
```

## NuxtJS

```bash
export NUXT_TELEMETRY_DISABLED=1
```

```bash
npx nuxt telemetry disable
```

```js title="nuxt.config.js"
export default {
  telemetry: false,
};
```

- https://v2.nuxt.com/docs/configuration-glossary/configuration-telemetry/

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

```bash
CUBEJS_TELEMETRY=false
```

## yarn

```bash
# for global
yarn config set --home enableTelemetry 0
# for project
yarn config set enableTelemetry 0
```

- https://yarnpkg.com/advanced/telemetry

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

## bun

```toml
disableTelemetry=true
```

## juicefs

```bash
juicefs --no-usage-report
```

- https://github.com/juicedata/juicefs/blob/main/pkg/usage/usage.go

## netdata

```bash
# 1
touch /etc/netdata/.opt-out-from-anonymous-statistics
# 2
export DISABLE_TELEMETRY=1
```

- DISABLE_TELEMETRY=1 或 DO_NOT_TRACK=1 启动会自动创建 .opt-out-from-anonymous-statistics
- `--disable-telemetry` when installation
- https://learn.netdata.cloud/docs/netdata-agent/configuration/anonymous-telemetry-events

## turbo

```bash
TURBO_TELEMETRY_DISABLED=1
DO_NOT_TRACK=1

turbo telemetry status
```

- https://turbo.build/repo/docs/telemetry

## Hugging Face

- HF_HUB_DISABLE_TELEMETRY
- DISABLE_TELEMETRY
- DO_NOT_TRACK

## wrangler

```bash
npx wrangler telemetry disable
npx wrangler telemetry status
```

```toml
send_metrics=false
```

```bash
WRANGLER_SEND_METRICS=false
```
