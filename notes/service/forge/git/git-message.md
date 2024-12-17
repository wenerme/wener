---
tags:
  - Guideline
---

# Git Message

## Semantic Commit

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- type
  - fix: 修复 bug - 为用户修复的错误，而不是构建脚本的修复。此类提交将触发补丁版本的发布。
  - feat: 新功能 - 为用户提供的新功能，而不是构建脚本的新功能。此类提交将触发次要版本的发布。
  - chore: 构建过程、辅助工具、文档生成、升级
  - refactor: 重构
  - style: 重构生产代码，例如重命名变量。
  - docs: 文档
  - ci: 持续集成
  - perf: 性能优化 - 性能改进。此类提交将触发补丁版本的发布。
  - test: 测试 - 添加缺失的测试、重构测试；没有生产代码的更改。
  - revert: 撤销
  - localize: 本地化
  - build: 更新构建配置、开发工具或其他与用户无关的更改。
  - style: 格式更改、缺少分号等。
- `feat(xyz)!`
  - `!` for BREAKING CHANGE
- footer
  - BREAKING CHANGE:
  - trailers - https://git-scm.com/docs/git-interpret-trailers
    - Signed-off-by:
    - Reviewed-by:
    - Refs: #123
  - Created By:
  - Approved By:
  - Accepted By:
  - URL:
  - Closes #123, #245, #992

```js
const r = /^(feat|fix|docs|style|perf|merge|build|localize|revert|refactor|test|chore|ci)([(].+？[)])?!?: .{1,120}/;
```

## Message

- Angular 社区提交规范
  - `^(feat|fix|docs|style|refactor|test|chore|ci)((.+))?: .{1,100}`
- jQuery 社区提交规范
  - `^(Fixes|Closes|Ref)? .{1,100}`
- Atom 社区提交规范
  - `^(:.*:)? .{1,72}`
- JSHint 社区提交规范
  - `^([[(FIX|FEAT|DOCS|TEST|CHORE)]])? .{1,100}`
- ESLint 社区提交规范
  - `^(Fix|Update|New|Breaking|Docs|Build|Upgrade|Chore)?: .{1,72}`

## 特殊

**Github**

```
[skip ci]
[ci skip]
[no ci]
[skip actions]
[actions skip]
```

**footer**

```
skip-checks:true
skip-checks: true
```

## Issue Labels

- Issue 管理 vs 任务管理
  - Issue - 问题驱动 - 解决问题、改进产品
    - 发现问题 - 分类 - 优先级 - 指派 - 处理 - 验证 - 关闭
  - 任务 - 完成特定目标或交付物为导向 - 完成具体工作目标
    - 目标分解 - 任务分派- 进度跟踪 - 任务完成
- feat 类 Issue 可看作是任务
- wip → ready for review → ready for release → closed/released

| 标签                  | 描述           |
| --------------------- | -------------- |
| bug                   | 错误报告       |
| duplicate             | 重复问题       |
| enhancement           | 功能增强       |
| help wanted           | 需要帮助       |
| invalid               | 无效问题       |
| question              | 问题           |
| wontfix               | 不予解决       |
| **Extra**             | ---            |
| wip                   | 进行中         |
| ready for review      | 待审查         |
| ready for merge       | 待合并         |
| ready for test        | 待测试         |
| ready for release     | 待发布         |
| P1, P2, P3, P4, P5    | 优先级         |
| **Advanced**          |                |
| Kind/Bug              | 错误           |
| Kind/Feature          | 新功能         |
| Kind/Enhancement      | 增强           |
| Kind/Security         | 安全问题       |
| Kind/Testing          | 测试           |
| Kind/Documentation    | 文档           |
| Compat/Breaking       | 重大变更       |
| Reviewed/Duplicate    | 已审查重复     |
| Reviewed/Invalid      | 已审查无效     |
| Reviewed/Confirmed    | 已确认         |
| Reviewed/Won't Fix    | 已审查不予解决 |
| Status/Need More Info | 需要更多信息   |
| Status/Blocked        | 阻塞           |
| Status/Abandoned      | 已放弃         |
| Priority/Critical     | 关键优先级     |
| Priority/High         | 高优先级       |
| Priority/Medium       | 中优先级       |
| Priority/Low          | 低优先级       |

## 参考

- https://karma-runner.github.io/6.4/dev/git-commit-msg.html
- https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit
- https://github.com/fteem/git-semantic-commits
- https://sparkbox.com/foundry/semantic_commit_messages
- https://git-scm.com/docs/git-interpret-trailers
- https://www.conventionalcommits.org/
- https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/
