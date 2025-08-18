---
title: .gitignore
---

# .gitignore

- https://github.com/github/gitignore
- https://www.toptal.com/developers/gitignore
- https://gitignore.itranswarp.com/
- https://git-scm.com/docs/gitignore
- 语法
  - `*`
  - `?`

```
# comment

# 绝对匹配
secrets.txt

logs/
*.log  # Ignores all files with a .log extension
!important.log
file?.txt # Matches file1.txt, fileA.txt, etc.
log[0-9].txt # Matches log1.txt, log2.txt, etc.
debug[!01].log
**/logs/
/config.json # Only ignores config.json in the root directory
```
