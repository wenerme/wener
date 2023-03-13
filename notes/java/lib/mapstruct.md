---
title: MapStruct
---

# MapStruct

- 入口 `org.mapstruct.ap.MappingProcessor`
- `org.mapstruct.ap.internal.model.common.Type`
  - 表示对一个类型属性, 参数的引用
  - 每生成的一个文件为一组类型
  - 每个类型对应一个 `TypeMirror`
  - 对 `Set<String>` 和 `Set<Integer>` 是不一样的类型
  - 从 `TypeFactory` 获取实例
- `org.mapstruct.ap.internal.processor.ModelElementProcessor`
  - Processor 中会使用该接口做一些额外处理
