---
title: Low Code Awesome
---

# Low Code Awesome

> 一般指前端或前端+后端对接代码代码，纯后端 Low/No-Code 为 BaaS

- 适用场景
  - 不懂代码的人需要得到操作代码的能力
  - 减少重复工作 - DSL 是一种抽象
- 不适用场景
  - 复杂交互
  - 美观页面
- LCDP - low-code development platform
- 可视化编辑
- Low-Code
  - 低代码
  - 可能是生成代码
  - 可能能利用现有组件
  - 生成代码到仓库可自行定制化
  - 例如: DSL 生成代码, Web Builder 生成代码, 接口生成代码
- No-Code
  - Web Builder
  - 基础应用无代码
  - 固定领域
  - 例如: 流程, SQL Builder, Web Page
- Pro-Code
  - 从根本上降低从头构建一个系统的复杂度
  - 例如: React
- 代码在哪里
  - 生成后提交到仓库
  - 生成在本地
  - 不生成，只有元数据，运行时动态构建
- 方式目的
  - 面向数据 - AirTable、Superset
    - 链接 数据源
    - 读数据 - 探索、挖掘、分析、聚合
    - 写数据 - 快速提交表单、调查
  - 面向设计 - Figma
    - 页面布局、元素数据
    - 输出 HTML、DSL
  - 面向内容 - Notion
    - CMS 内容
  - 面向逻辑 - Blockly
    - 可视化编辑代码逻辑
    - Node Editor - 流程

---

- [BuilderIO/builder](https://github.com/BuilderIO/builder)
  Page Builder
  - MIT, React, Vue, Angular
  - [builderio/jsx-lite](https://github.com/builderio/jsx-lite)
    JSX to Vue, React, Solid, Angular, Svelte, Liquid
  - [builderio/figma-html](https://github.com/builderio/figma-html)
    Figma to HTML, CSS, React, Vue
    - 基于 JSXLite
  - [BuilderIO/mitosis](https://github.com/BuilderIO/mitosis)
    - Write components once, run everywhere
    - Vue, React, Solid, Angular, Svelte, Figma, Webcomponents, RN, SwiftUI
- [saltcorn/saltcorn](https://github.com/saltcorn/saltcorn)
  - MIT, JS+TS
- [Budibase/budibase](https://github.com/Budibase/budibase)
  - GPL v3
  - https://github.com/Budibase/budibase/blob/develop/packages/types/src/documents/document.ts
  - https://docs.budibase.com/references-1/budibase-architecture
- [dashjoin/platform](https://github.com/dashjoin/platform)
  - AGPLv3, Java
  - Open Source & Cloud Native Low Code Development Platform
- [motor-admin/motor-admin](https://github.com/motor-admin/motor-admin)
  - AGPLv3, Rube+Vue
  - no-code admin panel
- [pankod/refine](https://github.com/pankod/refine)
  - MIT, React, AntD
  - 停止开发


**面向原型设计**

- [concrete-utopia/utopia](https://github.com/concrete-utopia/utopia)
  - MIT, TypeScript, React
  - 解析 react 代码，编辑元素属性、样式、布局，修改结果写回到代码
  - https://utopia.app/p/36ae27be-welcome-to-utopia/
- [penpot/penpot](https://github.com/penpot/penpot)
  - MPL-2.0, Clojure
  - design & prototyping platform
  - [HN](https://news.ycombinator.com/item?id=30407913)
- [KlausSchaefers/quant-ux](https://github.com/KlausSchaefers/quant-ux)
  - GPL-3.0, Vue
  - 前端 GPL 意味着只能单独使用

**面向数据**

- Airtable-like / Spreadsheets / Excel
  - [rowyio/rowy](https://github.com/rowyio/rowy)
    - Apache-2.0, TS
  - [nocodb/nocodb](https://github.com/nocodb/nocodb)
    - AGPL-3.0, Vue
  - [gristlabs/grist-core](https://github.com/gristlabs/grist-core)
    - Apache-2.0, TS
- [lowdefy/lowdefy](https://github.com/lowdefy/lowdefy)
  build internal tools, web apps, admin panels, BI dashboards, workflows, and CRUD apps with YAML or JSON.
  - Apache-2.0, JS
  - 基于 yaml 生成 - block, operator, action, requests
  - 可以借鉴 YAML 设计结构
- [frappe/frappe](https://github.com/frappe/frappe)
  - MIT, Python+MariaDB
- [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith)
  Build custom CRUD apps that talk to any API or database
  - Apache-2.0, Typescript+Java
- [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet)
  no-code platform for building and deploying internal tools
  - AGPL-3

## Builder

- [prevwong/craft.js](https://github.com/prevwong/craft.js)
- [premieroctet/openchakra](https://github.com/premieroctet/openchakra)
  - 开发不活跃
- https://webcodesk.com/
- [plasmicapp/plasmic](https://github.com/plasmicapp/plasmic)
  - MIT, TS
  - 依赖 plasmic 平台接口 - 类似 builderio
  - [vs. Others](https://docs.plasmic.app/learn/comparisons/)
- [Shopify/hydrogen](https://github.com/Shopify/hydrogen)
  - React-based framework for building dynamic, Shopify-powered custom storefronts

---

- https://divjoy.com/

## 商业

- 轻流 https://qingflow.com/
- https://cloud.tencent.com/product/weda
- https://responsevault.com/demo/
- [convertigo/convertigo](https://github.com/convertigo/convertigo)
  - AGPL, Java, Vue
  - Server - MBaaS, Studio - Mobile Builder, SDK, Forms
- [cortezaproject/corteza-server](https://github.com/cortezaproject/corteza-server)
  - Apache-2.0, Go
  - 后端开源
  - Demo https://latest.cortezaproject.org/
  - 商业版 [crust.tech](https://www.crust.tech/)
    - [crusttech/crust-server](https://github.com/crusttech/crust-server)
    - Crust CRM
    - Crust Messaging
    - Crust Compose - Low Code Development platform
    - Crust Unify
- [jogetworkflow/jw-community](https://github.com/jogetworkflow/jw-community)
  no-code/low-code application platform that combines the best of rapid application development, business process automation and workflow management
  - GPLv3, Java
- [openxava/openxava](https://github.com/openxava/openxava)
- [appsemble/appsemble](https://github.com/appsemble/appsemble)
  LGPL-3.0
  - TypeScript
- [Rintagi/Low-Code-Development-Platform](https://github.com/Rintagi/Low-Code-Development-Platform)
  - C#
- [skyvers/skyve](https://github.com/skyvers/skyve)
  - LGPL-2.1, Java
- [blocks/blocks](https://github.com/blocks/blocks)
  JSX Page Builder
  - MIT, JS
  - 开发停滞

## 国内项目

- [nocobase/nocobase](https://github.com/nocobase/nocobase)
  - Apache-2.0, TS
  - https://demo.nocobase.com/new
  - sequelize
  - migration umzug
- [taowen/awesome-lowcode](https://github.com/taowen/awesome-lowcode)
  国内低代码平台
- [alibaba/x-render](https://github.com/alibaba/x-render)
  阿里飞猪 中后台「表单 / 表格 / 图表」解决方案
  - https://xrender.fun/playground
- [alibaba/formily](https://github.com/alibaba/formily)
  - 基于 jsonschema 表单生成
- [alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine)
  - Demo https://lowcode-engine.cn/demo/index.html
- [baidu/amis](https://github.com/baidu/amis)
  JSON 配置生成页面
  - 百度 suda 平台前端
  - 可学习借鉴 JSON 模型设计
- [zhangdaiscott/jeecg-boot](https://github.com/zhangdaiscott/jeecg-boot)
  - Apache, Java 代码生成器
  - SpringBoot 2.x，SpringCloud，Ant Design&Vue，Mybatis-plus，Shiro，JWT
  - MySQL+Redis, Java+Vue
- [ymm-tech/gods-pen](https://github.com/ymm-tech/gods-pen)
  mobile page builder/editor
  - MIT, Vue
  - 网页制作平台
- [sparrow-js/sparrow](https://github.com/sparrow-js/sparrow)
  - MIT, Typescript+Vue+element-ui
  - [online](https://sparrow-js.github.io/sparrow-online/)
- [ly525/luban-h5](https://github.com/ly525/luban-h5)
  - GPL-3.0, Vue
- [MrXujiang/h5-Dooring](https://github.com/MrXujiang/h5-Dooring)
  - GPL, TypeScript+React
  - dva, less, umi, antd, axios, react-dnd, zarm, koa, ramda
- [wangyuan389/mall-cook](https://github.com/wangyuan389/mall-cook)
  - 商城低代码平台，可视化搭建 H5、小程序多端商城
- [w5teams/w5](https://github.com/w5teams/w5)
  - GPL-3.0, Python
  - Security Orchestration, Automation and Response
  - 流程编排
- [vuegg/vuegg](https://github.com/vuegg/vuegg)
  - vue GUI generator
- [i5ting/imove](https://github.com/i5ting/imove)
- 开发停滞
  - [brick-design/brick-design](https://github.com/brick-design/brick-design)
    - MIT, TypeScript+Less+React
    - umi, antd
  - [ascoders/gaea-editor](https://github.com/ascoders/gaea-editor)
    - Typescript+React
  - [umijs/sula](https://github.com/umijs/sula)
    enterprise-level configurable framework based on antd
  - [ricbet//panel-magic](https://github.com/ricbet//panel-magic)
    - Angular

## 表单

- [alibaba/formily](https://github.com/alibaba/formily)
  React/Vue2/Vue3 表单解决方案
- [JakHuang/form-generator](https://github.com/JakHuang/form-generator)
  - MIT, Vue+Element UI

## 不活跃项目

- [react-ui-builder/structor](https://github.com/react-ui-builder/structor)
  React UI Builder
  - Apache-2.0
  - 项目已经归档
  - [react-ui-builder/react-ui-builder-editor](https://github.com/react-ui-builder/react-ui-builder-editor)
    - GPL-3.0
- [vigetlabs/colonel-kurtz](https://github.com/vigetlabs/colonel-kurtz)
  Block Editor
  - 开发停滞
- [vuegg/vuegg](https://github.com/vuegg/vuegg)
  vue GUI generator
  - MIT
  - 开发停滞

## 编排

- n8n
- node-red
- [w5teams/w5](https://github.com/w5teams/w5)
  - GPL-3.0

## 逻辑

- [ykfe/imove](https://github.com/ykfe/imove)
  流程可视化

## ERP

- [odoo/odoo](https://github.com/odoo/odoo)
  - LGPLv3
- [getrebuild/rebuild](https://gitee.com/getrebuild/rebuild)
  企业管理系统

## 商业化

- 国外
  - retool
  - uibakery
  - radzen
  - outsystems
  - internal
  - AppGyver
  - Zoho Creator
  - AppSheet
