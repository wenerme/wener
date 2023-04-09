---
title: cpuid
---

# cpuid

```bash
cat /proc/cpuinfo | sort -u | grep --color -Ei 'AVX|FMA|NEON|F16|BLAS|SSE3|VSX'

go env -w GOPROXY=https://goproxy.cn,direct
go install github.com/klauspost/cpuid/v2/cmd/cpuid@latest
~/go/bin/cpuid
~/go/bin/cpuid | grep --color -Ei 'AVX|FMA|NEON|F16|BLAS|SSE3|VSX'
```

- AVX - Advanced Vector Extension
  - AVX
  - AVX2
  - AVX512
- FMA - fused multiply–add
  - FMA2
  - FMA3
  - 128 and 256-bit Streaming SIMD Extensions
- arm
  - NEON
  - ARM_FMA
- F16C
- FP16_VA
- wasm
  - WASM_SIMD
- BLAS
- SSE3
- IBM PowerPC
  - VSX - Vector Scalar Extension
- Golang
  - https://pkg.go.dev/golang.org/x/sys/cpu
