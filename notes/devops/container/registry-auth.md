---
title: registry-auth
---

# registry-auth

- [credential-helpers](../docker/docker-credential-helpers.md)

## auth.json

- [skopeo](./skopeo.md)
  - $XDG_RUNTIME_DIR/containers/auth.json
- [jib](../../java/build/jib.md)
  - $XDG_RUNTIME_DIR/containers/auth.json
  - $XDG_CONFIG_HOME/containers/auth.json
  - $HOME/.config/containers/auth.json
  - $DOCKER_CONFIG/config.json
  - $HOME/.docker/config.json
  - -Djib.from.auth.username -Djib.from.auth.password
  - -Djib.to.auth.username -Djib.to.auth.password

```json
{
  "auths": {
    "docker.io": {
      "auth": "erfi7sYi89234xJUqaqxgmzcnQ2rRFWM5aJX0EC="
    },
    "docker.io/wener": {
      "auth": "erfi7sYi89234xJUqaqxgmzcnQ2rRFWM5aJX0EC="
    },
    "quay.io": {
      "auth": "juQAqGmz5eR1ipzx8Evn6KGdw8fEa1w5MWczmgY="
    }
  },
  "credHelpers": {
    "registry.example.com": "secretservice"
  }
}
```

```bash
echo -n "$DOCKER_REGISTRY_USERNAME:$DOCKER_REGISTRY_PASSWORD" | base64 -w 0
```

- https://www.mankier.com/5/containers-auth.json
