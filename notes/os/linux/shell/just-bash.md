---
title: just-bash
tags:
  - Javascript
  - TypeScript
  - Shell
---

# just-bash

- [vercel-labs/just-bash](https://github.com/vercel-labs/just-bash)
  - Apache-2.0, TypeScript
  - 面向 AI Agent 的虚拟 Bash 环境，默认使用内存文件系统
  - 模拟 Bash 语法和常用 Unix 命令，不是真正的操作系统 Shell、PTY 或容器
  - 可嵌入应用，通过 TypeScript 注册自定义命令
- 参考
  - [官方 README](https://github.com/vercel-labs/just-bash/blob/main/packages/just-bash/README.md)
  - [安全模型](https://github.com/vercel-labs/just-bash/blob/main/packages/just-bash/README.md#security-model)

## 基础使用

```bash
pnpm add just-bash
```

```ts
import { Bash } from 'just-bash';

const bash = new Bash({
  files: { '/data/input.txt': 'hello\nworld\n' },
  cwd: '/data',
});

const result = await bash.exec('cat input.txt | grep world');
console.log(result.stdout); // "world\n"
console.log(result.exitCode); // 0

await bash.exec('echo saved > result.txt');
console.log((await bash.exec('cat result.txt')).stdout); // "saved\n"
```

- `exec()` 返回聚合的 `stdout`、`stderr` 和 `exitCode`
- 每次 `exec()` 的环境变量、函数和工作目录从初始配置重新开始，不是持久交互式 Shell 状态
- 同一个实例的文件系统在多次 `exec()` 之间共享
- 支持管道、重定向、变量、通配符、条件、循环和函数等 Bash 语法
- 支持 `cat`、`grep`、`rg`、`sed`、`awk`、`jq` 等已实现的命令；不是所有系统命令都可用
- 网络访问需要显式配置；文件系统边界、网络权限和执行预算需要由宿主设置

## 文件系统

| 实现          | 用途                                 |
| ------------- | ------------------------------------ |
| `InMemoryFs`  | 默认实现，文件保存在内存中           |
| `OverlayFs`   | 从真实目录读取，修改保留在内存覆盖层 |
| `ReadWriteFs` | 在指定根目录内读写真实文件           |
| `MountableFs` | 将多个文件系统挂载到不同路径         |

- 使用虚拟文件系统不等于获得完整的进程隔离
- 可信自定义命令运行在宿主进程中，其直接使用的宿主能力不受虚拟文件系统自动约束
- JavaScript 无法强制停止任意宿主代码；需要强制终止保证时，应使用可终止的 Worker 或独立进程

# FAQ

## 支持 pipe，但不等于流式管道

截至 2026-09-10，主线 3.4.2 的管道按阶段执行：等待上游完成，再把完整输出作为下游输入。

```bash
# 可以正常过滤输出
printf 'first\nsecond\n' | grep second

# 最终只显示 4 行，但不会让上游提前停止扫描
rg --files /data | head -4
```

| 行为             | 聚合式管道               | 流式管道                     |
| ---------------- | ------------------------ | ---------------------------- |
| 下游何时消费输入 | 上游执行完成后           | 上游产生数据时               |
| 中间数据         | 完整缓冲                 | 分块传输，通过背压限制积压   |
| `head` 提前结束  | 无法停止已经执行完的上游 | 可关闭输入，让上游停止       |
| 适合的任务       | 有限输入的批量处理       | 增量处理、大量数据、持续输出 |

- 支持 `|`、`>`、`>>`、`2>`、`2>&1` 等语法，不代表支持逐块传输或并发管道
- `head -N`、`grep -m`、`sed q` 不能充当上游执行量的限制，仍需设置执行和资源预算
- 长连接 SSE 等持续输出场景，不能依赖当前管道让下游边接收边处理
- 宿主若直接转发中间命令输出，可能绕过管道过滤；实时日志回调不能替代正确的管道 IO 路由
- [vercel-labs/just-bash#415](https://github.com/vercel-labs/just-bash/issues/415)
  - 报告 `rg ... | head -4` 仍扫描完整目录树，测量版本为 3.4.1
  - 提出的方向：各阶段并发执行，流式 stdin/stdout，支持背压和下游结束后的上游取消

# FAQ

## Streaming

- [vercel-labs/just-bash#155](https://github.com/vercel-labs/just-bash/pull/155)
  - 社区提交的 `Add streaming pipeline execution`，已关闭、未合并
  - 包含 `PipeChannel`、流式命令适配和基于 `AsyncIterable` 的文件读取，不是原生 Web Streams 方案
  - 作者说明原本要提交到自己的 fork，随后自行关闭，不能据此认为官方否决了流式设计
  - 只能作为实现参考，不代表当前发布版本已经支持；采用前需要重新检查兼容性和安全边界
