---
id: apache-superset
title: Apache Superset
---

# Apache Superset

## Tips

- 注意
  - 前端会显示为 UTC，导致时间 -8
    - [#3928](https://github.com/apache/incubator-superset/issues/3928)
  - 分享添加 `?standalone=true` 可以隐藏不必要的内容
- 参考
  - [自定义授权实现分享](https://medium.com/@sairamkrish/8217956273c1)
  - [Apache superset dashboard in webpage](https://stackoverflow.com/questions/54219101/apache-superset-dashboard-in-webpage)
  - Helm [chart](https://github.com/apache/incubator-superset/tree/master/helm/superset)
- Dashboard 只读基础权限
  - can show on DashboardModelView,
  - can explore json on Superset
  - can dashboard on Superset
  - can csrf token on Superset
  - can list on CssTemplateAsyncModelView - 否则会出一个错误信息
  - datasource access on xxx.xxx

## SQL Macro

- https://superset.incubator.apache.org/sqllab.html#templating-with-jinja
- 命名空间 `superset.jinja_context`

```jinja
{% set date_ref =   filter_values('my_date')[0] %}
AND date >= DATE_ADD({{date_ref}}, INTERVAL -7 DAYS)
```

| Macro                               | Type | Describe           |
| ----------------------------------- | ---- | ------------------ |
| current_user_id()                   | int? | 当前用户 ID        |
| current_username()                  | str? | 当前用户名         |
| url_param(param, default=None)      | any  | URL 参数           |
| filter_values(column, default=None) | any  | form_data 里的数据 |
