---
tags:
- Golang
---

# Protobuf Go

- 2020-03-02 [A new Go API for Protocol Buffers](https://go.dev/blog/protobuf-apiv2)
  - APIv1 github.com/golang/protobuf
    - github.com/golang/protobuf@v1.4.0 使用 APIv2 实现
  - APIv2 google.golang.org/protobuf
    - google.golang.org/protobuf@v1.20.0 依赖 github.com/golang/protobuf@v1.4.0
    - 动态 pb

## APIv2

- v2 protoreflect.ProtoMessage
- v1 protoiface.MessageV1

```go title="protoreflect"
// 基于反射的主要接口
type ProtoMessage interface{ ProtoReflect() Message }

// v2
// 反射信息
type Message interface {
	Descriptor() MessageDescriptor
	Type() MessageType

	New() Message
	Interface() ProtoMessage
	Range(f func(FieldDescriptor, Value) bool)
	Has(FieldDescriptor) bool
	Clear(FieldDescriptor)
	Get(FieldDescriptor) Value
	Set(FieldDescriptor, Value)
	Mutable(FieldDescriptor) Value
	NewField(FieldDescriptor) Value
	WhichOneof(OneofDescriptor) FieldDescriptor
	GetUnknown() RawFields
	SetUnknown(RawFields)

	IsValid() bool
	ProtoMethods() *methods
}

// v1
type MessageV1 interface {
	Reset()
	String() string
	ProtoMessage()
}
```


## proto

- golang proto v2 基于反射
- github.com/golang/protobuf/proto
- 反射
  - 全局注册 - google.golang.org/protobuf/reflect/protoregistry
    - GlobalFiles
    - GlobalTypes

