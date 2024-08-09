---
title: tus
---

# tus

- tus
  - https://tus.io/implementations.html
    - SDK for JS, Java, iOS, Python, NodeJS, .NET
  - tus v1 [协议](https://tus.io/protocols/resumable-upload.html)
  - tus v2 被 httpwg 采用
    - https://github.com/httpwg/http-extensions/blob/main/draft-ietf-httpbis-resumable-upload.md
- [tus/tusd](https://github.com/tus/tusd)
  - MIT, Golang
  - 支持暂停恢复
  - 使用 hook 机制来实现业务逻辑
    - shell, http, gRPC, golang plugin
- [tus/tus-node-server](https://github.com/tus/tus-node-server)
  - NodeJS server
  - @tus/server, @tus/file-store, @tus/s3-store
  - 使用 EVENTS 来实现自定义逻辑
- 参考
  - uppy
  - [tus/tus-js-client](https://github.com/tus/tus-js-client)

## Protocol

- 头
  - Upload-Offset
    - 当前
  - Upload-Length
    - 整体大小
  - Tus-Version
    - 1.0.0
  - Tus-Resumable
    - OPTIONS 需要包含
    - 值为版本号
    - 如果版本不支持返回 412 Precondition Failed
  - Tus-Extension
    - 服务端返回，逗号分隔
  - Tus-Max-Size
    - 服务端返回
    - 最大文件大小
  - X-HTTP-Method-Override
  - Upload-Defer-Length
  - Upload-Metadata
  - Tus-Checksum-Algorithm
  - Upload-Checksum
- 方法
  - HEAD
  - PATCH
  - OPTIONS
  - 创建上传资源
    - -> `POST /files`
      - Upload-Length
      - Upload-Metadata
      - Tus-Resumable
    - <- 201 Created
      - Location
      - Tus-Resumable

```http
OPTIONS /files HTTP/1.1
Host: tus.example.org

HTTP/1.1 204 No Content
Tus-Resumable: 1.0.0
Tus-Version: 1.0.0
Tus-Extension: checksum
Tus-Checksum-Algorithm: md5,sha1,crc32
```

# tusd

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

# tus-node-server

- 事件
  - POST_CREATE - 创建了 upload 但还没写入到 store
  - ~~POST_RECEIVE~~
  - POST_RECEIVE_V2 - 每隔 postReceiveInterval 会调用一次，能够获取到进度
  - POST_FINISH - 上传完成，完成响应给客户端
  - POST_TERMINATE - 上传被终止，完成响应给客户端

```bash
npm add @tus/server @tus/file-store @tus/s3-store
```

```ts
type TUpload = {
    id: string;
    size?: number;
    offset: number;
    // uppy type, relativePath, name
    // tusd filetype, filename
    metadata?: Record<string, string | null>;
    storage?: {
        type: string;
        path: string;
        bucket?: string;
    };
    creation_date?: string;
};
```

## extensions

- creation
- creation-with-upload
- creation-defer-length
- termination
- expiration
