

## Docker ps 中显示 IP
```bash
function docker-ips() {
    docker ps | while read line; do
        if `echo $line | grep -q 'CONTAINER ID'`; then
            echo -e "IP ADDRESS\t$line"
        else
            CID=$(echo $line | awk '{print $1}');
            IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" $CID);
            printf "${IP}\t${line}\n"
        fi
    done;
}
```

https://github.com/ajohnstone/dot-files/blob/master/bash.d/bash/docker

```bash
# 移除旧的容器
docker rm `docker ps -aq`
docker ps -a | grep 'weeks ago' | awk '{print $1}' | xargs --no-run-if-empty docker rm
# 删除所有退出的容器
docker rm $(docker ps --all -q -f status=exited)


# Stats 显示名字
docker stats $(docker ps --format={{.Names}})

# 获取容器 IP
docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${CID}

# 查看完整的启动命令
docker inspect  -f "{{.Name}} {{.Config.Cmd}}" $(docker ps -a -q)
docker ps -a --no-trunc

# 修改 Docker machine 内存和 CPU
docker-machine stop
VBoxManage modifyvm default --cpus 2
VBoxManage modifyvm default --memory 4096
docker-machine start

# 创建时指定内存
docker-machine create -d virtualbox --virtualbox-memory 4096 default

# 如果被墙,可以从一台已经拉取过的机器上直接转移镜像
docker pull gcr.io/google_containers/etcd-amd64:3.0.4
docker save gcr.io/google_containers/etcd-amd64:3.0.4 | gzip > etcd-amd64.3.0.4.tar.gz
rsync -avzhe ssh ./images/ root@192.168.2.2:/root/images/

# 然后在转移到的机器上导入
zcat ~/images/etcd-amd64.3.0.4.tar.gz | docker load

```

## FAQ
## No xxx limit support
```
WARNING: No swap limit support
WARNING: No memory limit support
```

```bash
nano /etc/default/grub
# GRUB_CMDLINE_LINUX_DEFAULT="cgroup_enable=memory swapaccount=1"
grub-update
reboot
```

## 'dumb': unknown terminal type.
```bash
cd /usr/share/terminfo
mkdir d
cp v/vt100 d/dumb

# 或者修改为存在的 TERM
export TERM=xterm

```

## docker-machine --help

```bash
$ docker-machine create -d virtualbox --help
Usage: docker-machine create [OPTIONS] [arg...]

Create a machine

Description:
   Run 'docker-machine create --driver name' to include the create flags for that driver in the help text.

Options:

   --driver, -d "none"											Driver to create machine with. [$MACHINE_DRIVER]
   --engine-env [--engine-env option --engine-env option]						Specify environment variables to set in the engine
   --engine-insecure-registry [--engine-insecure-registry option --engine-insecure-registry option]	Specify insecure registries to allow with the created engine
   --engine-install-url "https://get.docker.com"							Custom URL to use for engine installation [$MACHINE_DOCKER_INSTALL_URL]
   --engine-label [--engine-label option --engine-label option]						Specify labels for the created engine
   --engine-opt [--engine-opt option --engine-opt option]						Specify arbitrary flags to include with the created engine in the form flag=value
   --engine-registry-mirror [--engine-registry-mirror option --engine-registry-mirror option]		Specify registry mirrors to use [$ENGINE_REGISTRY_MIRROR]
   --engine-storage-driver 										Specify a storage driver to use with the engine
   --swarm												Configure Machine with Swarm
   --swarm-addr 											addr to advertise for Swarm (default: detect and use the machine IP)
   --swarm-discovery 											Discovery service to use with Swarm
   --swarm-experimental											Enable Swarm experimental features
   --swarm-host "tcp://0.0.0.0:3376"									ip/socket to listen on for Swarm master
   --swarm-image "swarm:latest"										Specify Docker image to use for Swarm [$MACHINE_SWARM_IMAGE]
   --swarm-master											Configure Machine to be a Swarm master
   --swarm-opt [--swarm-opt option --swarm-opt option]							Define arbitrary flags for swarm
   --swarm-strategy "spread"										Define a default scheduling strategy for Swarm
   --tls-san [--tls-san option --tls-san option]							Support extra SANs for TLS certs
   --virtualbox-boot2docker-url 									The URL of the boot2docker image. Defaults to the latest available version [$VIRTUALBOX_BOOT2DOCKER_URL]
   --virtualbox-cpu-count "1"										number of CPUs for the machine (-1 to use the number of CPUs available) [$VIRTUALBOX_CPU_COUNT]
   --virtualbox-disk-size "20000"									Size of disk for host in MB [$VIRTUALBOX_DISK_SIZE]
   --virtualbox-host-dns-resolver									Use the host DNS resolver [$VIRTUALBOX_HOST_DNS_RESOLVER]
   --virtualbox-hostonly-cidr "192.168.99.1/24"								Specify the Host Only CIDR [$VIRTUALBOX_HOSTONLY_CIDR]
   --virtualbox-hostonly-nicpromisc "deny"								Specify the Host Only Network Adapter Promiscuous Mode [$VIRTUALBOX_HOSTONLY_NIC_PROMISC]
   --virtualbox-hostonly-nictype "82540EM"								Specify the Host Only Network Adapter Type [$VIRTUALBOX_HOSTONLY_NIC_TYPE]
   --virtualbox-import-boot2docker-vm 									The name of a Boot2Docker VM to import [$VIRTUALBOX_BOOT2DOCKER_IMPORT_VM]
   --virtualbox-memory "1024"										Size of memory for host in MB [$VIRTUALBOX_MEMORY_SIZE]
   --virtualbox-nat-nictype "82540EM"									Specify the Network Adapter Type [$VIRTUALBOX_NAT_NICTYPE]
   --virtualbox-no-dns-proxy										Disable proxying all DNS requests to the host [$VIRTUALBOX_NO_DNS_PROXY]
   --virtualbox-no-share										Disable the mount of your home directory [$VIRTUALBOX_NO_SHARE]
   --virtualbox-no-vtx-check										Disable checking for the availability of hardware virtualization before the vm is started [$VIRTUALBOX_NO_VTX_CHECK]
```
