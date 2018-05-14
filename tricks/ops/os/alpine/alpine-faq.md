# Alpine FAQ


## apk 1 error
apk 操作时显示有错误, 例如 `1 error; 241 MiB in 67 packages`.

```bash
# 即可
apk fix
```

## 内核风格/kernel flavors
https://git.alpinelinux.org/cgit/aports/tree/main/linux-hardened/APKBUILD
https://git.alpinelinux.org/cgit/aports/tree/main/linux-vanilla

* 区别在于不同的内核编译参数和安全补丁
* hardened
  * 支持架构: x86_64, x86, armhf
  * 启用了内核安全模块
  * grsecurity
  * pax
  * 安装完成后 500m 左右, boot 20m 左右
    * 固件: 210m
    * 内核模块: 270m
* virthardened
  * 支持架构: x86_64, x86
  * 安全和 hardened 相同
  * 调整内核参数以适应虚拟化环境
  * 镜像更小, 更快, 没有默认驱动和固件
  * 安装完成后 100m 左右, boot 13m 左右
* vanilla
  * 支持架构: x86_64, x86, s390x, ppc64le, ppc, armhf, aarch64
  * 适用于调试
  * 适用于其他风格不支持的架构
  * 无安全部相关的补丁和内核配置
* virt
  * 支持架构: x86_64, x86
  * 适用于虚拟化环境


* virt
  * 电源管理
  * CPU 管理
  * PCI 控制器
  * 性能监控
  * 内存
  * 移除特殊硬件相关配置
    * 无线
    * 蓝牙
    * IRDA
    * NFC
    * SIP
    * I2C
    * 键盘
    * 鼠标
    * 触屏
    * 博通 SoC
    * 物理控制
      * 电源重置
    * 雷电
    * 安卓
  * 不会构建固件
  * 移除硬件相关驱动
  * 移除硬件相关兼容设置
  * 添加 XEN
  * 移除 JFFS, UBIFS


## virt vs standard


## ISSUES
## /dev/null/utmp: Not a directory
* [#3282](https://bugs.alpinelinux.org/issues/3282) - users: /dev/null/utmp: Not a directory
  * 执行 who, last, screen 时
