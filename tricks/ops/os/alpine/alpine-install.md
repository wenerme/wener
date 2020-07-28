# AlpineLinux Install
## Tips

## setup-disk
* [setup-disk](https://github.com/alpinelinux/alpine-conf/blob/master/setup-disk.in) 会添加一些基础的
  * sfdisk acct alpine-base
  * linux-flavor
  * bootloader
    * syslinux
  * 如果没指定 apkvol 则会使用 `lbu package` - 包含当前所有的安装包

## 基础依赖

* [alpine-base](https://pkgs.alpinelinux.org/package/v3.12/main/x86_64/alpine-base)
  * alpine-baselayout
    * busybox musl
  * alpine-conf
    * busybox musl openrc
  * alpine-keys
  * apk-tools
    * libcrypto1.1 libssl1.1 musl zlib
  * busybox
    * musl
  * busybox-initscripts
    * busybox openrc
  * busybox-suid
    * busybox musl
  * libc-utils
    * musl-utils
      * musl scanelf
  * openrc
    * busybox musl

### /etc/apk/world/

__minirootfs__

```
alpine-baselayout
alpine-keys
apk-tools
busybox
libc-utils
```

__virt.iso__

```
alpine-base
openssl
```
