---
title: Web (Frontend) Dev
---

# Web Dev

| for                 | last gen             | next gen                           |
| ------------------- | -------------------- | ---------------------------------- |
| js baseline         | es5                  | es6+                               |
| format              | cjs, amd, umd        | [esm]                              |
| transpile           | babel, browserify    | [esbuild], [swc]                   |
| application bundler | webpack, parcel      | nextjs,[vite],[turbopack]          |
| library bundler     | rollup               | [rollup]+esbuild                   |
| package manager     | yarnv1, lerna, bower | [pnpm], npmv8, yarnv3, [turborepo] |
| scaffold            | cra,yeoman           | npx,nextjs,[vite]                  |
| task runner         | grunt,gulp           | [turborepo]                        |

[esm]: ../spec/esm.md
[esbuild]: ./bundle/esbuild.md
[swc]: ./bundle/swc.md
[turbopack]: ./turborepo.md
[turborepo]: ./turborepo.md
[pnpm]: ./pnpm.md
[vite]: ./vite.md
[rolluo]: ./bundle/rollup.md
