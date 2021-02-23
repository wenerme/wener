# Libvirt Domain
* 单位
  * b/bytes
  * k/KiB
  * KB
  * MB
  * M/MiB
  * GB
  * G/GiB
  * TB
  * T/TiB

## simple

```xml
<domain type='kvm'>
  <name>base</name>
  <memory unit='G'>4</memory>
  <vcpu>2</vcpu>
  <os>
    <type>hvm</type>
  </os>
  <cpu mode='host-model' />
  <!-- 支持重启、关机 -->
  <features>
    <acpi/>
    <apic/>
  </features>
  <devices>
    <emulator>/usr/bin/qemu-system-x86_64</emulator>
    <disk type='file' device='disk'>
      <driver name='qemu' type='qcow2'/>
      <source file='/data/vm/images/base.qcow2'/>
      <!-- <target dev='hda' bus='ide'/> -->
      <target dev='vda' bus='virtio'/>
    </disk>
    <controller type='virtio-serial' />
    <!-- 支持 virsh console -->
    <console type='pty' tty='/dev/pts/2'>
      <source path='/dev/pts/2'/>
      <target type='serial'/>
    </console>
    <interface type='network'>
      <source network='default'/>
      <model type='virtio'/>
    </interface>
    <!-- 如果使用桥接 -->
    <!--
    <interface type='bridge'>
      <source bridge='br0'/>
      <model type='virtio'/>
    </interface>
    -->
    <graphics type='vnc' port='5900' autoport='yes' listen='0.0.0.0' />
  </devices>
</domain>
```

## emulator+cdrom

```xml
<domain type='qemu'>
  <name>QEmu-fedora-i686</name>
  <memory>219200</memory>
  <currentMemory>219200</currentMemory>
  <vcpu>2</vcpu>
  <os>
    <type arch='i686' machine='pc'>hvm</type>
    <boot dev='cdrom'/>
  </os>
  <devices>
    <emulator>/usr/bin/qemu-system-x86_64</emulator>
    <disk type='file' device='cdrom'>
      <source file='/home/user/boot.iso'/>
      <target dev='hdc'/>
      <readonly/>
    </disk>
    <disk type='file' device='disk'>
      <source file='/home/user/fedora.img'/>
      <target dev='hda'/>
    </disk>
    <interface type='network'>
      <source network='default'/>
    </interface>
    <graphics type='vnc' port='-1'/>
  </devices>
</domain>
```

## kvm

```xml
<domain type='kvm'>
  <name>demo2</name>
  <memory>131072</memory>
  <vcpu>1</vcpu>
  <os>
    <type arch="i686">hvm</type>
  </os>
  <clock sync="localtime"/>
  <devices>
    <emulator>/usr/bin/qemu-kvm</emulator>
    <disk type='file' device='disk'>
      <source file='/var/lib/libvirt/images/demo2.img'/>
      <target dev='hda'/>
    </disk>
    <interface type='network'>
      <source network='default'/>
      <mac address='24:42:53:21:52:45'/>
    </interface>
    <graphics type='vnc' port='-1' keymap='de'/>
  </devices>
</domain>
```
