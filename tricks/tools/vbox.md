
## VirtualBox

```bash
# Download and install vbox and extension pack
# https://www.virtualbox.org/wiki/Linux_Downloads
VBoxManage extpack install  --replace FILE_NAME

```

### 添加 USB 设备
```bash
# 启用 USB 设备控制器,需要虚拟机未运行
# ohci -> usb1.0, echi -> usb2.0 ,xchi -> usb3.0
# echi 和 xchi 需要安装 ext packet
VBoxManage modifyvm <主机名> --usb on --usbxhci on

# 查看正在运行的虚拟机
VBoxManage list runningvms
# 查看主机上的 USB 设备
VBoxManage list usbhost
# 挂载 USB 设备虚拟机
VBoxManage controlvm <主机名> usbattach <设备 UUID>
# 确认挂载成功
VBoxManage showvminfo <主机名>
# 移除 USB 设备
VBoxManage controlvm <主机名> usbdetach <设备 UUID>
```

## Vagrant

## Vagrantfile
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
    # virtualbox 相关配置可参考 https://www.vagrantup.com/docs/virtualbox/configuration.html
    # 在启动时禁用 VirtualBox 图形界面
    vb.gui = false

    # 指定虚拟机使用的内存量
    vb.memory = "1024"
    # 指定虚拟机使用的核数
    vb.cpus = 2
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

### 添加额外磁盘和分区
```ruby
Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = false
  config.vm.network "private_network", ip: "192.168.33.9"
  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "1024"
    # machine name in virtualbox
    vb.name = "try_disk"

    file_to_disk = File.realpath( "." ).to_s + "/disk.vdi"

    if ARGV[0] == "up" && ! File.exist?(file_to_disk)
       vb.customize [
            'createhd',
            '--filename', file_to_disk,
            '--format', 'VDI',
            '--size', 30 * 1024 # 30 GB
            ]
       vb.customize [
            'storageattach', :id,
            # The name may vary, found by
            # VBoxManage showvminfo try_disk|grep 'Storage Controller Name'|
            '--storagectl', 'SATAController',
            '--port', 1, '--device', 0,
            '--type', 'hdd', '--medium',
            file_to_disk
            ]
    end
  end

  # Tow partition in one disk 10G,20G
  config.vm.provision "shell", inline: <<-SHELL
set -e
set -x

if [ -f /etc/provision_env_disk_added_date ]
then
   echo "Provision runtime already done."
   exit 0
fi


fdisk -u /dev/sdb <<EOF
n
p
1

+10G
n
p
2


w
EOF

mkfs.ext4 /dev/sdb1
mkfs.ext4 /dev/sdb2
mkdir -p /{data,extra}
echo '/dev/sdb1 /data ext4 defaults 0 0'>> /etc/fstab
echo '/dev/sdb2 /extra ext4 defaults 0 0'>> /etc/fstab
mount -a

date > /etc/provision_env_disk_added_date
  SHELL

  config.vm.provision "shell", inline: <<-SHELL
    echo Well done
  SHELL
end
```

#### 磁盘控制
```bash
# 查看当前磁盘
lsblk -io KNAME,TYPE,SIZE,MODEL
# 创建磁盘
VBoxManage createhd --filename disk.vid --format VDI --size 1000
# 添加媒介
VBoxManage storageattach try_disk --storagectl SATA --port 1 --device 0 --type hdd --medium `pwd`/disk.vid

# 在新磁盘上创建单个分区
sudo fdisk -u /dev/sdb <<EOF
n
p
1


t
8e
w
EOF
# 使用 ext4 磁盘
mkfs.ext4 /dev/sdb1
# 挂载磁盘
mount -t ext4 /dev/sdb1 /data
# 判断挂载成功
df  -h
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
* 共享目录
```ruby
# create 自动创建主机中的目录
# disabled 禁用
config.vm.synced_folder "src/", "/srv/website", create: true, owner: "root", group: "root"
# 禁用默认挂载目录
config.vm.synced_folder '.', '/vagrant', disabled: true
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
* 常用插件
  * landrush
  * vagrant-vbguest
  * vagrant-cachier
  * vagrant-omnibus
  * vagrant-proxyconf
  * vagrant-share
* 添加额外磁盘分区和修改磁盘大小和通过定制化参数实现,具体可参考[这里](https://github.com/mitchellh/vagrant/issues/2339#issuecomment-33064917)
* 搜索 BOX
  * [vagrantbox](http://www.vagrantbox.es/)
  * [boxes/search](https://atlas.hashicorp.com/boxes/search)
* 官方网站
  * [Vagrantup](https://www.vagrantup.com/)
  * [软件下载](https://www.vagrantup.com/downloads.html)
  * [官方文件文档](https://www.vagrantup.com/docs/)
  * [配置文件文档](https://www.vagrantup.com/docs/vagrantfile/)


## FAQ

### VBoxManage: error: Could not rename the directory
```
vagrant destroy -f
rm ~/VirtualBox\ VMs/YOUR_NAME_HERE
```

### 在当前目录下创建了大量文件
这是由于临时目录异常导致的,可参考
* [#3493](https://github.com/mitchellh/vagrant/issues/3493)
* [#3514](https://github.com/mitchellh/vagrant/issues/3514)
* Vagrant 判断该目录的[代码](https://github.com/ruby/ruby/blob/2254fc650b681c2582f25aa0d2be2cc8aba3cb8e/lib/tmpdir.rb#L25)


```bash
# 确保属性正确
chmod 1777 /tmp
# 或尝试 需谨慎!
chmod +s /tmp
```
