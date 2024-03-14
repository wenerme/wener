---
tags:
  - Configuration
---

# NextJS Conf

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 只有在用到时才 import
    // https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports
    optimizePackageImports: [
      '@ant-design/icons',
      '@headlessui-float/react',
      '@headlessui/react',
      '@heroicons/react/20/solid',
      '@heroicons/react/24/outline',
      '@heroicons/react/24/solid',
      '@material-ui/core',
      '@material-ui/icons',
      '@mui/icons-material',
      '@mui/material',
      '@tabler/icons-react',
      '@tremor/react',
      '@visx/visx',
      'ahooks',
      'antd',
      'date-fns',
      'lodash-es',
      'lucide-react',
      'mui-core',
      'ramda',
      'react-bootstrap',
      'react-icons/*',
      'react-use',
      'recharts',
      'rxjs',
    ],

    // https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
    // https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/server-external-packages.json
    serverComponentsExternalPackages: [
      '@aws-sdk/client-s3',
      '@aws-sdk/s3-presigned-post',
      '@blockfrost/blockfrost-js',
      '@highlight-run/node',
      '@jpg-store/lucid-cardano',
      '@libsql/client',
      '@mikro-orm/core',
      '@mikro-orm/knex',
      '@prisma/client',
      '@react-pdf/renderer',
      '@sentry/profiling-node',
      '@swc/core',
      'argon2',
      'autoprefixer',
      'aws-crt',
      'bcrypt',
      'better-sqlite3',
      'canvas',
      'cpu-features',
      'cypress',
      'eslint',
      'express',
      'firebase-admin',
      'jest',
      'jsdom',
      'libsql',
      'lodash',
      'mdx-bundler',
      'mongodb',
      'mongoose',
      'next-mdx-remote',
      'next-seo',
      'node-pty',
      'node-web-audio-api',
      'pg',
      'playwright',
      'postcss',
      'prettier',
      'prisma',
      'puppeteer-core',
      'puppeteer',
      'rimraf',
      'sharp',
      'shiki',
      'sqlite3',
      'tailwindcss',
      'ts-node',
      'typescript',
      'vscode-oniguruma',
      'webpack',
      'websocket',
      'zeromq',
    ],
  },
};

export default nextConfig;
```
