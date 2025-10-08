---
title: Status
---

# Status

- State - 状态 - 系统定义 - 大状态 - 高级状态
- Status - 状态原因、阶段 - 业务定义 - 小状态 - 低级状态

| Entity  | State    | Status   | notes |
| ------- | -------- | -------- | ----- |
| Account | Active   | Active   |
| ^       | Inactive | Inactive |

| status       | label  | notes       |
| ------------ | ------ | ----------- |
| Active       | 激活   |
| Inactive     | 未激活 |
| Pending      | 待处理 |
| Open         | 开放   |
| Closed       | 关闭   |
| Completed    | 完成   |
| Canceled     | 取消   |
| Resolved     | 已解决 |
| Expired      | 已过期 |
| OnHold       | 暂停   |
| Qualified    | 合格   | Lead        |
| Disqualified | 不合格 | Lead        |
| Won          | 赢得   | Opportunity |
| Lost         | 失去   | Opportunity |
| Submitted    | 已提交 |
| Fullfilled   | 已完成 |
| Draft        | 草稿   |
| Published    | 已发布 |

| status | label | notes |
| ------ | ----- | ----- |
| New    | 新建  |

- status+state 不是完整的状态机
  - 因为状态流转不必然
  - 但设计好 state 和 status 可支持实现 事件驱动、工作流、状态机
- status 可能和 state 完全相等
  - 但 status 可以自定义
  - status 必然对应 **一个** state
- User
  - Active
    - Pending Approval (待审批)：用户已注册，但账户正在等待管理员审批。
    - Verified (已验证)：用户已通过电子邮件或手机验证过程。
    - Suspended (暂停使用)：因违反条款或其他原因，用户账户暂时被禁止使用。
  - Inactive
    - Deactivated by User (用户停用)：用户自己选择停用账户。
    - Deactivated by Admin (管理员停用)：由于某些原因，管理员停用了用户账户。
    - Expired (已过期)：用户账户因长时间未使用或其他原因自动过期。
