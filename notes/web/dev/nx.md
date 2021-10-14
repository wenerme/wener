---
title: nx
---

# NX

- [nrwl/nx](https://github.com/nrwl/nx)
  - 大型仓库构建框架
- 一个 workspace 为一个大项目 - `@project`
  - 项目下包含多个 app、lib、tool 为 project
  - 通过插件提供生成和构建执行能力
- 参考
  - [nrwl/nx#4620](https://github.com/nrwl/nx/issues/4620)

```bash
npx create-nx-workspace --name demo --preset empty --packageManager npm --nx-cloud false

# 所有插件
nx list

npm add -D @nrwl/next @nrwl/react
npx nx g @nrwl/next:app demo

# import {} from '@myproject/mylibrary'
npx nx generate @nrwl/react:library mylibrary --style styled-component --component false

npx nx g @nrwl/react:storybook-configuration project-name
npx nx run project-name:storybook
```

## plugins

| plugin          |              include | for           |
| --------------- | -------------------: | ------------- |
| @nrwl/web       |  builders,generators | Web Component |
| @nrwl/react     |           generators |
| @nrwl/nest      | executors,generators |
| @nrwl/angular   |           generators |
| @nrwl/node      | executors,generators |
| @nrwl/express   | executors,generators |
| @nrwl/next      |  builders,generators |               |
| @nrwl/storybook |  builders,generators |               |
| @nrwl/cypress   |  builders,generators |
| @nrwl/jest      |  builders,generators |
| @nrwl/linter    |             builders |
| @nrwl/workspace |  builders,generators |
| @nrwl/nx-plugin | executors,generators |

- generator
  - app,application
  - c,component
  - component-story
  - lib,library
  - redux
  - stories
  - storybook-configuration
  - configuration
    - storybook
  - page
    - next
- executor
  - build
  - server
  - export
  - dev-server
    - web
  - file-server
    - web
  - package
    - web
