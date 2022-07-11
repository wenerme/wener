---
title: FedCM
---

# FedCM

- https://fedidcg.github.io/FedCM/
  - Chrome 105
  - WebID
  - 由浏览器进行 oauth 操作
  - /.well-known/web-identity -> provider_urls
  - IdentityCredential
- [navigator.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/credentials)
  - [Credential Management](https://w3c.github.io/webappsec-credential-management)
  - Chrome 51+, Safari 13
  - mdn [FederatedCredential](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential)

```html
<html>
  <head>
    <title>Welcome to my Website</title>
  </head>
  <body>
    <button onclick="login()">Login with idp.example</button>

    <script>
      async function login() {
        // IdentityCredential
        // <code data-opaque bs-autolink-syntax='`token`'>token</code>
        return await navigator.credentials.get({
          mediation: 'optional', // 默认为 optional
          // 新增
          identity: {
            providers: [
              {
                configURL: 'https://idp.example/manifest.json',
                clientId: '123',
                nonce: random(), //
              },
            ],
          },
        });
      }
    </script>
  </body>
</html>
```

```json
{
  "accounts_endpoint": "",
  "client_metadata_endpoint": "",
  "id_token_endpoint": "",
  "branding": {
    "background_color": "",
    "color": "",
    "icons": [{"url": "", "size": 32}]
  }
}
```

Accounts List

```json
{
  "accounts": [
    {
      "id": "",
      "name": "",
      "email": "",
      "given_name": "",
      "picture": "",
      "approved_clients": [""]
    }
  ]
}
```

Client Metadata

```json
{
  "privacy_policy_url": "https://rp.example/clientmetadata/privacy_policy.html",
  "terms_of_service_url": "https://rp.example/clientmetadata/terms_of_service.html"
}
```

ID Token

```http
POST /fedcm_token_endpoint HTTP/1.1
Host: idp.example
Referer: https://rp.example/
Content-Type: application/x-www-form-urlencoded
Cookie: 0x23223
Sec-FedCM-CSRF: ?1
account_id=123&client_id=client1234&nonce=Ct60bD&disclosure_text_shown=true
```

- 所有浏览器发起的请求都会带上 Sec-FedCM-CSRF

```json
{
  "token" : "JWT"
}
```
