---
title: IO
---

# JavaScript IO

- BigInt - Chrome 67, Firefox 68, Safari 14
- Buffer - NodeJS - 为 Uint8Array
- ArrayBuffer
- SharedArrayBuffer
  - 用于共享内存，但不是 transferable
  - WebAssembly.Memory
  - WebGLRenderingContext.bufferData()
  - WebGLRenderingContext.bufferSubData()
  - WebGL2RenderingContext.getBufferSubData()
- Blob - 不可变
  - 类似文件 - 可用于处理
  - 可转为 ReadableStream
  - File 基于 Blob
  - arrayBuffer() -> ArrayBuffer
  - stream() -> ReadableStream
  - text() -> string
  - `URL.createObjectURL(blob)`
  - FileReader 可读取 Blob
  - `new Response(blob)` - 可用于构造 Response

**操作处理相关**

- Atomics
  - 原子化操作 SharedArrayBuffer, ArrayBuffer
- ArrayBufferView - `ArrayBuffer.isView` - 常见的接口
  - buffer
  - byteLength
  - byteOffset
- DataView
  - 提供操作 `{get,set}{BigInt,BigUint,Float,Int,Uint}{32,64,8}`
  - 支持 endian 设置
- TypedArray
  - Uint8Array
  - Uint8ClampedArray
  - Uint16Array
  - Uint32Array
  - Int8Array
  - Int16Array
  - Int32Array
  - BigUint64Array
  - BigInt64Array
  - Float32Array
  - Float64Array
- [TransferableObject](https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects)
  - 可在 Worker 之间传递 - 内存共享
  - ArrayBuffer
  - MessagePort
  - ReadableStream
  - WritableStream
  - TransformStream
  - AudioData
  - ImageBitmap
  - VideoFrame
  - OffscreenCanvas
  - RTCDataChannel
- TextDecoder, TextEncoder, TextDecoderStream, TextEncoderStream
  - UTF8 编码解码
  - Encoder 只支持 UTF-8
  - 解码支持 UTF-8, ISO-8859-2, KOI8-R, GBK
  - `new TextDecoder('windows-1251')`
- Streams
  - ReadableStream
  - WritableStream
  - TransformStream
---

- 参考
  - https://w3c.github.io/FileAPI/
  - https://encoding.spec.whatwg.org/


# FAQ

## TextEncoder byteOffset

- NodeJS 忽略 byteOffset

```js
var buf = new Uint8Array(new TextEncoder().encode("wrong hello").buffer, 6);
console.assert(new TextDecoder().decode(buf) === 'hello','should be hello')
```

- https://github.com/anonyco/FastestSmallestTextEncoderDecoder/issues/17
