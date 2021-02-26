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
  - [amancevice/docker-superset](https://github.com/amancevice/docker-superset) - 单 docker 启动 superset
    - [启动示例](https://github.com/amancevice/docker-superset/tree/main/examples)
    - 管理工具 `/usr/local/bin/superset`
    - 安装位置 `/usr/local/lib/python3.6/site-packages/superset/`
  - [如何新增插件](https://preset.io/blog/2020-07-02-hello-world/)
- Dashboard 只读基础权限
  - can explore json on Superset
  - can dashboard on Superset
  - can list on CssTemplateModelView - 否则会出一个错误信息
  - datasource access on xxx.xxx
  - can csrf token on Superset
  - can show on DashboardModelView
- 问题
  - [apache-superset/superset-ui#409](https://github.com/apache-superset/superset-ui/issues/409) - Calendar heatmap dates shifted by one (converting to local time zone)

## 配置
* [缓存配置](https://superset.apache.org/docs/installation/cache)
* [config.py](https://github.com/apache/superset/blob/master/superset/config.py)

```py
PUBLIC_ROLE_LIKE_GAMMA = True
SESSION_COOKIE_SAMESITE = None
SESSION_COOKIE_HTTPONLY = False
#HTTP_HEADERS = {'X-Frame-Options': 'ALLOW-FROM http://localhost:8080'}
#HTTP_HEADERS = {'Content-Security-Policy': 'frame-ancestors \'self\' localhost:8081','Access-Control-Allow-Origin':'*'}

#
ROW_LIMIT = 5000
SUPERSET_WORKERS = 2

SUPERSET_WEBSERVER_PORT = 8088

# Flask App Builder configuration
# Your App secret key
SECRET_KEY = '\2\1thisismyscretkey\1\2\e\y\y\h'

# The SQLAlchemy connection string to your database backend
# This connection defines the path to the database that stores your
# superset metadata (slices, connections, tables, dashboards, ...).
# Note that the connection information to connect to the datasources
# you want to explore are managed directly in the web UI
SQLALCHEMY_DATABASE_URI = 'sqlite:////var/lib/superset/superset.db'

# Flask-WTF flag for CSRF
WTF_CSRF_ENABLED = True
# Add endpoints that need to be exempt from CSRF protection
WTF_CSRF_EXEMPT_LIST = []
MAPBOX_API_KEY = ''

#
MAPBOX_API_KEY = os.getenv('MAPBOX_API_KEY', '')

# Flask 缓存
# https://flask-caching.readthedocs.io/en/latest/#configuring-flask-caching
# Superset 自己缓存
CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 300,
    'CACHE_KEY_PREFIX': 'superset_',
    'CACHE_REDIS_HOST': 'redis',
    'CACHE_REDIS_PORT': 6379,
    'CACHE_REDIS_DB': 1,
    'CACHE_REDIS_URL': 'redis://redis:6379/1'}

# 数据库缓存
DATA_CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 60 * 60 * 24, # 1 day default (in secs)
    'CACHE_KEY_PREFIX': 'superset_results',
    'CACHE_REDIS_URL': 'redis://localhost:6379/0',
}

# SQL Lab 查询结果存储
# RESULTS_BACKEND

SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://superset:superset@postgresql:5432/superset'
SQLALCHEMY_TRACK_MODIFICATIONS = True
SECRET_KEY = ''

# 跳转到 https
ENABLE_PROXY_FIX = True
PREFERRED_URL_SCHEME = 'https'
```

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

# FAQ
## 前端显示的 UTC 日期
* [#3928](https://github.com/apache/incubator-superset/issues/3928) - Timestamps are not displayed in the client's local timezone
* [#9304](https://github.com/apache/incubator-superset/issues/9304#issuecomment-609524741)
  * Superset decided to always UTC time to keep things simple. It'd be quite some work if we want to add custom timezone support.

```py
SUPERSET_D3_LOCALE = """
{
  "decimal": ".",
  "thousands": ",",
  "grouping": [3],
  "currency": ["£", ""],
  "dateTime": "%a %e %b %X %Y",
  "date": "%d/%m/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
} """

SUPERSET_D3_LOCALE = """
{
  "decimal": ".",
  "thousands": ",",
  "grouping": [3],
  "currency": ["¥", ""],
  "dateTime": "%a %b %e %X %Y",
  "date": "%Y-%d-%m",
  "time": "%H:%M:%S",
  "periods": ["上午", "下午"],
  "days": ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  "shortDays": ["日", "一", "二", "三", "四", "五", "六"],
  "months": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  "shortMonths": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
} """
```

## Hide menus

```css
html:not([mode='edit']) .dashboard-header > .button-container {
    display: none !important;
}
html:not([mode='edit']) header.top {
    display: none;
}
html:not([mode='edit']) .chart-header>.header>.dropdown {
    display: none !important;
}
html:not([mode='edit']) .dragdroppable-tab .anchor-link-container {
    display: none !important;
}
```

```js
// 显示
$('html').attr('mode','edit')
```
