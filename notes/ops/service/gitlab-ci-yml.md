# gitlab-ci.yml

## Tips
* Gitlab CI [YAML](https://docs.gitlab.com/ce/ci/yaml/README.html)
* [模板] (https://gitlab.com/gitlab-org/gitlab/tree/master/lib/gitlab/ci/templates)
* [示例](https://docs.gitlab.com/ee/ci/examples/)
* [变量说明](https://docs.gitlab.com/ce/ci/variables/README.html)
* [预定义的变量](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

```yaml
# 自定义默认配置
default:
  # 基础镜像
  image: wener/node:docker
  cache:
    untracked: true
    # 缓存按分支划分 - 如果有 tag 这个会是 tag 名字
    key: "$CI_COMMIT_REF_NAME"
    # 常见的缓存目录
    paths:
      - node_modules/
      - .yarn/
      - packages/server/.next/cache/
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

* 不能有 tag 且排除分支 - https://gitlab.com/gitlab-org/gitlab-foss/-/issues/23251

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
rules :
    # 没有 tag 的时候才执行
    - if: $CI_COMMIT_TAG != ""
      when: on_success
    - when: never
```
