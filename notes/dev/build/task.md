---
title: Task
---

# Task

- [go-task/task](https://github.com/go-task/task)
- [taskfile.dev](https://taskfile.dev/)
- 特性
  - 任务定义基于 Yaml
  - 支持 shell - [mvdan/sh](https://github.com/mvdan/sh)

```bash
brew install go-task
```

```yaml title="Taskfile.yml"
version: '3'

tasks:
  hello:
    cmds:
      - echo 'Hello World from Task!'
    silent: true
```


```bash
task hello
```

## Syntax

- 模板 `{{}}`
- 变量
  - https://taskfile.dev/reference/templating/#special-variables
  - https://taskfile.dev/reference/environment
