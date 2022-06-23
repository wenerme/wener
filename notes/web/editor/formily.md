---
title: formily
---

# formily

- [alibaba/formily](https://github.com/alibaba/formily)
  - 支持 React 和 Vue
  - 扩展 jsonschema
    - 增加 x- 属性
      - x-decorator
      - x-decorator-props
      - x-component
      - x-component-props
      - x-reactions
        - dependencies
        - when - `otherwise`
        - fulfill - 满足状态
        - otherwise - 不满足状态
    - 增加 void 类型 扩展 UI 处理能力 - 和 JSON Schema 不兼容
- 模块 - @formily/{core,react,vue,path,reactive,validator,json-schema}
  - @formily/react - 153kB/36kB
- 设计工具 https://designable-antd.formilyjs.org/
- 核心 API
  - createForm
  - FormProvider
  - FormLayout
  - Field - name,title,required,initialValue,decorator,component
  - FormConsumer - render
  - FormButtonGroup
  - Submit

:::caution

- 结构扩展自 JSON Schema 但 **不是** JSON Schema
  - 其他 JSON Schema 工具识别不了

:::
