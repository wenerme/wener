---
title: buf
---

# buf

- [bufbuild/buf](https://github.com/bufbuild/buf)

```bash
brew tap bufbuild/buf
brew install buf

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
  - name: validate
    out: .
    opt: lang=go,paths=source_relative
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
