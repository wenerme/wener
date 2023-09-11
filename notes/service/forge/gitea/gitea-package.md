---
title: Package
---

# Package

```bash
# token - PTA
# npm config set {scope}:registry https://gitea.example.com/api/packages/{owner}/npm/
# npm config set -- '//gitea.example.com/api/packages/{owner}/npm/:_authToken' "{token}"

# for global auth
npm publish --registry https://gitea.example.com/api/packages/wener/npm/
# for scope auth
npm publish
```
