---
title: Alpine GLIBC
---

# Alpine GLIBC

- Binary
  - https://github.com/sgerrand/alpine-pkg-glibc
  - https://github.com/Docker-Hub-frolvlad/docker-alpine-glibc
- Builder
  - https://github.com/sgerrand/docker-glibc-builder
- /usr/glibc-compat/
- /lib/ld-linux-x86-64.so.2
- LD_LIBRARY_PATH=/usr/glibc-compat/sbin/ldconfig

```bash
apk del gcompat

# wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
curl --remote-name-all -LC- https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r1/glibc{,-bin,-dev}-2.35-r1.apk
apk add glibc-2.35-r1.apk glibc-bin-2.35-r1.apk glibc-dev-2.35-r1.apk --allow-untrust --force-overwrite
```

- overwrite
  - https://github.com/sgerrand/alpine-pkg-glibc/issues/185

## unsupported relocation type 37

ldd 只支持 musl

```bash
LD_PRELOAD=/lib/ld-linux-x86-64.so.2 ldd libWeWorkFinanceSdk_C.so

/usr/glibc-compat/bin/ldd libWeWorkFinanceSdk_C.so
objdump -p libWeWorkFinanceSdk_C.so
```

## cgo

```bash
CGO_LDFLAGS="-L/usr/glibc-compat/lib   -Wl,-rpath -Wl,\$ORIGIN/../lib" \
  CGO_CFLAGS="-I/path/to/include/file/of/the/lib/include" \
  go build ./main.go

LD_PRELOAD=/lib/ld-linux-x86-64.so.2 LD_LIBRARY_PATH=/usr/glibc-compat/lib:$PWD ./main
```

## no version information available

- 影响不大
- so 无 VERDEF

## undefined reference to `ceilf@GLIBC_2.2.5'

- `-lm`
