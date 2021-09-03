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
  - compiler 能力非常强 - 大部分 svelte 的能力是编译器底层支持的
    - 实际代码顺序不一定是执行的代码顺序
    - 语法直观
  - 内置状态管理
  - 内置 motion 处理 - tweend, spring
  - 内置转换处理 - fade, fly, slide, crossfade
  - 内置动画 - flip
  - CSS 样式集成度很高
  - `$:` label 会 watch 该语句用到的变量 - 变化会从新执行 - reactive - 核心特性
  - 支持 context 概念 - `setContext(key,{})`, `getContext(key)`
    - 非 reactive - 可以包含 store 来实现
  - 通过 `export let prop` 暴露组件属性
- 参考
  - [sveltejs/kit](https://github.com/sveltejs/kit)
    - 类似 NextJS 之于 React
    - 底层基于 Vite
  - [matyunya/smelte](https://github.com/matyunya/smelte)
    - material components + Tailwind CSS
- 集成
  - webstorm 有 svelte 插件

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

:::tip

- inline 的事件处理写成 string 方式 - 同 vue
  - 官方不排斥 inline 事件处理 - 编译器会处理
- inline style 为字符串 - 而不是 react 那样的对象
- `$` 前缀变量为订阅 store 的变量 - 不能自己使用该前缀变量
- `$$` 前缀为内置特殊变量 - slot, props, restProps
- 属性区分一般属性和 dom - 使用 slot - 类似 vue 不同于 react
  - 可使用 `<svelte:component this={component}/>` 传递动态组件

:::

- `$:` 表示状态 reactive
- `$<变量名>` 获取 reactive 变量值 - 类似订阅状态变化
- `$$props` 所有 props
- `$$restProps` 处理剩下的 props
- 控制流语法 `{#if }{:else}{/if}`
  - if(:else), each, await(:then,:cache), key
  - `{#each things as thing (thing.key)}` 添加 key 的方式 - key 可以为整个对象 - 内部使用 Map
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
- 特殊绑定属性
  - clientWidth, clientHeight, offsetWidth, offsetHeight
- 生命周期
  - onMount, onDestroy, beforeUpdate, afterUpdate
  - tick - resolve pendding state change
- store - 全局，类似 [pmndrs/zustand](https://github.com/pmndrs/zustand)
  - 构造
    - writable
    - `readable(initial,(set)=>{return ()=>{/*cleanup*/}})`
    - derived($store,selector)
  - 方法
    - update, set, subscribe
  - 语法糖
    - `$count` - 等同于针对 count store 创建一个变量 `$count`, 并 subscribe 更新
- 特殊元素
  - slot
  - svelte:self - 使用当前组件 - 类似递归调用 - 因为 svelte 组件没有名字，需要使用特殊方法引用
  - svelte:component - 动态组件
  - svelte:window - 监听窗口事件
  - svelte:body
  - svelte:head - 添加 额外 head 元素
  - svelte:options - 编译器选项
    - immutable
    - accessors
    - namespace
    - tag
  - svelte:fragment

```ts
import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
  const interval = setInterval(callback, milliseconds);

  onDestroy(() => {
    clearInterval(interval);
  });
}
```

```html
<!-- module 维度代码 - 类似 react 组件里的全局代码 -->
<script context="module">
	let current;
  export function stopAll(){}
</script>
```

```svelte
<!-- 当 user 变化的时候触发 debugger -->
{@debug user}
```
