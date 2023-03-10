---
title: GraphiQL
---

# GraphiQL
- [graphql/graphiql](https://github.com/graphql/graphiql)
  - Explorer
  - [Demo](https://graphql.org/swapi-graphql)
  - adopted by
    - Hasura
    - [Gitlab GraphQL Explorer](https://gitlab.com/-/graphql-explorer)
    - [GitHub GraphQL Explorer](https://developer.github.com/v4/explorer)

```tsx
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React from 'react';
import ReactDOM from 'react-dom';

import 'graphiql/graphiql.css';

const fetcher = createGraphiQLFetcher({
  url: 'https://my.backend/graphql',
});

ReactDOM.render(<GraphiQL fetcher={fetcher} />, document.body);
```

- https://github.com/graphql/graphiql/blob/main/examples/graphiql-cdn/index.html
- https://graphiql-test.netlify.app/typedoc/modules/graphiql.html#graphiqlprops-1
