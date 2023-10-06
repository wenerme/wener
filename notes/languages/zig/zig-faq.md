---
tags:
  - FAQ
---

# Zig FAQ

## warning: lld uses blx instruction, no object with architecture supporting feature detected

## undefined symbol: `__sync_fetch_and_add_1`

- atomic operations and `__eabi_read_tp` for ARM older than v7
  - [#10756](https://github.com/ziglang/zig/pull/10756)

## warning: cannot find entry symbol \_start; not setting start address
