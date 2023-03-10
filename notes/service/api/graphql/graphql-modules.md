---
title: graphql-modules
---

# graphql-modules

- [https://github.com/Urigo/graphql-modules](https://github.com/Urigo/graphql-modules)
  - 服务端 resolver 模块化
  - NodeJS
- https://the-guild.dev/graphql/modules/docs

```ts
import { createModule, createApplication, gql } from 'graphql-modules';

const module = createModule({
  id: 'my-module',
  typeDefs: gql`
    type Post {
      id: ID
      title: String
      author: User
    }

    type Query {
      posts: [Post]
    }
  `,
  resolvers: blogResolvers,
});

const application = createApplication({
  modules: [module],
});
```
