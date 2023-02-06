---
title: App Layout
---

# App Layout

:::caution

- 还有很多特性 app 模式不支持
  - [Planned Features](https://beta.nextjs.org/docs/app-directory-roadmap#planned-features)
  - API - 目前支持保留在 pages 目录
  - basePath
- 只能使用 cjs/require - 同步导入依赖
  - 导致使用现有的依赖非常尴尬
- emotion 目前用不了 - https://github.com/vercel/next.js/issues/41994
  - 但是在 Server 环境下 React.createContext is not a function
- React.Component is null

:::

- `src/app/`
  - page.tsx - 页面内容
  - layout.tsx
    - 布局 - Root 布局必须存在
    - 替代 `_app.js`, `_document.js`
  - template.tsx - 模板
    - 类似 layout 但不会持续存在
  - head.tsx - head 标签内容 - title,meta,link,script
  - loading.tsx - Suspense, Loading 时显示的内容
  - error.tsx
  - not-found.tsx

```tsx title="page.tsx"
import { notFound } from 'next/dist/client/components/not-found';

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }) {
  // 返回 NotFound 页面内容
  if (!params.slug) {
    return notFound();
  }
  return (
    <>
      <p>{params.slug}</p>
      <p>{searchParams.id}</p>
    </>
  );
}

export async function generateStaticParams() {
  // 同 getStaticPaths
  return [{ slug: 'a' }];
}
```

```tsx title="layout.tsx"
export default function RootLayout({ children, params }: { children: React.ReactNode; params?: any }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

// ISG
// export const revalidate = 60;
```

```tsx title="template.tsx"
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

```tsx title="head.tsx"
async function getPost(slug) {
  const res = await fetch('...');
  return res.json();
}

export default async function Head({ params }) {
  const post = await getPost(params.slug);

  return (
    <>
      <title>{post.title}</title>
    </>
  );
}
```

```tsx title="error.tsx"
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Something went wrong!</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}
```

```tsx title="not-found.tsx"
export default function NotFound() {
  return '';
}
```

- Server Components
  - **支持的场景**
    - 获取数据
    - 访问后端服务
    - 避免敏感信息泄露到前端
    - 大依赖
  - **不支持场景**
    - React.Component = null
    - React.PureComponent = null
    - hooks
    - Context - 无 createContext 方法
  - 可 import server-only 包确保模块只在服务端
    - 通过 exports 只有 react-server 实现
    - exports.default 会直接 throw 异常
  - 类似的有 client-only 包
  - fetch
    - 默认 force-cache
    - 支持 react cache - 相同请求只会发出一次
- Layout 默认为 Server Component
- 在 app 目录下的都是 Server Component
  - 可在 app 目录下放任意组件，只有特殊文件会被处理

---

- https://beta.nextjs.org/docs/app-directory-roadmap
