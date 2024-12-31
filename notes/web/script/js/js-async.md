---
title: JS Async
---

# JS Async

- Promise
  - Promise 是 eager eval 的, 也就是在 new Promise 的时候已经开始执行
  - 有 then 的对象和 Promise 是不一样的
    - await 有 then 的对象，会调用 then
    - await Promise 会等待 Promise resolve, 而不是执行 Promise 的 then
- AsyncGenerator
  - next -> `{value,done}`
    - 可以传入值，在 yield 获取到，可用于控制 generator 行为
  - return
    - 修改 generator 状态为完成, 相当于 yield -> return, 会执行 finally
  - throw
    - 和 return 类似, 但是会抛出异常, 会执行 `try...catch`
- AsyncIterator
  - `[Symbol.asyncIterator]()` -> AsyncIterator
  - `for await ... of`
- [scheduler](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler) - 优化调度
  - scheduler.yield()
    - Chrome 129+
    - 默认优先级  "user-visible"
  - scheduler.postTask()
    - Chrome 94+
    - priority - user-blocking, user-visible, background
- navigator.wakeLock
  - 运行时保持设备唤醒
  - `const sentinel = navigator.wakeLock.request("screen")`
  - `sentinel.release()`
- 参考
  - https://web.dev/articles/optimize-long-tasks
  - https://wicg.github.io/scheduling-apis/

```js
// 输出 1 2
new Promise(() => console.log(1));
console.log(2);

// Thenable/PromiseLike - 执行由 await 触发
await {
  then() {
    console.log(1);
  },
};

// 避免阻塞主线程
function yieldToMain () {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}
```
