---
title: Gitlab CI 技巧
---

# Gitlab CI 常用语法

## Tips

- `.` 开头的任务不会执行
- 缓存常用 key
  - CI_COMMIT_REF_SLUG
  - CI_BUILD_REF_NAME

## Hello World

```yaml
stage:
  - build

Hello CI:
  stage: build
  script:
    - echo Hello Gitlab CI !
```

## kaniko 镜像构建

如果不需要依赖 docker engine 则可以直接使用 kaniko

```yaml
publish:
  stage: publish
  image:
    #name: registry.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor:v1.6.0-debug
    name: gcr.io/kaniko-project/executor:debug
    entrypoint: ['']
  script:
    - echo "{\"auths\":{\"$CI_REGISTRY\":{\"username\":\"$CI_REGISTRY_USER\",\"password\":\"$CI_REGISTRY_PASSWORD\"}}}" > /kaniko/.docker/config.json
    - /kaniko/executor --context $CI_PROJECT_DIR --dockerfile ./Dockerfile --destination $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  dependencies:
    - build
  only:
    - master
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
    - name: docker:dind
      # 可以修改镜像
      # command: ["--registry-mirror", "https://registry-mirror.example.com"]
  variables:
    DOCKER_HOST: tcp://docker:2375/
    DOCKER_DRIVER: overlay2
    # See https://github.com/docker-library/docker/pull/166
    DOCKER_TLS_CERTDIR: ''
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

- 缓存 GOPATH
- 启动之前修改 GOPATH 使其能被缓存

```yml
default:
  cache:
    untracked: true
    key: '$CI_COMMIT_REF_SLUG'
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

## 代码仓库中版本更新

```yaml
deploy-dev:
  stage: deploy-dev
  image: alpine:3.8
  before_script:
    - apk add --no-cache git curl bash
    - curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash
    - mv kustomize /usr/local/bin/
    - git remote set-url origin https://${CI_USERNAME}:${CI_PUSH_TOKEN}@gitlab.com/andrew.kaczynski/gitops-webapp.git
    - git config --global user.email "gitlab@gitlab.com"
    - git config --global user.name "GitLab CI/CD"
  script:
    - git checkout -B master
    - cd deployment/dev
    - kustomize edit set image $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - cat kustomization.yaml
    - git commit -am '[skip ci] DEV image update'
    - git push origin master
  only:
    - master

deploy-prod:
  stage: deploy-prod
  image: alpine:3.8
  before_script:
    - apk add --no-cache git curl bash
    - curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash
    - mv kustomize /usr/local/bin/
    - git remote set-url origin https://${CI_USERNAME}:${CI_PUSH_TOKEN}@gitlab.com/andrew.kaczynski/gitops-webapp.git
    - git config --global user.email "gitlab@gitlab.com"
    - git config --global user.name "GitLab CI/CD"
  script:
    - git checkout -B master
    - git pull origin master
    - cd deployment/prod
    - kustomize edit set image $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - cat kustomization.yaml
    - git commit -am '[skip ci] PROD image update'
    - git push origin master
  only:
    - master
  when: manual
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
  script: echo $FOO # "BAR"
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
