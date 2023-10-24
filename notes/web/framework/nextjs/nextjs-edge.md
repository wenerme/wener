---
title: NextJS Edge Runtime
---

# NextJS Edge Runtime

:::tip

:::

- https://beta.nextjs.org/docs/api-reference/edge

## vercel serverless vs edge

|                   | Serverless Functions            | Edge Functions                 |
| ----------------- | ------------------------------- | ------------------------------ |
| Cold starts       | Yes                             | No                             |
| Runtime           | Node.js, Go, Ruby, Python       | Edge Runtime                   |
| execution time    | Hobby: 10s, Pro: 60s, Ent: 900s | edge 30s 开始响应              |
| size              | 50MB                            | Hobby: 1MB, Pro: 2MB, Ent: 4MB |
| memory            | 1024MB                          | 128MB                          |
| env var size      | 64KB                            | 5KB                            |
| request body size | 4.5MB                           | 4MB                            |

- https://vercel.com/docs/concepts/limits/overview#functions-comparison
