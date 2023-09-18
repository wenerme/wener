---
title: Package
---

# Package

## NPM

```bash
# token - PTA
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
