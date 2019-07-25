# Vaadin

## Tips

* vaadin-elements
  * Vaadin 与 WebComponent 集成的扩展
  * 目前尚未正式发布, 可使用快照版
  * 能够与现在组件做一定集成
  * [Using Vaadin Elements with Vaadin Framework](https://vaadin.com/blog/-/blogs/using-vaadin-elements-with-vaadin-framework)

组件示例
https://demo.vaadin.com/sampler/

https://vaadin.com/docs/v10


https://vaadin.com/blog/vaadin-10-and-static-resources

## Vaddin Elements

* [Elements](https://vaadin.com/elements)
  * Components for building awesome web apps. Mobile and desktop.
* 一套基于 Polymer 2 的组件
* 暂没有与 Vaadin Framework 有很好的集成

## Vaadin Flow
HtmlImport
JavaScript
StyleSheet
Uses

https://github.com/vaadin/flow

## Release

### 10

### 8
* Java 8

## Layout

* [Layout Overview](https://vaadin.com/docs/-/part/framework/layout/layout-overview.html)

![](https://vaadin.com/vaadin-fw8-documentation-portlet/framework/layout/img/layout-schematic.png)

caption-as-html
visible
data
icon
caption
description
primary-style-name
enabled
style-name
responsive
id

locale

width-auto
size-auto
width-full
width



tabindex

0 = "width"
1 = "height"
2 = "debug-id"
3 = "error"
4 = "width-auto"
5 = "height-auto"
6 = "width-full"
7 = "height-full"
8 = "size-auto"
9 = "size-full"
10 = "immediate"
11 = "locale"
12 = "read-only"
`_id`




* jsoup HTML 解析器
* flute CSS 解析器
* html 的 root 元素类型必须与组件类型相同

## Notes
* `View`
* `ViewDisplay`
* `Navigator`

* `Binder`


SpringComponent
SpringUI
SpringView
SpringViewDisplay
UIScope
VaadinSessionScope
ViewScope

BeanValidationBinder

## FAQ
### webapp 未被包含

jar 包会默认忽略 webapp
war 会包含 webapp

https://stackoverflow.com/a/28727189/1870054

### 不支持 `/user/:id/edit` 这样的路由
https://github.com/vaadin/flow/issues/2740
