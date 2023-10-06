---
title: Package
---

# Package

## NPM

```bash
npm config set -L project @wener:registry //code.wener.me/api/packages/wener/npm/           # Registry for scope
npm config set -L project //code.wener.me/api/packages/wener/npm/:_authToken PAT # Access token for registry

# token - PAT
# npm config set {scope}:registry https://gitea.example.com/api/packages/{owner}/npm/
# npm config set -- '//gitea.example.com/api/packages/{owner}/npm/:_authToken' "{token}"

# for global auth
npm publish --registry https://gitea.example.com/api/packages/wener/npm/
# for scope auth
npm publish
```

## Composer

```json title="<user-home-dir>/.composer/config.json"
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://gitea.example.com/api/packages/{owner}/composer"
    }
  ]
}
```

```json title="auth.json"
{
  "http-basic": {
    "gitea.example.com": {
      "username": "{username}",
      "password": "{password}"
    }
  }
}
```
