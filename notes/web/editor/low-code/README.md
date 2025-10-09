---
title: Low Code Design
tags:
  - Design
---

# Low Code Design

:::tip

- Low Code - 讲究 编辑，关联，任意 组件
- 组件的特性
  - 配置化
  - Schema化
- 可以参考设计，只实现配置化

:::


- 模型
  - ProseMirror 的 Schema 模型值得借鉴参考
  - HTML/JSX - type/tag, attributes, children
- 模型=序列化
  - 序列化 元素 - 最简单
  - 序列化 操作 - 事件
  - 序列化 状态 - 响应、条件

```js
// React Element 模型
const reactElement = {
  // 类型识别
  $$typeof: REACT_ELEMENT_TYPE,

  // 组件类型
  type: type,
  key: key,
  ref: ref,
  props: props, // dev 时 Object.freeze
};
```

- [x-render](../x-render.md)
  - 基于 JSON schema 扩展处理属性

## 百度 Aims

```json
{
  // 注册的类型
  "type": "page",
  // 组件能处理的属性
  "title": "Demo",
  // children
  "body": [
    {
      "type": "form",
      "actions": [],
      "debug": true,
      "mode": "horizontal",
      // 配置表单处理逻辑
      "api": {
        "method": "post",
        "url": "/amis/api/mock2/form/saveForm",
        "data": {
          // 数据替换
          "user.name": "${name|default:undefined}",
          "email": "${email}"
        }
      },
      "body": [
        {
          "type": "radios",
          "name": "status",
          "value": "1",
          "label": "状态",
          "options": {
            "1": "离线",
            "2": "在线"
          }
        },
        {
          "type": "mapping",
          "name": "status",
          "label": "状态展示",
          "map": {
            "1": "离线",
            "2": "在线"
          },
          // 根据状态变化类型
          "className": {
            "text-muted": "this.status == '1'",
            "text-success": "this.status == '2'"
          }
        },
        {
          "type": "select",
          // 定义 select 的数据源
          "source": {
            "method": "get",
            "url": "/amis/api/mock2/options/level2?a=${a}",
            "sendOn": "this.a === 2"
          }
        }
      ]
    }
  ]
}
```
