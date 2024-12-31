---
title: buf
---

# buf

- [bufbuild/buf](https://github.com/bufbuild/buf)
- BUF_CACHE_DIR

```bash
# macOS
# protoc-gen-buf-breaking, protoc-gen-buf-lint
brew install bufbuild/buf/buf
# golang
go install github.com/bufbuild/buf/cmd/buf@latest

buf mod init
buf mod update

buf build

buf build --exclude-source-info -o -#format=json | jq '.file[] | .package' | sort | uniq | head

buf ls-files
buf ls-files git://github.com/bufbuild/buf-tour.git#branch=main,subdir=start/petapis
buf ls-files buf.build/envoyproxy/protoc-gen-validate

buf lint

buf breaking --against ../../.git#branch=main,subdir=start/petapis
buf breaking --against "https://github.com/bufbuild/buf-tour/archive/main.zip#strip_components=1,subdir=start/petapis" --config buf.yaml
buf build -o - | buf breaking --against -

buf generate petapis

go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@latest
go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@latest
go install github.com/grpc-ecosystem/protoc-gen-grpc-gateway-ts@latest
go install github.com/envoyproxy/protoc-gen-validate@latest

export BUF_USER=wener
buf login
# ~/.netrc
# machine buf.build
#     login $BUF_USER
#     password $TOKEN
buf beta registry repository create buf.build/$BUF_USER/petapis --visibility public
# buf.yaml
# name: buf.build/$BUF_USER/petapis
buf push

docker run \
  --volume "$(pwd):/workspace" \
  --workdir /workspace \
  bufbuild/buf build

buf lint --error-format=config-ignore-yaml
```

```yaml
version: v1
lint:
  use:
    - DEFAULT
breaking:
  use:
    - FILE
```

```yaml
version: v1
directories:
  - proto
  - vendor/protoc-gen-validate
```

**go-grpc**

```yaml
version: v1
plugins:
  - name: go
    out: .
    opt: paths=source_relative
  - name: gotag
    out: .
    opt: paths=source_relative
  - name: go-grpc
    out: .
    opt: paths=source_relative,require_unimplemented_servers=true
  - name: grpc-gateway
    out: .
    opt:
      - paths=source_relative
      - generate_unbound_methods=true

- name: grpc-gateway-ts
    out: gen/web/api
    opt: paths=source_relative
  - name: validate
    out: .
    opt: lang=go,paths=source_relative

- name: openapiv2
    out: openapiv2
  - name: doc
    out: gen/doc
    strategy: all
    opt: markdown,proto.md
```

```yaml title="buf.gen.yaml"
version: v1
managed:
  enabled: true
  cc_enable_arenas: false
  java_multiple_files: true
plugins:
  - name: cpp
    out: gen/proto/cpp
  - name: java
    out: gen/proto/java
```

```yaml
version: v1
managed:
  enabled: true
  # FileOptions
  # https://github.com/protocolbuffers/protobuf/blob/51405b6b92c2070c8edea1b44c6770e00f7027be/src/google/protobuf/descriptor.proto#L342
  cc_enable_arenas: false
  java_multiple_files: false
  java_package_prefix: com
  java_string_check_utf8: false
  optimize_for: CODE_SIZE
  go_package_prefix:
    default: github.com/acme/weather/private/gen/proto/go
    # 排除模块
    except:
      - buf.build/googleapis/googleapis
    override:
      buf.build/acme/weather: github.com/acme/weather/gen/proto/go
  override:
    JAVA_PACKAGE_PREFIX:
      acme/weather/v1/weather.proto: 'org'
plugins:
  - name: go
    out: gen/proto/go
    opt: paths=source_relative
```

## Node

- 关于兼容 ts-proto https://github.com/connectrpc/connect-es/issues/1030
- 注意 @bufbuild/protobuf @bufbuild/protoc-gen-es 需要配合 @connectrpc/connect 的版本
- 注意⚠️
  - int64,uint64,fixed64,sfixed64,sint64 为 BigInt
- `int64 field = 1 [jstype = JS_STRING]; // 生成 string 类型`
  - 可以强制得到 string
- `google.protobuf.Struct`
- `map<string, string>` -> `Record<string, string>`
  - 没有使用 Map 因为很多 库不支持
- oneof -> `{ case:"X", value:"" }`
- 主要操作
  - create
  - fromBinary/toBinary
  - fromjson/toJson
  - isMessage
  - isFieldSet
- 目前无法生成 index
  - Provide support for top-level exports [bufbuild/protobuf-es#455](https://github.com/bufbuild/protobuf-es/issues/455)

```bash
# @bufbuild/buf

# v1
pnpm add -D @bufbuild/buf @bufbuild/protoc-gen-es@^1 @connectrpc/protoc-gen-connect-es
pnpm add @connectrpc/connect @bufbuild/protobuf@^1

# v2
# 不再需要 @connectrpc/protoc-gen-connect-es
pnpm add -D @bufbuild/protoc-gen-es
pnpm add @connectrpc/connect@rc @bufbuild/protobuf @connectrpc/connect-node
```
