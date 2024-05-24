---
tags:
  - Compiler
---

# react-compiler

- 参考
  - https://playground.react.dev/
  - https://react.dev/learn/react-compiler
  - ESBuild Plugin
    - https://gist.github.com/sikanhe/f9ac68dd4c78c914c29cc98e7b875466
    - https://gist.github.com/hyrious/0ec637c7ec2214096cb591062ec73ee0

```bash
pnpm add -D babel-plugin-react-compiler
```

```ts
// 部分
const ReactCompilerConfig = {
  // annotation opt-in 模式，组件增加 'use memo'
  compilationMode: 'annotation',
  sources: (filename) => {
    return filename.indexOf('src/path/to/dir') !== -1;
  },
};
```

**vite**

```ts title="vite.config.ts"
const ReactCompilerConfig = {
  /* ... */
};

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
        },
      }),
    ],
    // ...
  };
});
```

```ts
export default defineConfig(({ command }) => {
  const babelPlugins = [['babel-plugin-react-compiler', {}]];
  if (command === 'serve') {
    babelPlugins.push(['@babel/plugin-transform-react-jsx-development', {}]);
  }

  return {
    plugins: [react({ babel: { plugins: babelPlugins } })],
  };
});
```

**NextJS**

```ts title="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};
```

## lint

```bash
npx -y react-compiler-healthcheck@latest --src 'src/**/*.{tsx,ts}'
```

```bash
npm install eslint-plugin-react-compiler
```

```js
module.exports = {
  plugins: ['eslint-plugin-react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
};
```
