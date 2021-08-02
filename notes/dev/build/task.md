---
id: go-task
title: Go Task
---

# Go Task

- [go-task/task](https://github.com/go-task/task)
- [taskfile.dev](https://taskfile.dev/)
- 特性
  - 任务定义基于 Yaml
  - 支持 shell - [mvdan/sh](https://github.com/mvdan/sh)

```yaml
version: '3'

tasks:
  hello:
    cmds:
      - echo 'Hello World from Task!'
    silent: true
```
