---
tags:
  - Interop
---

# node-gyp

- 最好使用 prebuild
- 如果出现了从源码构建，先排查为什么会导致构建

```bash
# node gyp 依赖
apk add python3 g++ gcc make

# 强制从源码构建
npm install sqlite3 --build-from-source=sqlite3

# 查看 binary 地址
# 注意 module_name 可能不同于 npm 包名
npm view sqlite3@3.1.3 binary             # aws
npm view sqlite3@5.1.0 binary.module_name # github

# install 包含 platform 和 libc 条件
npm install --platform=linux --libc=libc --registry https://npm.wener.me/

npm install sqlite3 --node_sqlite3_binary_host_mirror=https://npmmirror.com/mirrors/sqlite3

# 根据平台 rebuild
node-pre-gyp rebuild --target=0.30.2 --arch=x32 --target_platform=win32 --dist-url=https://atom.io/download/atom-shell
```

- `--{module_name}_binary_host_mirror`
