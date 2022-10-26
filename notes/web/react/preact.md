---
title: preact
---

# preact

- [preactjs/preact](https://github.com/preactjs/preact)
  - React 替代
    - preact - 10kB,4kB
      - =React+ReactDOM
    - preact-compat - 13kB,5kB
    - react - 7kB,3kB
    - react-dom - 130kB,42kB
  - 适用于 微前端 bundle 场景
- 参考
  - [preactjs/preact-compat](https://github.com/preactjs/preact-compat)

```html
<script type="module">
  import { h, Component, render } from 'https://unpkg.com/preact?module';
  import htm from 'https://unpkg.com/htm?module';

  // htm 替代构造 DOM - 不依赖 JSX 转译但达到类似效果
  const html = htm.bind(h);

  function App(props) {
    return html`<h1>Hello ${props.name}!</h1>`;
  }

  render(html`<${App} name="World" />`, document.body);
</script>
```

**依赖替代**

```json title="package.json"
{
  "dependencies": {
    "react": "npm:@preact/compat",
    "react-dom": "npm:@preact/compat"
  },
  "alias": {
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime"
  }
}
```

## rollup 替代 react

```js
export default {
  plugins: [
    alias({
      entries: [
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react', replacement: 'preact/compat' },
      ],
    }),
  ],
};
```

## Testing

- https://preactjs.com/guide/v10/preact-testing-library/

```tsx
import { act } from 'preact/test-utils';
```
