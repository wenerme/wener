# Docker Volume

## Tips
* [ContainX/docker-volume-netshare](https://github.com/ContainX/docker-volume-netshare)
  * Docker NFS, AWS EFS, Ceph & Samba/CIFS Volume Plugin
* docker [volume create](https://docs.docker.com/engine/reference/commandline/volume_create/)

```bash
# Linux 下 local 接收和 mount 相同的选项
# http://man7.org/linux/man-pages/man8/mount.8.html

# cifs/smb
docker volume create --driver local \
  --opt type=cifs \
  --opt device='//localhost/private' \
  --opt o='username=user1,password=user1pass' \
  mediashare

# nfs
docker volume create --driver local \
  --opt type=nfs \
  --opt o=addr=192.168.1.1,rw \
  --opt device=:/path/to/dir \
  foo

# btrfs
docker volume create --driver local \
    --opt type=btrfs \
    --opt device=/dev/sda2 \
    foo

# tmpfs
docker volume create --driver local \
    --opt type=tmpfs \
    --opt device=tmpfs \
    --opt o=size=100m,uid=1000 \
    foo
```
