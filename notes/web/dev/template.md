---
tags:
- Template
---

## 模板项目依赖

## NextJS

```bash
pnpm add next @wener/reaction @wener/utils

pnpm add react react-dom @headlessui/react react-icons react-hook-form @tanstack/react-query zustand valtio immer use-immer

pnpm add dayjs

pnpm add -D @types/node @types/react @types/react-dom
pnpm add -D tailwindcss postcss cssnano
pnpm add -D @tailwindcss/line-clamp @tailwindcss/typography @tailwindcss/container-queries daisyui

pnpm add -D prettier prettier-plugin-{pkg,tailwindcss} @trivago/prettier-plugin-sort-imports
```

## OLD

```bash
pnpm init
cat << CONF > .npmrc
strict-peer-dependencies=true
auto-install-peers=true
legacy-peer-deps=false
CONF
cat << YAML > pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
YAML

pnpm add -Dw tsx turbo typescript ava esbuild
pnpm add -Dw prettier prettier-plugin-{pkg,tailwindcss} @trivago/prettier-plugin-sort-imports
pnpm add -Dw eslint eslint-config-{prettier,standard-with-typescript} eslint-plugin-{import,n,promise,react}
pnpm add -Dw @types/node @types/react    # hoist common dependencies
pnpm add -Dw tailwindcss postcss cssnano # DevTools
pnpm add -Dw @wener/wode

mkdir -p apps/{web,server,playground} packages/{common,ui}

cd apps/web
pnpm init
pnpm add next
pnpm add @wener/reaction @wener/utils
pnpm add react react-dom @headlessui/react react-icons react-hook-form @tanstack/react-query @tanstack/react-table zustand valtio immer use-immer
pnpm add dayjs axios
pnpm add -D tailwindcss daisyui @tanstack/react-query-devtools
pnpm add -D @tailwindcss/line-clamp @tailwindcss/typography @tailwindcss/container-queries daisyui
pnpm add react-router react-router-dom # SPA
# pnpm add @trpc/client @trpc/react @trpc/server # tRPC for NextJS

mkdir src/{app,pages,components,styles,libs} -p
cat << CSS > src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
CSS
cat << JSX > src/pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function App({ Component, pageProps }:AppProps) {
  return <Component {...pageProps} />;
}

export default App;
JSX
cat << JSX > src/pages/index.tsx
export const Page = ()=>{
  return <div>Hello</div>
}
export default Page
JSX
cd -

cd apps/server
pnpm init
pnpm add fastify
cd -

cd apps/playground
cd -

# tRPC
pnpm add superjson @trpc/client @trpc/next @trpc/server zod ws
# NextJS with superjson
pnpm add superjson next-superjson-plugin

# DB
pnpm add @sequelize/core pg

pnpm add -D @types/pg @types/ws
```
