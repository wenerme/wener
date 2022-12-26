---
title: GitaLab持续集成持续交付
---

# Gitlab CI/CD

- `.gitlab-ci.yml`
  - 应用构建定义
  - K8S Runner 下使用 Kaniko 构建镜像
  - 使用 [gitlabktl](https://gitlab.com/gitlab-org/gitlabktl) 部署服务和应用到 knative
- `serverless.yml`
  - 无服务函数 - 需要 Knative
  - 可用于部署 _函数_
  - 默认会生成 Dockerfile
  - Gitlab [运行时](https://gitlab.com/gitlab-org/serverless/runtimes) 支持 go ruby nodejs Dockerfile
  - 可以使用 OpenFaaS 的运行时
- `Dockerfile`
  - 无服务应用
  - 定义应用构建方式、应用运行时
  - 默认需要暴露 8080
- 注意
  - 构建的应用镜像需要 PUSH 到仓库 - 因此需要配置仓库信息
  - [#21619](https://gitlab.com/gitlab-org/gitlab/-/issues/21619) - 如果镜像不是 latest 标签不会每次拉
- [CI 变量说明](https://docs.gitlab.com/ee/ci/variables)
- 参考
  - [Gitlab 仓库 vs Nexus](https://about.gitlab.com/devops-tools/sonatype-nexus-repo-vs-gitlab.html)
    - Nexus 会更好
    - Gitlab 只有 Docker 仓库是免费使用的
  - [Gitlab CI 中使用 Nexus](https://blog.sonatype.com/how-to-use-gitlab-ci-with-nexus)

:::caution

- 变量不能包含美元符 `$` [#16442](https://gitlab.com/gitlab-org/gitlab/-/issues/16442)
  - 会被展开 - 直接写 `$$`

:::

## serverless

- [knative-examplesknative-examples)

```bash
# 查看部署的函数服务
kubectl -n "$KUBE_NAMESPACE" get services.serving.knative.dev

# 请求
curl \
--header "Content-Type: application/json" \
--request POST \
--data '{"GitLab":"FaaS"}' \
http://functions-echo.functions-1.functions.example.com/

```

**OpenFaaS 运行时**

```yaml
hello:
  source: ./hello
  runtime: openfaas/classic/ruby
  description: 'Ruby function using OpenFaaS classic runtime'
```

### echo-js example

**.gitlab.yml**

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

**serverless.yml**

```yaml
# 服务名字
service: functions
# 服务描述
description: 'GitLab Serverless functions using Knative'

provider:
  # 执行 serverless.yml 的 provider
  name: triggermesh
  # 环境变量
  environment:
    FOO: value

functions:
  echo-js:
    # 函数名字
    handler: echo-js
    # 目录
    source: ./echo-js
    # 运行时 - 可选 - 可以在 source 下定义 Dockerfile
    runtime: https://gitlab.com/gitlab-org/serverless/runtimes/nodejs
    # 函数描述
    description: 'node.js runtime function'
    # 环境变量
    environment:
      MY_FUNCTION: echo-js
```

## gitlabktl

- [GitLab Knative tool](https://gitlab.com/gitlab-org/gitlabktl)

```bash
# 无法直接 build 可以使用镜像
docker pull registry.gitlab.com/gitlab-org/gitlabktl
# 作为命令使用
gitlabktl(){ docker run --rm -it ${OPT} -v $PWD:/host -w /host registry.gitlab.com/gitlab-org/gitlabktl gitlabktl $*;}
# 构建
# 需要镜像环境 CI_REGISTRY CI_REGISTRY_USER CI_REGISTRY_PASSWORD
gitlabktl serverless build
# 会在目录下生成 Dockerfile
# 会往 registry-internal.wener.me/demo/函数名 推送镜像
OPT="-e CI_REGISTRY=registry.wener.me -e CI_REGISTRY_USER='' -e CI_REGISTRY_PASSWORD='' -e CI_REGISTRY_IMAGE=registry-internal.wener.me/demo " gitlabktl serverless build
# 运行刚才推送的仓库 - 使用的 functions-echo-js
docker run -it --rm -p 8080:8080 registry-internal.wener.me/demo/functions-echo-js
```

## Auto DevOps

- Auto CI/CD 使用类似 heroku 的 buildpack
- 构建完成后会创建镜像存入仓库 - 基础镜像 [gliderlabs/herokuish](https://github.com/gliderlabs/herokuish)
- 默认有三个步骤 build test deploy - 默认 test 包含 code_quality 和 test
- code_quality 会使用 https://github.com/codeclimate/codeclimate
- build 使用共享 runner - 会比较慢
- 相较于专门项目的 deploy - 例如 now - 会慢很多， 10 分钟 和 1 分钟的区别
- 计划支持 cron - 可以当作一个 webcron 来使用
- 实际操作内容定义在 [Auto-DevOps.gitlab-ci.yml](https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Auto-DevOps.gitlab-ci.yml)
