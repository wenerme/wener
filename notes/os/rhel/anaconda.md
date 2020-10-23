---
title: Anaconda
---

# anaconda
* 是什么
  * RHEL 系列的 Linux 系统安装器
* [rhinstaller/anaconda](https://github.com/rhinstaller/anaconda)
* wikipedia [Anaconda](https://en.wikipedia.org/wiki/Anaconda_(installer))

## Kickstart
* 是什么
  * 快速安装配置
  * 自动化系统安装
  * 安装器参数配置
* 生成器 https://access.redhat.com/labs/kickstartconfig/

```bash
yum install pykickstart
# 校验
ksvalidator ks.conf
```

```shell
lang en_US
keyboard us
timezone Asia/Shanghai --isUtc
# root:root
rootpw $1$k5y95rV/$IXnt41W62IefrGconPHUP/ --iscrypted
#platform x86, AMD64, or Intel EM64T
text
cdrom
bootloader --location=mbr --append="rhgb quiet crashkernel=auto"
zerombr
clearpart --all --initlabel
autopart
auth --passalgo=sha512 --useshadow
selinux --disabled
firewall --enabled --ssh
skipx
firstboot --disable
%packages
@^minimal-environment
kexec-tools
%end
```
