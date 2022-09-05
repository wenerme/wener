---
title: JSON Schema Awesome
tags:
  - Awesome
---

# JSON Schema Awesome

| validator                    | lang   | version                                        |
| ---------------------------- | ------ | ---------------------------------------------- |
| [ajv]                        | js     | 2020-12, 2019-09, draft-07, draft-06, draft-04 |
| [santhosh-tekuri/jsonschema] | golang | 2020-12, 2019-09, draft-07, draft-06, draft-04 |

[santhosh-tekuri/jsonschema]: https://github.com/santhosh-tekuri/jsonschema
[ajv]: ../../web/script/lib/ajv.md

- 选择 Schema
  - https://ajv.js.org/guide/schema-language.html
- https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-02
- [json-schema-org/json-schema-spec](https://github.com/json-schema-org/json-schema-spec)
- 工具
  - [APIDevTools/json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser)
    - MIT, JS
    - 合并 $ref
  - [sagold/json-schema-library](https://github.com/sagold/json-schema-library)
    - TS
  - [hyperjump-io/json-schema-core](https://github.com/hyperjump-io/json-schema-core)
    - MIT, JS, TS
    - framework for building JSON Schema validators
- https://schema.org/docs/schemas.html
  - 开放 Schema
- https://json-schema.org/implementations.html
- http://jlblcc.github.io/json-schema-viewer/
- JSON Schema from
  - [vega/ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator)
    - JSON Schema from Typescript
  - [YousefED/typescript-json-schema](https://github.com/YousefED/typescript-json-schema)
    - JSON Schema from Typescript
  - [invopop/jsonschema](https://github.com/invopop/jsonschema)
    - JSON Schemas from Golang
    - draft 2020-12
  - [victools/jsonschema-generator](https://github.com/victools/jsonschema-generator)
    - from Java Class
  - https://www.liquid-technologies.com/online-json-to-schema-converter
    - from JSON
  - [jsonsystems/public](https://github.com/jsonsystems/public)
    - from JSON
    - https://www.jsonschema.net/
- JSON Schema to
  - http://www.jsonschema2pojo.org/
    - JSON Schema to POJO
- Data from JSON Schema
  - fakejs
  - [json-schema-faker/json-schema-faker](https://github.com/json-schema-faker/json-schema-faker)
    - https://json-schema-faker.js.org/
  - [jimblackler/jsongenerator](https://github.com/jimblackler/jsongenerator)
    - Apache-2.0, Java
- UI from JSON Schema
  - [rjsf-team/react-jsonschema-form](../../web/react/react-jsonschema-form.md)
  - [json-editor/json-editor](https://github.com/json-editor/json-editor)
    - MIT, JS
    - https://json-editor.github.io/json-editor/
    - JSON Schema Based Editor
  - [ui-schema/ui-schema](https://github.com/ui-schema/ui-schema)
    - Material UI React
    - https://ui-schema.bemit.codes/
  - [alibaba/formily](../../web/editor/formily.md)
    - 扩展 JSON Schema 实现的 Form UI 生成
  - [eclipsesource/jsonforms](https://github.com/eclipsesource/jsonforms)
    - React, MUI
  - [vazco/uniforms](../../web/react/uniforms.md)
    - MIT, TS, React
    - SemanticUI, AndT, MUI, Bootstrap
    - https://uniforms.tools/playground
    - uniforms - 41kB/12kB - lodash 28kB
    - uniforms-bridge-json-schema - self 3kB
  - [vip-git/universal-json-schema](https://github.com/vip-git/universal-json-schema)
    - MIT, TS, React, MUI
    - https://react-jsonschema-form-material-ui-github56.vercel.app/
  - [restspace/schema-form](https://github.com/restspace/schema-form)
  - [networknt/react-schema-form](https://github.com/networknt/react-schema-form)
  - [gitana/alpaca](https://github.com/gitana/alpaca)
    - Bootstrap, jQuery UI, jQuery Mobile
- JS
  - [kriszyp/json-schema](https://github.com/kriszyp/json-schema)
    - Typescript 定义

:::tip JSON Schema Form 的几种常见情况

1. 完全 UI 生成
  - 面向数据场景
  - 不会特别好看，但支持的功能多
2. 提供默认组件联动
  - 面向用户场景
  - 通常会抽象 Field/Form 逻辑
  - 易于扩展
3. 外置 UI Layout 信息
  - 推荐 - 保持干净的 Schema
4. 扩展 JSON Schema 内置 UI Layout 信息
  - 扩展后的 JSON Schema 不一定是合法的 JSON Schema
  - 上下关联顺序可能会发生变化

:::

- [jviotti/awesome-jsonschema](https://github.com/jviotti/awesome-jsonschema)
- [json-schema-org/json-schema-spec](https://github.com/json-schema-org/json-schema-spec)
- [json-schema-org/JSON-Schema-Test-Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite)
- [CarstenWickner/react-jsonschema-inspector](https://github.com/CarstenWickner/react-jsonschema-inspector)
  - Inspector
- Validator
  - https://www.jsonschemavalidator.net/
  - https://jsonschema.dev/
  - https://app.quicktype.io/
  - https://json-schema.hyperjump.io/
  - https://jschon.dev/
  - https://jsonschemalint.com/
  - https://www.json-schema-linter.com
    - https://rapidapi.com/Clemens-U/api/json-toolbox/
    - https://www.json-buddy.com/
- [cloudflare/json-schema-tools](https://github.com/cloudflare/json-schema-tools)
- [adobe/jsonschema2md](https://github.com/adobe/jsonschema2md)
  - 2019-09
- Registry
  - [SchemaStore/schemastore](https://github.com/SchemaStore/schemastore)
    - https://www.schemastore.org/json/
  - https://schemas.sourcemeta.com/
- 参考
  - [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/index.html)
  - proptypes-to-json-schema
    - React propTypes -> JSON Schema

