---
title: tus
---

# tus

- [tus/tusd](https://github.com/tus/tusd)
  - MIT, Golang
  - 支持暂停恢复
  - SDK for JS, Java, iOS, Python, NodeJS, .NET
    - https://tus.io/implementations.html
  - tus v1 [协议](https://tus.io/protocols/resumable-upload.html)
  - tus v2 被 httpwg 采用
    - https://github.com/httpwg/http-extensions/blob/main/draft-ietf-httpbis-resumable-upload.md
- 参考
  - [tus/tus-node-server](https://github.com/tus/tus-node-server)
    - NodeJS server
  - [tus/tus-js-client](https://github.com/tus/tus-js-client)

```bash
tusd -upload-dir=./data

export AWS_ACCESS_KEY_ID=xxxxx
export AWS_SECRET_ACCESS_KEY=xxxxx
export AWS_REGION=eu-west-1
tusd -s3-bucket=my-test-bucket.com -s3-endpoint=minio -s3-object-prefix=upload -show-greeting=false
```

## hooks

- Type
  - script
  - http
  - gRPC
  - golang plugin
- Hook
  - pre-create
  - post-create
  - post-receive
    - 默认未开启
  - pre-finish
  - post-finish
  - post-terminate
- Model
  - https://github.com/tus/tusd/blob/main/docs/hooks.md
  - https://pkg.go.dev/github.com/tus/tusd/v2/pkg/hooks#HookRequest
  - https://pkg.go.dev/github.com/tus/tusd/v2/pkg/hooks#HookResponse

```bash
tusd --hooks-http http://localhost:8081/write --hooks-http-retry 5 --hooks-http-backoff 2
```
