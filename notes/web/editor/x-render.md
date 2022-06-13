---
title: x-render
---

# alibaba/x-render

- schema 基于 json-schema
- [fr-generator](https://github.com/alibaba/x-render/tree/master/tools/schema-generator) - 表单设计器
  - https://xrender.fun/generator/playground

```json
{
  // 布局样式控制
  "displayType": "row",
  "labelWidth": 60,
  "type": "object",
  "properties": {
    // 数据字段定义
    "input": {
      "title": "简单输入框",
      // 组件数据类型定义
      "type": "string",
      "min": 6,
      "rules": [
        {
          "pattern": "^[A-Za-z0-9]+$",
          "message": "只允许填写英文字母和数字"
        }
      ]
    },
    "select": {
      "title": "单选",
      "type": "string",
      "enum": ["a", "b", "c"],
      "enumNames": ["选项1", "选项2", "选项3"],
      // 控制使用的组件
      "widget": "radio"
    },
    //
    "showSetting": {
      "title": "是否展示网址",
      "type": "boolean"
    },
    "siteUrl": {
      "title": "网址",
      "type": "string",
      "placeholder": "此处必填",
      // 联动控制
      "hidden": "{{formData.showSetting !== true}}",
      "required": true,
      "props": {
        "addonBefore": "https://",
        "addonAfter": ".com"
      }
    }
  }
}
```
