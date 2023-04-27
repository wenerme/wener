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
  - https://nodejs.org/api/webstreams.html
  - https://nodejs.org/api/stream.html

---

- 参考
  - https://w3c.github.io/FileAPI/
  - https://encoding.spec.whatwg.org/
  - [sindresorhus/file-type](https://github.com/sindresorhus/file-type)
    - Detect the file type of a Buffer/Uint8Array/ArrayBuffer

## ReadableStream to Buffer

```ts
async function readStreamToBuffer(rs) {
  const reader = rs.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
```

## ReadableStream to String

```ts
async function readStreamToString(rs) {
  const reader = rs.getReader();
  const decoder = new TextDecoder();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(decoder.decode(value));
  }
  return chunks.join('');
}
```

## multipart/form-data 序列化为字符串

```ts
function formDataToString(formData) {
  const r = new Request('http://127.0.0.1', { method: 'POST', body: formData });
  return readStreamToString(r.body);
}

const data = new FormData();
data.append('a', '1');
data.append('file', new Blob([new Uint8Array([97, 98, 99, 100])], { type: 'application/octet-stream' }), 'c.bin');
console.log(await formDataToString(data));

// FormData 作为 Response
const fd = await new Response(data).formData();
console.log(Object.fromEntries(fd.entries()));
```

## data url to Blob

```ts
const blob = await fetch(
  'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==',
).then((r) => r.blob());

const url = URL.createObjectURL(blob);
window.open(url);
```

## application/x-www-form-urlencoded

```ts
const p = new URLSearchParams({ b: 2, a: 1 });
p.sort();
p.toString();
```

# FAQ

## TextEncoder byteOffset

- NodeJS 忽略 byteOffset

```js
var buf = new Uint8Array(new TextEncoder().encode('wrong hello').buffer, 6);
console.assert(new TextDecoder().decode(buf) === 'hello', 'should be hello');
```

- https://github.com/anonyco/FastestSmallestTextEncoderDecoder/issues/17
