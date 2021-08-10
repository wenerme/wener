---
title: svelte
---

# svelte

- [sveltejs/svelte](https://github.com/sveltejs/svelte)
  - 响应式、非 VDOM
  - 有点像 React+Vue 的结合体
  - 无 Runtime - 无依赖
    - bundle 后 11k - 已包含基础 svelte 组件
    - min 后 3k
    - svelte/internal 可以作为外部依赖 - bundle - 9k, min -2k
  - 类 Vue
    - 单文件模式
    - 事件属性绑定方式
  - 类 React
    - 状态处理
    - 类 JSX 语法
  - 特殊语法 - 需要编译器预处理
    - 语法直观
  - 内置状态管理
  - CSS 样式集成度很高
- 参考
  - [sveltejs/kit](https://github.com/sveltejs/kit)
    - 类似 NextJS 之于 React
    - 类似 Vite

```html
<script>
  $: name = 'world';
</script>

<input bind:value="{name}" />
<h1>Hello {name}!</h1>
```

```js
import App from './index.svelte';

// 挂载到 Dom
new App({
  target: document.body,
  props: {
    name: 'Wener',
  },
});
```

```bash
# typescript check
npx svelte-check
```

## Rollup

```bash
yarn add -D svelte rollup-plugin-svelte svelte-preprocess rollup rollup-plugin-terser @rollup/plugin-{typescript,node-resolve,commonjs}
```

```js title="rollup.config.ts"
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'public/build/bundle.js',
      format: 'iife',
      name: 'app',
      sourcemap: true,
    },
    {
      file: 'public/build/bundle.min.js',
      format: 'iife',
      name: 'app',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  // external:['svelte/internal'],
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      include: 'src/**/*.svelte',
    }),
    resolve({ browser: true, dedupe: ['svelte'] }),
    commonjs(),
    typescript(),
  ],
};
```

- 更复杂的 [rollup.config](https://github.com/sveltejs/language-tools/issues/161#issuecomment-642120838)

## typescript

```ts title="src/typings/svelte.d.ts"
declare module '*.svelte' {
  const value: any;
  export default value;
}
```

## @tsconfig/svelte

- [tsconfig/bases](https://github.com/tsconfig/bases)

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Svelte",
  "_version": "2.0.0",

  "compilerOptions": {
    "moduleResolution": "node",
    "target": "es2017",
    /**
      Svelte Preprocess cannot figure out whether you have a value or a type, so tell TypeScript
      to enforce using `import type` instead of `import` for Types.
     */
    "importsNotUsedAsValues": "error",
    "isolatedModules": true,
    /**
      To have warnings/errors of the Svelte compiler at the correct position,
      enable source maps by default.
     */
    "sourceMap": true,

    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 语法

- `$:` 表示状态 reactive
- `$<变量名>` 获取 reactive 变量值 - 类似订阅状态变化
- `$$props` 所有 props
- `$$restProps` 处理剩下的 props
- 控制流语法 `{#if }{:else}{/if}`
  - if, each, await, key
- `{@html }` - 注入 html 内容
- `{@debug }` - console.log
- on:eventname
  - forward 事件
- on:eventname={handler}
  - 事件可多次监听
- on:eventname|modifers={handler}
  - preventDefault
  - stopPropagation
  - passive
  - nonpassive
  - capture
  - once
  - self
  - trusted
- bind:property={variable}
  - bind:value - 直接绑定 value 到 value
  - bind:group={variable}
  - bind:this={dom_node}
- class:name={value}
- use:action
- use:action={parameters}
  - 绑定生命周期到 action 函数返回对象
  - destroy
  - update
- transition:fn
  - in/out:fn
  - in/out:fn={params}
  - in/out:fn|local
  - in/out:fn|local={params}
    - fn
      - introstart
      - introend
      - outrostart
      - outroend
- transition:fn={params}
- transition:fn|local
- transition:fn|local={params}
- animate:name
- animate:name={params}
- --style-props="anycssvalue"
  - 传递 css 变量
- `<slot name="" prop={value}><!-- optional fallback --></slot>`
- `$$slots`
- `<svelte:window on:keydown={handleKeydown}/>`
  - body
  - head
  - options - compiler options
  - fragment
