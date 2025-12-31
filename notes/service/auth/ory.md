---
title: Ory
tags:
  - Service
  - Auth
  - Ory
---

# Ory

- [Ory Ecosystem](https://github.com/ory)
  - **Hydra**: OAuth2 & OIDC Server
  - **Oathkeeper**: Identity & Access Proxy
  - **Keto**: Access Control Policies as a Server (based on Google's Zanzibar)
  - **Kratos**: Identity and User Infrastructure and Management

- [Ory Official Site](https://www.ory.sh/)

## Overview

### Kratos

Use case: You want login and registration for your application.

- [Kratos Configuration Reference](https://www.ory.sh/kratos/docs/reference/configuration/)
- [kratos-selfservice-ui-node](https://github.com/ory/kratos-selfservice-ui-node) - Sample implementation of a self-service UI.

### Keto

- [Zanzibar: Google's Consistent, Global Authorization System](https://research.google/pubs/pub48190/)

## Reference Snippets

### Kratos Docker

```bash
docker pull oryd/kratos
docker run --rm -it oryd/kratos help
```

### Kratos configuration example (`kratos.yaml`)

```yaml
dsn: 'sqlite:///data/db.sqlite?_fk=true&mode=rwc'
selfservice:
  strategies:
    password:
      enabled: true
    oidc:
      enabled: true
      config:
        providers:
        # - id: google
        #   provider: google
        #   client_id: veniam eu ullamco amet in
        #   client_secret: fugiat
        #   mapper_url: base64://bG9jYWwgc3ViamVjdCA9I...
        #   issuer_url: https://accounts.google.com
        #   auth_url: https://accounts.google.com/o/oauth2/v2/auth
        #   token_url: https://www.googleapis.com/oauth2/v4/token
        #   scope:
        #     - profile
  logout:
    redirect_to: http://example.com

urls:
  self:
    # Public address
    public: https://my-app.com/.ory/kratos/public
    # Admin address
    admin: https://kratos.private-network:4434/

  # Multi-Factor UI URL
  mfa_ui: https://my-app.com/login/mfa
  # Login address
  login_ui: https://my-app.com/login
  # Settings address
  settings_ui: https://my-app.com/user/settings
  # Default return address
  default_return_to: https://my-app.com/dashboard
  # Registration page address
  registration_ui: https://www.ory.sh/kratos/docs/fallback/registration
  # Error UI address
  error_ui: https://my-app.com/kratos-error
  # Verify UI address
  verify_ui: https://my-app.com/verify

  # Whitelisted return_to URLs
  whitelisted_return_to_urls:
    - https://example.com

log:
  level: trace
  format: text

hashers:
  argon2:
    parallelism: 1
    memory: 131072 # 128MB
    iterations: 3
    salt_length: 16
    key_length: 32

security:
  session:
    cookie:
      same_site: Lax
```
