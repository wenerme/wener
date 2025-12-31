---
title: Traefik Forward Auth
tags:
  - Service
  - Auth
  - Traefik
  - OIDC
---

# Traefik Forward Auth

[thomseddon/traefik-forward-auth](https://github.com/thomseddon/traefik-forward-auth) - Minimal forward authentication service that provides Google/OpenID oauth authentication for Traefik.

## Docker Compose Example

```bash
version: "3.8"
services:
forward-auth:
image: thomseddon/traefik-forward-auth:2
container_name: traefik-forward-auth
restart: always
environment:
- PROVIDERS_OIDC_CLIENT_ID=traefik-forward-auth
- PROVIDERS_OIDC_CLIENT_SECRET=your_client_secret
- PROVIDERS_OIDC_ISSUER_URL=https://id.example.com/auth/realms/master
- LOG_LEVEL=debug
- DEFAULT_PROVIDER=oidc
- SECRET=your_random_secret
- COOKIE_DOMAIN=example.com
- INSECURE_COOKIE=false
```

## Traefik Configuration labels

```yaml
labels:
  - 'traefik.enable=true'
  - 'traefik.http.routers.auth.rule=Host(`auth.example.com`)'
  - 'traefik.http.routers.auth.entrypoints=websecure'
  - 'traefik.http.services.auth.loadbalancer.server.port=4181'
  - 'traefik.http.middlewares.forward-auth.forwardauth.address=http://auth.example.com:4181'
  - 'traefik.http.middlewares.forward-auth.forwardauth.authResponseHeaders=X-Forwarded-User'
  - 'traefik.http.middlewares.forward-auth.forwardauth.trustForwardHeader=true'
```
