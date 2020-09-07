---
id: oauth2-proxy
title: oauth2-proxy
---

# oauth2-proxy
## Tips
* [oauth2-proxy/oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy)
* 环境变量 + `OAUTH2_PROXY_` 前缀
* [会话](https://oauth2-proxy.github.io/oauth2-proxy/configuration/sessions) - `--session-store-type`
  * cookie - 默认
    * 代理无状态
    * 使用 `cookie-secret` 加密 cookie
    * 并发操作可能会冲突导致需要从新认证
  * redis
    * Cookie 记录 ticket 
    * `{CookieName}-{ticketID}.{secret}`
      * CookieName 默认 _oauth2_proxy
      * ticketID - 128 bit, hex
      * secret - 128 bit, base64url, no padding
    * `--session-store-type=redis`
    * `--redis-connection-url=redis://host[:port][/db-number]`
* [Endpoints](https://oauth2-proxy.github.io/oauth2-proxy/endpoints)
  * /robots.txt
  * /ping - 健康检查
  * /oauth2/sign_in
  * /oauth2/sign_out
    * rd 参数重定向 或者 头 `X-Auth-Request-Redirect`
  * /oauth2/start - 开始 OAuth，rd 参数为重定向地址
  * /oauth2/callback - OAuth2 回调地址
  * /oauth2/userinfo - 返回用户信息
  * /oauth2/auth - 返回 202 Accepted 或 401 Unauthorized；用于 nginx auth_request
* 参考
  * ingress-nginx [oauth external auth](https://kubernetes.github.io/ingress-nginx/examples/auth/oauth-external-auth/)


```yaml
# Keycloak
- args:
  - --provider=keycloak
  - --email-domain=*
  - --upstream=file:///dev/null
  - --http-address=0.0.0.0:4180
  - --login-url=https://my.domain.com/auth/realms/authentication/protocol/openid-connect/auth
  - --redeem-url=https://my.domain.com/auth/realms/authentication/protocol/openid-connect/token
  - --validate-url=https://my.domain.com/auth/realms/authentication/protocol/openid-connect/userinfo
  - --whitelist-domain=.my.domain.com
  - --cookie-domain=.my.domain.com
  - --oidc-issuer-url=https://my.domain.com/auth/realms/authentication
  - --keycloak-group=/admin
  - --cookie-name=keycloak
  - --proxy-prefix=/second-oauth2
```

## 配置

```ini
## <addr>:<port> to listen on for HTTP/HTTPS clients
# http_address = "127.0.0.1:4180"
# https_address = ":443"

## Are we running behind a reverse proxy? Will not accept headers like X-Real-Ip unless this is set.
# reverse_proxy = true

## TLS Settings
# tls_cert_file = ""
# tls_key_file = ""

## the OAuth Redirect URL.
# defaults to the "https://" + requested host header + "/oauth2/callback"
# redirect_url = "https://internalapp.yourcompany.com/oauth2/callback"

## the http url(s) of the upstream endpoint. If multiple, routing is based on path
# upstreams = [
#     "http://127.0.0.1:8080/"
# ]

## Logging configuration
#logging_filename = ""
#logging_max_size = 100
#logging_max_age = 7
#logging_local_time = true
#logging_compress = false
#standard_logging = true
#standard_logging_format = "[{{.Timestamp}}] [{{.File}}] {{.Message}}"
#request_logging = true
#request_logging_format = "{{.Client}} - {{.Username}} [{{.Timestamp}}] {{.Host}} {{.RequestMethod}} {{.Upstream}} {{.RequestURI}} {{.Protocol}} {{.UserAgent}} {{.StatusCode}} {{.ResponseSize}} {{.RequestDuration}}"
#auth_logging = true
#auth_logging_format = "{{.Client}} - {{.Username}} [{{.Timestamp}}] [{{.Status}}] {{.Message}}"

## pass HTTP Basic Auth, X-Forwarded-User and X-Forwarded-Email information to upstream
# pass_basic_auth = true
# pass_user_headers = true
## pass the request Host Header to upstream
## when disabled the upstream Host is used as the Host Header
# pass_host_header = true

## Email Domains to allow authentication for (this authorizes any email on this domain)
## for more granular authorization use `authenticated_emails_file`
## To authorize any email addresses use "*"
# email_domains = [
#     "yourcompany.com"
# ]

## The OAuth Client ID, Secret
# client_id = "123456.apps.googleusercontent.com"
# client_secret = ""

## Pass OAuth Access token to upstream via "X-Forwarded-Access-Token"
# pass_access_token = false

## Authenticated Email Addresses File (one email per line)
# authenticated_emails_file = ""

## Htpasswd File (optional)
## Additionally authenticate against a htpasswd file. Entries must be created with "htpasswd -s" for SHA encryption
## enabling exposes a username/login signin form
# htpasswd_file = ""

## Templates
## optional directory with custom sign_in.html and error.html
# custom_templates_dir = ""

## skip SSL checking for HTTPS requests
# ssl_insecure_skip_verify = false


## Cookie Settings
## Name     - the cookie name
## Secret   - the seed string for secure cookies; should be 16, 24, or 32 bytes
##            for use with an AES cipher when cookie_refresh or pass_access_token
##            is set
## Domain   - (optional) cookie domain to force cookies to (ie: .yourcompany.com)
## Expire   - (duration) expire timeframe for cookie
## Refresh  - (duration) refresh the cookie when duration has elapsed after cookie was initially set.
##            Should be less than cookie_expire; set to 0 to disable.
##            On refresh, OAuth token is re-validated.
##            (ie: 1h means tokens are refreshed on request 1hr+ after it was set)
## Secure   - secure cookies are only sent by the browser of a HTTPS connection (recommended)
## HttpOnly - httponly cookies are not readable by javascript (recommended)
# cookie_name = "_oauth2_proxy"
# cookie_secret = ""
# cookie_domains = ""
# cookie_expire = "168h"
# cookie_refresh = ""
# cookie_secure = true
# cookie_httponly = true
```
