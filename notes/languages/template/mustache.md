---
title: mustache
---

# mustache

- JS
  - [janl/mustache.js](https://github.com/janl/mustache.js)
- Logic-less
- 参考
  - playground https://jgonggrijp.gitlab.io/wontache/playground.html

| syntax           | for                       |
| ---------------- | ------------------------- |
| `{{var}}`        | 变量输出                  |
| `{{{var}}}`      | 变量原始输出, 不转义      |
| `{{&var}}`       | 变量原始输出, 不转义      |
| `{{#section}}`   | 节点开始,条件/循环/上下文 |
| `{{/section}}`   | 节点结束                  |
| `{{^section}}`   | 节点开始, 取反            |
| `{{! comment }}` | 注释                      |
| `{{> partial }}` | 引用片段                  |
| `{{ . }}`        | 当前上下文                |
| `{{=<% %>=}}`    | 自定义分隔符              |

```html
{{#users}}
<b>{{name}}</b>
{{/users}}
```

```html
{{=<% %>=}}
<%#users%>
<b><%name%></b>
<%/users%>
```
