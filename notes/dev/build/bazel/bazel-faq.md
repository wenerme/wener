---
title: Bazel FAQ
tags:
  - FAQ
---

# Bazel FAQ

## Central cache for external repositories

- repository_cache - https://docs.bazel.build/versions/main/command-line-reference.html#flag--repository_cache
  - `~/.cache/bazel/_bazel_$USER/cache/repos/v1/`
  - `/private/var/tmp/_bazel_$USER/cache/repos/v1/content_addressable/sha256/`
- https://docs.bazel.build/versions/main/guide.html#repository-cache
- experimental_repository_cache_hardlinks
- experimental_repository_cache_urls_as_default_canonical_id

```bash
du -sh /private/var/tmp/_bazel_$USER/cache/repos/v1/content_addressable/sha256
```

## git add

```bash
git add --ignore-errors '**/BUILD.bazel' WORKSPACE deps.bzl BUILD.bazel
```

## Bazel4 on AlpineLinux

```bash
# ALpineLinux 3.15
apk add openjdk17-jdk bazel4 -X https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/testing

# AlpineLinux Bazel 环境
apk add xz python3 coreutils tar patch diffutils gcc g++
ln -s /usr/bin/python3 /usr/bin/python

# ALpineLinux <= 3.15
apk upgrade g++ libstdc++ -X https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/main
```

- Bazel 官方构建的不支持 musl
  - Using standalone binary on Alpine [#5891](https://github.com/bazelbuild/bazel/issues/5891)
  - musl support in CI [#1190](https://github.com/bazelbuild/continuous-integration/issues/1190)
  - https://gitlab.alpinelinux.org/alpine/aports/-/blob/master/testing/bazel4/APKBUILD

## gcc: fatal error: cannot execute 'cc1plus': execvp: No such file or directory

```bash
apk add g++
```

## /usr/bin/bazel-real: `_ZSt28__throw_bad_array_new_lengthv`: symbol not found

install bazel from edge testing

```bash
# sync libstdc++ version
apk upgrade libstdc++ -X https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/main
```

```bash
ldd /usr/bin/bazel-real
```

```
	/lib/ld-musl-x86_64.so.1 (0x7f8198234000)
	libstdc++.so.6 => /usr/lib/libstdc++.so.6 (0x7f8197d6a000)
	libgcc_s.so.1 => /usr/lib/libgcc_s.so.1 (0x7f8197d50000)
	libc.musl-x86_64.so.1 => /lib/ld-musl-x86_64.so.1 (0x7f8198234000)
Error relocating /usr/bin/bazel-real: _ZSt28__throw_bad_array_new_lengthv: symbol not found
```

```bash
# Missing
objdump -T /usr/lib/libstdc++.so.6 | grep throw_bad_array
```

## glob: recursive wildcard must be its own segment

- `glob("src/**.c")` -> `glob("src/**/*.c")`
