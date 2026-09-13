---
title: WebAssembly Threads
tags:
  - WebAssembly
  - Concurrent
---

# WebAssembly Threads

- [WebAssembly Threads proposal](https://webassembly.github.io/threads/)
  - 为 WebAssembly 定义共享线性内存和原子内存访问。
  - 不定义线程的创建与 join；这些生命周期操作由 embedding host 负责。在 Web 中通常由 `Worker` 完成。

## 模型

- Agent
  - 一个执行 WebAssembly 模块的上下文；Web embedding 中对应 ECMAScript agent，例如页面主线程或 Web Worker。
- Agent cluster
  - 可以观察同一份 shared linear memory 的 agent 集合。
- Shared linear memory
  - 内存可以在模块中定义或作为 import 引入，并标记为 `shared`。
  - shared memory 必须显式指定最大页数；Wasm page 为 64 KiB。
  - 一个模块声明 shared import 后，不能传入非 shared memory，反之亦然。
  - 允许 `memory.grow`；新扩展的区域对同一 agent cluster 的其他 agent 可见。
- 线程创建
  - Wasm 指令集只提供共享内存同步原语，不提供 `spawn`、`join` 或调度器。
  - JS host 创建多个 Worker，在每个 Worker 中实例化模块，并传入同一个 `WebAssembly.Memory`。

## Shared Memory

WAT 中 shared memory 必须声明最大页数：

```wasm
(module
  (import "env" "memory" (memory 1 256 shared))

  ;; 返回自增前的值。
  (func (export "increment") (param $address i32) (result i32)
    (i32.atomic.rmw.add
      (local.get $address)
      (i32.const 1))))
```

JavaScript 创建并传递共享内存：

```js
const memory = new WebAssembly.Memory({
  initial: 1,
  maximum: 256,
  shared: true,
});

const worker = new Worker("worker.js", { type: "module" });
worker.postMessage({ memory });

const { instance } = await WebAssembly.instantiateStreaming(
  fetch("counter.wasm"),
  { env: { memory } },
);
instance.exports.increment(0);
```

```js
// worker.js
self.onmessage = async ({ data: { memory } }) => {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("counter.wasm"),
    { env: { memory } },
  );
  instance.exports.increment(0);
};
```

- shared `WebAssembly.Memory` 的 `buffer` 是 `SharedArrayBuffer`。
- 通过 `postMessage()` 和 structured clone 传递 memory 不会复制底层字节；不同 agent 获得的对象共享同一数据块。
- `SharedArrayBuffer` 不是 transferable，不应放入 `postMessage()` 的 transfer list。
- 模块实例化会把 data segment 写入其 linear memory；多 agent 复用同一内存时，需要明确哪个实例负责一次性初始化静态数据。

## Atomic Instructions

所有原子内存访问当前采用 sequentially consistent 顺序：

- Load/store
  - `i32.atomic.load`、`i64.atomic.load`、`i32.atomic.store`、`i64.atomic.store`，以及 8/16/32 bit 宽度变体。
- Read-modify-write
  - `*.atomic.rmw.{add,sub,and,or,xor,xchg}`，原子地读取、计算并写回。
- Compare-exchange
  - `*.atomic.rmw.cmpxchg`：仅在当前值等于 expected 时写入 replacement，并返回原来的值。
- Fence
  - `atomic.fence` 不针对某一块 memory，用于维持高级语言内存栅栏的同步保证。

原子指令既可用于 shared memory，也可用于普通 memory；但 `memory.atomic.wait32` 和
`memory.atomic.wait64` 只能用于 shared memory。

- 原子访问地址必须自然对齐；未对齐或越界会 trap。
- `align` immediate 不是访问宽度的自然对齐值时，会导致 validation failure。

## Wait And Notify

`memory.atomic.wait32` / `memory.atomic.wait64` 避免忙等，`memory.atomic.notify` 唤醒在同一有效地址等待的 agent：

- `wait` 参数为地址、expected value 和相对 timeout；timeout 单位是纳秒，负数表示永不过期。
- `wait` 返回 `i32`：`0` 为被唤醒，`1` 为当前值与 expected 不同，`2` 为超时。
- `notify` 参数为地址与最多唤醒的 waiter 数量，返回实际唤醒数量。
- `wait` 在非 shared memory、未对齐地址或越界地址上会 trap；`notify` 的未对齐或越界地址也会 trap。
- Web embedding 中，Wasm `wait` / `notify` 与 JavaScript `Atomics.wait()` / `Atomics.notify()` 可以在同一共享内存地址互操作。

不要在浏览器主线程执行会阻塞的等待。浏览器不允许主线程阻塞于 `Atomics.wait()`；
Pthreads 适配层若模拟阻塞可能导致页面无响应，并与需要回到主线程的 proxy 操作形成死锁。

## Web 部署

浏览器共享 `WebAssembly.Memory` / `SharedArrayBuffer` 前，页面需要是 secure context 且 cross-origin isolated。常见响应头：

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

- `Cross-Origin-Embedder-Policy: require-corp` 会限制无 CORS 模式加载的跨域资源。
  第三方资源需要正确配置 CORS 或 `Cross-Origin-Resource-Policy`。
- 可用 `crossOriginIsolated` 检测页面或 Worker 是否满足隔离要求。
- 不满足隔离要求时，`SharedArrayBuffer` 的全局构造函数会被隐藏，且跨 agent 的
  `postMessage()` 传递会失败。Wasm atomic instruction 本身不因此失效，但不能据此部署浏览器多线程程序。
- 应加载单线程构建或禁用并行功能。

```js
if (!crossOriginIsolated) {
  // 加载无 pthreads 的 Wasm 构建。
}
```

## Emscripten Pthreads

Emscripten 使用 WebAssembly Threads、`SharedArrayBuffer` 和 Web Worker 实现 POSIX Threads：

```bash
emcc main.cpp -O3 -pthread \
  -sPTHREAD_POOL_SIZE=4 \
  -sPROXY_TO_PTHREAD \
  -o app.html
```

- `-pthread` 必须同时用于每个 C/C++ 编译单元和最终链接步骤。
- `-sPTHREAD_POOL_SIZE=4` 在 `main()` 前预创建 Worker，避免 `pthread_create()` 首次创建
  Worker 必须先返回浏览器 event loop 的时序差异。
- `-sPROXY_TO_PTHREAD` 将原始 `main()` 放到 pthread 运行，保留浏览器主线程处理 DOM、
  事件、渲染及 proxied 调用；通常能避免主线程阻塞。
- Web 上只能由浏览器主线程操作 DOM；后台 pthread 发起的相关调用需要 proxy 回主线程。
- Emscripten 不能用一个二进制同时覆盖 pthreads 与单线程 fallback；应分别构建并在运行时选择。
- `pthread_join`、`pthread_cond_wait` 和长时间 mutex 等待不应发生在浏览器主线程。
- `fork()` 和 POSIX signals 不适用于 Web Worker 模型；移植时应以 Worker、消息和共享内存同步替代。

## 设计检查

- 仅当共享数据和并行计算收益明确时启用 threads；Worker 启动、内存预留和同步都有成本。
- 把共享内存布局、所有者、初始化顺序和退出协议作为 ABI 的一部分设计；不要只依赖偶然的地址约定。
- 共享状态应使用原子操作或明确的同步协议保护；不要把普通读写与原子读写混用来实现锁。
- 以短临界区为目标；长时间等待改为工作队列、分块计算或异步事件。
- 将有 threads 与无 threads 的构建都纳入 CI 和部署验收。
  尤其验证 COOP/COEP 对 CDN、分析脚本、字体和第三方登录跳转的影响。

## 参考

- [WebAssembly Threads proposal](https://webassembly.github.io/threads/)
- [Emscripten Pthreads support](https://emscripten.org/docs/porting/pthreads.html)
- [MDN: SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
- [MDN: Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy)
- [MDN: Cross-Origin-Embedder-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy)
