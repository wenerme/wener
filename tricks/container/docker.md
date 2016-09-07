
# Setup
```bash
docker-machine start default
eval $(docker-machine env default)
docker pull java:8
```

## SSHD service
* __Dockerfile__

```Dockerfile
FROM java:8
MAINTAINER Wener <wener@wener.me>

RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:screencast' | chpasswd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

```bash
docker build -t local-sshd .
docker run -d -p 2331:22 --name dock-1 local-sshd

# Run a lot
NUM=5
VOLUME=~/opt/volume
for i in $(seq 1 $NUM); do
  mkdir -p $VOLUME/dock-$i
  docker run -d -v $VOLUME/dock-$i:/opt -p 233$i:22 --name dock-$i local-sshd
done

# Cleanup
for i in $(seq 1 $NUM); do docker stop dock-$i;docker rm dock-$i; done

# Generate ansible inventory

# 不一样的工具,获取的 IP 不同,如果 ansible 也是在 docker 中,则可用后者
# 使用前者只能用于 SSH, 不能用于容器内部服务通信地址
# docker-machine ip default
# docker inspect --format '{{ .NetworkSettings.IPAddress }}' dock-my

for i in $(seq 1 $NUM); do
  echo "dock-$i ansible_host=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' dock-$i) ansible_port=233$i ansible_user=root ansible_ssh_pass=screencast";
done


docker run --rm -it -v ~:/host williamyeh/ansible:ubuntu14.04-onbuild bash
```

* [Dockerizing an SSH daemon service](https://docs.docker.com/engine/examples/running_ssh_service/)

## 修改镜像
```bash
# 标准配置位于 /etc/sysconfig/docker
# 配置参数格式为 --registry-mirror=镜像地址
# 基于 https://docs.docker.com/engine/installation/linux/centos/ 在 CentOS 7 上安装时
# 需要修改 service 启动参数 /usr/lib/systemd/system/docker.service
# 然后加载配置并重启服务
sudo systemctl daemon-reload
sudo service docker restart
```

* 可使用 daocloud 提供的镜像服务 https://www.daocloud.io/mirror
* 用于在 Linux 下修改镜像的脚本 curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s 镜像地址
* 也可在 /etc/default/docker 中添加 HTTP_PROXY 来拉取镜像

## Tips

* Docker machine root 密码为 `tcuser`
* 也可以通过 `sudo su root` 切换为 root
* Linux 下的配置文件 /etc/default/docker

```bash
# stats 中显示容器名字
docker stats $(docker ps --format={{.Names}})
```

### 时区

启动时修改时区
```
$ docker run --rm busybox date
Thu Mar 20 04:42:02 UTC 2014
$ docker run --rm -v /etc/localtime:/etc/localtime  busybox date
Thu Mar 20 14:42:20 EST 2014
$ FILE=$(mktemp) ; echo $FILE ; echo -e "Europe/Brussels" > $FILE ; docker run --rm -v $FILE:/etc/timezone -v /usr/share/zoneinfo/Europe/Brussels:/etc/localtime busybox date
/tmp/tmp.JwL2A9c50i
Thu Mar 20 05:42:26 CET 2014
$ docker run -t -i --rm -e TZ=Europe/London busybox date
```

__Dockerfile__ 修改时区
```
RUN echo America/New_York | sudo tee /etc/timezone && sudo dpkg-reconfigure --frontend noninteractive tzdata
```

修改 MySQL 的时区
```bash
# 方法一 修改容器时区,重启 mysql
docker exec -it MySQL bash
# 时区信息 /usr/share/zoneinfo
# 直接修改 echo Asia/Shanghai > /etc/timezone
# 获取所有时区 timedatectl list-timezones
# 直接修改时区 timedatectl set-timezone Europe/Athens
# 在容器里可能 timedatectl 无法使用

# 交互式选择时区
dpkg-reconfigure tzdata
/etc/init.d/mysql restart

# 方法二 SET GLOBAL time_zone = 'Asia/Shanghai';
# 方法三 my.cnf [mysqld] default-time-zone='Asia/Shanghai'
```
