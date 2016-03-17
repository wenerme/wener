
## Vagrant

```bash
# Download and install vbox and extension pack
# https://www.virtualbox.org/wiki/Linux_Downloads
VBoxManage extpack install  --replace FILE_NAME

```

## Vagrant Tips

* 启动后运行命令
```ruby
config.vm.provision "shell", inline: "echo Hello"
```
* 同时启动多个虚拟机
```ruby
(1..3).each do |i|
  config.vm.define "node-#{i}" do |node|
    node.vm.provision "shell",
      inline: "echo hello from node #{i}"
  end
end
```
* 只启动配置中的指定虚拟机
```bash
vagrant up node-1
vagrant up /node-(1|2)/
```
* 传递环境变量
```ruby
ENV["LC_ALL"] = "en_US.UTF-8"

Vagrant.configure("2") do |config|
  # ...
end
```
* 网络配置
```ruby
# 端口转发
config.vm.network "forwarded_port", guest: 80, host: 8080
# 指定公网地址
config.vm.network "public_network", ip: "192.168.0.17"
```
* 目录同步
```ruby
# create 自动创建主机中的目录
# disabled 禁用
config.vm.synced_folder "src/", "/srv/website", owner: "root", group: "root"
```
* [Vagrantup](https://www.vagrantup.com/)
