---
title: semver
---

# semver

- [semver.org](https://semver.org/)
- [semver/semver](https://github.com/semver/semver)
  - [semver.svg](https://raw.githubusercontent.com/semver/semver/master/semver.svg)
- [0ver](https://0ver.org/)
- [changesets/changesets](https://github.com/changesets/changesets)

```
([1-9]\d*|0).([1-9]\d*|0).([1-9]\d*|0)
major        minor        patch

pre-release:
-
0|[1-9]\d*|\d*[a-zA-Z-][a-zA-Z0-9-]*
.
0|[1-9]\d*|\d*[a-zA-Z-][a-zA-Z0-9-]*

build:
+
[a-zA-Z0-9-]*
.
[a-zA-Z0-9-]*
```

## Conventional Commits

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- type
  - fix, feat
  - build, chore, ci, docs, style, refactor, perf, test
  - revert + Refs commit-id
- BREAKING CHANGE footer 描述变化 或 `<type>[scope]!`

```
fix: abc

zyx

Reviewed-by: Z
Refs: #123
```

- [conventionalcommits](https://conventionalcommits.org/)
  - [conventional-changelog/standard-version](https://github.com/conventional-changelog/standard-version)
    - 生成 CHANGELOG
