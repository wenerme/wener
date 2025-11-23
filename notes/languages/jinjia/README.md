---
tags:
  - Template Engine
---

# jinja

- 参考
  - https://jinja.palletsprojects.com/en/3.1.x/
  - https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_templating.html
  - https://documentation.bloomreach.com/engagement/docs/jinja-syntax
  - https://mitsuhiko.github.io/minijinja-playground/
- 实现
  - [mitsuhiko/minijinja](https://github.com/mitsuhiko/minijinja)
    - wasm npm minijinja-js
  - [google/minja](https://github.com/google/minja)
    - used by llama.cpp, jan, gpt4all

| syntax                                   | desc                     |
| ---------------------------------------- | ------------------------ |
| `{% %}`                                  | 语句                     |
| `{{ }}`                                  | 表达式，输出到模板输出   |
| `{# #}`                                  | 注释，不包含在模板输出中 |
| `{{ var }}`                              | 变量                     |
| `{{ var.attribute }}`                    | 属性                     |
| `{{ var.attribute.method() }}`           | 方法                     |
| `{{ var.attribute.method(arg1, arg2) }}` | 方法参数                 |

```jinja
{% set first_name = customer.first_name | title if customer.first_name else "Sir/Madam" %}
```
