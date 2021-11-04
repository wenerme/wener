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

# Version

## React Router v6

- 替代 React Router v3,v4,v5, Reach Router
- 支持 嵌套路由
  - `<Outlet/>` 渲染下一个匹配
- 支持 相对路径
- 支持 basename - 路由更加通用，方便嵌套
- 内置 RouterObject - 直接 JS 配置
- 纯 Hook 重写 - 要求 React 16.8+
- 不再需要 exact - 使用 `*` 进行任意匹配
- element 替代 component 和 render
- https://remix.run/blog/react-router-v6

# FAQ

## Switch vs Route

`<Switch>` 只渲染一个路由. 而 `<Route>` 会渲染所有匹配的路由。
