---
title: Jackson
---

# Jackson

- `BeanPropertyWriter`
  - 将属性进行序列化
  - 可通过 `BeanSerializerModifier` 来修改 `BeanSerializer` 检测到的属性
  - 对应类型的序列化器构建后会缓存, 因此 Modifier 只会触发一次
