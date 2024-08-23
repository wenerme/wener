---
title: vitest
---

# vitest

- [vitest-dev/vitest](https://github.com/vitest-dev/vitest)
  - chai - assertion
  - c8/istanbul - coverage
  - tinyspy - mocking, stubbing, spies
  - jsdom/happy-dom - DOM & browser API mocking
  - tinypool - worker
  - tinybench - benchmarking
- 如果已经用 Vite 开发，则非常推荐
- 参考
  - webstrom [Vitest Runner](https://plugins.jetbrains.com/plugin/19220-vitest-runner)
    - [linux-china/vitest-jetbrains-plugin](https://github.com/linux-china/vitest-jetbrains-plugin)

```bash
npm i -D @vitest/ui
vitest --ui

# coverage
npm i -D @vitest/coverage-c8
npm i -D @vitest/coverage-istanbul
# runtime
npm i -D happy-dom
npm i -D jsdom
# https://www.npmjs.com/package/edge-runtime
# https://github.com/vercel/edge-runtime
npm i -D @edge-runtime/vm

vitest list ./src/           # 列出测试
vitest run ./src/            # 运行测试 - 只运行一次，不 watch
vitest watch                 # = vitest dev - 检测变化自动运行
vitest related /src/index.ts # 只运行相关测试，可以在 git lint statge 配置只针对变化的文件就行测试
```

```ts title="vite.config.ts"
// 使用 reference 则不需要从 vitest/config import
// import { defineConfig } from 'vitest/config';

/// <reference types="vitest" />
import { defineConfig } from 'vitest';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul', // c8
    },
    environment: 'happy-dom', // jsdom, node, edge-runtime
  },
});
```

```json title="package.json"
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

## In-source testing

```ts title="src/index.ts"
export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0);
}

// 直接将测试写在代码里 - bundle 时 tree-shake 掉
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('add', () => {
    expect(add()).toBe(0);
    expect(add(1)).toBe(1);
    expect(add(1, 2, 3)).toBe(6);
  });
}
```

## 性能测试 {#benchmarking}

```ts
import { bench, describe } from 'vitest';

describe('sort', () => {
  bench('normal', () => {
    const x = [1, 5, 4, 2, 3];
    x.sort((a, b) => {
      return a - b;
    });
  });

  bench('reverse', () => {
    const x = [1, 5, 4, 2, 3];
    x.reverse().sort((a, b) => {
      return a - b;
    });
  });
});
```

## conf

```ts
import process from 'node:process';
import react from '@vitejs/plugin-react';
import { loadEnv, PluginOption } from 'vite';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = Object.assign(process.env, env);

  return defineConfig({
    plugins: [react()] as PluginOption[],
    resolve: {
      alias: {
        '@': new URL('./src/', import.meta.url).pathname,
      },
    },
    test: {
      server: {
        deps: {
          // fix .css extension error
          // inline: ['@wener/console'],
        },
      },
      deps: {
        optimizer: {
          web: {},
        },
      },
    },
  });
};
```
