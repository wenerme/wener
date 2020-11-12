---
title: Gitlab CI 技巧
---

# Gitlab CI 常用语法

## Tips
* `.` 开头的任务不会执行

## Hello World
```yaml
stage:
- build

Hello CI:
  stage: build
  script:
  - echo Hello Gitlab CI !
```

## docker 构建

```yaml
Build in Docker:
  image: wener/go:win
  stage: build
  services:
    - docker:dind
  script:
    - go env
```

## 生成

## 构建之间传递变量

```yaml
build:
  stage: build
  script: echo 'FOO=BAR' > build.env
  artifacts:
    report:
      dotenv: build.env

test:
  stage: test
  script: echo $FOO     # "BAR"
  needs: [build]
```

## 继承
```yaml
include:
  # 模板继承
  template: Serverless.gitlab-ci.yml

functions:build:
  extends: .serverless:build:functions
  # 设置环境信息
  environment: production

functions:deploy:
  extends: .serverless:deploy:functions
  environment: production
```
