---
title: Remix
---

# Remix

- [remix-run/remix](https://github.com/remix-run/remix)
  - 基于 React 的开发框架
  - 内置 form 处理
  - 类似 NextJS
- loader -> Compoent -> action
- serverBuildTarget
  - 默认 node-cjs
  - arc, cloudflare-pages, cloudflare-workers, deno, netlify, node-cjs, vercel,
- 参考
  - https://remix.run/blog/remix-vs-next

:::caution

- HMR 有问题
  - [#7466](https://github.com/remix-run/remix/issues/7466)
  - ~~[#1601](https://github.com/remix-run/remix/issues/1601)~~

:::

:::info

- 框架耦合程度: ~~remix > nextjs > vite~~
  - nextjs 13 - 增加了 app、server action 后复杂度大大提升

:::

```bash
npm add @remix-run/node @remix-run/react @remix-run/serve
npm add -D @remix-run/dev

npx create-remix@latest


npx @remix-run/dev routes --config vite.remix.config.ts
# 只想用 remix 的 filebase routing 结构
pnpm dlx @remix-run/dev routes --config vite.remix.config.ts --json
```

## routes

- app/root.tsx - 顶层 layout
- 路由规则 app/routes
- `SEGMENT.tsx` 或 目录 `SEGMENT/_index.tsx`
- `A.B.tsx` 或者 `A/B.tsx`
- `$var` - 路径上变量
- exports - Route Module
  - loader - 在 GET 请求时执行
  - action - 在 DELETE, PATCH, POST, PUT 请求时执行
  - clientLoader
  - clientAction
  - default - 组件
  - headers
  - meta
  - links
  - ErrorBoundary
  - handle - 路由元数据信息
  - HydrateFallback - 在 clientLoader 时显示
  - shouldRevalidate
- `*.client.tsx`,`*.server.tsx`

```tsx
export async function loader({ request }) {
  return getProjects();
}

export async function action({ request }) {
  const form = await request.formData();
  return createProject({ title: form.get('title') });
}

export default function Projects() {
  const projects = useLoaderData();
  const { state } = useTransition();
  const busy = state === 'submitting';

  return (
    <div>
      {projects.map((project) => (
        <Link to={project.slug}>{project.title}</Link>
      ))}

      <Form method='post'>
        <input name='title' />
        <button type='submit' disabled={busy}>
          {busy ? 'Creating...' : 'Create New Project'}
        </button>
      </Form>
    </div>
  );
}
```

**参考**

- app/routes.ts
  - `import { type RoutesConfig, route, layout, index } from "@react-router/dev/routes";`
  - [brookslybrand/route-convention-evolution](https://github.com/brookslybrand/route-convention-evolution)
    - Add support for routes.ts [remix-run/react-router#11773](https://github.com/remix-run/react-router/pull/11773)
    - @react-router/dev
- https://remix.run/docs/en/main/discussion/routes
- https://remix.run/docs/en/main/file-conventions/routes
- https://interactive-remix-routing-v2.netlify.app/
- [kiliman/remix-flat-routes](https://github.com/kiliman/remix-flat-routes)
  - v1 的 routing 结构
  - [kiliman/remix-flat-routes#39](https://github.com/kiliman/remix-flat-routes/discussions/39) Deprecate remix-flat-routes in favor of remix-hybrid-routes
- v1 和 v2 的 routing 有很大的不同

## remix.config.js

- https://remix.run/docs/en/main/file-conventions/remix-config

## vite

- https://github.com/remix-run/remix/tree/main/templates/unstable-vite
