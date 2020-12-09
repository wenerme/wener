# ncc
* [vercel/ncc](https://github.com/vercel/ncc)
* 参考
  * [acornjs/acorn](https://github.com/acornjs/acorn)
    * 使用的 JS 解析器

```bash
npm i -g @vercel/ncc
```

## NextJS
* 需要同时拷贝 .next 和 public 目录
* 参考
  * [#8574](https://github.com/vercel/next.js/issues/8574#issuecomment-701428665)

```js
// next.config.js
module.exports = {
  target: 'serverless',
};
```

```js
// next-start.js
const { nextStart } = require('next/dist/cli/next-start');
nextStart(process.env.argv);
```

```bash
ncc build -m ./next-start.js && pkg -t host dist/index.js -o next-start
```
