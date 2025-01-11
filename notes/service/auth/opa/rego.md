---
title: rego
---

# rego

- undefined 不为 true 也不为 false
  - 类似 SQL 里的 null
- 受 [Datalog](https://en.wikipedia.org/wiki/Datalog) 启发
- [StyraInc/rego-style-guide](https://github.com/StyraInc/rego-style-guide)
- Examples
  - https://github.com/plexsystems/konstraint/tree/main/examples
  - https://github.com/open-policy-agent/gatekeeper-library
  - https://rond-authz.io//docs/policy-integration
  - https://github.com/fugue/regula

```rego
# rule-name IS value IF body
# 多个表达式为 AND
v if { a:=1; a == 1； 2 == 2 }
# if 可以省略
v { "hello" == "world" }
```

- 类型
  - Scalar
  - String
  - Object
  - Set
  - Composite
- Comprehension
  - Array `[ <term> | <body> ]`
  - Object `{ <key>: <term> | <body> }`
  - Set `{ <term> | <body> }`
- future keyword
  - if, in, every, contains
  - contains 和 if 是可选的
  - `import future.keywords.if`
- Complete Definition
  - 值不可变
- implicit
  - data, input
- **unification** operator `=`
  - assignment + comparison
  - `:=` + `==`

**METADATA**

- YAML
  - title
  - description
  - related_resources
  - authors
  - organizations
  - schemas
  - custom
  - scope - package, rule, document, subpackages
  - entrypoint
    - --prune-unused

```rego
# METADATA
# title: My rule
# description: A rule that determines if x is allowed.
# authors:
# - John Doe <john@example.com>
# entrypoint: true
```

```rego

# METADATA
# schemas:
#   - input: schema.input
#   - data.acl: schema["acl-schema"]
allow {
    access := data.acl["alice"]
    access[_] == input.operation
}

# METADATA
# schemas:
#   - input.x: {type: number}
allow {
    input.x == 42
}
```

**通过 Metadata 定义返回结果**

```rego
# METADATA
# title: Example
# description: Example package with documentation
package example

import future.keywords.contains
import future.keywords.if

# METADATA
# title: Deny non admin users
# description: Only admin users are allowed to access these resources
# related_resources:
# - https://docs.example.com/policy/rule/E123
# custom:
#   code: 401
#   error_id: E123
deny contains {
	"code": metadata.custom.code,
	"message": sprintf("Unauthorized due to policy rule (%s, %s)", [
		metadata.custom.error_id,
		concat(",", [ref | ref := metadata.related_resources[_].ref]),
	]),
} if {
	input.admin == false

	metadata := rego.metadata.rule()
}
```

- schema 通过 --schema 指定
- https://www.openpolicyagent.org/docs/latest/policy-language/#metadata

**with**

```rego
ok:= false
h := r  if {
	ok;
	r := {"OK":1, "X":input.X}
}

h := r  if {
	not ok;
	r := {"OK":0, "X":input.X}
}

h2 := r if {
	r:= h with input as {"X":2}
}
```

## External Data

- http.send
- https://www.openpolicyagent.org/docs/latest/policy-reference/#http
- https://github.com/nicolasff/webdis
  - Redis -> HTTP
- https://www.openpolicyagent.org/docs/latest/external-data
- https://github.com/open-policy-agent/opa/issues/2169

## Integration

- rego -> sql
  - https://github.com/open-policy-agent/contrib/blob/main/data_filter_example/data_filter_example/opa.py
    - `http://localhost:8181/v1/compile` -> ast -> sql
  - https://blog.openpolicyagent.org/write-policy-in-opa-enforce-policy-in-sql-d9d24db93bf4
- minio
  - https://github.com/minio/minio/blob/master/docs/iam/opa.md
  - MINIO_POLICY_PLUGIN_URL

## 常用结构

```rego
# 多个规则
deny[message] if {
  condition
  message := "Why";
}

# 最终
allowed if {
  true
}
```

# FAQ

## single-value rule data.example.headers conflicts with

```rego
headers := {
    "X-OK": "OK",
}

headers["X-OK"] = 1
```

**单个值**

```rego
headers := {
    "X-OK": "X"
} if {}
else = {
    "X-OK": 1
}
```
