---
title: YAML
---

# YAML

- YAML Ain't Markup Language
  - https://yaml.org/
  - https://yaml.org/spec/1.2.2/
    - 2021-10-01
- 参考
  - https://kubernetes.io/docs/reference/encodings/kyaml/
    - a safer and less ambiguous subset of YAML
    - Kubernetes v1.34+
    - 要求 `{}`, `[]` 和 双引号
    - 接近 JSON
    - `kubectl get -o kyaml svc hostnames`

```yaml
# "1 2"
s0: 1
  2
# " 1 2"
s1: '
  1
  2'

# "1\n2\n"
a0: |
  1
  2
# "1\n2"
a1: |-
  1
  2

# "1 2\n"
b0: >
  1
  2
# "1 2"
b1: >-
  1
  2
# "1\n2\n\n"
b2: >+
  1

  2
# "  1\n\n  2"
b3: >2-
    1

    2

.x: &x
  x: 1
  y: 1
# x 均 = 0
x0:
  x: 0
  <<: *x
x1:
  <<: *x
  x: 0
```

- 换行转空格 - `>`
- 保留换行 - `|`
- 默认结尾保留单换行
- 移除结尾换行 - `-`
- 保留结尾换行 - `+`
- 保留结尾换行 - `-`
- `<<`
  - https://yaml.org/type/merge.html
  - `<< : *CENTER`
  - `<< : [ *CENTER, *BIG ]`
- https://yaml-multiline.info/

```yaml
---
!!omap
- a: 1
- b: 1
```

```json
[
  ["a", 1],
  ["b", 1]
]
```
