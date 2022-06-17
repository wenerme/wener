---
title: Design Form
---

# Design Form

- 核心思想
  - 单列
  - 不要 Reset 按钮
  - 行内错误信息
- 特殊场景
  - B 端 PC 网页表单
- 参考
  - [Designing Efficient Web Forms: On Structure, Inputs, Labels And Actions](https://www.smashingmagazine.com/2017/06/designing-efficient-web-forms/)
  - [Form Design for Complex Applications](https://uxdesign.cc/form-design-for-complex-applications-d8a1d025eba6)
  - [Pattern 5: Improve usability of long forms](https://proximityschool.com/learn/pattern-5-improve-usability-long-forms/)
  - [Form Field Usability: Avoid Multi-Column Layouts (13% Get It Wrong)](https://baymard.com/blog/avoid-multi-column-forms)
  - [Form Design Inspiration](https://medium.muz.li/form-design-inspiration-6bb9a350f2d8?gi=da5178313d5e)

## Form 类型

- PowerApps Formula [FunctionForm](https://docs.microsoft.com/en-us/power-apps/maker/canvas-apps/functions/function-form)
  - EditForm, NewForm, SubmitForm, ResetForm, ViewForm
- PowerApps [formContext.ui.getFormType()](https://docs.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui/getformtype)
  - Create
  - Update
  - Read Only
  - Disabled
  - Bulk Edit

| FormMode      | DisplayMode      |
| ------------- | ---------------- |
| FormMode.Edit | DisplayMode.Edit |
| FormMode.New  | DisplayMode.Edit |
| FormMode.View | DisplayMode.View |

## 参考

- [58 Form Design Best Practices & Form UX Examples](https://www.ventureharbour.com/form-design-best-practices/)
  - General form design & structure
  - Questions & field types
  - Accessibility & ease of use
  - Validation & error handling
  - Trust & social proof
  - Multi-step forms & progress indicators
  - Buttons & call to actions
  - Mobile form best practices
- [Design Better Forms](https://uxdesign.cc/design-better-forms-96fadca0f49c)
  - 单列
  - 顶部对齐标签
  - 根据输入进行标签分组
  - 避免全大写
  - 选项小于 6 个时，全部显示
  - 不要用占位符作为标签
  - Place checkboxes (and radios) underneath each other for scannability
  - 让操作 （CTA）文案更具描述性
    - CTA - call to action
  - 行内错误
  - Use inline validation after the user fills out the field (unless it helps them while in the process)
  - 不隐藏基本的帮助信息
  - Differentiate primary from secondary actions
  - Use field length as an affordance
  - Ditch the \* and denote optional fields
  - 按相关性分组
- [Form Layouts: 6 Best Practices and Great Examples to Follow](https://blog.hubspot.com/marketing/form-layouts)
  1. 单列布局
  2. Align copy to the left
  3. 单页布局
  4. 移动端友好布局
  5. 行内字段标签
  6. 行内错误消息
- [Form Layout: 10 Tips to Structure Your Forms](https://www.gravityforms.com/form-layout/)
  - 不要照搬纸质表单格式
  - Group the Form in its Own Container
  - 减少鼠标使用
  - 移除不必要字段
    - Typing has a high cost to your users because it’s time-consuming and error prone
  - Match Fields to the Input
  - 将标签标准化
  - 不要 Reset 按钮
  - Plan for User Errors
  - 单列布局
  - 按照逻辑对字段进行排序

## TBD

Why ask?
Omit optional fields and think of other ways to collect data. Always ask yourself if the question can be inferred, postponed, or completely excluded.
Data entry is increasingly automated. For example, mobile and wearable devices collect large amounts of data without the user’s conscious awareness. Think of ways you can leverage social, conversational UI, SMS, email, voice, OCR, location, fingerprint, biometric, etc.

Make it fun
Life is short. No one wants to fill out a form. Be conversational. Be funny. Gradually engage. Do the unexpected. It is the role of the designer to express their company’s brand to elicit an emotional reaction. If done correctly, it will increase completion rates. Just make sure you don’t violate the rules listed above.
