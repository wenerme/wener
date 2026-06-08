---
title: Goal
---

# Goal

- https://github.com/fitchmultz/pi-codex-goal
- https://developers.openai.com/blog/run-long-horizon-tasks-with-codex

```
ask -> work -> result -> wait
```

```
work -> check -> continue or complete
```

```md
Outcome:
描述期望结果，也就是“完成后应该是什么状态”。

Verification surface:
描述验证方式，也就是“用什么证据证明完成了”。

Constraints:
描述限制条件，包含“不要做什么”和“必须遵守什么”。

Boundaries:
描述任务边界，明确允许修改哪里、不应该扩展到哪里，避免范围和影响扩大。

Iteration policy:
定义怎么一轮一轮推进。
例如：每次只做小范围修改，先跑相关测试，再跑全量检查。
每轮更新 Documentation.md，记录已完成、失败项、下一步。

Blocked stop condition:
定义什么时候别继续硬做了。
例如：如果需要业务确认、外部凭证，或者同一测试连续 3 轮无法修复，就停止并报告 blocker、错误日志和已尝试方案。
```
