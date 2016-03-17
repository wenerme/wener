
## Vagrant

```bash
# Download and install vbox and extension pack
# https://www.virtualbox.org/wiki/Linux_Downloads
VBoxManage extpack install  --replace FILE_NAME

```

## Vagrantfile
`Vagrantfile` 配置示例
```ruby
Vagrant.configure(2) do |config|
  # 配置可参考https://docs.vagrantup.com.

  # 配置使用的虚拟机
  config.vm.box = "ubuntu/trusty64"
  # 是否需要自动更新镜像,建议关闭,因为国内网络较差,影响启动速度
  config.vm.box_check_update = false
  # 配置共享文件夹,以下配置会将主机当前目录下的 data 共享到虚拟机中的 /host
  config.vm.synced_folder "./data", "/host"
  # 配置外部网络地址,局域网可访问
  config.vm.network "public_network", ip: "10.4.231.186"
  # 配置内部网络地址,只有主机能访问
  config.vm.network "private_network", ip: "192.168.33.9"
  # 端口转发,以下配置会将虚拟机的 8080 端口转发到主机的 80 端口
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # 对不同的运行环境进行配置
  config.vm.provider "virtualbox" do |vb|
    # 在启动时禁用 VirtualBox 图形界面
    vb.gui = false

    # 指定虚拟机使用的内存量
    vb.memory = "1024"
  end

  # 配置监听,在虚拟机启动后执行
  config.vm.provision "shell", inline: <<-SHELL
    echo Cool stuff
    date >> /host/hello.txt
  SHELL

  # 可配置多个主机,可通过 vagrant up 主机名, vagrant ssh 主机名 操作单个主机
  config.vm.define "db-1" do |node|
    node.vm.network "private_network", ip: "192.168.33.10"
    node.vm.provision "shell",
      inline: "echo hello from node db-1"
  end
end
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
* 手动安装 box
```bash
vagrant box add laravel/homestead path/to/your/box/file.box
```
* 常用 BOX
```
centos/7
ubuntu/trusty64
```
* 常用命令
```bash
vagrant up # 启动
vagrant halt # 关机
vagrant destroy # 清除虚拟机
vagrant status # 查看运行状态
vagrant suspend # 使机器挂起
vagrant ssh # SSH 进入机器
vagrant reload # 重启机器
vagrant global-status # 查看所有虚拟机的运行状态,不需要当前目录有 Vagrantfile
```
* 搜索 BOX
  * [vagrantbox](http://www.vagrantbox.es/)
  * [boxes/search](https://atlas.hashicorp.com/boxes/search)
* 官方网站
  * [Vagrantup](https://www.vagrantup.com/)
  * [软件下载](https://www.vagrantup.com/downloads.html)
  * [官方文件文档](https://www.vagrantup.com/docs/)
  * [配置文件文档](https://www.vagrantup.com/docs/vagrantfile/)
