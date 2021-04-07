---
title: Casbin
---

# Casbin

- 支持的模式
  - ACL - 超级用户, 无用户, 无资源
  - RBAC - 资源角色, 租户角色
  - ABAC
  - RESTful 路径
  - 拒绝优先
  - 优先级
- 配置分为 模型定义、Policy、角色 - Policy 和 角色配置可选
- 参考
  - [casbin/casdoor](https://github.com/casbin/casdoor)
    - 带 UI 的中心化 SSO 平台
  - [教程](https://casbin.org/docs/zh-CN/tutorials)
  - Golang
    - 求值使用 [Knetic/govaluate](https://github.com/Knetic/govaluate)

## 模型

- PERM (Policy, Effect, Request, Matcher)
- Request - r - 至少包含 subject, object, action
- Policy - p - 定义访问策略
  - 策略内容均为 string
- Matcher - m - Request 和 Policy 匹配规则
  - 例如 m = r.sub == p.sub && r.act == p.act && r.obj == p.obj
  - 如果匹配则返回 `p.eft`
- Effect - e - 影响 - 允许、拒绝
  - 例如 `e = some(where(p.eft == allow))`
    - 任意一个 policy 允许
  - 例如 `e = some(where (p.eft == allow)) && !some(where (p.eft == deny))`
    - 没有拒绝且有一个允许

```ini
# 请求定义 - 定义请求 Enforce 参数含义
# 只能定义一个
[request_definition]
r = sub, obj, act

# 策略定义 - 定义 Policy 规则列表参数含义
# 只能定义一个
[policy_definition]
p = sub, obj, act

# 合并多个策略结果
# 只能定义一个
[policy_effect]
e = some(where (p.eft == allow))

# 匹配请求和策略
# 只能定义一个
# 可以运行时指定
[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act

# 角色定义 - 决定参数个数
# 可定义多个
# 将 a 映射为 b 的过程
[role_definition]
# 例如 g(r.sub, p.sub)
g = _, _
# 例如 g2(r.sub, p.sub, r.dom)
g2 = _, _, _
```

**policy.csv**

```csv
p, alice, data1, read
p, bob, data1, read

g, alice, data_group_admin
g2, data1, data_group, t1
g2, data2, data_group, t2
```

策略规则，含义在 policy_definition 和 role_definition 定义，所有规则参数都会当作 **字符串** 处理。

> `p = sub, obj, act, eft`

policy 规则可添加优先级, 不设置则顺序为优先级

```csv
p, 10, data2_allow_group, data2, read, deny
p, 10, data2_allow_group, data2, write, allow
```

### 内置函数

> 内建函数签名都是 `bool function(string arg1, string arg2)`

| name       | demo                                                                 |
| ---------- | -------------------------------------------------------------------- |
| keyMatch   | `keyMatch("/alice_data/resource1","/alice_data/*")`                  |
| keyGet     | `keyGet("/alice_data/resource1","/alice_data/*")`                    |
| keyMatch2  | `keyMatch2("/alice_data/resource1","/alice_data/:resource")`         |
| keyGet2    | `keyGet2("/alice_data/resource1","/alice_data/:resource")`           |
| keyMatch3  | `keyMatch3("/alice_data/resource1","/alice_data/{resource}")`        |
| keyMatch4  | `keyMatch4("/alice_data/123/book/123","/alice_data/{id}/book/{id}")` |
| globMatch  | `globMatch("/alice_data/resource1","/alice_data/*")`                 |
| ipMatch    | `ipMatch("192.168.2.123","192.168.2.0/24")`                          |
| regexMatch | `regexMatch("abc","^a.*?b$")`                                        |

- 使用参考 [util/builtin_operators_test.go](https://github.com/casbin/casbin/blob/master/util/builtin_operators_test.go)

## 示例

```ini
[matchers]
# 最基础匹配逻辑 - Policy 作为 ACL
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act

# 支持超级管理员
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act || r.sub == "root"
# 角色判断
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
# 资源角色
m = g(r.sub, p.sub) && g2(r.obj, p.obj) && r.act == p.act
# 租户
m = g(r.sub, p.sub, r.dom) && r.dom == p.dom && r.obj == p.obj && r.act == p.act

# 没有 用户/subject - 只判断对象和操作
m = r.obj == p.obj && r.act == p.act

# 没有 资源/obj
m = r.sub == p.sub && r.act == p.act

# ABAC - 基于属性控制
m = r.sub == r.obj.Owner

# RESTful 路径匹配
m = r.sub == p.sub && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)

[policy_effect]
# 只要有同意即可
e = some(where (p.eft == allow))
# 拒绝优先
e = !some(where (p.eft == deny))
# 有同意且没有拒绝
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

# 优先判断 - p 定义顺序隐含优先级，或者 p 规则第一个参数设置为优先级
# p = sub, obj, act, eft
e = priority(p.eft) || deny
```
