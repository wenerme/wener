---
title: Alpine AKMS
---

# Alpine AKMS

- AKMS - Alpine Kernel Module Support
- 用于在 Alpine 上管理 out-of-tree kernel modules，作用类似 DKMS。
- 适合需要随 kernel 升级自动重新构建的第三方内核模块。
- 参考：<https://wiki.alpinelinux.org/wiki/Alpine_kernel_module_support>

## 基本概念

| 名词               | 说明                                                                           |
| ------------------ | ------------------------------------------------------------------------------ |
| in-tree module     | 已包含在 Linux kernel 源码树里的模块，通常由 `linux-*` 包直接提供              |
| out-of-tree module | 不在 kernel 源码树里的第三方模块，需要额外构建                                 |
| AKMS               | Alpine 的 out-of-tree kernel module 构建/安装机制                              |
| DKMS               | Dynamic Kernel Module Support，其他发行版常见方案；AKMS 是 Alpine 风格替代方案 |

AKMS 的目标是让第三方模块和 Alpine kernel package 更好集成：安装模块源码包后，在当前或新安装的 kernel 版本上构建对应的 `.ko` 模块。

## 安装

```bash
apk add akms
```

通常还需要当前 kernel 对应的 headers / dev 包，以及构建工具：

```bash
apk add alpine-sdk linux-headers

# 根据当前 kernel flavor 安装对应 dev 包
apk add linux-lts-dev
# 或
apk add linux-virt-dev
```

:::tip
`uname -r` 可以看到当前 kernel release；Alpine 常见 kernel flavor 包括 `linux-lts`、`linux-virt` 等。构建模块时 dev/header 包需要和目标 kernel flavor 匹配。
:::

## 基本使用

```bash
# 查看 akms 帮助
akms --help

# 构建已安装的 AKMS 模块
akms build

# 安装构建后的模块
akms install

# 构建并安装
akms build && akms install

# 重新加载模块依赖
modprobe -a <module>
```

如果安装的是提供 AKMS 支持的模块包，通常包的 post-install hook 会触发构建；手动命令主要用于排障或 kernel 升级后补构建。

## 常见流程

```bash
# 1. 安装 akms 和构建依赖
apk add akms alpine-sdk linux-headers linux-lts-dev

# 2. 安装第三方模块源码包，例如 akms-xxx
apk add akms-xxx

# 3. 构建/安装模块
akms build
akms install

# 4. 加载模块
modprobe xxx

# 5. 确认模块加载
lsmod | grep xxx
modinfo xxx
```

## Kernel 升级后

```bash
apk upgrade
reboot

# 如果模块没有自动构建，可手动执行
akms build
akms install
modprobe xxx
```

注意：如果升级后 kernel flavor 改变，例如从 `linux-lts` 换到 `linux-virt`，需要安装对应的 `linux-*-dev` 包。

## 排障

| 问题                   | 检查                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| 找不到 kernel headers  | 确认安装了匹配的 `linux-*-dev` 或 `linux-headers`                    |
| 构建失败               | 检查是否安装 `alpine-sdk`、编译器、make、patch 等工具                |
| `modprobe` 找不到模块  | 重新运行 `akms install`、`depmod -a`，确认模块安装到当前 kernel 目录 |
| Secure Boot 下无法加载 | 需要处理模块签名，或关闭 Secure Boot                                 |
| kernel 升级后模块失效  | 重新构建并安装模块，确认目标 kernel release 正确                     |

常用检查命令：

```bash
uname -r
apk info -L akms
apk info | grep '^linux-'
find /lib/modules/$(uname -r) -name '*.ko*' | grep xxx
modinfo xxx
modprobe -v xxx
dmesg | tail -n 100
```

## 注意

- AKMS 解决的是模块构建和安装问题，不保证第三方模块与所有 kernel 版本兼容。
- 生产环境升级 kernel 前，建议先确认对应模块能在新 kernel 上构建通过。
- 容器内通常不适合构建/加载宿主机 kernel module，应该在宿主机上操作。
- diskless / data mode Alpine 需要注意 `lbu commit`，否则重启后配置可能丢失。

## 相关

- [Alpine Linux](./README.md)
- [Kernel modules](https://wiki.alpinelinux.org/wiki/Kernel_modules)
- [Alpine kernel module support](https://wiki.alpinelinux.org/wiki/Alpine_kernel_module_support)
