---
id: qemu-monitor
title: QEMU监视器
---

# QEMU Monitor

* [QEMU Monitor](https://www.qemu.org/docs/master/system/monitor.html)
* wikibooks [QEMU/Monitor](https://en.wikibooks.org/wiki/QEMU/Monitor)
* [使用 monitor command 监控 QEMU 运行状态](https://www.ibm.com/developerworks/cn/linux/l-cn-qemu-monitor/)
* 如何访问 Monitor
  * curses
    * Esc+1, Esc+2
  * nographic
    * Ctrl+a c
  * graphic
    * Ctrl+Alt+2
  * stdio
    `-monitor stdio`
* 相关选项

```
-monitor dev
Redirect the monitor to host device dev (same devices as the serial port). The default device is vc in graphical mode and stdio in non graphical mode. Use -monitor none to disable the default monitor.

-qmp dev
Like -monitor but opens in ’control’ mode.

-qmp-pretty dev
Like -qmp but uses pretty JSON formatting.

-mon [chardev=]name[,mode=readline|control][,pretty[=on|off]]
Setup monitor on chardev name. pretty turns on JSON pretty printing easing human reading and debugging.

-debugcon dev
Redirect the debug console to host device dev (same devices as the serial port). The debug console is an I/O port which is typically port 0xe9; writing to that I/O port sends output to this device. The default device is vc in graphical mode and stdio in non graphical mode.
```

```bash
# telnet 监听
qemu-system-i386 -monitor telnet:127.0.0.1:55555,server,nowait;
echo system_powerdown |telnet 127.0.0.1 55555
# tcp 监听
qemu-system-i386 -monitor tcp:127.0.0.1:55555,server,nowait;
echo 'info kvm' |nc -N 127.0.0.1 55555
echo system_powerdown |nc -N 127.0.0.1 55555

# unix
# -qmp JSON 协议
qemu-system-i386 monitor unix:qemu-monitor-socket,server,nowai
socat -,echo=0,icanon=0 unix-connect:qemu-monitor-socket

echo "info status" | socat - unix-connect:qemu-monitor-socket
echo "info status" | socat - unix-connect:qemu-monitor-socket | tail --lines=+2 | grep -v '^(qemu)'
```

```bash
# 查看版本
info version

# qemu -vnc :1,password
# 给 VNC 设置密码
change vnc password

# qemu -S
# 默认不启动 cpu, 手动启动
c
```

system_powerdown

qemu-system-i386 -net nic,model=rtl8139 -net user,hostfwd=tcp::3389-:3389 -redir tcp:443::443 -redir tcp:992::992 -redir tcp:1194::1194 -redir tcp:5555::5555 -redir udp:1194::1194 -redir udp:500::500 -redir udp:4500::4500 -m 512M -localtime -cpu core2duo,+nx -smp 2 -usbdevice tablet -k en-us -hda win.img -nographic


## 磁盘热插拔
https://wiki.ubuntu.com/QemuDiskHotplug

-usb

device_add usb-ehci

drive_add 0 file=hotplug.raw,format=raw,if=none,id=usb_disk1
device_add usb-storage,drive=usb_disk1,id=usb_disk11,removable=on
device_del  usb_disk11
drive_del  usb_disk1

```
drive_add [-n] [[<domain>:]<bus>:]<slot>
[file=file][,if=type][,bus=n]
[,unit=m][,media=d][,index=i]
[,cyls=c,heads=h,secs=s[,trans=t]]
[,snapshot=on|off][,cache=on|off]
[,readonly=on|off][,copy-on-read=on|off] -- add drive to PCI storage controller
```

device_add ?
```
Controller/Bridge/Hub devices:
name "i82801b11-bridge", bus PCI
name "ioh3420", bus PCI, desc "Intel IOH device id 3420 PCIE Root Port"
name "pci-bridge", bus PCI, desc "Standard PCI Bridge"
name "pci-bridge-seat", bus PCI, desc "Standard PCI Bridge (multiseat)"
name "pcie-pci-bridge", bus PCI
name "pcie-root-port", bus PCI, desc "PCI Express Root Port"
name "pxb", bus PCI, desc "PCI Expander Bridge"
name "pxb-pcie", bus PCI, desc "PCI Express Expander Bridge"
name "usb-hub", bus usb-bus
name "x3130-upstream", bus PCI, desc "TI X3130 Upstream Port of PCI Express Switch"
name "xio3130-downstream", bus PCI, desc "TI X3130 Downstream Port of PCI Express Switch"

USB devices:
name "ich9-usb-ehci1", bus PCI
name "ich9-usb-ehci2", bus PCI
name "ich9-usb-uhci1", bus PCI
name "ich9-usb-uhci2", bus PCI
name "ich9-usb-uhci3", bus PCI
name "ich9-usb-uhci4", bus PCI
name "ich9-usb-uhci5", bus PCI
name "ich9-usb-uhci6", bus PCI
name "nec-usb-xhci", bus PCI
name "pci-ohci", bus PCI, desc "Apple USB Controller"
name "piix3-usb-uhci", bus PCI
name "piix4-usb-uhci", bus PCI
name "qemu-xhci", bus PCI
name "usb-ehci", bus PCI
name "vt82c686b-usb-uhci", bus PCI

Storage devices:
name "am53c974", bus PCI, desc "AMD Am53c974 PCscsi-PCI SCSI adapter"
name "dc390", bus PCI, desc "Tekram DC-390 SCSI adapter"
name "floppy", bus floppy-bus, desc "virtual floppy drive"
name "ich9-ahci", bus PCI, alias "ahci"
name "ide-cd", bus IDE, desc "virtual IDE CD-ROM"
name "ide-drive", bus IDE, desc "virtual IDE disk or CD-ROM (legacy)"
name "ide-hd", bus IDE, desc "virtual IDE disk"
name "isa-fdc", bus ISA
name "isa-ide", bus ISA
name "lsi53c810", bus PCI
name "lsi53c895a", bus PCI, alias "lsi"
name "megasas", bus PCI, desc "LSI MegaRAID SAS 1078"
name "megasas-gen2", bus PCI, desc "LSI MegaRAID SAS 2108"
name "nvme", bus PCI, desc "Non-Volatile Memory Express"
name "piix3-ide", bus PCI
name "piix3-ide-xen", bus PCI
name "piix4-ide", bus PCI
name "pvscsi", bus PCI
name "scsi-cd", bus SCSI, desc "virtual SCSI CD-ROM"
name "scsi-disk", bus SCSI, desc "virtual SCSI disk or CD-ROM (legacy)"
name "scsi-hd", bus SCSI, desc "virtual SCSI disk"
name "sdhci-pci", bus PCI
name "usb-bot", bus usb-bus
name "usb-mtp", bus usb-bus, desc "USB Media Transfer Protocol device"
name "usb-storage", bus usb-bus
name "usb-uas", bus usb-bus
name "virtio-blk-device", bus virtio-bus
name "virtio-blk-pci", bus PCI, alias "virtio-blk"
name "virtio-scsi-device", bus virtio-bus
name "virtio-scsi-pci", bus PCI, alias "virtio-scsi"

Network devices:
name "e1000", bus PCI, alias "e1000-82540em", desc "Intel Gigabit Ethernet"
name "e1000-82544gc", bus PCI, desc "Intel Gigabit Ethernet"
name "e1000-82545em", bus PCI, desc "Intel Gigabit Ethernet"
name "e1000e", bus PCI, desc "Intel 82574L GbE Controller"
name "i82550", bus PCI, desc "Intel i82550 Ethernet"
name "i82551", bus PCI, desc "Intel i82551 Ethernet"
name "i82557a", bus PCI, desc "Intel i82557A Ethernet"
name "i82557b", bus PCI, desc "Intel i82557B Ethernet"
name "i82557c", bus PCI, desc "Intel i82557C Ethernet"
name "i82558a", bus PCI, desc "Intel i82558A Ethernet"
name "i82558b", bus PCI, desc "Intel i82558B Ethernet"
name "i82559a", bus PCI, desc "Intel i82559A Ethernet"
name "i82559b", bus PCI, desc "Intel i82559B Ethernet"
name "i82559c", bus PCI, desc "Intel i82559C Ethernet"
name "i82559er", bus PCI, desc "Intel i82559ER Ethernet"
name "i82562", bus PCI, desc "Intel i82562 Ethernet"
name "i82801", bus PCI, desc "Intel i82801 Ethernet"
name "ne2k_isa", bus ISA
name "ne2k_pci", bus PCI
name "pcnet", bus PCI
name "rocker", bus PCI, desc "Rocker Switch"
name "rtl8139", bus PCI
name "usb-bt-dongle", bus usb-bus
name "usb-net", bus usb-bus
name "virtio-net-device", bus virtio-bus
name "virtio-net-pci", bus PCI, alias "virtio-net"
name "vmxnet3", bus PCI, desc "VMWare Paravirtualized Ethernet v3"

Input devices:
name "ipoctal232", bus IndustryPack, desc "GE IP-Octal 232 8-channel RS-232 IndustryPack"
name "isa-parallel", bus ISA
name "isa-serial", bus ISA
name "pci-serial", bus PCI
name "pci-serial-2x", bus PCI
name "pci-serial-4x", bus PCI
name "tpci200", bus PCI, desc "TEWS TPCI200 IndustryPack carrier"
name "usb-braille", bus usb-bus
name "usb-ccid", bus usb-bus, desc "CCID Rev 1.1 smartcard reader"
name "usb-kbd", bus usb-bus
name "usb-mouse", bus usb-bus
name "usb-serial", bus usb-bus
name "usb-tablet", bus usb-bus
name "usb-wacom-tablet", bus usb-bus, desc "QEMU PenPartner Tablet"
name "virtconsole", bus virtio-serial-bus
name "virtio-keyboard-device", bus virtio-bus
name "virtio-keyboard-pci", bus PCI, alias "virtio-keyboard"
name "virtio-mouse-device", bus virtio-bus
name "virtio-mouse-pci", bus PCI, alias "virtio-mouse"
name "virtio-serial-device", bus virtio-bus
name "virtio-serial-pci", bus PCI, alias "virtio-serial"
name "virtio-tablet-device", bus virtio-bus
name "virtio-tablet-pci", bus PCI, alias "virtio-tablet"
name "virtserialport", bus virtio-serial-bus

Display devices:
name "cirrus-vga", bus PCI, desc "Cirrus CLGD 54xx VGA"
name "isa-cirrus-vga", bus ISA
name "isa-vga", bus ISA
name "secondary-vga", bus PCI
name "sga", bus ISA, desc "Serial Graphics Adapter"
name "VGA", bus PCI
name "virtio-gpu-device", bus virtio-bus
name "virtio-gpu-pci", bus PCI, alias "virtio-gpu"
name "virtio-vga", bus PCI
name "vmware-svga", bus PCI

Sound devices:
name "AC97", bus PCI, desc "Intel 82801AA AC97 Audio"
name "adlib", bus ISA, desc "Yamaha YM3812 (OPL2)"
name "cs4231a", bus ISA, desc "Crystal Semiconductor CS4231A"
name "ES1370", bus PCI, desc "ENSONIQ AudioPCI ES1370"
name "gus", bus ISA, desc "Gravis Ultrasound GF1"
name "hda-duplex", bus HDA, desc "HDA Audio Codec, duplex (line-out, line-in)"
name "hda-micro", bus HDA, desc "HDA Audio Codec, duplex (speaker, microphone)"
name "hda-output", bus HDA, desc "HDA Audio Codec, output-only (line-out)"
name "ich9-intel-hda", bus PCI, desc "Intel HD Audio Controller (ich9)"
name "intel-hda", bus PCI, desc "Intel HD Audio Controller (ich6)"
name "sb16", bus ISA, desc "Creative Sound Blaster 16"
name "usb-audio", bus usb-bus

Misc devices:
name "at24c-eeprom", bus i2c-bus
name "i6300esb", bus PCI
name "ib700", bus ISA
name "isa-applesmc", bus ISA
name "isa-debug-exit", bus ISA
name "isa-debugcon", bus ISA
name "kvaser_pci", bus PCI, desc "Kvaser PCICANx"
name "mioe3680_pci", bus PCI, desc "Mioe3680 PCICANx"
name "pc-testdev", bus ISA
name "pci-testdev", bus PCI, desc "PCI Test Device"
name "pcm3680_pci", bus PCI, desc "Pcm3680i PCICANx"
name "pvpanic", bus ISA
name "tpm-crb"
name "virtio-balloon-device", bus virtio-bus
name "virtio-balloon-pci", bus PCI, alias "virtio-balloon"
name "virtio-crypto-device", bus virtio-bus
name "virtio-crypto-pci", bus PCI
name "virtio-rng-device", bus virtio-bus
name "virtio-rng-pci", bus PCI, alias "virtio-rng"
name "vmcoreinfo"
name "vmgenid"

CPU devices:
name "486-x86_64-cpu"
name "athlon-x86_64-cpu"
name "base-x86_64-cpu"
name "Broadwell-IBRS-x86_64-cpu"
name "Broadwell-noTSX-IBRS-x86_64-cpu"
name "Broadwell-noTSX-x86_64-cpu"
name "Broadwell-x86_64-cpu"
name "Conroe-x86_64-cpu"
name "core2duo-x86_64-cpu"
name "coreduo-x86_64-cpu"
name "EPYC-IBPB-x86_64-cpu"
name "EPYC-x86_64-cpu"
name "Haswell-IBRS-x86_64-cpu"
name "Haswell-noTSX-IBRS-x86_64-cpu"
name "Haswell-noTSX-x86_64-cpu"
name "Haswell-x86_64-cpu"
name "host-x86_64-cpu"
name "IvyBridge-IBRS-x86_64-cpu"
name "IvyBridge-x86_64-cpu"
name "kvm32-x86_64-cpu"
name "kvm64-x86_64-cpu"
name "max-x86_64-cpu"
name "n270-x86_64-cpu"
name "Nehalem-IBRS-x86_64-cpu"
name "Nehalem-x86_64-cpu"
name "Opteron_G1-x86_64-cpu"
name "Opteron_G2-x86_64-cpu"
name "Opteron_G3-x86_64-cpu"
name "Opteron_G4-x86_64-cpu"
name "Opteron_G5-x86_64-cpu"
name "Penryn-x86_64-cpu"
name "pentium-x86_64-cpu"
name "pentium2-x86_64-cpu"
name "pentium3-x86_64-cpu"
name "phenom-x86_64-cpu"
name "qemu32-x86_64-cpu"
name "qemu64-x86_64-cpu"
name "SandyBridge-IBRS-x86_64-cpu"
name "SandyBridge-x86_64-cpu"
name "Skylake-Client-IBRS-x86_64-cpu"
name "Skylake-Client-x86_64-cpu"
name "Skylake-Server-IBRS-x86_64-cpu"
name "Skylake-Server-x86_64-cpu"
name "Westmere-IBRS-x86_64-cpu"
name "Westmere-x86_64-cpu"

Uncategorized devices:
name "amd-iommu", bus System
name "AMDVI-PCI", bus PCI
name "edu", bus PCI
name "i8042", bus ISA
name "igd-passthrough-isa-bridge", bus PCI, desc "ISA bridge faked to support IGD PT"
name "intel-iommu", bus System
name "ipmi-bmc-extern"
name "ipmi-bmc-sim"
name "isa-ipmi-bt", bus ISA
name "isa-ipmi-kcs", bus ISA
name "loader", desc "Generic Loader"
name "mptsas1068", bus PCI, desc "LSI SAS 1068"
name "nvdimm", desc "DIMM memory module"
name "pc-dimm", desc "DIMM memory module"
name "sd-card", bus sd-bus
name "tpm-tis", bus ISA
```

```bash
drive_add 0 if=none,file=/tmp/test.img,format=raw,id=disk1
info block
```

## help
```
acl_add aclname match allow|deny [index] -- add a match rule to the access control list
acl_policy aclname allow|deny -- set default access control list policy
acl_remove aclname match -- remove a match rule from the access control list
acl_reset aclname -- reset the access control list
acl_show aclname -- list rules in the access control list
balloon target -- request VM to change its memory allocation (in MB)
block_job_cancel [-f] device -- stop an active background block operation (use -f
			 if you want to abort the operation immediately
			 instead of keep running until data is in sync)
block_job_complete device -- stop an active background block operation
block_job_pause device -- pause an active background block operation
block_job_resume device -- resume a paused background block operation
block_job_set_speed device speed -- set maximum speed for a background block operation
block_passwd block_passwd device password -- set the password of encrypted block devices
block_resize device size -- resize a block image
block_set_io_throttle device bps bps_rd bps_wr iops iops_rd iops_wr -- change I/O throttle limits for a block drive
block_stream device [speed [base]] -- copy data from a backing file into a block device
boot_set bootdevice -- define new values for the boot device list
change device filename [format [read-only-mode]] -- change a removable medium, optional format
chardev-add args -- add chardev
chardev-change id args -- change chardev
chardev-remove id -- remove chardev
chardev-send-break id -- send a break on chardev
client_migrate_info protocol hostname port tls-port cert-subject -- set migration information for remote display
closefd closefd name -- close a file descriptor previously passed via SCM rights
commit device|all -- commit changes to the disk images (if -snapshot is used) or backing files
cpu index -- set the default CPU
cpu-add id -- add cpu
c|cont  -- resume emulation
delvm tag|id -- delete a VM snapshot from its tag or id
device_add driver[,prop=value][,...] -- add device, like -device on the command line
device_del device -- remove device
drive_add [-n] [[<domain>:]<bus>:]<slot>
[file=file][,if=type][,bus=n]
[,unit=m][,media=d][,index=i]
[,cyls=c,heads=h,secs=s[,trans=t]]
[,snapshot=on|off][,cache=on|off]
[,readonly=on|off][,copy-on-read=on|off] -- add drive to PCI storage controller
drive_backup [-n] [-f] [-c] device target [format] -- initiates a point-in-time
			copy for a device. The device's contents are
			copied to the new image file, excluding data that
			is written after the command is started.
			The -n flag requests QEMU to reuse the image found
			in new-image-file, instead of recreating it from scratch.
			The -f flag requests QEMU to copy the whole disk,
			so that the result does not need a backing file.
			The -c flag requests QEMU to compress backup data
			(if the target format supports it).

drive_del device -- remove host block device
drive_mirror [-n] [-f] device target [format] -- initiates live storage
			migration for a device. The device's contents are
			copied to the new image file, including data that
			is written after the command is started.
			The -n flag requests QEMU to reuse the image found
			in new-image-file, instead of recreating it from scratch.
			The -f flag requests QEMU to copy the whole disk,
			so that the result does not need a backing file.

dump-guest-memory [-p] [-d] [-z|-l|-s] filename [begin length] -- dump guest memory into file 'filename'.
			-p: do paging to get guest's memory mapping.
			-d: return immediately (do not wait for completion).
			-z: dump in kdump-compressed format, with zlib compression.
			-l: dump in kdump-compressed format, with lzo compression.
			-s: dump in kdump-compressed format, with snappy compression.
			begin: the starting physical address.
			length: the memory size, in bytes.
eject [-f] device -- eject a removable medium (use -f to force it)
expire_password protocol time -- set spice/vnc password expire-time
gdbserver [device] -- start gdbserver on given device (default 'tcp::1234'), stop with 'none'
getfd getfd name -- receive a file descriptor via SCM rights and assign it a name
gpa2hva addr -- print the host virtual address corresponding to a guest physical address
help|? [cmd] -- show the help
hostfwd_add [hub_id name]|[netdev_id] [tcp|udp]:[hostaddr]:hostport-[guestaddr]:guestport -- redirect TCP or UDP connections from host to guest (requires -net user)
hostfwd_remove [hub_id name]|[netdev_id] [tcp|udp]:[hostaddr]:hostport -- remove host-to-guest TCP or UDP redirection
i /fmt addr -- I/O port read
info [subcommand] -- show various information about the system state
loadvm tag|id -- restore a VM snapshot from its tag or id
log item1[,...] -- activate logging of the specified items
logfile filename -- output logs to 'filename'
mce [-b] cpu bank status mcgstatus addr misc -- inject a MCE on the given CPU [and broadcast to other CPUs with -b option]
memsave addr size file -- save to disk virtual memory dump starting at 'addr' of size 'size'
migrate [-d] [-b] [-i] uri -- migrate to URI (using -d to not wait for completion)
			 -b for migration without shared storage with full copy of disk
			 -i for migration without shared storage with incremental copy of disk (base image shared between src and destination)
migrate_cancel  -- cancel the current VM migration
migrate_continue state -- Continue migration from the given paused state
migrate_incoming uri -- Continue an incoming migration from an -incoming defer
migrate_set_cache_size value -- set cache size (in bytes) for XBZRLE migrations,the cache size will be rounded down to the nearest power of 2.
The cache size affects the number of cache misses.In case of a high cache miss ratio you need to increase the cache size
migrate_set_capability capability state -- Enable/Disable the usage of a capability for migration
migrate_set_downtime value -- set maximum tolerated downtime (in seconds) for migrations
migrate_set_parameter parameter value -- Set the parameter for migration
migrate_set_speed value -- set maximum speed (in bytes) for migrations. Defaults to MB if no size suffix is specified, ie. B/K/M/G/T
migrate_start_postcopy  -- Followup to a migration command to switch the migration to postcopy mode. The postcopy-ram capability must be set on both source and destination before the original migration command .
mouse_button state -- change mouse button state (1=L, 2=M, 4=R)
mouse_move dx dy [dz] -- send mouse move events
mouse_set index -- set which mouse device receives events
nbd_server_add nbd_server_add [-w] device [name] -- export a block device via NBD
nbd_server_remove nbd_server_remove [-f] name -- remove an export previously exposed via NBD
nbd_server_start nbd_server_start [-a] [-w] host:port -- serve block devices on the given host and port
nbd_server_stop nbd_server_stop -- stop serving block devices using the NBD protocol
netdev_add [user|tap|socket|vde|bridge|hubport|netmap|vhost-user],id=str[,prop=value][,...] -- add host network device
netdev_del id -- remove host network device
nmi  -- inject an NMI
o /fmt addr value -- I/O port write
object_add [qom-type=]type,id=str[,prop=value][,...] -- create QOM object
object_del id -- destroy QOM object
pcie_aer_inject_error [-a] [-c] id <error_status> [<tlp header> [<tlp header prefix>]] -- inject pcie aer error
			 -a for advisory non fatal error
			 -c for correctable error
			<id> = qdev device id
			<error_status> = error string or 32bit
			<tlb header> = 32bit x 4
			<tlb header prefix> = 32bit x 4
pmemsave addr size file -- save to disk physical memory dump starting at 'addr' of size 'size'
p|print /fmt expr -- print expression value (use $reg for CPU register access)
qemu-io [device] "[command]" -- run a qemu-io command on a block device
qom-list path -- list QOM properties
qom-set path property value -- set QOM property
q|quit  -- quit the emulator
ringbuf_read device size -- Read from a ring buffer character device
ringbuf_write device data -- Write to a ring buffer character device
savevm [tag|id] -- save a VM snapshot. If no tag or id are provided, a new snapshot is created
screendump filename [device [head]] -- save screen from head 'head' of display device 'device' into PPM image 'filename'
sendkey keys [hold_ms] -- send keys to the VM (e.g. 'sendkey ctrl-alt-f1', default hold time=100 ms)
set_link name on|off -- change the link status of a network adapter
set_password protocol password action-if-connected -- set spice/vnc password
singlestep [on|off] -- run emulation in singlestep mode or switch to normal mode
snapshot_blkdev [-n] device [new-image-file] [format] -- initiates a live snapshot
			of device. If a new image file is specified, the
			new image file will become the new root image.
			If format is specified, the snapshot file will
			be created in that format.
			The default format is qcow2.  The -n flag requests QEMU
			to reuse the image found in new-image-file, instead of
			recreating it from scratch.
snapshot_blkdev_internal device name -- take an internal snapshot of device.
			The format of the image used by device must
			support it, such as qcow2.

snapshot_delete_blkdev_internal device name [id] -- delete an internal snapshot of device.
			If id is specified, qemu will try delete
			the snapshot matching both id and name.
			The format of the image used by device must
			support it, such as qcow2.

stop  -- stop emulation
stopcapture capture index -- stop capture
sum addr size -- compute the checksum of a memory region
system_powerdown  -- send system power down event
system_reset  -- reset the system
system_wakeup  -- wakeup guest from suspend
trace-event name on|off [vcpu] -- changes status of a specific trace event (vcpu: vCPU to set, default is all)
watchdog_action [reset|shutdown|poweroff|pause|debug|none] -- change watchdog action
wavcapture path [frequency [bits [channels]]] -- capture audio to a wave file (default frequency=44100 bits=16 channels=2)
x /fmt addr -- virtual memory dump starting at 'addr'
x_colo_lost_heartbeat  -- Tell COLO that heartbeat is lost,
			a failover or takeover is needed.
xp /fmt addr -- physical memory dump starting at 'addr'
```
