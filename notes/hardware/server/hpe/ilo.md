---
title: iLO
---

# iLO

- 固件升级下载
  - [iLO2](http://h20564.www2.hpe.com/hpsc/swd/public/readIndex?sp4ts.oid=1135772)
  - iLO3
  - [iLO4](http://h20565.www2.hpe.com/hpsc/swd/public/readIndex?sp4ts.oid=5228286)
- [HP iLO 2 脚本和命令行指南](http://h20565.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c03351064)
- [HP iLO 3 脚本和命令行指南](http://h20565.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c02774508)
- [HPE iLO 4 脚本和命令行指南](http://h20566.www2.hpe.com/hpsc/doc/public/display?docId=c03334060)
- [HPE iLO 4 Scripting and Command Line Guide](http://h20565.www2.hpe.com/hpsc/doc/public/display?docId=c03334058)

## iLO2

- 远程控制回退删除可能映射为 <key>Ctrl-H</key>

```bash
################
# 挂载远程 ISO
################
# 由于 iLO2 虚拟媒介只能通过 Java Applet 选择,并且很难用,不能直接指定 URL,所以有了以下方法
# 进入 iLO2 命令行
ssh admin@ilo2 -vvv -o HostKeyAlgorithms=ssh-rsa
# 进入到虚拟设备
cd /map1/oemhp_vm1/cddr1
# 设置挂载地址, URL 最长 80 个字符
set oemhp_image=http://192.168.11.240:2015/spp-2016.10.0.iso
# 从该设备启动一次
set oemhp_boot=connect
set oemhp_boot=once
# 查看当前状态
show
# 重启
reset
# 弹出
set /map1/oemhp_vm1/cddr1 oemhp_boot=disconnect
```

# FAQ

## iLO2 访问出现 SSL 错误

尝试使用 Safari 或者 IE 访问, Chrome 出现该错误

## SSH 无法登陆 iLO2

```bash
# 添加 HostKeyAlgorithms 选项
ssh yky@ilo2 -vvv -o HostKeyAlgorithms=ssh-rsa
```
