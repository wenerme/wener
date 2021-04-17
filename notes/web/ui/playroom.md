---
title: Playroom
---

# Playroom

- [seek-oss/playroom](https://github.com/seek-oss/playroom)
  - JSX 设计系统试验环境
  - 多尺寸、多主题
  - 实时编辑和查看
  - 预览插入 Snippte
  - 可通过 URL 分享

```bash
npm add -D playroom
```

**package.json**

```json
{
  "scripts": {
    "playroom:start": "playroom start",
    "playroom:build": "playroom build"
  }
}
```

**playroom.config.js**

```js
module.exports = {
  components: './src/components',
  outputPath: './dist/playroom',

  // Optional:
  title: 'My Awesome Library',
  themes: './src/themes',
  snippets: './playroom/snippets.js',
  frameComponent: './playroom/FrameComponent.js',
  scope: './playroom/useScope.js',
  widths: [320, 768, 1024],
  port: 9000,
  openBrowser: true,
  paramType: 'search', // default is 'hash'
  exampleCode: `
    <Button>
      Hello World!
    </Button>
  `,
  baseUrl: '/playroom/',
  webpackConfig: () => ({
    // Custom webpack config goes here...
  }),
  iframeSandbox: 'allow-scripts',
  typeScriptFiles: ['src/components/**/*.{ts,tsx}', '!**/node_modules'],
};
```

**snippets.js**

```js
import dedent from 'dedent';

export default [
  {
    group: 'Text',
    name: 'Default',
    code: dedent`
      <Text>Text</Text>
    `,
  },
];
```

**themes.js**

```ts
export { default as themeA } from './themeA';
export { default as themeB } from './themeB';
```
