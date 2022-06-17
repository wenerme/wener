---
title: bit
---

# bit

bit 会为每个组件建立 git “仓库”，维护每个组件的生命周期。

- [teambit/bit](https://github.com/teambit/bit)
- BVM - bit version manager
- `@<owner>/<scope>.<namespace>.<component-name>`
- my-org.my-scope/ui/inputs/button
  - ID: my-org.my-scope/ui/inputs/button
  - Scope: my-org.my-scope
  - Name: ui/inputs/button
  - Package: `@my-org/my-scope.ui.inputs.button`
  - 一般为 organization.team - 例如: teambit.docs
- bit
  - Git 相关: tag, untag, add, untrack, diff, lane, snap, export, import, checkout, artifacts, remote
    - lane = branch
    - export = push
    - import = pull
    - .git/bit/scope.json = .git/config
  - pnpm 相关: install, link
  - scope fork = fork 仓库
  - start, compile, test, lint, format, build
- 参考
  - [bit-demos/base-ui](https://github.com/bit-demos/base-ui)

:::caution

- react 18 [#5751](https://github.com/teambit/bit/issues/5751)

:::

```bash
# 下载缓存 ~/.bvm/temp/bit-0.0.762.tar.gz
# 安装位置 ～/.bvm/versions/0.0.762
# 非常大 - 约 1.2G node_modules
# https://bvm.bit.dev/
# https://bvm.bit.dev/versions/dev/Darwin/0.0.762/bit-0.0.762.tar.gz
npx @teambit/bvm install

# 新项目
# ==========
# 默认 使用 pnpm
# bit templates
# --default-scope my-org.my-scope
bit new react my-ui
cd my-ui
bit start

# my-scope/ui/my-welcome
bit create react ui/my-welcome              #  创建组件
bit show ui/my-welcome                      # 查看组件状态
bit tag ui/my-welcome -v 1.0.0 -m "initial" # tag 本地版本
bit diff ui/my-welcome                      # 修改后可查看变化
bit log ui/my-welcome                       # 历史修改
bit artifacts ui/my-welcome                 #文件内容
bit dependencies ui/my-welcome              # 查看组件依赖

# 快照会生成 hash - 用于协作
# 本质类似 tag
bit snap ui/my-welcome --message "demo snapshot"

# bit export [collection]
# bit import
# bit checkout latest --all
# bit untag

bit status

# 已有项目
# ==========
# --bare 用于自建 server
# monorepo 需要在 root 位置 init
bit init --bare

# 常用操作
# ==========
npx @teambit/bvm upgrade          # 升级 bit
bit add src/components/button     # 添加组件
bit untrack src/components/button #取消跟踪组件

bit move ui/my-component design/my-component # 调整组件位置

bit eject teambit.design/ui/buttons/button  # 调整组件仓库
bit import teambit.design/ui/buttons/button # 在新的仓库导入

bit install "classnames@^2" -u # 安装升级依赖

# 重命名组件
# --refactor 会调整现有代码
bit rename loaders/skeleton placeholders/skeleton --refactor

bit show ui/my-welcome # 查看组件信息
# 获取组件 元信息
# 可以是 remote
bit aspect get my-org.my-scope/ui/my-welcome

bit cat-scope # 查看用到的 scope
bit insights  # 分析循环依赖
bit env       # 组件环境
```

- .bitmap - 自动生成 - 组件到目录映射
- workspace.jsonc
- .git/bit - Local Scope
  - cache,components,objects,scope.json

```json title="workspace.jsonc"
{
  "teambit.workspace/workspace": {
    "name": "my-ui",
    // icon: ""

    // <root>/{scope}/{name}/button/index.ts
    "defaultDirectory": "{scope}/{name}",
    "defaultScope": "my-org.my-scope"
  },
  "teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "dependencies": {},
      "peerDependencies": {}
    }
  },
  "teambit.workspace/variants": {
    "{ui/**}": {
      "teambit.dependencies/dependency-resolver": {
        "policy": {
          "dependencies": {
            "classnames": "^2"
          }
        }
      }
    }
  }
}
```

- ui/my-button - 组件目录
  - index.tsx - entry
  - my-button.tsx - main
  - my-button.spec.tsx - test
  - my-button.composition.tsx
  - my-button.docs.mdx
  - component.json
- [workspace.jsonc](https://bit.dev/docs/workspace/workspace-json)

:::tip

- 每个组件都位于一个“小仓库”
  - 因此版本和修改都是独立的
- capsules - 组件的临时工作空间 - bit build
  - capsules_root_base_dir
  - macOS `~/Library/Caches/Bit/capsules/`
  - Windows `%LOCALAPPDATA%\Bit\capsules\`

:::

**component.json**

```bash
# eject 后会得到 component.json
bit eject-conf ui/my-button
```

```json
{
  "componentId": {
    "name": "ui/button",
    "version": "0.0.1",
    "scope": "company.scope"
  },
  "propagate": true,
  "extensions": {
    "teambit.dependencies/dependency-resolver": {
      "policy": {
        "dependencies": {
          "lodash": "^14.17.21"
        }
      }
    }
  }
}
```

## bit server

本质和 git bare 仓库类似，

```bash
docker run -it --rm \
  -v $PWD/remote-scope:/root/remote-scope \
  -p 3030:3000 \
  --name bit-server bitcli/bit-server:latest

bit remote add http://localhost:3030

# 不同 scope 之间互通
# docker exec -it bit-server bit remote add http://192.168.1.110:3000
```

- /root/Library/Caches/Bit/logs
- [scripts/docker-teambit-bit](https://github.com/teambit/bit/blob/master/scripts/docker-teambit-bit/README.md)
- [teambit/bit-docker](https://github.com/teambit/bit-docker)
- [How to self host components and publish to npm](https://github.com/teambit/bit/discussions/4707)

```dockerfile
FROM node:12.22.0
USER root

RUN npm i @teambit/bvm -g
RUN bvm upgrade
ENV PATH=$PATH:/root/bin

# increase memory to avoid 137 error code
ENV NODE_OPTIONS=--max_old_space_size=4096

RUN bit config set analytics_reporting false
RUN bit config set no_warnings false
RUN bit config set interactive false
RUN bit config set error_reporting true

ARG SCOPE_PATH=/root/remote-scope
WORKDIR ${SCOPE_PATH}
RUN bit init --bare
CMD bit start
```

## 环境

- builder, generator, compiler, tester, docs, compositions, preview, linter, formatter

```bash
bit env
bit env get teambit.react/react
bit show teambit.react/react
# 修改组件 env
bit env set acme.demo/welcome acme.envs/react
# 批量修改
bit env set "acme.demo/ui/*" acme.envs/react
bit env replace teambit.react/react acme.envs/react

# 自定义 env
bit create react-env envs/my-env
```

## 应用

```bash
bit fork learnbit.apps/node-app
bit app list
bit run hello-node-app
bit build company.scope/apps/my-app
bit tag company.scope/apps/my-app
```

## PKG

**修改组件**

```json title="component.json"
{
  "teambit.pkg/pkg": {
    "packageJson": {
      "main": "dist/{main}.js"
    }
  }
}
```

**修改全部**

```json
{
  "teambit.workspace/variants": {
    "{ui/*}": {
      "teambit.pkg/pkg": {
        "packageJson": {
          "private": false,
          "main": "dist/{main}.js",
          "custom-prop": "value"
        }
      }
    }
  }
}
```

```ts title="my-env.env.ts"
import { PackageEnv } from '@teambit/envs';

export class MyEnv implements PackageEnv {
  getPackageJsonProps() {
    return {
      main: 'dist/{main}.js',
      types: '{main}.ts',
    };
  }
}
```

- my-env.main.runtime.ts
  - provider - 合并 pkg
- 维护组件的 package.json
- https://bit.dev/teambit/pkg/pkg

## 通过代码获取组件信息

```ts
import { Workspace, WorkspaceAspect } from '@teambit/workspace';
// ...
export class MetadataRetrieval {
  // ...
  static dependencies = [WorkspaceAspect];
  static async provider([workspace]: [Workspace]) {
    // scope.get(componentId)
    // component.getHost().get(componentId)
    const component = await this.workspace.get(componentId);
    /* retrieve the custom metadata provided by this aspect */
    const componentCustomMetadata = component.state.aspects.get(MetadataRetrievalAspect.id).data;
    return new CustomMetadataMain();
  }
}
```
