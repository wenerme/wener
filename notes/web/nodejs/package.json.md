---
title: package.json
files:
  - package.json
---

# package.json

- 参考
  - [stereobooster/package.json](https://github.com/stereobooster/package.json)
    - package.json fields explained
  - npm [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
  - pnpm [package.json](https://pnpm.io/package_json)
  - https://nodejs.org/api/packages.html
  - https://nodejs.org/api/packages.html#packages_package_entry_points
  - https://webpack.js.org/guides/package-exports
  - https://unpkg.com/browse/antd/package.json
  - jsnext:main [jsforum/jsforum#5](https://github.com/jsforum/jsforum/issues/5)
  - style,sass [twbs/bootstrap#12441](https://github.com/twbs/bootstrap/pull/12441)
    - used by [postcss/postcss-import](https://github.com/postcss/postcss-import)
  - jspm - shim - https://jspm.org/

```json
{
  // 主要包入口定义
  "main": "lib/cjs/index.js",
  "unpkg": "dist/pkg.development.js",
  "types": "lib/types/index.d.ts",
  "esnext": "lib/esnext/index.d.ts",
  // 由 bundler 使用的 esm 入口
  "module": "lib/esm/index.js",
  // 导入单入口
  // "exports": "./index.js"
  // 导出多个入口
  // 未 export 的为私有
  // https://nodejs.org/api/esm.html#resolver-algorithm
  "exports": {
    // 定义后可自引用
    ".": "./main.mjs",
    // import {} from 'pkg/foo'
    "./foo": "./foo.js",

    // 同时支持 cjs 和 esm
    "import": "./index.mjs",
    "require": "./index.cjs",
    // typescript 4.7+
    // https://github.com/microsoft/TypeScript/issues/33079
    "types": "./index.ts",

    // 指定路径
    ".": {
      "types": "./lib/index.d.ts",
      "default": "./lib/index.js"
    },
    // 替代
    "./*": {
      "types": "./lib/*/index.d.ts",
      "default": "./lib/*/index.js"
    },
    // 允许访问
    "./package.json": "./package.json"
  },
  // Node 条件 resolve
  "node": "",
  "node-addons": "",
  "default": "",
  "import": "",
  "require": "",
  // 社区定义的条件
  "browser": "", // build for browser
  "deno": "", // build for deno

  "development": "", // dev build entrypoint - node --conditions=development main.js
  "production": "", // prod build entrypoint

  // 针对包的 import map
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  // 可以 tree shaking
  // /*#__PURE__*/
  "sideEffects": true,
  // 部分文件有 side effetcs
  "sideEffects": ["./src/register.js", "*.css", "!(dist/(components|utils)/**)"]
}
```

- Node.js 12+ 可使用 exports 替代 main
- 现在的 node 可以在 require 时也使用 esm - 实时转译
- types = typings
- [Community Conditions Definitions](https://nodejs.org/api/packages.html#community-conditions-definitions)

```json
{
  "bundlewatch": {
    "files": [
      {
        "path": "dist/*.production.min.js"
      }
    ]
  }
}
```

## exports

- TypeScript 4.7 支持 exports
- TypeScript 5.0 支持 bundler moduleResolution
- --conditions,-C
  - `node --conditions=development index.js`
  - 运行 node 指定 condition 会根据 condition resolve
- 常见类型
  - types - `d.ts` - 一般放在最前面
  - import - esm - `import`,`import()` 使用 ECMAScript module loader
    - 可能 mjs 结尾
  - module
    - 可能 js 结尾
  - require - cjs
  - node - cjs/esm
  - node-addons - native C++ addons
  - default - cjs/esm - 优先级低
    - **注意**
      - 一般为 esm
      - 一定要放在最后
      - 不建议，因为不用环境处理逻辑不同
- 扩展
  - types - 优先级高
  - demo
  - browser - 例如 iife 格式
  - development
    - 有些为源码 - ts
    - 但是有些环境不支持 ts - 例如 nextjs
  - production
- https://nodejs.org/api/packages.html#conditional-exports

```json title="package.json"
{
  "sideEffects": "false",
  "types": "src/.ts",
  "main": "dist/cjs/index.js",
  "module": "lib/esm/index.mjs",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./lib/esm/index.mjs",
      "default": "./lib/cjs/index.js"
    },
    "./src/": "./src/",
    "./icons/*": "./lib/icons/*.json",
    "./package.json": "./package.json"
  }
}
```

- [lukeed/resolve.exports](https://github.com/lukeed/resolve.exports)
  - resolve 逻辑实现
- https://webpack.js.org/guides/package-exports/
- https://github.com/preactjs/preact/blob/master/package.json
  - 多个子包，发布为 mono package
- 展开 exports https://cdn.skypack.dev/@wener/reaction@v1.2.3/dist=es2020?meta

## exports types

- [ts 4.7+](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#package-json-exports-imports-and-self-referencing)
- package.json - type module
- tsconfig.json 的 module 设置为 Node12 或 NodeNext

**替代方案**

```json title="package.json"
{
  "typesVersions": {
    "*": {
      "index": ["lib/components/index.d.ts"],
      "tokens": ["lib/tokens/index.d.ts"]
    }
  }
}
```

## imports

- 包内映射 import
- ts 5.4 支持
- 参考
  - 目前来说，情况不是很乐观，IDE 支持还没跟上
  - https://youtrack.jetbrains.com/issues/WEB?q=subpath&u=1
  - https://github.com/vercel/turborepo/discussions/620

```json
{
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    },
    "#internal/*.js": "./src/internal/*.js"
  },
  "dependencies": {
    "dep-node-native": "^1.0.0"
  }
}
```

```ts
// 根据环境 import dep-node-native 或 polyfill
import '#dep';
```

- https://nodejs.org/api/packages.html#subpath-imports
- https://nodejs.org/api/packages.html#imports

## self-referencing

- Self-referential import breaks on Yarn Berry PNPM linker [vite#6808](https://github.com/vitejs/vite/issues/6808)
- https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name

## Protocol

- `link:`
- `workspace:`
  - 从 workspace 里选择
  - pnpm
- `pnp:`
  - yarn plug & play
- alias - `<alias>@npm:<name>`
- `lodash1@npm:lodash@1`
- `git+{url}.git`
- `<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]`
  - GIT_ASKPASS
  - GIT_EXEC_PATH
  - GIT_PROXY_COMMAND
  - GIT_SSH
  - GIT_SSH_COMMAND
    - 例如修改 key `GIT_SSH_COMMAND='ssh -i ~/.ssh/custom_ident'`
  - GIT_SSL_CAINFO
  - GIT_SSL_NO_VERIFY
- Github
  - `<githubname>/<githubrepo>[#<commit-ish>]`
  - `github:<githubname>/<githubrepo>[#<commit-ish>]`
- Gist
  - `gist:[<githubname>/]<gistID>[#<commit-ish>|#semver:<semver>]`
- `bitbucket:<bitbucketname>/<bitbucketrepo>[#<commit-ish>]`
- `gitlab:<gitlabname>/<gitlabrepo>[#<commit-ish>]`
- `[<@scope>/]<name>@<tag>`
- 也可以 `https://github.com/{USER}/{REPO}/tarball/{BRANCH}`

:::caution

- 不支持 git 子目录
- 利用 https://gitpkg.vercel.app/ 可支持 git 子目录

::::

```bash
# support private
npm install git+ssh://git@github.com:user_name/node_project.git
npm install use_name/node_project#branch_name
npm install use_name/node_project#commit
npm i https://github.com/user_name/node_project_name
npm install gist/gist_id
```

- https://docs.npmjs.com/cli/v8/commands/npm-install

## resolve

- esm 要求有后缀
- node 不要求
  - `--experimental-specifier-resolution=node `

## engines

```json
{
  "engines": {
    "node": "^16 || ^18"
  }
}
```

```bash
npx -y check-engine
```

## Reference Snippets

- [What's what Package.json cheatsheet](https://areknawo.com/whats-what-package-json-cheatsheet/)
- [StackOverflow: New package.json "exports" field not working with TypeScript](https://stackoverflow.com/questions/58990498/new-package-json-exports-field-not-working-with-typescript)
- [Node.js: Package Entry Points](https://nodejs.org/api/esm.html#esm_package_entry_points)
- [Node.js: Conditional Exports](https://nodejs.org/api/esm.html#esm_conditional_exports)
- [Nexmo CLI Issue #186: deprecated 'prepublish'](https://github.com/Nexmo/nexmo-cli/issues/186)
  - As of npm@5, `prepublish` scripts are deprecated.
  - Use `prepare` hook instead to keep the current behavior.
  - Recommend using `prepublishOnly` hook to build the project only before publishing, and not after each npm install runs.

### GitHub Package Registry

- [How to publish packages to the GitHub Package Registry](https://dev.to/jgierer12/how-to-publish-packages-to-the-github-package-repository-4bai)

```json
{
  "name": "@OWNER/PACKAGE",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": "https://github.com/OWNER/REPO"
}
```

Or via CLI:
`npm publish --ignore-scripts --@OWNER:registry='https://registry.npmjs.org'`

### Exports & TypeScript

- [TypeScript Issue #33079: Support for NodeJS 12.7+ package exports](https://github.com/microsoft/TypeScript/issues/33079)

```json
{
  "name": "my-package",
  "type": "module",
  "exports": {
    ".": {
      // Entry-point for `import "my-package"` in ESM
      "import": "./esm/index.js",

      // Entry-point for `require("my-package") in CJS
      "require": "./commonjs/index.cjs",

      // Entry-point for TypeScript resolution
      "types": "./types/index.d.ts"
    }
  },

  // CJS fall-back for older versions of Node.js
  "main": "./commonjs/index.cjs",

  // Fall-back for older versions of TypeScript
  "types": "./types/index.d.ts"
}
```
