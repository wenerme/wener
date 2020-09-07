---
id: louketo
title: Louketo Proxy
---

# Louketo Proxy

## Tips
* [louketo/louketo-proxy](https://github.com/louketo/louketo-proxy)
  * 原来的 keycloak gatekeeper
* [使用手册](https://github.com/louketo/louketo-proxy/blob/master/docs/user-guide.md)
* 两种工作模式
  * 反向代理 - 例如 Nginx
    * 请求上游携带授权信息
  * 前向代理 - HTTP_PROXY
    * 必须提供账号密码
    * 使用提供的账号密码进行 `client_credentials` 授权
    * 请求附加授权信息
    * 用于 __服务之间__ 使用 Token 鉴权
* 权限管理
  * 白名单
  * 路径 + HTTP 方法 + 角色
* 暴露端口
  * `/oauth/logout?redirect=url` 退出登陆
  * `/oauth/callback` OpenID 回调
  * `/oauth/authorize` 鉴权，生成 OpenID 重定向到 provider
  * `/oauth/expired` 判断 Token 是否过期 - 返回 200 或 401
  * `/oauth/health` 检查健康状态，可通过头 获取版本
  * `/oauth/login` 中继账号密码登陆，使用 `grant_type=password`，通过 POST username 和 password
  * `/oauth/token` 返回当前 AccessToken
  * `/oauth/metrics` Prometheus 指标
* 注意
  * 无法配合 Traefik 的 ForwardAuth - [#672](https://github.com/louketo/louketo-proxy/issues/672) Support for Forward Auth/ External Auth
  * 无法配合 Nginx auth_request 使用 [#537](https://github.com/louketo/louketo-proxy/issues/537)
    * 因为 oidc 流程相对复杂，直接的 auth_request 难以实现
    * 可以使用 /expired 


```bash
docker run -it --rm quay.io/louketo/louketo-proxy \
  --listen 127.0.0.1:8080 \
  --upstream-url http://127.0.0.1:80 \
  --discovery-url https://keycloak.example.com/auth/realms/<REALM_NAME> \
  --client-id <CLIENT_ID>
```

## FAQ

### oidc: JWT claims invalid: invalid claims, 'aud' claim and 'client_id' do not match, aud=account
* 依赖 OIDC 客户端问题 - 待升级
* 目前解决办法
  * 添加 mapper
  * mapper 类型 audience
  * 添加 客户端
* [#567](https://github.com/louketo/louketo-proxy/issues/567)


### no session found in request, redirecting for authorization
未获取到 token 信息

* 注意 `secure-cookie=false`
  * 如果没有设置，则默认是 true，导致 http 不会记录 cookie
* 通过排查前段是否有存储 cookie 来解决

## HELP

```
GLOBAL OPTIONS:
   --config value                            path the a configuration file [$PROXY_CONFIG_FILE]
   --listen value                            the interface the service should be listening on [$PROXY_LISTEN]
   --listen-http value                       interface we should be listening [$PROXY_LISTEN_HTTP]
   --discovery-url value                     discovery url to retrieve the openid configuration [$PROXY_DISCOVERY_URL]
   --client-id value                         client id used to authenticate to the oauth service [$PROXY_CLIENT_ID]
   --client-secret value                     client secret used to authenticate to the oauth service [$PROXY_CLIENT_SECRET]
   --redirection-url value                   redirection url for the oauth callback url, defaults to host header is absent [$PROXY_REDIRECTION_URL]
   --revocation-url value                    url for the revocation endpoint to revoke refresh token [$PROXY_REVOCATION_URL]
   --skip-openid-provider-tls-verify         skip the verification of any TLS communication with the openid provider (default: false)
   --openid-provider-proxy value             proxy for communication with the openid provider
   --openid-provider-timeout value           timeout for openid configuration on .well-known/openid-configuration (default: 30s)
   --base-uri value                          common prefix for all URIs [$PROXY_BASE_URI]
   --oauth-uri value                         the uri for proxy oauth endpoints (default: "/oauth") [$PROXY_OAUTH_URI]
   --scopes value                            list of scopes requested when authenticating the user
   --upstream-url value                      url for the upstream endpoint you wish to proxy [$PROXY_UPSTREAM_URL]
   --upstream-ca value                       the path to a file container a CA certificate to validate the upstream tls endpoint
   --resources value                         list of resources 'uri=/admin*|methods=GET,PUT|roles=role1,role2'
   --headers value                           custom headers to the upstream request, key=value
   --preserve-host                           preserve the host header of the proxied request in the upstream request (default: false)
   --request-id-header value                 the http header name for request id (default: "X-Request-ID") [$PROXY_REQUEST_ID_HEADER]
   --response-headers value                  custom headers to added to the http response key=value
   --enable-self-signed-tls                  create self signed certificates for the proxy (default: false) [$PROXY_ENABLE_SELF_SIGNED_TLS]
   --self-signed-tls-hostnames value         a list of hostnames to place on the self-signed certificate
   --self-signed-tls-expiration value        the expiration of the certificate before rotation (default: 3h0m0s)
   --enable-request-id                       indicates we should add a request id if none found (default: false) [$PROXY_ENABLE_REQUEST_ID]
   --enable-logout-redirect                  indicates we should redirect to the identity provider for logging out (default: false)
   --enable-default-deny                     enables a default denial on all requests, you have to explicitly say what is permitted (recommended) (default: true)
   --enable-encrypted-token                  enable encryption for the access tokens (default: false)
   --force-encrypted-cookie                  force encryption for the access tokens in cookies (default: false)
   --enable-logging                          enable http logging of the requests (default: false)
   --enable-json-logging                     switch on json logging rather than text (default: false)
   --enable-forwarding                       enables the forwarding proxy mode, signing outbound request (default: false)
   --enable-security-filter                  enables the security filter handler (default: false) [$PROXY_ENABLE_SECURITY_FILTER]
   --enable-refresh-tokens                   enables the handling of the refresh tokens (default: false) [$PROXY_ENABLE_REFRESH_TOKEN]
   --enable-session-cookies                  access and refresh tokens are session only i.e. removed browser close (default: true)
   --enable-login-handler                    enables the handling of the refresh tokens (default: false) [$PROXY_ENABLE_LOGIN_HANDLER]
   --enable-token-header                     enables the token authentication header X-Auth-Token to upstream (default: true)
   --enable-authorization-header             adds the authorization header to the proxy request (default: true) [$PROXY_ENABLE_AUTHORIZATION_HEADER]
   --enable-authorization-cookies            adds the authorization cookies to the uptream proxy request (default: true) [$PROXY_ENABLE_AUTHORIZATION_COOKIES]
   --enable-https-redirection                enable the http to https redirection on the http service (default: false)
   --enable-profiling                        switching on the golang profiling via pprof on /debug/pprof, /debug/pprof/heap etc (default: false)
   --enable-metrics                          enable the prometheus metrics collector on /oauth/metrics (default: false)
   --filter-browser-xss                      enable the adds the X-XSS-Protection header with mode=block (default: false)
   --filter-content-nosniff                  adds the X-Content-Type-Options header with the value nosniff (default: false)
   --filter-frame-deny                       enable to the frame deny header (default: false)
   --content-security-policy value           specify the content security policy
   --localhost-metrics                       enforces the metrics page can only been requested from 127.0.0.1 (default: false)
   --access-token-duration value             fallback cookie duration for the access token when using refresh tokens (default: 720h0m0s)
   --client-auth-method value                the auth method to use with oauth (secret-basic, secret-body) (default: "secret-basic") [$PROXY_CLIENT_AUTH_METHOD]
   --cookie-domain value                     domain the access cookie is available to, defaults host header
   --cookie-access-name value                name of the cookie use to hold the access token (default: "kc-access")
   --cookie-refresh-name value               name of the cookie used to hold the encrypted refresh token (default: "kc-state")
   --secure-cookie                           enforces the cookie to be secure (default: true)
   --http-only-cookie                        enforces the cookie is in http only mode (default: true)
   --same-site-cookie value                  enforces cookies to be send only to same site requests according to the policy (can be Strict|Lax|None) (default: "Lax")
   --match-claims value                      keypair values for matching access token claims e.g. aud=myapp, iss=http://example.*
   --add-claims value                        extra claims from the token and inject into headers, e.g given_name -> X-Auth-Given-Name
   --tls-cert value                          path to ths TLS certificate
   --tls-private-key value                   path to the private key for TLS
   --tls-ca-certificate value                path to the ca certificate used for signing requests
   --tls-ca-key value                        path the ca private key, used by the forward signing proxy
   --tls-client-certificate value            path to the client certificate for outbound connections in reverse and forwarding proxy modes
   --skip-upstream-tls-verify                skip the verification of any upstream TLS (default: true)
   --cors-origins value                      origins to add to the CORE origins control (Access-Control-Allow-Origin)
   --cors-methods value                      methods permitted in the access control (Access-Control-Allow-Methods)
   --cors-headers value                      set of headers to add to the CORS access control (Access-Control-Allow-Headers)
   --cors-exposed-headers value              expose cors headers access control (Access-Control-Expose-Headers)
   --cors-credentials                        credentials access control header (Access-Control-Allow-Credentials) (default: false)
   --cors-max-age value                      max age applied to cors headers (Access-Control-Max-Age) (default: 0s)
   --hostnames value                         list of hostnames the service will respond to
   --store-url value                         url for the storage subsystem, e.g redis://127.0.0.1:6379, file:///etc/tokens.file
   --encryption-key value                    encryption key used to encryption the session state [$PROXY_ENCRYPTION_KEY]
   --no-redirects                            do not have back redirects when no authentication is present, 401 them (default: false)
   --skip-token-verification                 TESTING ONLY; bypass token verification, only expiration and roles enforced (default: false)
   --upstream-keepalives                     enables or disables the keepalive connections for upstream endpoint (default: true)
   --upstream-timeout value                  maximum amount of time a dial will wait for a connect to complete (default: 10s)
   --upstream-keepalive-timeout value        specifies the keep-alive period for an active network connection (default: 10s)
   --upstream-tls-handshake-timeout value    the timeout placed on the tls handshake for upstream (default: 10s)
   --upstream-response-header-timeout value  the timeout placed on the response header for upstream (default: 10s)
   --upstream-expect-continue-timeout value  the timeout placed on the expect continue for upstream (default: 10s)
   --verbose                                 switch on debug / verbose logging (default: false)
   --enabled-proxy-protocol                  enable proxy protocol (default: false)
   --max-idle-connections value              max idle upstream / keycloak connections to keep alive, ready for reuse (default: 0)
   --max-idle-connections-per-host value     limits the number of idle connections maintained per host (default: 0)
   --server-read-timeout value               the server read timeout on the http server (default: 10s)
   --server-write-timeout value              the server write timeout on the http server (default: 10s)
   --server-idle-timeout value               the server idle timeout on the http server (default: 2m0s)
   --use-letsencrypt                         use letsencrypt for certificates (default: false)
   --letsencrypt-cache-dir value             path where cached letsencrypt certificates are stored (default: "./cache/")
   --sign-in-page value                      path to custom template displayed for signin
   --forbidden-page value                    path to custom template used for access forbidden
   --tags value                              keypairs passed to the templates at render,e.g title=Page
   --forwarding-username value               username to use when logging into the openid provider [$PROXY_FORWARDING_USERNAME]
   --forwarding-password value               password to use when logging into the openid provider [$PROXY_FORWARDING_PASSWORD]
   --forwarding-domains value                list of domains which should be signed; everything else is relayed unsigned
   --disable-all-logging                     disables all logging to stdout and stderr (default: false)
   --help, -h                                show help
   --version, -v                             print the version
```
