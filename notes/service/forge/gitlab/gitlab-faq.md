---
title: Gitlab FAQ
---

# Gitlab FAQ

## go get 不支持子群组

```bash
# 会指向 gitlab.com/random/xyz 而不是 gitlab.com/random/xyz/something
curl "https://gitlab.com/random/xyz/something?go-get=1"
```

- go get 能识别 gitlab.com/random/xyz/something.git
  - 但要求 module 名字也得匹配
- 可以使用 deploy token + .netrc 添加 auth
  - 但无法绕开 ssh 的问题
- 参考
  - https://gitlab.com/gitlab-org/gitlab/-/issues/196007
  - https://gitlab.com/gitlab-org/gitlab-foss/-/issues/30785
  - https://github.com/golang/go/issues/34094

## badage

- `https://gitlab.com/%{project_path}/badges/%{default_branch}/pipeline.svg`
  - /pipeline.svg
  - /coverage.svg
  - style=flat-square,flat
  - job=karma&key_text=Frontend+Coverage&key_width=130
  - 可能状态 pending, running, passed, failed, skipped, canceled, unknown
- [Pipeline status badge](https://docs.gitlab.com/ee/ci/pipelines/settings.html#pipeline-status-badge)

## 覆盖度

- CI/CD 通用设置 - 配置检测 log 的规则

| tool           | conf                               |
| -------------- | ---------------------------------- |
| go test -cover | `coverage: \d+.\d+% of statements` |

- https://docs.gitlab.com/ee/ci/pipelines/settings.html#test-coverage-examples

## 覆盖可视化

- 只有在 MR 可见
  - 需要等全部 pipeline 跑完才可见 https://gitlab.com/gitlab-org/gitlab/-/issues/236248
- https://docs.gitlab.com/ee/user/project/merge_requests/test_coverage_visualization.html
- 需要输出为 [cobertura/cobertura](https://github.com/cobertura/cobertura)

```bash
go install github.com/boumenot/gocover-cobertura@latest
gocover-cobertura < coverage.txt > coverage.xml
```

```yaml
test:
  script:
    - npm install
    - npx nyc --reporter cobertura mocha
  artifacts:
    reports:
      cobertura: coverage/cobertura-coverage.xml
```

## 手动触发部署

```yaml
deploy:prod:manually:
  extends:
    - .deploy
  when: manual
```

## 2FA SSH 生成恢复码

```bash
ssh git@gitlab.com 2fa_recovery_codes
```

## gitlab runner 缓存耗时长

不缓存，不做 `git clean -ffdx`。非常适用于大仓库或生成非常多文件的时候。

```yaml
variables:
  GIT_STRATEGY: fetch
  GIT_CLEAN_FLAGS: none
```

- GIT_CLEAN_FLAGS - GitLab Runner 11.10
  - https://docs.gitlab.com/ee/ci/yaml/#git-clean-flags
  - https://docs.gitlab.com/ee/ci/large_repositories/#git-clean-flags
  - https://gitlab.com/gitlab-org/gitlab-runner/-/merge_requests/1281
- 问题
  - https://gitlab.com/gitlab-org/gitlab-runner/-/issues/280#note_39937930

## Docker build cache

```yaml
Build:
  extends: .docker
  stage: build
  script:
    - docker pull $CI_REGISTRY_IMAGE:build || true
    - >
      docker build
      --pull
      --cache-from $CI_REGISTRY_IMAGE:build
      --tag build-env
      -f Dockerfile.build
      .
    - docker tag build-env $CI_REGISTRY_IMAGE:build
    - docker push $CI_REGISTRY_IMAGE:build
```

## RBAC

:::caution

- Developer 默认不可以操作保护分支
  - 可配置允许操作

:::

- Guest
- Reporter
- Developer
- Maintainer
- Owner
- https://docs.gitlab.com/ee/user/permissions.html

## pipeline failed due to the user not being verified

- 使用共享 Runner
  - 需要用户验证 - 设置信用卡、不会收费
- 使用自己的 Runner，可以关闭共享
  - Setting -> CICD -> Runner (Expand) -> disable Shared runner.
