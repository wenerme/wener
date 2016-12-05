# Docker


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
# Boot2docker 位于 /var/lib/boot2docker/profile
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
* 阿里镜像 http://mirrors.aliyun.com/
* 阿里容器管理接口有加速服务


## 安装

```bash
# 使用安装脚本安装
curl -sSL https://get.docker.com/ | sh

# 二进制安装
# 官方文档 http://docs.master.dockerproject.org/engine/installation/binaries/
# init 脚本 https://github.com/docker/docker/tree/master/contrib/init

# 安装最新构建的 dev 版
curl -LOk https://master.dockerproject.org/linux/amd64/docker-1.13.0-dev.tgz
tar -xvzf docker-*.tgz
mv docker/* /usr/bin/
curl -LOk https://raw.githubusercontent.com/docker/docker/master/contrib/init/systemd/docker.service
curl -LOk https://raw.githubusercontent.com/docker/docker/master/contrib/init/systemd/docker.socket
mv docker.{service,socket} /lib/systemd/system/

systemctl daemon-reload
systemctl restart docker

# 如果有旧的 sysv 启动脚本 /etc/init.d/docker 启动时可能会使用该脚本
```

https://www.daocloud.io/mirror

* http://mirrors.aliyun.com/help/docker-engine

```bash
# 使用阿里提供的仓库进行安装会非常快
curl -sSL http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh -
# 安装完毕后为当前用户添加权限,需要退出重新登录才能生效
sudo usermod -aG docker $USER
```

__Ubuntu__

```bash
apt-get update
apt-get install apt-transport-https ca-certificates
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
# 添加 Docker 仓库
nano /etc/apt/sources.list.d/docker.list
# 14.04 LTS
# deb https://apt.dockerproject.org/repo ubuntu-trusty main
# 16.04 LTS
# deb https://apt.dockerproject.org/repo ubuntu-xenial main
# 更新 APT 包索引
# 在国内可使用阿里镜像仓库 http://mirrors.aliyun.com/docker-engine
apt-get update
# 删除旧的包
apt-get purge lxc-docker
# 验证 APT 是从正确的仓库拉取的
apt-cache policy docker-engine
# 安装基础内容
apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual
apt-get install docker-engine
service docker start
```

* [Ubuntu Install Docker](https://docs.docker.com/engine/installation/linux/ubuntulinux/)

## Tips

* Docker machine root 密码为 `tcuser`
* 也可以通过 `sudo su root` 切换为 root
* Linux 下的配置文件 /etc/default/docker

```bash
# stats 中显示容器名字
docker stats $(docker ps --format={{.Names}})

# 可通过 JSON 文件来配置 docker daemon, 但目前没有办法检测配置是否成功 https://github.com/docker/docker/issues/21559
# /etc/docker/daemon.json

# Boot2docker
# 配置文件
vi /var/lib/boot2docker/profile
# 重启服务
/etc/init.d/docker restart

# 移除停止容器
docker rm `docker ps --no-trunc -aq`
# 数据清理
docker images --no-trunc | grep '<none>' | awk '{ print $3 }' | xargs -r docker rmi
docker volume ls -qf dangling=true | xargs -r docker volume rm

# 使用 Docker Machine 启动
docker-machine start default
eval $(docker-machine env default)
docker pull java:8

# Docker machine 只会将 home 下的目录挂载到虚拟机中,如果要挂载其他的目录需要自己添加
docker-machine stop
VBoxManage sharedfolder add default --name /hetc --hostpath /etc --automount
docker-machine start
docker-machine ssh default 'sudo mkdir --parents /hetc'
docker-machine ssh default 'sudo mount -t vboxsf hetc /hetc'
docker run --rm -v /hetc:/hetc ubuntu


```

### INCLUDE

由于 Dockerfile 不支持 INCLUDE, 可以考虑使用 cpp

```Makefile
Dockerfile: Dockerfile.in *.docker
  cpp -o Dockerfile Dockerfile.in

build: Dockerfile
  docker build -rm -t my/image .
```

```Dockerfile
FROM ubuntu:latest
MAINTAINER me

#include "imagemagick.docker"
#include "redis.docker"
```

### 代理

Docker 会使用 HTTP_PROXY 作为代理,代理配置成功后可在 `docker info` 看到代理配置

代理配置文件

* `/etc/default/docker`

如果代理配置不生效,可直接修改 systemd 定义文件,例如在 Ubuntu 16.04 下为 `/lib/systemd/system/docker.service`,在 Service 节下添加 `Environment=HTTP_PROXY=http://10.0.0.1:7777`, 然后 `systemctl daemon-reload` 再重启 docker 即可,配置可通过 `systemctl show --property=Environment docker` 查看

* [Control and configure Docker with systemd](https://docs.docker.com/engine/admin/systemd/)

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

## Refernece

* [Docker Master Binaries](https://master.dockerproject.org/)
* [Docker Master Document](http://docs.master.dockerproject.org/)
* [Shipyard](https://github.com/shipyard/shipyard) Composable Docker Management
  * 可管理 Container,Image,Registry,Auth,Node,Log 等
  * 有网页端的 Console
  * 目前不支持 1.12 Docker Swarm
* [Tsuru](https://github.com/tsuru/tsuru) is an extensible and open source Platform as a Service software.
* [Docket](https://github.com/netvarun/docket) Custom docker registry that allows for lightning fast deploys through bittorrent
* [dockerfiles](https://github.com/jfrazelle/dockerfiles) Various Dockerfiles
* [ui-for-docker](https://github.com/kevana/ui-for-docker) An unofficial web interface for Docker, formerly known as DockerUI
* https://github.com/wsargent/docker-cheat-sheet
* https://github.com/veggiemonk/awesome-docker
* [Portus](https://github.com/SUSE/Portus) Authorization service and frontend for Docker registry (v2)
* [docker-swarm-visualizer](https://github.com/manomarks/docker-swarm-visualizer) A visualizer for Docker Swarm using the Docker Remote API, Node.JS, and D3
* [logspout](https://github.com/gliderlabs/logspout) Log routing for Docker container logs
