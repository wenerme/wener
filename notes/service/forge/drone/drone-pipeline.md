---
title: Drone Pipeline
---

# Drone Pipeline

- 定义 name: clone 的 step 可自定义 clone 步骤
- https://docs.drone.io/pipeline/environment/reference/

```yaml
kind: pipeline
type: docker
name: default

clone:
  retries: 3

trigger:
  branch: # include: [], exclude: []
    - master
  event:
    - push
  ref:
    - refs/heads/master
    - refs/heads/**
    - refs/pull/*/head
  repo:
  status:
  target:
  cron:
  action:

platform:
  os: linux
  arch: amd64
  version:
workspace:
  path: /src

# label
node: {}

steps:
  - name: build
    image: golang
    environment:
      GOOS: linux
      GOARCH: amd64
    # http://plugins.drone.io/
    settings: {}
    commands:
      - go build
      - go test
    # fail, fail-fast, fast, always, ignore
    failure: ignore
    # 可以后台执行 - 忽略结果
    detach: false
    privileged: false
    when:
      branch:
        - master

  - name: notify
    image: plugins/slack
    settings:
      webhook: https://hooks.slack.com/services
    when:
      status:
        - failure
        - success
```
