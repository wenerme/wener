---
title: React Route
---

# React Route

```bash
yarn add react-router-dom
```

```tsx
import React from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';

export const MainRoute: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      {/* Switch 渲染匹配的第一个 */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

```


# FAQ

## Switch vs Route

`<Switch>` 只渲染一个路由. 而 `<Route>` 会渲染所有匹配的路由。
