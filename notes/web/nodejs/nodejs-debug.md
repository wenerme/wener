---
tags:
  - Debug
---

# Debug

- --inspect
- --inspect-brk
- https://nodejs.org/en/docs/guides/debugging-getting-started
- [davidmarkclements/0x](https://github.com/davidmarkclements/0x)
  - flamegraph profiling

```bash
NODE_OPTIONS='--inspect' node script.js
```

## Memory

- Windows 里查看 vmmem 是 WSL 内存
- WSL 默认为 Host 50% 的内存

```js
function logMemoryUsage() {
  const usage = process.memoryUsage();
  console.log('--- Memory Usage ---');
  console.log(`RSS: ${(usage.rss / 1024 / 1024).toFixed(2)} MB`); // 物理内存占用
  console.log(`Heap Total: ${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`); // 总堆大小
  console.log(`Heap Used: ${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`); // 已用堆大小
  console.log(`External: ${(usage.external / 1024 / 1024).toFixed(2)} MB`); // 堆外内存
  console.log('--------------------');
}

function triggerGabageCollection() {
  if (global.gc) {
    global.gc();
    console.log('Garbage collection triggered');
  } else {
    console.warn('Garbage collection is not exposed. Run with --expose-gc.');
  }
}
```

```bash
# 4GB 的堆内存
node --max-old-space-size=4096 --expose-gc --trace-gc main.js
```
