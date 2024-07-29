# AlpineLinux 镜像

* 列表
  * https://mirrors.alpinelinux.org/
  * https://mirrors.aliyun.com/alpine/
  * https://mirrors.aliyun.com/alpine/MIRRORS.txt

```bash
# 基于更新时间排序
curl -s https://mirrors.aliyun.com/alpine/MIRRORS.txt | xargs -n1 -I {} sh -c 'echo $(curl -s {}/last-updated) {}' | sort -n

# 同步
# 建议参数 -og --chown=1000:1000 - 覆盖 uid:gid - 默认 100:101
# rsync 服务建议使用官方 rsync.alpinelinux.org - 国内镜像要嘛不支持要嘛偶尔有问题
rsync --archive --update --hard-links --timeout=600 --progress rsync://rsync.alpinelinux.org/alpine/ /alpine/mirror
```
