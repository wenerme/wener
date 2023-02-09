---
title: semver
---

# semver

- [semver.org](https://semver.org/)
- [semver/semver](https://github.com/semver/semver)
  - [semver.svg](https://raw.githubusercontent.com/semver/semver/master/semver.svg)
- [0ver](https://0ver.org/)
- [changesets/changesets](https://github.com/changesets/changesets)
- https://calver.org/ Calendar Versioning

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

| range           | type         | cond              |
| --------------- | ------------ | ----------------- |
| `*`             | X-Range      | `>=0.0.0`         |
| `1.2.3 - 2.3.4` | Hyphen Range | `>=1.2.3 <=2.3.4` |
| `1.2.3 - 2`     | Hyphen Range | `>=1.2.3 <3.0.0`  |
| `1.*`           | X-Range      | `>=1.0.0 <2.0.0`  |
| `1.2.*`         | X-Ranges     | `>=1.2.0 <1.3.0`  |
| `~1.2.3`        | Tilde Ranges | `>=1.2.3 <1.3.0`  |
| `^1.2.3`        | Caret Ranges | `>=1.2.3 <2.0.0`  |

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
