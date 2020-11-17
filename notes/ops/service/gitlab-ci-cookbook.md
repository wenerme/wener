---
title: Gitlab CI 技巧
---

# Gitlab CI 常用语法

## Tips
* `.` 开头的任务不会执行
* 缓存常用 key
  * CI_COMMIT_REF_SLUG
  * CI_BUILD_REF_NAME

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

## Golang
* 缓存 GOPATH
* 启动之前修改 GOPATH 使其能被缓存

```yml
default:
  cache:
    untracked: true
    key: "$CI_COMMIT_REF_SLUG"
    paths:
      - .cache
  before_script:
    - mkdir -p .cache
    # - export GOPATH="$CI_PROJECT_DIR/.cache"
    - export GOPATH="$PWD/.cache"
    - export PATH="$PWD/.cache/bin:$PATH"
    - export GO111MODULE=on
    - export GOPROXY=https://goproxy.io
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

## 产出
```yaml
Build Windows:
  stage: build
  tags:
    - windows
    - bash
  script:
    - make ci-windows
  artifacts:
    paths:
      - dist
    expire_in: 1 week
```

## 计划运行和非计划运行
```yaml
job:on-schedule:
  only:
    - schedules
  script:
    - make world

job:
  except:
    - schedules
  script:
    - make build
```
