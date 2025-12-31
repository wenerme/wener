---
title: Object
---

# Object

- apiVersion
- kind
- metadata
- spec
- RFC 1123 Label Names
  - 63
  - `[a-z0-9]([-a-z0-9]*[a-z0-9])?`
- RFC 1035
  - 63
  - `[a-z]([-a-z0-9]*[a-z0-9])?`

**metav1.Conditions**

```yaml
type:
status: True # True,Flase,Unknown
# .metadata.generation
observedGeneration:
lastTransitionTime:
# programmatic identifier
reason:
# human readable message
message:
```

- phase 不推荐使用，使用 conditions 代替
- https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md
  - 不用 map，用 `[{name}]`

## spec+status

- spec 期望状态
- status 当前状态
  - 由 controller 维护
    - reconsiliation 调和
- kind+apiVersion 定位 Schema

```bash
kubectl api-resources
```

---

- https://kubernetes.io/docs/concepts/overview/working-with-objects/
- https://kubernetes.renkeju.com/chapter_3/3.2.3.spec_and_status_fields.html
