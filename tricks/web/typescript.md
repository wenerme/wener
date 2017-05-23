# Typescript

* [declaration-files introduction](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
  * http://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
* [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
* [中文手册](https://zhongsp.gitbooks.io/typescript-handbook)
* https://github.com/typings/typings

## Tips

```bash
typings install dt~node dt~express dt~body-parser dt~serve-static dt~express-serve-static-core dt~mime --global

yarn add @types/{node,express,body-parser,serve-static,express-serve-static-core,mime}
```

## FAQ

### 引用全局对象

```typescript
const AMap = window['AMap']
```
