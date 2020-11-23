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

## Docker DinD
```yaml
Build Image:
  stage: build
  services:
    - docker:dind
  variables:
    DOCKER_HOST: tcp://docker:2375/
    DOCKER_DRIVER: overlay2
    # See https://github.com/docker-library/docker/pull/166
    DOCKER_TLS_CERTDIR: ""
  before_script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
  script:
    # - yarn
    # - yarn build
    - echo Building image "$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG"
    - docker build --pull -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG" .
    - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG"
    # tagged as v20200601121212
    - CI_REGISTRY_IMAGE_DATA_VER="$CI_REGISTRY_IMAGE:v`date +"%Y%m%d%H%M%S"`"
    - docker tag "$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG" "$CI_REGISTRY_IMAGE_DATA_VER"
    - docker push "$CI_REGISTRY_IMAGE_DATA_VER"
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

## Page

```yaml
pages:
  script:
    - yarn
    - yarn build:public
  artifacts:
    # 路径必须 public
    paths:
      - public
  only:
    - master
```

## Node

### Publish NPM

```yaml
Publish NPM:
  stage: deploy
  script:
    - echo '//gitlab.com/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}'>.npmrc
    - yarn lerna publish from-git --yes --registry "https://gitlab.com/api/v4/projects/${CI_PROJECT_ID}/packages/npm/"
  only:
    - tags
```
