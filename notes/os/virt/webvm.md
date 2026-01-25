---
tags:
  - WASM
---

# WebVM

- [container2wasm/container2wasm](https://github.com/container2wasm/container2wasm)
  - c2w-net-proxy
  - **RISC-V (riscv64)**: Recommended, faster emulation with TinyEMU
    - 单线程
  - **x86_64**: Slower, uses Bochs emulator
  - **QEMU Mode**: `--to-js` for Emscripten output with JIT (larger but faster)
    - 支持 MTTCG
- [bjorn3/browser_wasi_shim](https://github.com/bjorn3/browser_wasi_shim)
- [mame/xterm-pty](https://github.com/mame/xterm-pty)
- [containers/gvisor-tap-vsock](https://github.com/containers/gvisor-tap-vsock)
- https://github.com/joelseverin/linux-wasm/
  - fast, buggy
  - 把 linux 编译为 wasm
  - 不是 emu 或者 vm
  - binfmt_wasm
  - https://news.ycombinator.com/item?id=45783074
- https://github.com/webassembly/wasi-libc
- cheerpx
  - https://cheerpx.io/
  - 虚拟化引擎
  - 闭源
  - x86 -> wasm jit compiler
  - virtual block fs
  - Linux syscall emulator
  - Free
    - ❌ Self-Hosting not allowed
    - ❌ OEM/Redistribution
  - Small
    - £100 per developer per month
- WebVM: https://github.com/leaningtech/webvm
- [copy/v86](https://github.com/copy/v86)
  - 32bits x86
  - 支持很多老的架构
  - Rust, WASM
  - 比 TinyEMU 快
  - x86_64 https://github.com/copy/v86/issues/133
- TinyEMU
  - riscv64, x86
  - 解释器, 10k LOC
- [ptitSeb/box64](https://github.com/ptitSeb/box64)
  - MIT, C
  - Linux Userspace x86_64 Emulator with a twist, targeted at ARM64, RV64 and LoongArch Linux devices
- Bochs
  - x86_64
- QEMU TCG JIT
  - QEMU WASM https://github.com/ktock/qemu-wasm

```bash
# 简单性能测试
# 精度为 1000 位小数
# 4*arctan(1) -> π
time sh -c 'echo "scale=1000; 4*a(1)" | bc -lq' > /dev/null

# linux-wasm 不支持 vfork
date +%s
echo "scale=1000; 4*a(1)" | bc -lq > /dev/null
date +%s
```

| env/scale              | 500 | 1000  | 5000  |
| ---------------------- | --: | ----- | ----- |
| macOS M2 MAX           |     | 0.01s | 0.75s |
| alpine riscv64 TinyEMU |     | 22s   |       |
| alpine x86 v86         | 23s |       |       |
| linux-wasm             |     | 1s    |       |

| abbr. | stand for                    | cn             |
| ----- | ---------------------------- | -------------- |
| COOP  | Cross-Origin-Opener-Policy   | 跨源开放者政策 |
| COEP  | Cross-Origin-Embedder-Policy | 跨源嵌入者政策 |

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

## c2w

- c2w-net-proxy
  - browser fetch
  - gvisor-tap-vsock
- c2w-net
  - delegate websocket
  - gvisor-tap-vsock
