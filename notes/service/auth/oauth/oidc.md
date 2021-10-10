---
title: OpenID Connect
---

# OpenID Connect

- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
- 参考
  - Mozilla [OIDC](https://infosec.mozilla.org/guidelines/iam/openid_connect.html)
  - [Token Storage](https://auth0.com/docs/security/data-security/token-storage)
  - [Authentication and Authorization Flows](https://auth0.com/docs/authorization/flows)
- auth method
  - client_secret_basic
  - client_secret_post
  - none
  - private_key_jwt
- application type
  - web - Confidential
  - user agent
  - native
- AccessTokenType
  - Bearer
  - JWT
- code_challenge_method
  - plain
  - S256
- display
  - page
  - popup
  - touch
  - wap
- prompt - none, login, consent, select_account
- scope
  - openid
  - profile
    - name, family_name, given_name, middle_name, nickname, preferred_username, profile, picture, website, gender, birthdate, zoneinfo, locale, updated_at
  - email
    - email, email_verified
  - address
    - address
  - phone
    - phone_number , phone_number_verified
  - offline_access

| spec                            | year |
| ------------------------------- | ---- |
| [OpenID 1.0]                    | 2006 |
| [OpenID 2.0]                    | 2007 |
| [OpenID Attribute Exchange 1.0] | 2007 |
| [OAuth 1.0]                     | 2010 |
| [OAuth 2.0]                     | 2012 |
| [OpenID Connect Core 1.0]       | 2014 |

[openid 1.0]: http://openid.net/specs/openid-authentication-1_1.html
[openid 2.0]: http://openid.net/specs/openid-authentication-2_0.html
[openid attribute exchange 1.0]: http://openid.net/specs/openid-attribute-exchange-1_0.html
[oauth 1.0]: https://www.rfc-editor.org/rfc/rfc5849
[oauth 2.0]: https://www.rfc-editor.org/rfc/rfc6749
[openid connect core 1.0]: http://openid.net/specs/openid-connect-core-1_0.html

- oidc = OpenID 2.0 + OpenID Attribute Exchange 1.0 + OAuth 2.0
- rs - resource server
  - API 服务 - 使用 token 和 introspect
  - client_assertion
  - client_assertion_type - urn:ietf:params:oauth:client-assertion-type:jwt-bearer
  - POST 请求 issuer 确认 token
- rp - relaying party - website
- ua - user agent - browser
- op - oidc provider

| id token  | required | stand for                              |
| --------- | -------- | -------------------------------------- |
| iss       | x        | Issuer Identifier                      |
| sub       | x        | Subject Identifier                     |
| aud       | x        | Audience                               |
| exp       | x        | Expiration time                        |
| iat       | x        | issued at time                         |
| auth_time |          | End-User authentication time           |
| nonce     |          |
| acr       |          | Authentication Context Class Reference |
| amr       |          | Authentication Methods References      |
| azp       |          | Authorized party                       |

## discovery

- /.well-known/openid-configuration

```json title="Based on Keycloak https://keycloak/auth/realms/REALM","
{
  "issuer": "https://example.com",
  "authorization_endpoint": "https://example.com/protocol/openid-connect/auth",
  "token_endpoint": "https://example.com/protocol/openid-connect/token",
  "introspection_endpoint": "https://example.com/protocol/openid-connect/token/introspect",
  "userinfo_endpoint": "https://example.com/protocol/openid-connect/userinfo",
  "end_session_endpoint": "https://example.com/protocol/openid-connect/logout",
  "jwks_uri": "https://example.com/protocol/openid-connect/certs",
  "check_session_iframe": "https://example.com/protocol/openid-connect/login-status-iframe.html",
  "grant_types_supported": [
    "authorization_code",
    "implicit",
    "refresh_token",
    "password",
    "client_credentials",
    "urn:ietf:params:oauth:grant-type:device_code",
    "urn:openid:params:grant-type:ciba"
  ],
  "response_types_supported": [
    "code",
    "none",
    "id_token",
    "token",
    "id_token token",
    "code id_token",
    "code token",
    "code id_token token"
  ],
  "subject_types_supported": ["public", "pairwise"],
  "id_token_signing_alg_values_supported": [
    "PS384",
    "ES384",
    "RS384",
    "HS256",
    "HS512",
    "ES256",
    "RS256",
    "HS384",
    "ES512",
    "PS256",
    "PS512",
    "RS512"
  ],
  "id_token_encryption_alg_values_supported": ["RSA-OAEP", "RSA-OAEP-256", "RSA1_5"],
  "id_token_encryption_enc_values_supported": [
    "A256GCM",
    "A192GCM",
    "A128GCM",
    "A128CBC-HS256",
    "A192CBC-HS384",
    "A256CBC-HS512"
  ],
  "userinfo_signing_alg_values_supported": [
    "PS384",
    "ES384",
    "RS384",
    "HS256",
    "HS512",
    "ES256",
    "RS256",
    "HS384",
    "ES512",
    "PS256",
    "PS512",
    "RS512",
    "none"
  ],
  "request_object_signing_alg_values_supported": [
    "PS384",
    "ES384",
    "RS384",
    "HS256",
    "HS512",
    "ES256",
    "RS256",
    "HS384",
    "ES512",
    "PS256",
    "PS512",
    "RS512",
    "none"
  ],
  "request_object_encryption_alg_values_supported": ["RSA-OAEP", "RSA-OAEP-256", "RSA1_5"],
  "request_object_encryption_enc_values_supported": [
    "A256GCM",
    "A192GCM",
    "A128GCM",
    "A128CBC-HS256",
    "A192CBC-HS384",
    "A256CBC-HS512"
  ],
  "response_modes_supported": ["query", "fragment", "form_post", "query.jwt", "fragment.jwt", "form_post.jwt", "jwt"],
  "registration_endpoint": "https://example.com/clients-registrations/openid-connect",
  "token_endpoint_auth_methods_supported": [
    "private_key_jwt",
    "client_secret_basic",
    "client_secret_post",
    "tls_client_auth",
    "client_secret_jwt"
  ],
  "token_endpoint_auth_signing_alg_values_supported": [
    "PS384",
    "ES384",
    "RS384",
    "HS256",
    "HS512",
    "ES256",
    "RS256",
    "HS384",
    "ES512",
    "PS256",
    "PS512",
    "RS512"
  ],
  "introspection_endpoint_auth_methods_supported": [
    "private_key_jwt",
    "client_secret_basic",
    "client_secret_post",
    "tls_client_auth",
    "client_secret_jwt"
  ],
  "introspection_endpoint_auth_signing_alg_values_supported": [
    "PS384",
    "ES384",
    "RS384",
    "HS256",
    "HS512",
    "ES256",
    "RS256",
    "HS384",
    "ES512",
    "PS256",
    "PS512",
    "RS512"
  ],
  "authorization_signing_alg_values_supported": [
    "PS384",
    "ES384",
    "RS384",
    "HS256",
    "HS512",
    "ES256",
    "RS256",
    "HS384",
    "ES512",
    "PS256",
    "PS512",
    "RS512"
  ],
  "authorization_encryption_alg_values_supported": ["RSA-OAEP", "RSA-OAEP-256", "RSA1_5"],
  "authorization_encryption_enc_values_supported": [
    "A256GCM",
    "A192GCM",
    "A128GCM",
    "A128CBC-HS256",
    "A192CBC-HS384",
    "A256CBC-HS512"
  ],
  "claims_supported": [
    "aud",
    "sub",
    "iss",
    "auth_time",
    "name",
    "given_name",
    "family_name",
    "preferred_username",
    "email",
    "acr"
  ],
  "claim_types_supported": ["normal"],
  "claims_parameter_supported": true,
  "scopes_supported": [
    "openid",
    "email",
    "roles",
    "address",
    "microprofile-jwt",
    "phone",
    "web-origins",
    "offline_access",
    "profile"
  ],
  "request_parameter_supported": true,
  "request_uri_parameter_supported": true,
  "require_request_uri_registration": true,
  "code_challenge_methods_supported": ["plain", "S256"],
  "tls_client_certificate_bound_access_tokens": true,
  "revocation_endpoint": "https://example.com/protocol/openid-connect/revoke",
  "revocation_endpoint_auth_methods_supported": [
    "private_key_jwt",
    "client_secret_basic",
    "client_secret_post",
    "tls_client_auth",
    "client_secret_jwt"
  ],
  "revocation_endpoint_auth_signing_alg_values_supported": [
    "PS384",
    "ES384",
    "RS384",
    "HS256",
    "HS512",
    "ES256",
    "RS256",
    "HS384",
    "ES512",
    "PS256",
    "PS512",
    "RS512"
  ],
  "backchannel_logout_supported": true,
  "backchannel_logout_session_supported": true,
  "device_authorization_endpoint": "https://example.com/protocol/openid-connect/auth/device",
  "backchannel_token_delivery_modes_supported": ["poll", "ping"],
  "backchannel_authentication_endpoint": "https://example.com/protocol/openid-connect/ext/ciba/auth",
  "backchannel_authentication_request_signing_alg_values_supported": [
    "PS384",
    "ES384",
    "RS384",
    "ES256",
    "RS256",
    "ES512",
    "PS256",
    "PS512",
    "RS512"
  ],
  "require_pushed_authorization_requests": false,
  "pushed_authorization_request_endpoint": "https://example.com/protocol/openid-connect/ext/par/request",
  "mtls_endpoint_aliases": {
    "token_endpoint": "https://example.com/protocol/openid-connect/token",
    "revocation_endpoint": "https://example.com/protocol/openid-connect/revoke",
    "introspection_endpoint": "https://example.com/protocol/openid-connect/token/introspect",
    "device_authorization_endpoint": "https://example.com/protocol/openid-connect/auth/device",
    "registration_endpoint": "https://example.com/clients-registrations/openid-connect",
    "userinfo_endpoint": "https://example.com/protocol/openid-connect/userinfo",
    "pushed_authorization_request_endpoint": "https://example.com/protocol/openid-connect/ext/par/request",
    "backchannel_authentication_endpoint": "https://example.com/protocol/openid-connect/ext/ciba/auth"
  }
}
```

## OAuth vs OpenID vs OIDC

- OAuth
  - delegated authorization
- OpenID
  - protocol for delegated authentication
- OpenID Connect
  - abuses OAuth into an authentication protocol
- 参考
  - [OAUTH vs OpenID vs OIDC](https://security.stackexchange.com/questions/44611)
