---
title: gitlab-ci.yml
---

# gitlab-ci.yml

- Gitlab CI [YAML](https://docs.gitlab.com/ci/yaml/)
- [模板](https://gitlab.com/gitlab-org/gitlab/tree/master/lib/gitlab/ci/templates)
- [示例](https://docs.gitlab.com/ee/ci/examples/)
- [变量说明](https://docs.gitlab.com/ce/ci/variables/README.html)
- [预定义的变量](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

:::tip

- 使用 extends 复用现有逻辑
- 使用 `!reference [.setup, before_script]` 复用部分逻辑 - 例如合并多个 before_script
- 可以使用 YAML 引用逻辑

:::

```yaml
# 自定义默认配置
default:
  # 基础镜像
  image: wener/node:docker
  cache:
    # 缓存仓库里所有 untracked 文件
    untracked: true
    # 缓存按分支划分 - 如果有 tag 这个会是 tag 名字
    key: '$CI_COMMIT_REF_NAME'
    # 常见的缓存目录
    paths:
      - node_modules/
      - .yarn/
      - .cache/
      - .next/
      - packages/server/.next/cache/
```

## 环境变量

| env                       | e.g  | desc                                                              |
| ------------------------- | ---- | ----------------------------------------------------------------- |
| CI                        | true | 表示在运行 CI                                                     |
| GITLAB_CI                 | true |
| CI_REGISTRY               |      | gitlab registry                                                   |
| CI_REGISTRY_USER          |      | gitlab registry user                                              |
| CI_REGISTRY_PASSWORD      |      | gitlab registry password                                          |
| CI_REGISTRY_IMAGE         |      | 项目容器镜像                                                      |
| CI_DEFAULT_BRANCH         | main | 默认 branch 名字                                                  |
| CI_COMMIT_REF_NAME        | main | branch or tag                                                     |
| CI_COMMIT_REF_SLUG        | main | CI_COMMIT_REF_NAME 用于 url 或名字时,63 位,替代`[^0-9a-z]` 为 `-` |
| CI_COMMIT_REF_PROTECTED   | true | 保护分支                                                          |
| CI_COMMIT_BRANCH          | main |
| CI_COMMIT_SHA             |
| CI_COMMIT_SHORT_SHA       |
| CI_COMMIT_TAG             |
| CI_COMMIT_TIMESTAMP       |      | ISO 8601                                                          |
| CI_COMMIT_TITLE           |      | 第一行 commit 信息                                                |
| CI_ENVIRONMENT_NAME       |
| CI_ENVIRONMENT_SLUG       |
| CI_ENVIRONMENT_URL        |
| CI_ENVIRONMENT_ACTION     |      | start, prepare, stop                                              |
| CI_ENVIRONMENT_TIER       |      | production,staging,testing,development,other                      |
| CI_KUBERNETES_ACTIVE      | true | 关联了 k8s 部署集群                                               |
| CI_PROJECT_ID             |
| CI_PROJECT_NAME           |
| CI_PROJECT_NAMESPACE      |      | 用户名 或 组名                                                    |
| CI_PROJECT_ROOT_NAMESPACE |
| CI_PROJECT_PATH_SLUG      |
| CI_PROJECT_PATH           |

```bash
docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
# 常用 $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG
docker build --pull -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG" ./build
docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG"
```

- [Predefined variables reference](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

## job:only/except

:::caution

- 开发不活跃，推荐，使用 rules

:::

```yaml
build:
  script: npm run build
  only:
    # 简单配置 - refs
    # 完整匹配 - master 分支运行
    - master
    # 支持正则 匹配 tag 或 branch - 如果 排除了 branches 则是匹配 tag
    - /^issue-.*$/i

    # 高级配置
    # 不指定默认则是 refs 匹配
    refs:
      - master
      - schedules
    # 变量匹配
    variables:
      - $CI_COMMIT_MESSAGE =~ /run-end-to-end-tests/ # 匹配变量
      - $RELEASE == "staging" # 变量满足
      - $STAGING # 有变量
      # 复杂条件变量
      - ($CI_COMMIT_BRANCH == "master" || $CI_COMMIT_BRANCH == "develop") && $MY_VARIABLE
    # 匹配变化文件
    # 只有在 branches external_pull_requests merge_requests 有效
    changes:
      - README.md
      - "*.md" # 例如 从新生成文档
      - base/Dockerfile # 例如 重构基础镜像
      - "**/*.sql" # 例如 数据库迁移
    # 要求开启了 k8s 服务
    kubernetes: active
  except:
    # 支持使用关键词 - 分支不触发
    - branches
    # 可包含仓库信息匹配 - 用于 fork 场景
    - /^release/.*$/@gitlab-org/gitlab
```

| value                  | desc                          |
| ---------------------- | ----------------------------- |
| api                    | Pipline API 触发              |
| branches               | ref 是分支                    |
| chat                   | ChatOps 创建的 Pipeline       |
| external               | 外部 CI 服务                  |
| external_pull_requests | 外部仓库 PR，例如 Github      |
| merge_requests         | 仓库收到 pr                   |
| pipelines              | 流水线中创建的多项目 pipeline |
| pushes                 | git push 触发                 |
| schedules              | 调度触发                      |
| tags                   | ref 是 tag                    |
| triggers               | trigger token 触发            |
| web                    | Web 触发/运行流水线           |

## job:rules

- 限定 job 是否运行
- 基础语句
  - if
    - 类似 only:variables 配置
    - `&&`, `||`, `==`, `!=`, `=~`, `!~`
    - CI_PIPELINE_SOURCE 用于支持类似 rules 的关键字
  - changes
    - 类似 only:changes 配置
  - exists
    - 包含指定文件
- 语句属性
  - when - 限定运行条件
    - on_success, delayed, always
    - never - 不触发 - 等同于 rules:except
    - manual - 手动触发时
  - allow_failure - 是否允许运行错误
  - changes 文件变化
  - variables 定义额外变量

```yaml
build:
  script: npm run build
  rules:
    - if: '$CI_COMMIT_BRANCH == "master"'
      when: delayed
      start_in: '3 hours'
      allow_failure: true
    # 要求有变化文件
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      changes:
        - Dockerfile
      when: manual
      allow_failure: true
build:
  script: npm run build
  rules:
    # 前两个条件不满足才运行
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: never
    - if: '$CI_PIPELINE_SOURCE == "schedule"'
      when: never
    - when: on_success

build:
  script: npm run build
  rules:
    # 常见
    - if: $CI_COMMIT_TAG # 有 tag
    - if: $CI_COMMIT_BRANCH # 分支推送
    - if: '$CI_COMMIT_BRANCH == "main"' # 主分支
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH' # 默认分支
    - if: '$CI_COMMIT_BRANCH =~ /regex-expression/' # 分支匹配

```

| if CI_PIPELINE_SOURCE       | desc                          |
| --------------------------- | ----------------------------- |
| api                         | Pipline API 触发              |
| chat                        | ChatOps 创建的 Pipeline       |
| external                    | 外部 CI 服务                  |
| external_pull_request_event | 外部仓库 PR，例如 Github      |
| merge_request_event         | 仓库收到 pr                   |
| parent_pipeline             |
| pipeline                    | 流水线中创建的多项目 pipeline |
| push                        | git push 触发                 |
| schedule                    | 调度触发                      |
| tags                        | ref 是 tag                    |
| trigger                     | trigger token 触发            |
| web                         | Web 触发/运行流水线           |
| webide                      | WebIDE                        |

## cache

**位置**

- cache
  - 全局 - 不推荐，建议使用 default
- defaul:cache
  - job 默认缓存
- job:cache
  - job 维度缓存配置

**属性**

- cache:
  - 可配置为数组 - 多个缓存
  - key:
    - 默认 default - 全局共用
    - 可设置为 `$CI_COMMIT_REF_SLUG` - 分支独立缓存
    - files:
      - prefix:
        - `${CI_JOB_NAME}`
  - untracked:
    - 缓存仓库里所有 untracked 文件
  - paths:
    - 缓存的目录
  - when:
    - on_success - 默认 成功时保存缓存
    - on_failure
    - always
  - policy:
    - pull-push - 默认 - 启动前拉，完成后推
    - pull 只拉 - 用于已知不会修改缓存场景
    - push 只推

```yaml
cache:
  paths:
    - my/files

rspec:
  script: test
  cache:
    key: rspec
    paths:
      - binaries/
```

## workflow

- 限定 pipeline 是否运行/创建
- 运行时运行覆盖变量

```yaml
workflow:
  rules:
    - if: $CI_COMMIT_MESSAGE =~ /-draft$/
      when: never
    - if: $CI_COMMIT_REF_NAME =~ /feature/
      variables:
        IS_A_FEATURE: 'true' # 覆盖变量
    - when: always #
```

## release

- 依赖 [release-cli](https://gitlab.com/gitlab-org/release-cli/-/tree/master/docs) 命令行工具
  - image: registry.gitlab.com/gitlab-org/release-cli:latest
- [Release assets as Generic packages](https://gitlab.com/gitlab-org/release-cli/-/tree/master/docs/examples/release-assets-as-generic-package/)

```bash
# AlpineLinux
apk add gitlab-release-cli -X https://mirrors.aliyun.com/alpine/edge/testing

# shell executor 需要安装命令行根据
curl --location --output /usr/local/bin/release-cli "https://release-cli-downloads.s3.amazonaws.com/latest/release-cli-linux-amd64"
chmod +x /usr/local/bin/release-cli

# 确保可用
release-cli -v
```

```yaml
# 基于 tag release
job:
  release:
    tag_name: $CI_COMMIT_TAG
    description: 'Release description'
    # name - 默认为 tag_name
    # ref - 如果没有 tag_name 可以通过 ref 创建
    # milestones - 关联里程碑
    # released_at: '2021-03-15T08:00:00Z' # 不指定会自动生成

---
# 直接调用命令行 - 可以添加 assets-link
# gitlab 内置 artifact https://gitlab.com/org/proj/-/jobs/<JOB_ID>/artifacts/browse
release:
  stage: release
  image: registry.gitlab.com/gitlab-org/release-cli:v0.4.0
  # 手动触发
  when: manual
  rules:
    - if: $CI_COMMIT_TAG
      when: never

  script:
    - >
      release-cli create --name release-branch-$CI_JOB_ID --description release-branch-$CI_COMMIT_REF_NAME-$CI_JOB_ID
      --tag-name job-$CI_JOB_ID --ref $CI_COMMIT_SHA
      --assets-link '{"name":"Asset1","url":"https://<domain>/some/location/1","link_type":"other","filepath":"xzy"}'
      --assets-link '{"name":"Asset2","url":"https://<domain>/some/location/2"}'
      --milestone "v1.0.0" --milestone "v1.0.0-rc"
      --released-at "2020-06-30T07:00:00Z"

---
release_job:
  stage: release
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  rules:
    - if: $CI_COMMIT_TAG # Run this job when a tag is created manually
  script:
    - echo 'running release_job'
  release:
    name: 'Release $CI_COMMIT_TAG'
    description: 'Created using the release-cli $EXTRA_DESCRIPTION' # $EXTRA_DESCRIPTION must be defined
    tag_name: '$CI_COMMIT_TAG' # elsewhere in the pipeline.
    ref: '$CI_COMMIT_TAG'
    milestones:
      - 'm1'
      - 'm2'
      - 'm3'
    released_at: '2020-07-15T08:00:00Z' # Optional, is auto generated if not defined, or can use a variable.
---
prepare_job:
  stage: prepare # This stage must run before the release stage
  rules:
    - if: $CI_COMMIT_TAG
      when: never # Do not run this job when a tag is created manually
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH # Run this job when commits are pushed or merged to the default branch
  script:
    - echo "EXTRA_DESCRIPTION=some message" >> variables.env # Generate the EXTRA_DESCRIPTION and TAG environment variables
    - echo "TAG=v$(cat VERSION)" >> variables.env # and append to the variables.env file
  artifacts:
    reports:
      dotenv: variables.env # Use artifacts:reports:dotenv to expose the variables to other jobs

release_job:
  stage: release
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  needs:
    - job: prepare_job
      artifacts: true
  rules:
    - if: $CI_COMMIT_TAG
      when: never # Do not run this job when a tag is created manually
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH # Run this job when commits are pushed or merged to the default branch
  script:
    - echo 'running release_job for $TAG'
  release:
    name: 'Release $TAG'
    description: 'Created using the release-cli $EXTRA_DESCRIPTION' # $EXTRA_DESCRIPTION and the $TAG
    tag_name: '$TAG' # variables must be defined elsewhere
    ref: '$CI_COMMIT_SHA' # in the pipeline. For example, in the
    milestones: # prepare_job
      - 'm1'
      - 'm2'
      - 'm3'
    released_at: '2020-07-15T08:00:00Z' # Optional, is auto generated if not defined, or can use a variable.
```

# FAQ

## 部署 pages

```yaml
pages:
  script:
    - yarn
    - yarn build:public
  artifacts:
    # 必须是 public 目录
    paths:
      - public
  only:
    - master
```

## 有 Tag 的时候才执行

- 不能有 tag 且排除分支 - https://gitlab.com/gitlab-org/gitlab-foss/-/issues/23251

```yaml
build-tag:
  only:
    # 指定分支
    - master
    # 必须有 tag
    - tags
```

或者

```yaml
rules:
  # 没有 tag 的时候才执行
  - if: $CI_COMMIT_TAG != ""
    when: on_success
  - when: never
```

## 默认分支

- master 或 main 或 自定义的默认分支

```yaml
only:
  variables:
    - $CI_DEFAULT_BRANCH == $CI_COMMIT_REF_NAME
```
