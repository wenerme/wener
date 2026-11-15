---
tags:
  - HTTP
  - Authentication
---

# HTTP Authorization

## HTTP 状态码和挑战

未认证或凭据无效时，服务端通常返回 `401 Unauthorized`，并通过 `WWW-Authenticate` 告诉客户端支持的认证 scheme：

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api"
```

已经认证，但没有足够权限时通常返回 `403 Forbidden`。客户端不应把 401 和 403 混为一谈：前者需要重新认证或补充凭据，后者通常需要调整权限。

## 常见认证方式

| Scheme           | Header                                             | Note                                                      |
| ---------------- | -------------------------------------------------- | --------------------------------------------------------- |
| `Basic`          | `Authorization: Basic <base64(username:password)>` | 简单，必须配合 HTTPS；Base64 不是加密                     |
| `Bearer`         | `Authorization: Bearer <token>`                    | OAuth 2.0 access token、JWT、opaque token 常用格式        |
| `Digest`         | `Authorization: Digest username=..., response=...` | Challenge-response，遗留系统较多，新系统通常不优先选择    |
| `Negotiate`      | `Authorization: Negotiate <base64(GSSAPI token)>`  | SPNEGO 协商 Kerberos，必要时可回退 NTLM                   |
| `NTLM`           | `Authorization: NTLM <base64(message)>`            | Windows challenge-response，遗留系统常见                  |
| API Key          | `X-API-Key: <key>` / `Authorization: ApiKey <key>` | 没有统一标准，具体 Header 和轮换方式由 API 定义           |
| HMAC             | `Authorization: HMAC ...`                          | 对请求内容签名，防篡改，格式通常是厂商自定义              |
| AWS SigV4        | `Authorization: AWS4-HMAC-SHA256 ...`              | AWS 及部分兼容服务的请求签名                              |
| Tencent TC3      | `Authorization: TC3-HMAC-SHA256 ...`               | 腾讯云 API 的请求签名                                     |
| mTLS             | TLS Client Certificate                             | 在 TLS 层证明客户端身份，不使用 HTTP Authorization Header |
| Cookie / Session | `Cookie: session=...`                              | 浏览器常用，服务端维护 session 或使用加密/签名 cookie     |

## Known Provider Auth

| Platform                               | Method                                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 飞书 / Lark Open Platform              | `Authorization: Bearer <tenant_access_token>`、`Bearer <user_access_token>`、`Bearer <app_access_token>` |
| 飞书自定义机器人 Webhook               | `timestamp` + `sign`，基于 HMAC-SHA256；也可只使用 webhook URL token                                     |
| 阿里云 OpenAPI                         | `ACS3-HMAC-SHA256`（当前推荐）、旧版 RPC/ROA HMAC 签名、RAM STS 临时凭据                                 |
| 阿里云 OSS                             | V4 签名、STS、预签名 URL；兼容部分 S3 客户端能力                                                         |
| Google Cloud APIs                      | `Authorization: Bearer <OAuth 2 access token>`、API Key、Service Account JWT / Workload Identity         |
| Google Cloud Storage XML API           | OAuth 2 Bearer、HMAC key、Signed URL                                                                     |
| Azure Resource Manager                 | `Authorization: Bearer <Microsoft Entra ID access token>`                                                |
| Azure Storage                          | Entra OAuth Bearer、Shared Key HMAC、SAS token                                                           |
| Azure Cognitive Services / AI Services | `Ocp-Apim-Subscription-Key` 或 Entra OAuth Bearer                                                        |

这些平台通常同时提供 SDK、CLI 和 HTTP API。SDK/CLI 负责 token 获取、临时凭据刷新和请求签名；直接发 HTTP 请求时，需要明确选择对应 API 的认证协议，不能只根据平台名称推断。

## Basic

客户端把用户名和密码拼接后进行 Base64 编码：

```http
Authorization: Basic dXNlcjpwYXNz
```

解码后只是：

```text
user:pass
```

Basic 本身不提供保密性和防重放能力，必须使用 HTTPS，并应配合短期凭据、密码轮换、限流和审计。

```bash
curl --user 'user:password' https://api.example.com/me
```

### `.netrc`

`.netrc` 是命令行客户端常用的凭据文件格式。它不定义新的 HTTP 认证协议；客户端从文件读取用户名和密码后，仍然通过 Basic Auth 发送：

```text
machine api.example.com
  login user
  password password-value
```

默认路径是：

```text
~/.netrc
```

可以为多个主机配置凭据，也可以使用 `default`：

```text
machine api.example.com
  login api-user
  password api-password

machine git.example.com
  login wener
  password token-value

default
  login anonymous
  password anonymous
```

使用 curl：

```bash
chmod 600 ~/.netrc
curl --netrc https://api.example.com/me
```

或者显式指定文件：

```bash
curl --netrc-file ~/.config/api/netrc https://api.example.com/me
```

如果文件中包含 `machine api.example.com`，curl 会按请求的 hostname 选择对应条目。使用 `--netrc-optional` 时，文件不存在或没有匹配条目不会使 curl 直接失败；需要明确要求凭据时使用 `--netrc`。

`.netrc` 中的 `password` 是明文存储，文件权限应限制为当前用户：

```bash
install -m 600 /dev/null ~/.netrc
chmod 600 ~/.netrc
```

它适合本地 CLI、开发工具和自动化脚本的简单凭据发现，不适合当作安全存储。不要把 `.netrc` 提交 Git，也不要在容器镜像、共享 home 目录或调试日志中暴露它。更高安全要求的环境应使用系统钥匙串、短期 token、mTLS 或专用 secret 管理工具。

`.netrc` 只解决“客户端从哪里读取用户名和密码”，不会增加 Basic Auth 的安全性。实际请求仍然是：

```http
Authorization: Basic <base64(username:password)>
```

因此仍然必须使用 HTTPS。

## Bearer

Bearer 的含义是“持有 token 即可使用”，服务端通常不会在每个请求中再次验证用户名和密码：

```http
Authorization: Bearer eyJ...
```

Token 可以是：

- JWT：内容自包含，服务端验证签名和 `exp`、`aud`、`iss` 等 claim。
- Opaque token：随机字符串，服务端通过数据库或 introspection 查询状态。
- OAuth 2.0 access token：OAuth 2.0 定义授权流程，Bearer 只是常见的 token 使用方式。

Bearer token 需要防止日志、URL、浏览器历史和 Referer 泄漏。通常放在 Header，不要放在 query string。

Kerberos / SPNEGO / NTLM 的 HTTP 认证细节见 [Kerberos HTTP](kerberos/kerberos-http.md) 和 [NTLM](kerberos/ntlm.md)。

## Digest

Digest 先由服务端返回 challenge：

```http
WWW-Authenticate: Digest realm="api", nonce="...", algorithm=SHA-256, qop="auth"
```

客户端使用用户名、密码、nonce、HTTP method 和 URI 计算 response，再发回：

```http
Authorization: Digest username="user", realm="api", nonce="...", uri="/me", response="..."
```

它避免直接传输密码，但实现复杂，兼容性和部署体验一般。对于新 API，通常优先选择 HTTPS 加 Bearer、mTLS 或请求签名。

## API Key

API Key 不是一个严格统一的 HTTP 标准，常见形式包括：

```http
X-API-Key: key-value
```

或者：

```http
Authorization: ApiKey key-value
```

API Key 通常只标识一个应用或账号，不一定区分最终用户，也不天然提供请求防篡改和防重放。应定义：

- Header 名称和格式。
- 权限范围。
- 过期、轮换、吊销方式。
- 是否绑定来源、IP 或客户端。
- 泄漏后的审计和应急处理。

## HMAC 请求签名

HMAC 认证使用共享 secret 对请求的规范化内容签名。一个常见的自定义格式如下：

```http
X-Key-Id: client-1
X-Timestamp: 1710000000
X-Nonce: 9c...
X-Content-SHA256: ...
Authorization: HMAC-SHA256 keyId="client-1", signature="..."
```

签名内容通常包含：

```text
HTTP method
path
canonical query
selected headers
body hash
timestamp / nonce
```

服务端必须对参与签名的字段进行明确的 canonicalization，否则不同语言的 URL 编码、Header 大小写、空格处理会导致签名不一致。timestamp、nonce 和服务端缓存通常用于防止重放。

## AWS Signature Version 4

AWS SigV4 的 Authorization 头类似：

```http
Authorization: AWS4-HMAC-SHA256 Credential=AKIA.../20260301/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-date, Signature=...
X-Amz-Date: 20260301T120000Z
```

关键参数包括：

- access key ID：标识调用者。
- secret access key：共享签名密钥。
- session token：使用 STS 临时凭据时需要。
- region：签名区域。
- service：服务名，例如 S3 使用 `s3`。
- signed headers：实际参与签名的 Header 列表。
- payload hash：请求 body 的 SHA-256 hash。

核心流程是：

```text
canonical request
  -> SHA-256
string to sign
  -> date key
  -> region key
  -> service key
  -> signing key
  -> HMAC signature
```

AWS SigV4 覆盖 AWS S3。MinIO、Garage 等 S3-compatible 服务是否可用，取决于其对 AWS SigV4、region、endpoint 和 addressing style 的兼容程度。

## Tencent Cloud TC3-HMAC-SHA256

腾讯云 API 使用另一套签名协议，不能把它当成 AWS SigV4：

```http
Authorization: TC3-HMAC-SHA256 Credential=<SecretId>/<Timestamp>/<Service>/tc3_request, SignedHeaders=content-type;host, Signature=<hex>
X-TC-Action: DescribeLogsets
X-TC-Timestamp: 1710000000
X-TC-Version: 2021-08-20
X-TC-Region: ap-guangzhou
```

腾讯云 CLS 的请求通常还会使用：

```http
Content-Type: application/json
Host: cls.tencentcloudapi.com
```

TC3 的签名过程同样先构造 canonical request，再对 string to sign 进行多级 HMAC，但它的 Header、credential scope、service 名称和 canonicalization 规则都与 AWS SigV4 不同。因此：

- `Authorization: AWS4-HMAC-SHA256` 不能调用腾讯 CLS。
- `Authorization: TC3-HMAC-SHA256` 不能使用 AWS SigV4 verifier。
- 需要使用腾讯云 SDK、TC3 signer 或实现了 TC3 的 HTTP client。

## 飞书 / Lark

飞书开放平台 API 通常先通过 App ID 和 App Secret 获取访问 token，再把 token 放入 Bearer Header：

```http
Authorization: Bearer ttnxxxxxxxx
Content-Type: application/json; charset=utf-8
```

常见 token 类型：

- `tenant_access_token`：应用以租户身份访问，通常用于企业内部应用 API。
- `user_access_token`：代表用户授权访问，需要 OAuth 授权流程。
- `app_access_token`：应用级 token，部分开放平台接口使用。

Token 获取接口通常使用 App ID / App Secret 换取 token；不要把 App Secret 直接放入业务 API 请求中。token 有过期时间，客户端应根据返回的 `expire` 或 `expires_in` 刷新，而不是每次请求都重新申请。

飞书自定义机器人 Webhook 是另一套认证方式。开启安全设置中的签名后，消息请求会带 timestamp 和 sign，签名通常使用机器人 Secret 通过 HMAC-SHA256 计算。它与 Open Platform 的 Bearer token 不是同一种协议：

```text
stringToSign = timestamp + "\n" + secret
sign = Base64(HMAC-SHA256(stringToSign))
```

飞书事件回调还涉及 Verification Token、Encrypt Key 和事件解密；它们分别用于回调校验和消息加密，不要和 API access token 混用。

## Alibaba Cloud

阿里云 OpenAPI 当前推荐使用 V3 签名：

```http
Authorization: ACS3-HMAC-SHA256 Credential=<AccessKeyId>/<Date>/<Region>/<Service>/acs3_request, SignedHeaders=host;x-acs-action;x-acs-content-sha256, Signature=<hex>
X-Acs-Action: DescribeInstances
X-Acs-Version: 2014-05-26
X-Acs-Date: 20260301T120000Z
X-Acs-Content-Sha256: <sha256>
```

签名过程包括 canonical request、string to sign 和多级 HMAC。不同阿里云产品的 endpoint、Service、Action、Version 和请求风格可能不同，应以该产品的 OpenAPI 文档或 SDK 为准。

阿里云还存在旧版 RPC / ROA 签名格式，常见参数包括 `AccessKeyId`、`SignatureMethod`、`SignatureNonce`、`SignatureVersion`、`Timestamp` 和 `Signature`。旧签名与 `ACS3-HMAC-SHA256` 不应混合拼接。

使用 RAM STS 临时凭据时，除了 AccessKey ID 和 AccessKey Secret，还必须携带 Security Token：

```http
x-acs-security-token: <SecurityToken>
```

OSS 使用自己的请求签名和预签名 URL 规则。部分 S3-compatible 客户端可以连接 OSS，但 region、endpoint、addressing style 和签名版本必须按 OSS 要求配置。

## Google Cloud

Google Cloud 的管理 API 和大多数服务 API 使用 OAuth 2.0 access token：

```http
Authorization: Bearer ya29.xxxxx
```

token 可以来自：

- gcloud 登录用户凭据。
- Service Account 通过 JWT assertion 换取的 OAuth access token。
- Workload Identity / Workload Identity Federation。
- GCE、GKE 等运行环境的 metadata server。

部分 Google API 也支持 API Key：

```text
https://maps.googleapis.com/maps/api/geocode/json?key=<API_KEY>
```

API Key 主要用于识别项目和计费，通常不能代替需要 IAM 权限的 OAuth token。

Google Cloud Storage 还支持：

- OAuth Bearer token。
- HMAC access key，用于 XML API 的签名请求。
- Signed URL，调用方无需持有长期凭据。
- V4 signed URL，使用 canonical request 和 HMAC 签名。

Google 的 Service Account JWT、OAuth access token、Cloud Storage signed URL 和 AWS SigV4 是不同格式，不能互换。

## Microsoft Azure

Azure Resource Manager 和大量 Azure 服务使用 Microsoft Entra ID OAuth 2.0：

```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJS...
```

常见 token 获取主体包括用户、Service Principal、Managed Identity 和 Workload Identity。不同资源 API 使用的 OAuth scope / audience 不同，token 的 `aud` 不匹配时，即使 token 没过期也会返回 401。

Azure Storage 支持多种方式：

```http
Authorization: Bearer <Entra access token>
```

```text
https://account.blob.core.windows.net/container/blob?<SAS parameters>
```

还可以使用 Storage Account Shared Key。Shared Key 是基于请求规范化字符串的 HMAC 签名，SAS 则把权限、资源、有效期和签名编码到 URL 参数中。SAS 应设置尽可能短的有效期和最小权限，并避免进入日志和 Referer。

Azure Cognitive Services 和部分 Azure AI Services 常见的专用 Header 是：

```http
Ocp-Apim-Subscription-Key: <subscription-key>
```

新服务也可能支持 Entra Bearer token。具体采用哪种方式要以目标服务 API 文档为准。

## HTTP Message Signatures

RFC 9421 定义了通用 HTTP Message Signatures。它与 AWS SigV4、Tencent TC3 一样都属于请求签名，但格式不同：

```http
Signature-Input: sig1=("@method" "@target-uri" "content-digest");created=...
Signature: sig1=:base64-signature:
```

使用时必须同时约定 key discovery、签名算法、覆盖字段、时间窗口和重放保护。RFC 9421 不会自动让一个 AWS 或腾讯云客户端兼容另一个协议。

## 认证信息的选择

| 场景             | 通常选择                              |
| ---------------- | ------------------------------------- |
| 浏览器登录       | Cookie + Secure / HttpOnly / SameSite |
| 普通内部 API     | Bearer token 或 mTLS                  |
| 第三方 API       | API Key、Bearer 或厂商请求签名        |
| AWS API          | AWS SigV4 或 SDK                      |
| 腾讯云 API / CLS | TC3-HMAC-SHA256 或腾讯云 SDK          |
| 服务间高安全调用 | mTLS、短期 token 或 HMAC 请求签名     |
| 需要用户授权委托 | OAuth 2.0 / OpenID Connect            |

## 排查清单

遇到 401 或签名错误时，按下面顺序检查：

1. 请求是否实际使用 HTTPS，时间是否准确。
2. `Authorization` scheme 是否正确，例如 `Bearer`、`AWS4-HMAC-SHA256` 和 `TC3-HMAC-SHA256` 不能混用。
3. Host、path、query、method 和 body 是否与参与签名的内容完全一致。
4. 是否有反向代理修改了 Host、path、query、Content-Type 或 body。
5. AWS 请求的 region、service 是否正确；S3 通常是 `s3`。
6. 腾讯云请求的 Action、Version、Region、Host 和 Service 是否正确。
7. 临时凭据是否同时发送了 session token；AWS 通常是 `X-Amz-Security-Token`。
8. 服务端和客户端是否使用同一套 URL 编码、Header 规范化和 body hash 规则。
9. 只在受控调试环境记录 canonical request 和字段名，禁止记录完整 secret、password、token 或 Authorization 值。

## 参考

- [HTTP Authentication - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication)
- [RFC 9110 - HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [RFC 7617 - Basic Authentication](https://www.rfc-editor.org/rfc/rfc7617)
- [RFC 7616 - Digest Access Authentication](https://www.rfc-editor.org/rfc/rfc7616)
- [RFC 6750 - OAuth 2.0 Bearer Token Usage](https://www.rfc-editor.org/rfc/rfc6750)
- [RFC 9421 - HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421)
- [AWS Signature Version 4](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv.html)
- [Tencent Cloud API 3.0 Signature](https://www.tencentcloud.com/document/product/1278/85305)
