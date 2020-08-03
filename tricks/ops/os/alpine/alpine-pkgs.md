---
id: alpine-pkgs
title: Alpine 包维护
---

## Tips
* https://github.com/alpinelinux/aports/blob/master/.github/CONTRIBUTING.md


* [Creating an Alpine package](https://wiki.alpinelinux.org/wiki/Creating_an_Alpine_package)
* https://wiki.alpinelinux.org/wiki/APKBUILD_Reference
* [Apkindex format](https://wiki.alpinelinux.org/wiki/Apkindex_format)
* [Abuild and Helpers](https://wiki.alpinelinux.org/wiki/Abuild_and_Helpers)
* 镜像状态 - https://mirrors.alpinelinux.org/status.json
* Golang
  * https://git.alpinelinux.org/cgit/aports/tree/community/godep/APKBUILD
* 提交新的包
  * Fort aports
  * 添加新的包
  * 提交 PR
  * 新的包只能添加到 `testing/`, 在结果一段时间测试后才会移动到 `main/` 或 `community/`
  * 提交的信息格式
    * `${repo}/${pkgname}: new aport`
    * `${repo}/${pkgname}: move from testing`
    * `${repo}/${pkgname}: upgrade to 3.1.0`
  * 确保使用 Tab 而不是空格


```bash
# 环境设置
DEV_USER=dev

apk add alpine-sdk
adduser $DEV_USER
echo "$DEV_USER  ALL=(ALL) ALL" >> /etc/sudoers

# 修改 PACKAGER 信息
vi /etc/abuild.conf
# echo 'PACKAGER="wener <wenermail@gmail.com>"' >> /etc/abuild.conf
# 里面的 JOB 参数可修改为核数
addgroup $DEV_USER abuild

# 缓存目录
mkdir -p /var/cache/distfiles
# 给所有人写的权限
# 也可以只给 abuild 组 chgrp abuild /var/cache/distfiles; chmod g+w /var/cache/distfiles
chmod a+w /var/cache/distfiles

# 切换为 $DEV_USER 登陆
# 生成秘钥
# 会生成到 $HOME/.abuild 如果已经有了，直接拷贝即可
abuild-keygen -a -i
# /etc/apk/keys
# echo /build/.abuild/build.rsa | abuild-keygen -a -i

#git config --global user.name "Your Full Name"
#git config --global user.email "your@email.address"
mkdir -p /gits
cd /gits
git clone git://git.alpinelinux.org/aports
# 查看相关帮助
abuild -h
```

```bash
# /var/cache/distfiles
abuild checksum
abuild -r
# 位于 $HOME/packages/main/x86_64

abuild -Kf

# 针对单个包操作
abuild package dev

rsync -avz --no-perms --no-owner --no-group --exclude='src,pkg' mnt/wener abuild/
```

```bash
docker run --rm -it -v $PWD:/build -v $PWD/distfiles:/var/cache/distfiles -u builder wener/edge:builder

docker run --rm -it -v $PWD:/src --entrypoint bash wener/base:builder

chown 1000:1000 -R build/
docker run --rm -it -v $PWD:/build -v $PWD/distfiles:/var/cache/distfiles -u builder --entrypoint bash wener/base:builder
```

* Invalid configuration `x86_64-alpine-linux-musl`: machine `x86_64-alpine-linux` not recognized
  * 可以将 `--build` 和 `--host` 设置为 `x86_64-alpine-linux`
  * 因为部分项目构建是无法将 `musl` 识别为 `gnu`

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

### 开发
* https://wiki.alpinelinux.org/wiki/Creating_an_Alpine_package


```
$ abuild -h
usage: abuild [options] [-P REPODEST] [-s SRCDEST] [-D DESCRIPTION] [cmd] ...
       abuild [-c] -n PKGNAME[-PKGVER]
Options:
 -A  Print CARCH and exit
 -c  Enable colored output
 -d  Disable dependency checking
 -D  Set APKINDEX description (default: $repo $(git describe))
 -f  Force specified cmd, even if they are already done
 -F  Force run as root
 -h  Show this help
 -i  Install PKG after successful build
 -k  Keep built packages, even if APKBUILD or sources are newer
 -K  Keep buildtime temp dirs and files (srcdir/pkgdir/deps)
 -m  Disable colors (monochrome)
 -P  Set REPODEST as the repository location for created packages
 -q  Quiet
 -r  Install missing dependencies from system repository (using sudo)
 -R  Recursively build and install missing dependencies (using sudo)
 -s  Set source package destination directory
 -u  Recursively build and upgrade all dependencies (using sudo)
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
  fetch       Fetch sources to $SRCDEST and verify checksums
  index       Regenerate indexes in $REPODEST
  listpkg     List target packages
  package     Create package in $REPODEST
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



## Docker 环境设置

```bash
# 基于 Docker 搭建开发环境
# ==========
# 使用 abuild 目录作为工作空间
mkdir -p abuild && cd abuild

# distfiles 存放构建过程中下载的源码
# wener 存放 aports 等源码
mkdir -p {wener,distfiles}
# builder 用户的 uid 为 1000
docker run --rm -it -v $PWD:/build -v $PWD/distfiles:/var/cache/distfiles -u 1000 wener/base:builder

# 更新包索引
sudo apk update
# 第一次运行生成秘钥
abuild-keygen -a

# 添加公钥和本地仓库
echo /build/packages/wener | sudo tee -a /etc/apk/repositories
sudo cp ~/*.rsa.pub /etc/apk/keys/

# 拉取 aports 仓库
git clone https://github.com/alpinelinux/aports
# 到具体的项目
cd aports/main/asterisk
# 构建
abuild
```
