---
title: GitLab Packages
tags:
  - Ops
  - Service
  - GitLab
  - Package
---

# GitLab Packages

## NPM

- [NPM Registry](https://gitlab.com/help/user/packages/npm_registry/index.md)

```bash
# https://gitlab.com/wenerme/node-yarn-starter
PROJECT_ID=
NPM_TOKEN=
# 发布配置
npm config set "//gitlab.com/api/v4/projects/$PROJECT_ID/packages/npm/:_authToken" "$NPM_TOKEN"

https://gitlab.com/api/v4/projects/$PROJECT_ID/packages/npm/

NPM_TOKEN=$NPM_TOKEN yarn lerna publish prerelease --registry "https://gitlab.com/api/v4/projects/$PROJECT_ID/packages/npm/"
```

```ini
//registry.npmjs.org/:\_authToken=${NPM_TOKEN}
```

```bash
npm config set '//gitlab.com/api/v4/projects/<your_project_id>/packages/npm/:\_authToken' "<your_token>"
```
