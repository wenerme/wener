---
title: FlatBuffers
---
# FlatBuffers

- [google/flatbuffers](https://github.com/google/flatbuffers)
  - Apache-2.0
  - by Google
  - 跨平台序列化库
  - 优点
    - 速度快
    - 体积小
    - 无需解析即可访问数据
  - 应用场景
    - 游戏
    - 物联网
    - 高性能数据传输
  - Adopted by
    - Apache Arrow
    - TensorFlow Lite
    - PyTorch
    -  Draco

# FAQ

## FlatBuffers vs Protocol Buffers

- FlatBuffers
  - 强调性能
  - 场景： 游戏开发、物联网设备、移动应用
  - 0 拷贝
    - 更高效、即使序列化
    - 可用于内存受限场景
  - 可以直接访问
  - 占用空间比 Protocol Buffers 大一些
    - 二进制格式更注重快速访问和零拷贝
  - API 复杂
    - 需要理解 内存布局和访问方式
- Protocol Buffers
  - 强调 兼容性
  - 场景： CS通信、配置文件、网络协议
  - 以 Message 方式呈现 - 序列化、反序列化都存在额外内存分配
  - 变长编码 - Varint
  - API 简单
