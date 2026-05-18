---
title: Liquid
---

# Liquid

- [shopify/liquid](https://github.com/shopify/liquid)
  - MIT, Ruby
  - **非图灵完备**
  - adopted by: Shopify, BigCommerce(有 handlebars 支持), Zendesk, Jekyll, Eleventy
- 参考
  - Spec https://shopify.github.io/liquid/
  - Playrgound https://liquidjs.com/playground.html
  - Golang https://github.com/osteele/liquid
  - JS https://github.com/harttle/liquidjs
  - Python https://github.com/jg-rp/liquid
  - Java https://github.com/bkiers/Liqp
  - Rust https://github.com/cobalt-org/liquid-rust
- if/else/endif,unless/endunless,case/when/else/endcase
- for/else/continue/break/endfor
- echo, render, liquid, raw/endraw
- assign,increment,decrement
- include
- capture/endcapture
- operators: ==, !=, <, <=, >, >=, and, or, contains

```liquid
{% assign username = "John G. Chalmers-Smith" -%}
{%- if username and username.size > 10 -%}
  Wow, {{ username -}} , you have a long name!
{%- else -%}
  Hello there!
{%- endif %}


{% for item in array limit:2 offset:2 %}
  {{ item }}
{% endfor %}

{% for i in (3..5) %}
  {{ i }}
{% endfor %}


{% assign num = 4 %}
{% assign range = (1..num) %}
{% for i in range reversed %}
  {{ i }}
{% endfor %}


{% liquid
  # this is a comment
  assign topic = 'Learning about comments!'
  echo topic
%}

{% # comment %}

{% raw %}
In Handlebars, {{ this }} will be HTML-escaped, but {{{ that }}} will not.
{% endraw %}
```
