---
title: Typescript Go
---

# tsgo

- [@typescript/native-preview](https://github.com/microsoft/typescript-go)
  - MIT, Go
  - TypeScript 原生编译器，Go 语言实现
  - 快速类型检查和编译，替代 tsc
  - 支持增量编译和并行处理
  - 内存使用优化，比 Node.js 版本更高效

```bash
go install github.com/microsoft/typescript-go/cmd/tsgo@latest
pnpm add -Dw @typescript/native-preview

tsgo --help
npx tsgo --noEmit
```

```json title='.vscode/settings.json'
{
  "typescript.experimental.useTsgo": true
}
```
