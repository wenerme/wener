# Systemd


## Tips

* [systemd.unit](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)
* [systemctl manpage](https://www.freedesktop.org/software/systemd/man/systemctl.html)
* [How To Use Systemctl to Manage Systemd Services and Units](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units)
* 配置目录
  * `/etc/systemd/system/docker.service.d/*.conf`
  * `/etc/systemd/system/`
  * `/lib/systemd/system/`


```bash
# 查看配置
systemctl show docker
# 修改 Service 需要重载
systemctl daemon-reload
# 查看定义的配置
systemctl show --property=Environment docker
# 重启服务
systemctl restart docker

systemctl list-units --all
systemctl list-units --type=service
systemctl list-unit-files
# 查看 service 文件
systemctl cat docker.service
# 查看依赖
systemctl list-dependencies sshd.service
# mask 后的服务不能被启动
systemctl mask nginx.service
systemctl unmask nginx.service
# 编辑 service 文件
systemctl edit nginx.service
# 编辑完整的文件,而不是一个片段,会生成部分内容
systemctl edit --full nginx.service
```

## Service

## Unit

## Example
* [docker systemd](https://github.com/docker/docker/blob/master/contrib/init/systemd/)
