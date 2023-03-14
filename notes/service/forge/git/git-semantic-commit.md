---
tags:
  - Guideline
---

# Semantic Commit

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- type
  - fix:
  - feat:
  - chore: 构建过程、辅助工具、文档生成、升级
  - refactor:
  - style: 调整代码格式
  - docs:
  - ci:
  - perf:
  - test:
  - revert:
  - localize:
  - build:
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

## 参考

- https://github.com/fteem/git-semantic-commits
- https://sparkbox.com/foundry/semantic_commit_messages
- https://git-scm.com/docs/git-interpret-trailers
- https://www.conventionalcommits.org/
- https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/
