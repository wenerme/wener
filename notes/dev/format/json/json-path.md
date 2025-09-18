---
tags:
  - DSL
---

# JSON Path

- [jsonpath-standard/jsonpath-compliance-test-suite](https://github.com/jsonpath-standard/jsonpath-compliance-test-suite)
  - Compliance Test Suite for the JSONPath Internet Draft
- [JSONPath Comparison](https://cburgmer.github.io/json-path-comparison/)
- JS
  - [ashphy/jsonpath-js](https://github.com/ashphy/jsonpath-js)
    - MIT, TS
    - RFC 9535 Compatible
  - [JSONPath-Plus/JSONPath](https://github.com/JSONPath-Plus/JSONPath)
    - Consider implementing RFC 9535 [#205](https://github.com/JSONPath-Plus/JSONPath/issues/205)
    - https://www.postgresql.org/docs/current/functions-json.html
- PostgreSQL
  - 不支持 `[?@.name == "hello"]` -> `$[*] ? (@.name == "hello")`
- 参考
  - https://www.npmtrends.com/jsonpath-vs-json-query-vs-jsonpath-plus-vs-jq-vs-object-mapper-vs-jsonata
  - https://jsonpath.com/
  - [RFC 9535](https://datatracker.ietf.org/doc/html/rfc9535)
    - 2024-02
  - [JSONPath: from blog post to RFC in 17 years](https://www.ietf.org/blog/jsonpath-rfc/)
  - https://support.smartbear.com/alertsite/docs/monitors/api/endpoint/jsonpath.html

# Syntax

```txt

```

| syntax | for      |
| ------ | -------- |
| `$`    | 根节点   |
| `@`    | 当前节点 |
