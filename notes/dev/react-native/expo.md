---
tags:
  - Framework
---

# expo

# FAQ

## Uncaught SyntaxError: Cannot use 'import.meta' outside a module

- zustand
- https://github.com/pmndrs/zustand/discussions/1967

```js
const { getDefaultConfig } = require('expo/metro-config');

let config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.includes('zustand')) {
    const result = require.resolve(moduleName); // gets CommonJS version
    return context.resolveRequest(context, result, platform);
  }
  // otherwise chain to the standard Metro resolver.
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
```
