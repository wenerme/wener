# Qemu Image

## 磁盘压缩
* [Shrink Qcow2 Disk Files](https://pve.proxmox.com/wiki/Shrink_Qcow2_Disk_Files)
* http://blog.programster.org/qemu-img-cheatsheet

```bash
# 主机内执行
fstrim -av

# 转换后会变小
qemu-img convert -O qcow2 alpine.img shrink.qcow2
# 也可以进行压缩，会更小，但启动时会恢复
qemu-img convert -O -c qcow2 alpine.img shrink.qcow2
```

# FAQ
## 合并 backing 文件
* https://libvirt.org/kbase/backing_chains.html

```bash
# 查看 backing
qemu-img info --backing-chain test.qcow2
# 假设 test.qcow2 的 base 是 base.qcow2
cp base.qcow2 tmp.qcow2

# 修改 base
qemu-img rebase -b tmp.qcow2 test.qcow2
# 提交到 base
qemu-img commit test.qcow2
# 移除旧的文件
mv tmp.qcow2 test.qcow2
```
