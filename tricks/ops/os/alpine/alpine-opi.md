# Alpine Orange Pi

## Tips

http://linux-sunxi.org/Boot_Process
https://wiki.archlinux.org/index.php/Orange_Pi

http://linux-sunxi.org/Bootable_SD_card
http://linux-sunxi.org/Mainline_U-Boot
http://linux-sunxi.org/Allwinner_SoC_Family
https://github.com/atlury/Alpine-Linux-Allwinner-H3-Distro
http://linux-sunxi.org/Boot_Process



```bash
# 创建镜像和制作分区
DEV=h6.img 
dd if=/dev/zero of=$DEV bs=1 count=0 seek=1G
dd conv=notrunc if=/dev/zero of=$DEV bs=1M count=1
# 第一个分区 126M FAT16 Boot
fdisk h6.img

```
