---
tags:
  - FAQ
---

# CI FAQ

## env

- drone
  - `DRONE_` 前缀
- woodpecker
  - drone fork
  - `CI_` 前缀
- GitHub Action
  - `GITHUB_` 前缀

```bash
# CI 环境识别
# ============
CI=true
CI=1
CI=woodpecker
GITLAB_CI=true
DRONE=true
GITHUB_ACTIONS=true
# Runtime & CI
VERCEL=1
RENDER=true
CLOUDFLARE_ACCOUNT_ID=

# CSV/Git 信息
# ============
CI_COMMIT_SHA=
CI_COMMIT_SHORT_SHA=$(git rev-parse --short HEAD)
CI_COMMIT_TAG=
CI_COMMIT_TAG_MESSAGE=
CI_COMMIT_TIMESTAMP=
CI_COMMIT_MESSAGE=
CI_COMMIT_DESCRIPTION=
CI_COMMIT_BRANCH=
CI_COMMIT_REF=
CI_COMMIT_REF_NAME=
CI_COMMIT_REF_SLUG=$(echo $CI_COMMIT_REF_NAME | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g' | sed 's/^-//g' | sed 's/-*$//g' | sed 's/-\{2,\}/-/g')
CI_COMMIT_BEFORE_SHA=0000000000000000000000000000000000000000

# Gitlab
# ============
CI_REGISTRY=
CI_REGISTRY_USER=
CI_REGISTRY_PASSWORD=
CI_REGISTRY_IMAGE=

CI_DEFAULT_BRANCH=
CI_REPOSITORY_URL=

# GitHub
# ============
GITHUB_ACTION=__repo-owner_name-of-action-repo

# Jenkins
# ============
JOB_NAME=
JOB_URL=
EXECUTOR_NUMBER=0
BUILD_NUMBER=1

GIT_COMMIT=
# GIT_{COMMITTER,AUTHOR}_{NAME,EMAIL}=
GIT_URL=
GIT_BRANCH=
GIT_LOCAL_BRANCH=
GIT_PREVIOUS_COMMIT=
GIT_PREVIOUS_SUCCESSFUL_COMMIT=
```

- https://docs.drone.io/pipeline/environment/reference/
- https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
- https://woodpecker-ci.org/docs/next/usage/environment
  - [pipeline/frontend/metadata.go#L146-L243](https://github.com/woodpecker-ci/woodpecker/blob/e408c1ba27f7b1e1f769739d5042c58c643d2130/pipeline/frontend/metadata.go#L146-L243)
- https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
- [GitHub Action Variables](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables)
- Vercel [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables)
- https://developers.cloudflare.com/workers/wrangler/system-environment-variables/
