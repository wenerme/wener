---
title: Remix
---

# Remix

- [remix-run/remix](https://github.com/remix-run/remix)
  - 基于 React 的开发框架
  - 内置 form 处理
  - 类似 NextJS
- serverBuildTarget
  - 默认 node-cjs
  - arc, cloudflare-pages, cloudflare-workers, deno, netlify, node-cjs, vercel,

:::caution

- Live Reload not working [#1601](https://github.com/remix-run/remix/issues/1601)

:::

:::info

- 框架耦合程度: remix > nextjs > vite

:::

```bash
npx create-remix@latest
```


```ts
export async function loader({ request }) {
  return getProjects();
}

export async function action({ request }) {
  const form = await request.formData();
  return createProject({ title: form.get("title") });
}

export default function Projects() {
  const projects = useLoaderData();
  const { state } = useTransition();
  const busy = state === "submitting";

  return (
    <div>
      {projects.map((project) => (
        <Link to={project.slug}>{project.title}</Link>
      ))}

      <Form method="post">
        <input name="title" />
        <button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create New Project"}
        </button>
      </Form>
    </div>
  );
}
```
