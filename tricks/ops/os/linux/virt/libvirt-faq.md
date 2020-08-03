---
id: libvirt-faq
title: Libvirt常见问题
---

# Libvirt FAQ

* domain [xml](https://libvirt.org/formatdomain.html)
* 网络 [xml](https://libvirt.org/formatnetwork.html)
* 注意
  * uuid 和 mac 类字段如果没有，则导入的时候生成
* 三种配置状态
  * live - 运行状态
    * 修改立即生效
  * inactive - 不活跃的状态
    * 修改需要重启后生效
  * current - 当前状态
    * 指向 live 或 inactive

## CPU 资源配额
* 参考 [CPUTuning](https://libvirt.org/formatdomain.html#elementsCPUTuning)
* shares - 每个 vCPU
* period、quota - 每个 vCPU，但会首 quota 定义限制
* emulator_period、emulator_quota - 每个模拟线程，主机 40-80% 性能

## 重启网络

* https://aboullaite.me/effectively-restarting-kvm-libvirt-network/
  * https://github.com/aboullaite/useful-scripts/blob/master/kvm-restart-network.sh

```bash
NET_NAME=default
NET_HOOK=/etc/libvirt/hooks/qemu

virsh net-destroy $NET_NAME
virsh net-start $NET_NAME

VMS=$( virsh list | tail -n +3 | head -n -1 | awk '{ print $2; }' )

for m in $VMS ; do

    echo "$m"
    MAC_ADDR=$(virsh domiflist "$m" |grep -o -E "([0-9a-f]{2}:){5}([0-9a-f]{2})")
    NET_MODEL=$(virsh domiflist "$m" | tail -n +3 | head -n -1 | awk '{ print $4; }')

    set +e
    virsh detach-interface "$m" network --mac "$MAC_ADDR" && sleep 3
    virsh attach-interface "$m" network $NET_NAME --mac "$MAC_ADDR" --model "$NET_MODEL"
    set -e

    $NET_HOOK "$m" stopped && sleep 3
    $NET_HOOK "$m" start

done
```


## 实时修改网络配置

```bash
# 立即生效，不需要重启
virsh net-update --config --live default add ip-dhcp-host \
  "<host mac='52:54:00:01:02:03' name='xyz.example.com' ip='192.168.122.25'/>"
```

## host-model vs host-passthrough
https://www.reddit.com/r/VFIO/comments/a20bf7/hostmodel_vs_hostpassthrough_super_poor_cache/

## 动态 CPU 和内存

```xml
<maxMemory slots='16' unit='GiB'>64</maxMemory>
<memory unit='GiB'>32</memory>
<currentMemory unit='GiB'>32</currentMemory>
<vcpu placement='static' current='8'>16</vcpu>
<cpu>
  <numa>
    <cell id='0' cpus='0-8' memory='32' unit='GiB'/>
  </numa>
  <!-- 其他内容 -->
</cpu>
```

## At least one numa node has to be configured when enabling memory hotplug

配置热插拔内存后需要配置 numa

```xml
<cpu>
  <numa>
    <cell id='0' cpus='0-8' memory='4' unit='GiB'/>
  </numa>
  <!-- 其他内容 -->
</cpu>
```

## console 没有终端

__确保定义有Serial__

```xml
<serial type='pty'>
  <target port='0'/>
</serial>
<console type='pty'>
  <target type='serial' port='0'/>
</console>
```

如果还是没有，则尝试添加 kernel 参数

```
console=tty0 console=ttyS0
```

或

```
console=ttyS0,19200 earlyprint=serial,ttyS0,19200
```


## guest CPU doesn't match specification: missing features: spec-ctrl,stibp,ssbd
* https://www.berrange.com/posts/2018/06/29/cpu-model-configuration-for-qemu-kvm-on-x86-hosts/
* https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/tree/arch/x86/include/asm/cpufeatures.h
* https://unix.stackexchange.com/questions/43539/what-do-the-flags-in-proc-cpuinfo-mean

```xml
<!-- 最简单的修复方式是使用主机的模型 -->
<cpu mode='host-model'/>
```

<cpu mode='host-model'>
    <model fallback='forbid'>core2duo</model>
</cpu>

  <cpu mode='host-model' check='partial'>
    <model fallback='forbid'>IvyBridge-IBRS</model>
    <vendor>Intel</vendor>
    <feature policy='require' name='ss'/>
    <feature policy='require' name='pcid'/>
    <feature policy='require' name='hypervisor'/>
    <feature policy='require' name='arat'/>
    <feature policy='require' name='tsc_adjust'/>
    <feature policy='require' name='umip'/>
    <feature policy='require' name='xsaveopt'/>
    <feature policy='require' name='pdpe1gb'/>
    <feature policy='require' name='stibp'/>
    <feature policy='require' name='ssbd'/>
  </cpu>


## 获取主机 IP

```bash
# 主机名字
HOSTNAME=base
MAC=$(virsh domiflist $HOSTNAME | awk ‘{ print $5 }’ | tail -2 | head -1)
arp -a | grep $MAC | awk '{ print $2 }' | sed ‘s/[()]//g’
```

## 克隆主机的注意事项
```bash
# 持久化的网卡信息 - alpine 默认没有
rm -f /etc/udev/rules.d/70-persistent-net.rules

# 删除 ssh 的 host id
rm -rf /etc/ssh/ssh_host_*
```

* [CLONING VIRTUAL MACHINES](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/virtualization_deployment_and_administration_guide/cloning_virtual_machines)

## 网络

### 默认网络

```xml
<network>
  <name>default</name>
  <uuid/>
  <forward mode='nat'>
    <nat>
      <port start='1024' end='65535'/>
    </nat>
  </forward>
  <bridge name='virbr0' stp='on' delay='0'/>
  <mac/>
  <ip address='192.168.122.1' netmask='255.255.255.0'>
    <dhcp>
      <!-- DHCP 范围 -->
      <range start='192.168.122.2' end='192.168.122.254'/>
      <!-- 静态 IP -->
      <!-- <host mac='52:54:00:70:d9:ee' name='myhost' ip='192.168.122.10'/> -->
    </dhcp>
  </ip>
</network>
```

### 基本配置
* connections - 当前连接数 在运行中的网络看得到
* libvirt 会维护一个 dnsmasq 实例

```xml
<network ipv6='yes' trustGuestRxFilters='no' connections='10'>
  <!-- 基本元数据 -->
  <name>default</name>
  <uuid>3e3fce45-4f53-4fa7-bb32-11f34168b82b</uuid>
  <metadata>
    <app1:foo xmlns:app1="http://app1.org/app1/">..</app1:foo>
    <app2:bar xmlns:app2="http://app1.org/app2/">..</app2:bar>
  </metadata>
  <!-- 连接性配置 -->
  <mtu size="9000"/>
  <!-- QoS -->
  <bandwidth>
    <inbound floor='500' average='1000' peak='5000' burst='5120'/>
    <outbound average='128' peak='256' burst='256'/>
  </bandwidth>
  <!-- 静态路由 -->
  <ip address="192.168.122.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.122.128" end="192.168.122.254"/>
      <host mac="00:16:3e:77:e2:ed" name="foo.example.com" ip="192.168.122.10"/>
    </dhcp>
    <!-- tftp -->
  </ip>
  <route address="192.168.222.0" prefix="24" gateway="192.168.122.2"/>
  <!-- 地址 - 只支持隔离 即 非 forward -->
  <!-- 桥接网卡设备的 MAC -->
  <mac address='00:16:3E:5D:C7:9E'/>
  <domain name="example.com"/>
  <!-- enable 默认开启 -->
  <!-- forwardPlainNames 如果关闭则不会处理不带 . 的名字 -->
  <dns enable='yes' forwardPlainNames='yes'>
    <txt name="example" value="example value"/>
    <forwarder addr="8.8.8.8"/>
    <forwarder domain='example.com' addr="8.8.4.4"/>
    <forwarder domain='www.example.com'/>
    <srv service='name' protocol='tcp' domain='test-domain-name' target='.'
      port='1024' priority='10' weight='10'/>
    <host ip='192.168.122.2'>
      <hostname>myhost</hostname>
      <hostname>myhostalias</hostname>
    </host>
  </dns>
  <!-- 自定义 dnsmasq 属性 -->
  <dnsmasq:options>
    <dnsmasq:option value="foo=bar"/>
    <dnsmasq:option value="cname=*.foo.example.com,master.example.com"/>
  </dnsmasq:options>
</network>
```

### 使用现有宿主机桥接网络

```xml
<network>
  <name>host-bridge</name>
  <forward mode="bridge"/>
  <bridge name="br0"/>
</network>
```

### 使用 macvtap
* 类似于桥接，但不需要主机存在桥接网卡
* 主机该网卡与虚拟机不互通

```xml
<network>
  <name>direct-macvtap</name>
  <forward mode="bridge">
    <interface dev="eth0"/>
    <interface dev="eth1"/>
  </forward>
</network>
```


### 使用主机网卡

```xml
<network>
  <name>host-passthrough</name>
  <!-- 设备池 -->
  <forward mode='passthrough'>
    <interface dev='eth10'/>
    <interface dev='eth11'/>
    <interface dev='eth12'/>
    <interface dev='eth13'/>
    <interface dev='eth14'/>
  </forward>
</network>
```

### 使用主机网卡下挂载的虚拟网卡
```xml
<network>
  <name>host-passthrough-vnet</name>
  <forward mode='passthrough'>
    <pf dev='eth0'/>
  </forward>
</network>
```

## 域

### 显存调整
* kvm 可以使用 cirrus 做更好的显示
* 注意显存大小 - 过小会导致显示出问题

```xml
<video>
  <model type='cirrus' vram='9216' heads='1'/>
  <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x0'/>
</video>
```

### 动态内存
```xml
<maxMemory slots='16' unit='GiB'>16</maxMemory>
<!-- memory 和 currentMemory 参数可选 -->
<!-- <memory unit='GiB'>8</memory> -->
<!-- 初始内存 -->
<!-- <currentMemory unit='GiB'>2</currentMemory> -->
<!-- 热插拔需要 numa -->
<cpu>
  <numa>
    <cell id='0' cpus='0-2' memory='1' unit='GiB'/>
  </numa>
</cpu>
```

* [Memory hotplug with Qemu/KVM and libvirt](https://medium.com/@juergen_thomann/558f1c635972)
