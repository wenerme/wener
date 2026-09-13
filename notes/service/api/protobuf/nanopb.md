---
title: NanoPB
tags:
  - IoT
  - Protobuf
---

# NanoPB

- [nanopb/nanopb](https://github.com/nanopb/nanopb)
  - Zlib, C, Python, Protobuf
  - 面向嵌入式系统和受限内存设备的 Protocol Buffers ANSI C 实现。
  - 通过代码生成将 `.proto` 转为 `.pb.c` 和 `.pb.h`，运行时不要求使用动态内存即可处理常见的固定大小消息。

## 组成

- Generator
  - `nanopb_generator.py` 调用 `protoc` 解析 `.proto`，生成消息描述、C 结构体和编码/解码字段表。
- Generated files
  - `message.pb.h`：消息结构体、字段描述和初始化宏。
  - `message.pb.c`：生成的字段描述和消息元数据。
- Runtime
  - `pb_encode.c`：编码。
  - `pb_decode.c`：解码。
  - `pb_common.c`：公共类型和辅助逻辑。
- Stream
  - `pb_ostream_t` / `pb_istream_t` 抽象输出和输入。
  - 内存 buffer 可以直接使用，也可以通过 callback 接入文件、串口、网络或其他设备接口。

## 安装

源码 checkout 需要 Python、`protoc` 和 Python protobuf 依赖：

```bash
python -m pip install --upgrade protobuf grpcio-tools
```

也可以使用 nanopb 的 binary package；其中通常已经包含 generator 及所需依赖。嵌入式项目最终需要把 nanopb runtime 源文件纳入自己的构建系统。

## 生成代码

`sensor.proto`：

```proto
syntax = "proto3";

message Sensor {
  uint32 id = 1;
  string name = 2;
  repeated int32 values = 3;
}
```

直接使用 generator：

```bash
python nanopb/generator/nanopb_generator.py -D gen sensor.proto
```

生成：

```text
gen/sensor.pb.c
gen/sensor.pb.h
```

如果使用 `nanopb.proto` 中的扩展选项，直接调用 generator 时也需要把 nanopb 的 proto 目录加入搜索路径：

```bash
python nanopb/generator/nanopb_generator.py \
  -I nanopb/generator/proto \
  -D gen \
  sensor.proto
```

也可以将 nanopb generator 作为 `protoc` plugin 使用；此时 `protoc` 必须能从 `PATH` 找到 `protoc-gen-nanopb`：

```bash
protoc \
  -I . \
  -I nanopb/generator/proto \
  --nanopb_out=gen \
  sensor.proto
```

## 字段布局

nanopb 会根据字段是否有可确定的最大长度或数量选择生成的 C 表示：

- 标量字段通常直接映射到对应的 C 类型，例如 `uint32` 映射为 `uint32_t`。
- 没有上限的 `string`、`bytes` 和 `repeated` 字段通常生成 `pb_callback_t`。
- `max_length` 指定字符串内容的最大长度；生成的字符数组会额外保留结尾的 `\0`。
- `max_size` 为 `bytes` 分配固定上限。
- `max_count` 为 `repeated` 分配固定数量的数组元素，并生成数量字段。
- `fixed_length` / `fixed_count` 可以省略对应的实际长度或数量字段，但调用方必须始终提供固定大小的数据。

推荐将内存约束写入单独的 `sensor.options`：

```text
Sensor.name max_length:32
Sensor.values max_count:8
```

修改 `.options` 后需要重新运行 generator；下面的编码示例假定已经应用了这两个选项，因此 `name` 和 `values` 是固定大小字段，而不是 `pb_callback_t`。

也可以直接在 `.proto` 中使用 nanopb 扩展：

```proto
import "nanopb.proto";

message Sensor {
  string name = 1 [(nanopb).max_length = 32];
  repeated int32 values = 2 [(nanopb).max_count = 8];
}
```

`.options` 适合让同一份 `.proto` 服务多个目标平台；选项直接写入 `.proto` 则更容易让 schema 和内存约束一起版本化。

## 编码与解码

```c
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#include <pb_decode.h>
#include <pb_encode.h>
#include "sensor.pb.h"

int main(void) {
  uint8_t buffer[64];
  Sensor message = Sensor_init_zero;

  message.id = 7;
  strncpy(message.name, "temperature", sizeof(message.name));
  message.name[sizeof(message.name) - 1] = '\0';
  message.values_count = 2;
  message.values[0] = 20;
  message.values[1] = 21;

  pb_ostream_t output = pb_ostream_from_buffer(buffer, sizeof(buffer));
  if (!pb_encode(&output, Sensor_fields, &message)) {
    fprintf(stderr, "encode failed: %s\n", PB_GET_ERROR(&output));
    return 1;
  }

  Sensor decoded = Sensor_init_zero;
  pb_istream_t input = pb_istream_from_buffer(buffer, output.bytes_written);
  if (!pb_decode(&input, Sensor_fields, &decoded)) {
    fprintf(stderr, "decode failed: %s\n", PB_GET_ERROR(&input));
    return 1;
  }

  printf("id=%u name=%s values=%d,%d\n",
         (unsigned)decoded.id,
         decoded.name,
         (int)decoded.values[0],
         (int)decoded.values[1]);
  return 0;
}
```

编译时把生成文件和 nanopb runtime 一起加入：

```bash
cc -I nanopb -I gen \
  sensor.c \
  gen/sensor.pb.c \
  nanopb/pb_encode.c nanopb/pb_decode.c nanopb/pb_common.c \
  -o sensor
```

- `pb_encode()` 和 `pb_decode()` 返回 `false` 时应立即检查 stream error。
- `Sensor_init_zero` 适合静态初始化消息；解码前应先初始化消息结构体。
- 固定大小字段不会自动扩容；输入超过 `max_length`、`max_size` 或 `max_count` 时，`pb_decode()` 会失败。
- 编码到未知大小的输出时，可以先使用 callback 为 `NULL` 的 output stream 计算编码长度。

## Callback

当字符串、bytes 或 repeated 数据无法接受固定上限时，使用 `pb_callback_t`：

- 编码 callback 负责把完整字段写入 `pb_ostream_t`。
- 解码 callback 会收到字段对应的 `pb_istream_t`，可以流式消费数据，避免把完整 payload 放入 RAM。
- repeated 字段的 callback 可能被多次调用；callback 状态应通过 `pb_callback_t.arg` 保存。
- callback 必须正确处理 stream 请求的完整字节数，并在 I/O 失败时返回 `false`。

## 编译选项

runtime 和所有包含 nanopb 头文件的代码必须使用一致的编译宏：

- `PB_ENABLE_MALLOC`：启用 decoder 的动态内存支持。
- `PB_BUFFER_ONLY`：只保留内存 buffer，关闭自定义 stream 支持，可减少代码体积。
- `PB_NO_ERRMSG`：关闭错误文本，节省空间；之后只能依赖 `true` / `false` 判断失败。
- `PB_FIELD_32BIT`：支持更大的 field tag、消息和数组，但会增加字段元数据占用。
- `PB_WITHOUT_64BIT`：不支持 64 位整数，适合资源极小且不需要 64 位字段的目标。
- `PB_VALIDATE_UTF8`：检查输入字符串 UTF-8，增加少量代码和运行时开销。

## 限制与注意事项

- nanopb 是 protobuf 的 C 编码/解码实现，不包含 gRPC transport 或服务端框架。
- `.proto` 是跨语言共享的 schema；nanopb 的 `.options` 只影响 C 结构体和 generator 行为，不改变 protobuf wire format。
- 共享 schema 时，尽量不要把只服务于单个平台的 nanopb 扩展直接写入公共 `.proto`；可以使用同名 `.options` 文件隔离平台内存策略。
- 固定数组适合可控的设备消息；不确定大小的数据应使用 callback 或明确启用动态分配，并设计释放路径。
- 生成文件属于构建产物还是源码的一部分，需要在项目中统一决定；无论哪种方式，都应固定 generator、`protoc` 和 runtime 版本。

## 参考

- [nanopb/nanopb](https://github.com/nanopb/nanopb)
- [Nanopb documentation](https://jpa.kapsi.fi/nanopb/docs/)
- [Basic concepts](https://jpa.kapsi.fi/nanopb/docs/concepts.html)
- [API reference](https://jpa.kapsi.fi/nanopb/docs/reference.html)
- [Nanopb CMake integration](https://github.com/nanopb/nanopb/tree/master/extra)
