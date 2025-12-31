---
title: Go Build
---

# Go Build

- [Go package guidelines](https://wiki.archlinux.org/title/Go_package_guidelines)
- Common Flags: `-trimpath -ldflags '-s -w -extldflags "-static"'`

## References

- [GoArm](https://github.com/golang/go/wiki/GoArm)
- [go-os-arch.md](https://gist.github.com/asukakenji/f15ba7e588ac42795f421b48b8aede63)
- [PortingPolicy](https://github.com/golang/go/wiki/PortingPolicy)
- [Installing Go from source](https://go.dev/doc/install/source)

:::caution

- **c-shared**
  - runtime: c-shared builds fail with musllibc [golang/go#13492](https://github.com/golang/go/issues/13492)
  - windows c-shared requires TDM-GCC
  - Cannot dlclose, offload c-shared [golang/go#11100](https://github.com/golang/go/issues/11100) (Related to VM)
- **aarch64 -> arm64**
  - `aarch64` is common in Linux environments.
  - Use `arm64` for GOARCH.

:::

## Environment Variables

| Env          | Note                 | macOS                                  |
| :----------- | :------------------- | :------------------------------------- |
| `GOENV`      |                      | `~/Library/Application Support/go/env` |
| `GOCACHE`    |                      | `~/Library/Caches/go-build`            |
| `GOMODCACHE` |                      | `~/go/pkg/mod`                         |
| `GOTOOLDIR`  |                      |                                        |
| `GOMOD`      | go.mod location      |                                        |
| `GOWORK`     |                      |                                        |
| `GOMAXPROCS` | Max Thread           |                                        |
| `GOGC`       | 100 (off to disable) |                                        |
| `GOOS`       |                      |                                        |
| `GOARCH`     |                      |                                        |

## Flags and Options

```bash
# List all cross-compilation targets
go tool dist list
# Include cgo support status
go tool dist list -json

# Remove mod cache
go clean -modcache
```

### Build Modes (`-buildmode`)

| Mode         | Description                                     |
| :----------- | :---------------------------------------------- |
| `archive`    | build non-main, `.a`                            |
| `c-archive`  | main+imports, cgo `//export`                    |
| `c-shared`   | main+imports, cgo `//export`                    |
| `default`    | main+non-main, exec, `.a`                       |
| `exe`        | main+imports, exec, ignores non-main packages   |
| `pie`        | main+imports, exec, pie                         |
| `plugin`     | main+imports, plugin, ignores non-main packages |
| ~~`shared`~~ | non-main, for -linkshared (deprecated/broken)   |

### Linker Flags (`-ldflags`)

| Flag                     | Description              |
| :----------------------- | :----------------------- |
| `-w`                     | disable DWARF generation |
| `-s`                     | disable symbol table     |
| `-X 'pkg.Var=Value'`     | add string definition    |
| `-linkmode=external`     |                          |
| `-extldflags "$LDFLAGS"` |                          |

### GC Flags (`-gcflags`)

| Flag | Description           |
| :--- | :-------------------- |
| `-N` | Disable optimizations |
| `-l` | Disable inlining      |

### Common Flags

| Flag                    | Description                                   |
| :---------------------- | :-------------------------------------------- |
| `-modcacherw`           | New mod cache rw - allows `rm -rf`            |
| `-trimpath`             | Remove environment paths, reproducible builds |
| `-ldflags "$GOLDFLAGS"` |                                               |
| `-mod=readonly`         | Don't update go.mod                           |
| `-buildmode=pie`        |                                               |

## Custom Version Variables

Inject version info at build time:

```go
package main

var Version = "dev"
var CommitTime = ""
var CommitID = ""
var BuildTime = ""
```

```bash
DEF_FLAGS="
-X 'wener.me/tools/build.Version=$(git describe --tags --abbrev=0)'
-X 'wener.me/tools/build.CommitID=$(git rev-parse --short HEAD)'
-X 'wener.me/tools/build.CommitTime=$(git log -1 --format=%cd --date=iso8601)'
-X 'wener.me/tools/build.BuildTime=$(date --iso-8601=seconds)'
"
go build -o bin/cli -ldflags "$DEF_FLAGS" ./cmd/cli
```

## Build Constraints (Tags)

```go
//go:build tag
//+build tag1,tag2

// Complex constraints
//go:build (linux && 386) || (darwin && !cgo)

package main
```

```bash
go build -tags "tag1 tag2"
```

[Build constraints documentation](https://pkg.go.dev/cmd/go#hdr-Build_constraints)

## Cross Compilation

```bash
# Example cross compilation commands
CC=i586-mingw32-gcc GOOS=windows GOARCH=386 CGO_ENABLED=1 \
  go build -v -o myprogram.exe -ldflags="-extld=$CC"

CC=x86_64-pc-linux-gcc GOOS=linux GOARCH=amd64 CGO_ENABLED=1 \
  go build -v -o myprogram -ldflags="-extld=$CC"
```

## Docker Builder

Using [prometheus/golang-builder](https://github.com/prometheus/golang-builder) for multi-arch builds.

```bash
docker pull quay.io/prometheus/golang-builder:arm
docker run --rm -it --entrypoint bash \
  --name go-builder quay.io/prometheus/golang-builder:arm
```

## Architecture Levels (GOAMD64)

> go 1.18 新增 GOAMD64 环境变量

- v1 - 默认
- v2 - CMPXCHG16B, LAHF, SAHF, POPCNT, SSE3, SSE4.1, SSE4.2, SSSE3
  - 2009: Nehalem, Jaguar, Intel Atom Silvermont, QEMU
  - amdv2
- v3 - AVX, AVX2, BMI1, BMI2, F16C, FMA, LZCNT, MOVBE, OSXSAVE
  - 2015 - Haswell, Excavator
  - amdv3
- v4 - AVX512F, AVX512BW, AVX512CD, AVX512DQ, AVX512VL
  - 2017: Skylake-X, Skylake-SP
  - 2022: Zen 4
  - amdv4
- 参考
  - [GOAMD64](https://go.dev/wiki/MinimumRequirements#amd64)
  - [Microarchitecture levels](https://en.wikipedia.org/wiki/X86-64#Microarchitecture_levels)

```bash
# Check support
grep -oE 'avx2|bmi1|bmi2|f16|fma' /proc/cpuinfo | sort -u
```

## FAQ

- **`unrecognized command-line option '-marm'`**: Check `CC` path.
- **`arm-none-eabi-gcc: error: unrecognized command-line option '-pthread'`**: Use `arm-linux-eabi` or manage empty pthread lib.
- **`loadinternal: cannot find runtime/cgo`**: Ensure `CGO_ENABLED=1`.
- **`FATAL: kernel too old`**: Check target kernel version support in GCC.
