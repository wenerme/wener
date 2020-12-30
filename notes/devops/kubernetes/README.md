---
id: kubernetes
title: Kubernetes
---

# Kubernetes

* [Reference](http://kubernetes.io/docs/user-guide)
* [Guide](http://kubernetes.io/docs)
* [Kubernetes the hard way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
* [Kubernetes vs Openshift vs Tectonic](https://blog.netsil.com/kubernetes-vs-openshift-vs-tectonic-comparing-enterprise-options-e3a34dc60519)
* [ramitsurana/awesome-kubernetes](https://github.com/ramitsurana/awesome-kubernetes)

## Install

### kubeadm

从 1.4 开始, Kubernetes 提供了 kubeadm 的测试版,简单的[使用说明](http://kubernetes.io/docs/getting-started-guides/kubeadm/) 描述了如何以类似于 docker swarm 初始化集群的方式来部署 Kubernetes.

```bash
# 如果你有代理,则先设置好代理
proxy_host=10.1.1.1
export https_proxy=http://$proxy_host:7777
export http_proxy=http://$proxy_host:7777

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF > /etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y docker.io kubelet kubeadm kubectl kubernetes-cni

# 注意
# 由于 kubeadm 使用的大多服务都是在容器中的,因此一定要记得为 docker 设置好代理

# 启动 Master 节点
# 如果有多个网卡,通过  --api-advertise-addresses=<地址> 指定
kubeadm init
# 允许 Master 节点执行 POD, 也可用于单节点测试
kubelet taint nodes --all dedicated-

# 在其他节点上执行,加入到集群
kubeadm join --token <上面生成的 Token> <上面给出的地址>
```

__清理集群__

```bash
systemctl stop kubelet;
docker rm -f $(docker ps -q); mount | grep "/var/lib/kubelet/*" | awk '{print $3}' | xargs umount 1>/dev/null 2>/dev/null;
rm -rf /var/lib/kubelet /etc/kubernetes /var/lib/etcd /etc/cni;
ip link set cbr0 down; ip link del cbr0;
ip link set cni0 down; ip link del cni0;
systemctl start kubelet
```

#### Tips
使用 kubeadm 时会在 /etc/systemd/system/kubelet.service.d 生成相应的配置,例如 10-kubeadm.conf.

__10-kubeadm.conf__

kubelet 参数可参考 http://kubernetes.io/docs/admin/kubelet/
cni 可参考 http://kubernetes.io/docs/admin/network-plugins/

```
[Service]
Environment="KUBELET_KUBECONFIG_ARGS=--kubeconfig=/etc/kubernetes/kubelet.conf --require-kubeconfig=true"
Environment="KUBELET_SYSTEM_PODS_ARGS=--pod-manifest-path=/etc/kubernetes/manifests --allow-privileged=true"
Environment="KUBELET_NETWORK_ARGS=--network-plugin=cni --cni-conf-dir=/etc/cni/net.d --cni-bin-dir=/opt/cni/bin"
Environment="KUBELET_DNS_ARGS=--cluster-dns=100.64.0.10 --cluster-domain=cluster.local"
Environment="KUBELET_EXTRA_ARGS=--v=4"
ExecStart=/usr/bin/kubelet $KUBELET_KUBECONFIG_ARGS $KUBELET_SYSTEM_PODS_ARGS $KUBELET_NETWORK_ARGS $KUBELET_DNS_ARGS $KUBELET_EXTRA_ARGS
```

## 最佳实践
* https://kubernetes.io/docs/setup/best-practices/
* https://rancher.com/blog/2019/2019-01-17-101-more-kubernetes-security-best-practices/

#### FAQ

##### 安装好后无法使用 kubectl, 提示说地址错误
需要手动指定地址 `kubectl --server=127.0.0.1:8080 get nodes`, 因为启动时的API 服务器地址为 `127.0.0.1:8080`,具体指定位置在 `cat /etc/kubernetes/manifests/kube-apiserver.json`, 该地址暂时无法更改.

由于绑定的地址是 `127.0.0.1`, 所以如果想要在本地使用,则建议在本地通过转发使用 `ssh -vNL 8082:127.0.0.1:8080 主机地址`, 然后则可以使用 `kubectl -s 127.0.0.1:8082 get nodes` 进行操作了.

> TIPS:
> 通过 `alias k="kubectl -s 127.0.0.1:8082"` 简化操作

##### 阻塞在 Waiting for 'control plane to become ready'

也有别人遇到过该问题 https://github.com/kubernetes/kubernetes/issues/33544 ,我也遇到,但为 Docker 添加代理后就没问题了,应该是拉取容器造成的.

##### 限制
由于 kubeadm 还处于 beta 版,因此还会有很多问题

1. 创建的集群不能和云提供商进行集成,也就是说用不了 GCE 和 AWS 的负载均衡和持久化存储.建议使用 NodePort 来规避改问题.
2. 集群只能有一个 Master, 多个 Master 的实现还在进行中.建议定义备份 etcd 数据(/var/lib/etcd) 来避免数据丢失的问题.如果数据丢失,整个集群必须从头开始构建.
3. `kubectl logs` 无法使用,可追踪该问题 #22770.可通过使用 `docker logs` 来查看日志.
4. 目前还没有很好的办法生成 kubeconfig 配置用于远程授权.可通过 `scp root@<master>:/etc/kubernetes/admin.conf` 来拉取主配置,然后在远程使用时通过 `kubectl --kubeconfig ./admin.conf` 的形式来使用.

### docker-multinode
```bash
git clone --depth=1 https://github.com/kubernetes/kube-deploy
cd kube-deploy/docker-multinode/
# 使用 docker 安装相对比较简单,需要下载的只有镜像
# 使用 docker 一定要做好代理,否则下载 gcr 的内容会下载失败
# 做 docker 的镜像时,不只是对系统的 docker 做镜像,还需要修改 docker-bootstrap 中, bootstrap 使用到的 daemon 的代理

su root
./master.sh
# 启动使用的镜像 https://github.com/kubernetes/kubernetes/tree/master/cluster/images/hyperkube
# 查看启动运行的服务,可修改参数
# docker run --rm -it gcr.io/google_containers/hyperkube-amd64:v1.3.6 ls /etc/kubernetes/manifests-multi
# 可设置的参数可参考 http://kubernetes.io/docs/admin/kube-apiserver/

# 检查 Bootstrap 启动的程序是否正确
docker -H unix:///var/run/docker-bootstrap.sock ps
# 检查相关的进程是否启动
docker ps
# 主节点启动成功后再从节点上执行
# MASTER_IP=主节点地址 ./worker.sh

# 安装 kubectl
# 1.3.6
curl -sSL https://storage.googleapis.com/kubernetes-release/release/v[KUBECTL_VERSION]/bin/linux/amd64/kubectl > /usr/local/bin/kubectl
chmod +x /usr/local/bin/kubectl

# 安装 Helm
curl -s https://get.helm.sh | bash
mv $PWD/helmc /usr/local/bin/helmc
# 安装 Deis
helmc repo add deis https://github.com/deis/charts

# 具体版本可查看 https://github.com/deis/charts
# fetches the chart into a local workspace
helmc fetch deis/workflow-v2.4.1
# generates various secrets
helmc generate -x manifests workflow-v2.4.1
# injects resources into  your cluster
helmc install workflow-v2.4.1
# 检查安装状态
kubectl --namespace=deis get pods

# 安装 Deis 命令行
curl -sSL http://deis.io/deis-cli/install-v2.sh | bash
mv $PWD/deis /usr/local/bin/deis
kubectl --namespace=deis get svc deis-router
# 使用上个命令中的 ExternalIP


```

* :8080/ui 管理面板
* :4194 cAdvisor



### kube-up - Ubuntu
http://kubernetes.io/docs/getting-started-guides/ubuntu/

```bash
git clone --depth 1 https://github.com/kubernetes/kubernetes.git


export nodes="root@10.25.30.127 root@10.25.17.232 root@10.25.24.116"
export role="ai i i"
export NUM_NODES=${NUM_NODES:-3}
export SERVICE_CLUSTER_IP_RANGE=192.168.3.0/24
export FLANNEL_NET=172.16.0.0/16
export PROXY_SETTING="http_proxy=10.25.30.127:7777 https_proxy=10.25.30.127:7777"

# 下载的文件会存放于 kubernetes/cluster/ubuntu/binaries directory
KUBERNETES_PROVIDER=ubuntu ./kube-up.sh
```

## Tips

* 该 PR [#30360](https://github.com/kubernetes/kubernetes/pull/30360) 正在实现一个 kubeadm 命令,使得 Kubernetes 的集群构建和 swarm 一样简单.

```bash
# 当关闭 k8s 后,对应的 pods 不会被 umount
cat /proc/mounts |sed -nre 's#.*?(/var\S*)\s.*#\1#p' | xargs -n 1 umount

# 删除 veth 虚拟网卡
ifconfig | sed -nre 's/(veth\S*)\s.*/\1/p' | xargs -n 1 ip link delete

# 如果修改了 CNI 的地址,需要先删除原来的 cni0
ip link delete cni0

kubectl run -it --rm bb --image=busybox --restart=Never


```

__私有 IP v4 地址__

```
10.0.0.0/8 (255.0.0.0)
172.16.0.0/12 (255.240.0.0)
192.168.0.0/16 (255.255.0.0)
```


### 常用 Label
* release
  * stable, canary
* environment
  * dev, qa, production
* tier
  * frontend, backend, cache
* partition
  * customerA, customerB
* track
  * daily, weekly
* role
  * master, slave

## kubectl

* [kubectl-overview](http://kubernetes.io/docs/user-guide/kubectl-overview/)

### run
```bash
# Create and run a particular image, possibly replicated.
# Creates a deployment or job to manage the created container(s).

# Start a single instance of nginx.
kubectl run nginx --image=nginx

# Start a single instance of hazelcast and let the container expose port 5701 .
kubectl run hazelcast --image=hazelcast --port=5701

# Start a single instance of hazelcast and set environment variables "DNS_DOMAIN=cluster" and "POD_NAMESPACE=default" in the container.
kubectl run hazelcast --image=hazelcast --env="DNS_DOMAIN=cluster" --env="POD_NAMESPACE=default"

# Start a replicated instance of nginx.
kubectl run nginx --image=nginx --replicas=5

# Dry run. Print the corresponding API objects without creating them.
kubectl run nginx --image=nginx --dry-run

# Start a single instance of nginx, but overload the spec of the deployment with a partial set of values parsed from JSON.
kubectl run nginx --image=nginx --overrides='{ "apiVersion": "v1", "spec": { ... } }'

# Start a pod of busybox and keep it in the foreground, don't restart it if it exits.
kubectl run -i -t busybox --image=busybox --restart=Never

# Start the nginx container using the default command, but use custom arguments (arg1 .. argN) for that command.
kubectl run nginx --image=nginx -- <arg1> <arg2> ... <argN>

# Start the nginx container using a different command and custom arguments.
kubectl run nginx --image=nginx --command -- <cmd> <arg1> ... <argN>

# Start the perl container to compute π to 2000 places and print it out.
kubectl run pi --image=perl --restart=OnFailure -- perl -Mbignum=bpi -wle 'print bpi(2000)'
```

### Help
```
$ kubeadm init -h
Run this in order to set up the Kubernetes master.

Usage:
  kubeadm init [flags]

Flags:
      --api-advertise-addresses value   The IP addresses to advertise, in case autodetection fails (default [])
      --api-external-dns-names value    The DNS names to advertise, in case you have configured them yourself (default [])
      --cloud-provider string           Enable cloud provider features (external load-balancers, storage, etc), e.g. "gce"
      --external-etcd-cafile string     etcd certificate authority certificate file. Note: The path must be in /etc/ssl/certs
      --external-etcd-certfile string   etcd client certificate file. Note: The path must be in /etc/ssl/certs
      --external-etcd-endpoints value   etcd endpoints to use, in case you have an external cluster (default [])
      --external-etcd-keyfile string    etcd client key file. Note: The path must be in /etc/ssl/certs
      --pod-network-cidr value          Specify range of IP addresses for the pod network; if set, the control plane will automatically allocate CIDRs for every node
      --service-cidr value              Use alterantive range of IP address for service VIPs, defaults to 100.64.0.0/12 (default 100.64.0.0/12)
      --service-dns-domain string       Use alternative domain for services, e.g. "myorg.internal" (default "cluster.local")
      --token string                    Shared secret used to secure cluster bootstrap; if none is provided, one will be generated for you
      --use-kubernetes-version string   Choose a specific Kubernetes version for the control plane (default "v1.4.0")
```
