---
title: Apollo GraphQL
tags:
  - Service
  - API
  - GraphQL
  - Apollo
---

# Apollo GraphQL

- [Apollo Link HTTP Options](https://www.apollographql.com/docs/link/links/http/#options)
- [graphql-mesh](https://github.com/Urigo/graphql-mesh)

## Installation

```bash
npm install apollo-boost @apollo/react-hooks graphql

# For subscriptions
yarn add apollo-link-ws subscriptions-transport-ws
```

## WebSocket Link Example

```js
const wsLink = new WebSocketLink(
  new SubscriptionClient(WS_URL, {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      headers: {
        Authorization: 'Bearer xxxxx',
      },
    },
  }),
);
```
