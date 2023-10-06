---
title: Design Form Service
---

# Design Form Service

:::tip

- 确定前端框架 - 基于 vanilla js 还是 reacy、vue、svelte、web component
- 拆分设计和上线功能
  - 设计
    - 区分设计 Schema 和 UI
    - 设计 UI 包含 Layout 和 Field - low-code + value&onChange 逻辑
    - 包含非常多的细节 - 意味着复杂，限制很多
    - 功能强大的设计过于复杂
  - 上线功能
    - 只关系结果
    - 能提交验证数据
    - 能显示页面
- 逻辑
  - 复杂、高级表单通常存在内部关联逻辑

:::

- 参考
  - 字段设计
    - https://github.com/gitana/alpaca/tree/master/src/js/fields
  - FormBuilder
    - https://github.com/formio/formio.js/blob/master/src/builders/Builders.js

# 参考实现

## ohmyform

- ~~[ohmyform/ohmyform](https://github.com/ohmyform/ohmyform)~~
  - AGPL, TS, typeorm
- entities
  - form
    - title, language, fields, startPage, endPage, showFooter, isLive, anonymousSubmission, design
  - form_field
  - form_field_logic
    - formula, action, visible, require, disable, jumpTo, enabled
  - form_field_option
    - key, title, value
  - form_hook
    - enalbled, url, format
  - form_notification
    - subject, htmlTemplate, enabled, formField, toField, toEmail, fromEmail
  - page
    - title, show, paragraph, buttonText, buttons
  - page_button
    - url, action, text, bgColor, activeColor, color
  - submission
    - fields, form, formId, visitor, ipAddr, tokenHash, geoLocation, device, timeElasped, percentageComplete, user, created, lastModified
  - submission_field
    - submission, field, fieldId, type, content
  - user
  - visitor

## formio

- [formio/formio](https://github.com/formio/formio)
  - OSL-3.0, JS
  - mongoose
  - https://github.com/formio/formio/blob/master/src/models/models.js
- Models
  - role
  - schema
  - token
  - action
    - title, name, handler, method, condition, priority, settings, form, deleted
  - form
    - title, name, path, type, display, action, tags, components, settings, properties
    - deleted, access, submissionAccess, fieldMatchAccess, owner
    - type: form, resource
  - submission
    - form, owner, deleted, roles, access, externalIds, metadata, data
  - Component
    - label, key, type, input, protected, tableView

## react-jsonschema-form

- https://github.com/rjsf-team/react-jsonschema-form
