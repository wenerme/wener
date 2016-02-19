
HaShiCorp 提供了一整套的开发部署和集群管理工具

HaShiCorp | Others
----|----
Consul | Zookeeper, Etcd
Nomad | Mesos Docker swarm Kubunetes
Otto<br>Vagrant successor| Docker
Terrform

# Consul
* [consul](https://www.consul.io/)
* [hashicorp/consul](https://github.com/hashicorp/consul)

__特性__

* 服务发现
* 健康检查
* 键值存储
* 多数据中心

## Get ui

```
git --depth=1 https://github.com/hashicorp/consul
cd consule/ui
# May need proxy
gem install bundler
make dist
```

# Otto
* [ottoproject](https://www.ottoproject.io/)
* [hashicorp/otto](https://github.com/hashicorp/otto)
* [intro](https://www.ottoproject.io/intro/index.html)/[doc](https://www.ottoproject.io/docs/)

## Get started
```
git clone https://github.com/hashicorp/otto-getting-started.git
cd otto-getting-started
otto compile
otto status
otto dev # use Vagrant underlying
otto dev ssh
> bundle && rackup --host 0.0.0.0
otto dev address
otto dev help
otto infra # use Terraform underlying
otto build # use Packer underlying
otto deploy # use Nomad underlying
otto deploy info

otto deploy destroy
otto infra destroy
otto dev destroy
```

以上操作的 Appfile 等同于

```
application {
  name = "otto-getting-started"
  type = "ruby"
}

project {
  name = "otto-getting-started"
  infrastructure = "otto-getting-started"
}

infrastructure "otto-getting-started" {
  type = "aws"
  flavor = "simple"
}
```

# Nomad

# Terraform
