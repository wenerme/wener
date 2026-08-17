---
title: Workflow
---

# Vercel Workflow

- [vercel/workflow](https://github.com/vercel/workflow)
- @workflow/vitest
- @workflow/vite
- @workflow/world-postgres
- @workflow/world
- 社区
  - @workflow-worlds/turso
  - @fantasticfour/world-nats-jetstream

:::tip

- 推荐 `*.workflow.ts` 命名

:::

```ts
function workflow() {
  'use workflow';
  // 不可用
  // fs, path, http, https, net, dns, child_process, cluster, os, stream, crypto
  // fetch -> `import { fetch } from "workflow"`
  // setTimeout, setInterval, setImmediate, clear* -> sleep
  // Buffer -> Uint8Array
  //
  // 可用但固定
  // Math.random
  // Date / Date.now() / new Date()
  // crypto.getRandomValues(), crypto.randomUUID()
  // crypto.subtle.digest()
  //
  // WebAPI 可用
  // Headers
  // TextEncoder / TextDecoder
  // URL / URLSearchParams
  // Request / Response
  // console
  // structuredClone
  // atob / btoa
}
function step() {
  'use step';
  // 完整 Node 环境
}
```

## Vitest

- workflowTransformPlugin
  - 处理 `use workflow`, `use step`

```ts
import { workflow } from '@workflow/vitest';

export default defineConfig({
  plugins: [workflow()],
});
```

```ts
// globalSetup
await buildWorkflowTests();

beforeAll(async () => {
  await setupWorkflowTests();
});

afterAll(async () => {
  await teardownWorkflowTests();
});
```

另外的配置方式

```ts titlevitest.workflow.config.ts
import { workflowTransformPlugin } from '@workflow/rollup';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [workflowTransformPlugin()],
  test: {
    include: ['src/workflow/**/*.test.ts'],
    globalSetup: './vitest.workflow.global-setup.ts',
    setupFiles: ['./vitest.workflow.setup.ts'],
  },
});
```

```ts title=vitest.workflow.global-setup.ts
import { buildWorkflowTests } from '@workflow/vitest';

export async function setup() {
  await buildWorkflowTests();
}
```

```ts title=vitest.workflow.setup.ts
import { setupWorkflowTests, teardownWorkflowTests } from '@workflow/vitest';
import { afterAll } from 'vitest';

await setupWorkflowTests();

afterAll(async () => {
  await teardownWorkflowTests();
});
```

## Transform

- @workflow/serde
- Internal
  - registerStepFunction
  - workflowEntrypoint

### Workflow

```ts
export async function orderFood(input: Input) {
  'use workflow';
  return doSomething(input);
}
```

```ts
export async function orderFood(input: Input) {
  return doSomething(input);
}

orderFood.workflowId = 'workflow//./src/order-food//orderFood';

globalThis.__private_workflows.set(orderFood.workflowId, orderFood);
```

```ts
const run = await start(orderFood, [input]);
```

```ts
const workflowMetadata = {
  workflowId: 'workflow//app//orderFood',
};

const run = await start(workflowMetadata, [input], {
  world,
});
```

packages/core/src/runtime/start.ts

```ts
const workflowName = workflow?.workflowId;

if (!workflowName) {
  throw new WorkflowRuntimeError("'start' received an invalid workflow function...");
}
```

### Step

```ts
export async function charge(amount: number) {
  'use step';
  return paymentProvider.charge(amount);
}
```

Proxy

```ts
export const charge = globalThis[Symbol.for('WORKFLOW_USE_STEP')]('step//./src/payment//charge');
```

Bundle

```ts
async function charge(amount: number) {
  return paymentProvider.charge(amount);
}

const StepRegistrySymbol = Symbol.for('@workflow/core//registeredSteps');

const registry = (globalThis[StepRegistrySymbol] ??= new Map());

registry.set('step//./src/payment//charge', charge);

charge.stepId = 'step//./src/payment//charge';
```
