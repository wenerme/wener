---
title: protoc
---

# protoc

| flag                             | for                                           |
| -------------------------------- | --------------------------------------------- |
| -I,--proto_path `<PATH>`         | 默认当前目录, --descriptor_set_in             |
| --encode `<MESSAGE_TYPE>`        | text -> proto                                 |
| --deterministic_output           | 当 `--encode` 确保 map 顺序固定               |
| --decode `<MESSAGE_TYPE>`        | proto -> text                                 |
| --decode_raw                     | proto -> tag,value - 不需要 proto             |
| --descriptor_set_in `<FILES>`    | FileDescriptorSet 列表 descriptor.proto       |
| -o,--descriptor_set_out `<FILE>` | FileDescriptorSet                             |
| --include_imports                | 当 `--descriptor_set_out` 包含依赖            |
| --include_source_info            | 当 `--descriptor_set_out` 保留 SourceCodeInfo |
| --dependency_out=FILE            | 输出 make 依赖                                |
| --error_format=FORMAT            | gcc, msvs                                     |
| --fatal_warnings                 | warnings -> fatal                             |
| --print_free_field_numbers       |
| --plugin=EXECUTABLE              | 默认 PATH, 可以是 `NAME=PATH`                 |
| `@<filename>`                    | 从文件读取配置                                |

- 插件
  - `<plugin>_out` - 输出目录 - 例如 `.:.`, `.:./gen/out`
  - `<plugin>_opt` - 参数
- plugin
  - cpp
  - csharp
  - java
  - js
  - kotlin
  - objc
  - php https://protobuf.dev/reference/php/php-generated/
    - php_namespace
    - php_metadata_namespace
    - php_class_prefix
  - python
  - ruby
- descriptor_set
  - 预生成 descriptor，之后则不需要 proto 源文件


## Plugins

- `protoc-gen-<plugin>`
- [protoc-gen-validate](./protoc-gen-validate.md) 校验 message
  - go,java,cc
- [protoc-gen-c](https://github.com/protobuf-c/protobuf-c)
- Golang
  - [protoc-gen-go](https://github.com/protocolbuffers/protobuf-go)
  - [protoc-gen-go-json](https://github.com/mitchellh/protoc-gen-go-json) Go JSON Marshal/Unmarshal
  - protoc-gen-go-vtproto
  - protoc-gen-gotag
  - [gogo/protobuf](https://github.com/gogo/protobuf)
    - APIv2 发布后不再维护
    - protoc-gen-{gofast,combo,gogo,gogofast,gogofaster,gogoslic,gogotypes,gostring}
- Document
  - protoc-gen-slate
  - protoc-gen-swagger
  - [protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc)
- Schema
  - [protoc-gen-jsonschema](https://github.com/chrusty/protoc-gen-jsonschema)
  - [protoc-gen-bq-schema](https://github.com/GoogleCloudPlatform/protoc-gen-bq-schema)
    - pb to BigQuery schema

## Descriptor

- proto 解析过后的结构
- DescriptorProto - Message
  - field FieldDescriptorProto
  - extension
  - nested_type - DescriptorProto
  - enum_type - EnumDescriptorProto
  - oneof - OneofDescriptorProto
  - options - MessageOptions


## Write Plugins

- 插件协议 https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/compiler/plugin.proto
  - 通过 stdio 交互
- [lyft/protoc-gen-star](https://github.com/lyft/protoc-gen-star)
  - 辅助实现插件
  - [protoc-gen-debug](https://github.com/lyft/protoc-gen-star/tree/master/protoc-gen-debug)
    - 生成 bin，用于测试插件
- [danielgtaylor/python-betterproto](https://github.com/danielgtaylor/python-betterproto)
  - Python 3.6+ code generator & library for Protobuf 3 and async gRPC
- [json-to-proto](https://json-to-proto.github.io/)
