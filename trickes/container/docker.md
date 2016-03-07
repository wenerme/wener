
# Setup
```
docker-machine start default
eval $(docker-machine env default)
docker pull java:8

```

## SSHD service
* __Dockerfile__

```
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

```
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
