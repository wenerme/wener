---
title: graphql
---

## graphql-go/graphql

- [graphql-go/graphql](https://github.com/graphql-go/graphql) 是什么？
  - Golang GraphQL 解析、执行库
  - Code First - 先 Go 代码，然后生成 GraphQL
  - 通过 struct 构建内容生成 graphql schema
  - 通过 struct 构建 resolver 和类型字段处理
  - 构建过程和执行过程可以使用 thunk 模式 - 返回函数，用到的时候再执行
  - 因为存在循环依赖，延迟执行也能进行其他优化
- resolve - `func(p ResolveParams) (interface{}, error)`
  - DefaultResolveFn - field 默认 resolve
    - 支持 map 和 struct - 不支持 Embed struct
    - 字段比较忽略大小写
  - source 也可以实现 FieldResolver - 这样可以交由返回结果判断如何 resolve
  - 执行过程
    - 收集字段
    - 执行字段
    - resolve 字段
    - 计算值 - 处理 promise、序列化 scalars、执行下级字段
      - thunk 延迟
      - null 检查
      - list 展开
      - union 和 interface 实际类型检测
      - object 展开 - 向下求值
- 扩展
  - `ParseDidStart(context.Context) (context.Context, ParseFinishFunc)`
  - `ValidationDidStart(context.Context) (context.Context, ValidationFinishFunc)`
  - `ExecutionDidStart(context.Context) (context.Context, ExecutionFinishFunc)`
  - `ResolveFieldDidStart(context.Context, *ResolveInfo) (context.Context, ResolveFieldFinishFunc)`
