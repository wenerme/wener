---
title: Alpine 包维护
---

# Alpine Package

- [Creating an Alpine package](https://wiki.alpinelinux.org/wiki/Creating_an_Alpine_package)
- https://wiki.alpinelinux.org/wiki/APKBUILD_Reference
- [Apkindex format](https://wiki.alpinelinux.org/wiki/Apkindex_format)
- [Abuild and Helpers](https://wiki.alpinelinux.org/wiki/Abuild_and_Helpers)
- 镜像状态 https://mirrors.alpinelinux.org/status.json
- 镜像列表 http://nl.alpinelinux.org/alpine/MIRRORS.txt
- Golang
  - https://git.alpinelinux.org/cgit/aports/tree/community/godep/APKBUILD
- aports [How to contribute](https://github.com/alpinelinux/aports/blob/master/.github/CONTRIBUTING.md)
- 提交新的包
  - fork aports
  - 添加新的包
  - 提交 PR
  - 新的包只能添加到 `testing/`, 在结果一段时间测试后才会移动到 `main/` 或 `community/`
  - 提交的信息格式
    - `${repo}/${pkgname}: new aport`
    - `${repo}/${pkgname}: move from testing`
    - `${repo}/${pkgname}: upgrade to 3.1.0`
  - 确保使用 Tab 而不是  空格
- 参考
  - [alpinelinux/abuild](https://github.com/alpinelinux/abuild) - abuild 源码

```bash
# 准备
mkdir buiild && cd build
git clone --depth 50 https://gitlab.alpinelinux.org/alpine/aports

# 启动环境
# 配置缓存
docker run --rm -it \
    -v $PWD:/build \
    -v $PWD/distfiles:/var/cache/distfiles \
    -v $PWD/cache:/etc/apk/cache \
    --name builder wener/base:builder

# 更新仓库
sudo apk update

# git 用户配置
git config --global user.name "Your Full Name"
git config --global user.email "your@email.address"
# 个人信息
[ -e ~/.abuild/abuild.conf ] || { mkdir -p ~/.abuild; echo "PACKAGER=\"$(git config --global user.name) <$(git config --global user.email)>\"" > ~/.abuild/abuild.conf; }
# 生成密钥
grep PACKAGER_PRIVKEY ~/.abuild/abuild.conf || abuild-keygen -ani

# 打包
# community/grpc
cd aports/community/grpc
# 编译构建到 ~/packages
# -K 保留 src 和 pkg - 用于开发调试
# -r 安装依赖
abuild -Kr
```

```bash
# /var/cache/distfiles
abuild checksum
abuild -r
# 位于 $HOME/packages/main/x86_64

abuild -Kf

# 针对单个包操作
abuild package dev

# 移除所有构建时安装的依赖
# 直接编辑 /etc/apk/world 然后 apk fix 也可以
apk del '.makedepends-*'

rsync -avz --no-perms --no-owner --no-group --exclude='src,pkg' mnt/wener abuild/
```

## abuild

```bash
# 默认环境
startdir="${APKBUILD%/*}"
srcdir=${srcdir:-"$startdir/src"}
pkgbasedir=${pkgbasedir:-"$startdir/pkg"}

repo=${startdir%/*}
repo=${repo##*/}

builddir=${builddir:-"$srcdir/$pkgname-$pkgver"}
```

## abuild.conf

- [abuild.conf](https://github.com/alpinelinux/abuild/blob/master/abuild.conf)

```shell
export CFLAGS="-Os -fomit-frame-pointer"
export CXXFLAGS="$CFLAGS"
export CPPFLAGS="$CFLAGS"
export LDFLAGS="-Wl,--as-needed"
export GOFLAGS="-buildmode=pie"
# Do note that these should work with at least GDC and LDC
export DFLAGS="-Os"

export JOBS=2
export MAKEFLAGS=-j$JOBS

# remove line below to disable colors
USE_COLORS=1

# uncomment line below to enable ccache support.
#USE_CCACHE=1

SRCDEST=/var/cache/distfiles

# uncomment line below to store built packages in other location
# The package will be stored as $REPODEST/$repo/$pkgname-$pkgver-r$pkgrel.apk
# where $repo is the name of the parent directory of $startdir.
REPODEST=$HOME/packages/

# PACKAGER and MAINTAINER are used by newapkbuild when creating new aports for
# the APKBUILD's "Contributor:" and "Maintainer:" comments, respectively.
#PACKAGER="Your Name <your@email.address>"
#MAINTAINER="$PACKAGER"

# what to clean up after a successful build
CLEANUP="srcdir bldroot pkgdir deps"

# what to cleanup after a failed build
ERROR_CLEANUP="bldroot deps"
```

## 生成和使用 Patch

```bash
cd src/dahdi-linux-3.1.0/
cp include/kernel.h include/kernel.h.new
nano include/kernel.h.new
diff -u include/kernel.h include/kernel.h.new > ../../kernel-compact-5.4.patch

# 添加 patch
nano APKBUILD
abuild checksum
# 验证 patch 正确性
rm -rf src; abuild prepare && abuild prepare
# 构建
abuild -r
```

## 新增

```bash
# -c 添加 init.d 和 conf.d
newapkbuild -n frp \
  -d 'A fast reverse proxy to help you expose a local server behind a NAT or firewall to the internet.' \
  -l 'Apache-2.0' \
  -u https://github.com/fatedier/frp \
  -c \
  https://github.com/fatedier/frp/archive/v0.35.1.tar.gz
```

## APKBUILD
```bash
install="$pkgname.pre-install $pkgname.post-install"

# cmake check
check() {
  CTEST_OUTPUT_ON_FAILURE=1 make -C build check
}
```

```bash
# 测试打包脚本
rm -rf pkg && abuild rootpkg
```

__pre.install__

```bash
#!/bin/sh

addgroup -S nebula 2>/dev/null
adduser -S -D -H -s /bin/false -G nebula -g nebula nebula 2>/dev/null

exit 0
```

## init tips

```bash
# 支持多 init
[ "${RC_SVCNAME}" != "${RC_SVCNAME##*.}" ] && INSTANCE=${RC_SVCNAME##*.}
```

```bash
# 检查包内内容
tar -tvf ~/packages/testing/x86_64/frp-openrc-*.apk
```

```bash
#!/sbin/openrc-run
name="Nebula Networking"
description="Scalable overlay networking tool"

instance=${RC_SVCNAME##*.}
cfgfile="/etc/nebula/${instance:-config}.yml"
command="/usr/sbin/nebula"
command_args="-config $cfgfile"
command_user="nebula"
supervisor="supervise-daemon"
output_log="/var/log/${RC_SVCNAME}.log"
error_log="/var/log/${RC_SVCNAME}.log"

depend() {
        need net
        use logger dns
        after firewall
}

start_pre() {
        $command -config $cfgfile -test
        checkpath -f -m 0644 -o "$command_user" "$output_log" "$error_log"
        checkpath -f -m 0640 -o "$command_user" "$cfgfile"
}
```

### 开发

- https://wiki.alpinelinux.org/wiki/Creating_an_Alpine_package

```
Usage: newapkbuild [-n PKGNAME] [-d PKGDESC] [-l LICENSE] [-u URL]
       [-a | -C | -m | -p | -y | -r] [-s] [-c] [-f] [-h]
       PKGNAME[-PKGVER] | SRCURL
Options:
  -n  Set package name to PKGNAME (only use with SRCURL)
  -d  Set package description to PKGDESC
  -l  Set package license to LICENSE, use identifiers from:
      <https://spdx.org/licenses/>
  -u  Set package URL
  -a  Create autotools package (use ./configure ...)
  -C  Create CMake package (Assume cmake/ is there)
  -m  Create meson package (Assume meson.build is there)
  -p  Create perl package (Assume Makefile.PL is there)
  -y  Create python package (Assume setup.py is there)
  -r  Crate rust package (Assume Cargo.toml is there)
  -s  Use sourceforge source URL
  -c  Copy a sample init.d, conf.d, and install script
  -f  Force even if directory already exists
  -h  Show this help
```

```
$ abuild -h
usage: abuild [options] [-P REPODEST] [-s SRCDEST] [-D DESCRIPTION] [cmd] ...
       abuild [-c] -n PKGNAME[-PKGVER]
Options:
 -A  Print CARCH and exit
 -c  Enable colored output
 -d  Disable dependency checking
 -D  Set APKINDEX description (default: $repo $(git describe))
 -f  Force specified cmd (skip checks: apk up to date, arch, libc)
 -F  Force run as root
 -h  Show this help
 -k  Keep built packages, even if APKBUILD or sources are newer
 -K  Keep buildtime temp dirs and files (srcdir/pkgdir/deps)
 -m  Disable colors (monochrome)
 -P  Set REPODEST as the repository location for created packages
 -q  Quiet
 -r  Install missing dependencies from system repository (using sudo)
 -s  Set source package destination directory
 -v  Verbose: show every command as it is run (very noisy)

Commands:
  build       Compile and install package into $pkgdir
  check       Run any defined tests concerning the package
  checksum    Generate checksum to be included in APKBUILD
  clean       Remove temp build and install dirs
  cleancache  Remove downloaded files from $SRCDEST
  cleanoldpkg Remove binary packages except current version
  cleanpkg    Remove already built binary and source package
  deps        Install packages listed in makedepends and depends
  fetch       Fetch sources to $SRCDEST (consider: 'abuild fetch verify')
  index       Regenerate indexes in $REPODEST
  listpkg     List target packages
  package     Install project into
  prepare     Apply patches
  rootbld     Build package in clean chroot
  rootpkg     Run 'package', the split functions and create apks as fakeroot
  sanitycheck Basic sanity check of APKBUILD
  snapshot    Create a $giturl or $svnurl snapshot and upload to $disturl
  sourcecheck Check if remote source package exists upstream
  srcpkg      Make a source package
  undeps      Uninstall packages listed in makedepends and depends
  unpack      Unpack sources to $srcdir
  up2date     Compare target and sources dates
  verify      Verify checksums

To activate cross compilation specify in environment:
  CHOST       Arch or hostspec of machine to generate packages for
  CTARGET     Arch or hostspec of machine to generate compiler for
```

# FAQ

## Invalid configuration `x86_64-alpine-linux-musl`: machine `x86_64-alpine-linux` not recognized

- 可以将 `--build` 和 `--host` 设置为 `x86_64-alpine-linux`
- 因为部分项目构建是无法将 `musl` 识别为 `gnu`
