# 腾讯云

## Tips
* [Bochs](https://zh.wikipedia.org/zh-hans/Bochs)
* Openstack
* Cloud-init

## FAQ
### 强制导入镜像
* 强制导入的镜像需要手动配置
* 启动时会挂载配置到 /dev/cdrom

```bash
mount -t ios9660 /dev/cdrom /mnt
cat /mnt/qcloud_action/os.conf
```


